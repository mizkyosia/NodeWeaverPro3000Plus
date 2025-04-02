import type { RequestEvent } from "@sveltejs/kit";
import type { User, Session } from "@prisma/client";
import { encodeBase32LowerCaseNoPadding, encodeHexLowerCase } from "@oslojs/encoding";
import { PrismaClient } from "@prisma/client";
import { sha256 } from "@oslojs/crypto/sha2";

export const prisma = new PrismaClient();

/**
 * Generates a new session token for auth purposes
 * @returns 
 */
export function generateSessionToken(): string {
    const bytes = new Uint8Array(20);
    crypto.getRandomValues(bytes);
    const token = encodeBase32LowerCaseNoPadding(bytes);
    return token;
}

/**
 * Creates a new valid session with a given token for a given user, and stores it in the database
 * @param token Auth token for the following user
 * @param userId Id of the authenticated user
 * @returns 
 */
export async function createSession(token: string, userId: number): Promise<Session> {
    const sessionId = encodeHexLowerCase(sha256(new TextEncoder().encode(token)));
    const session: Session = {
        id: sessionId,
        userId,
        expiresAt: new Date(Date.now() + 1000 * 60 * 60 * 24 * 30)
    };
    await prisma.session.create({
        data: session
    });
    return session;

}

/**
 * Checks the validity of a session from its token, and returns the requested user & session if it is still valid
 * @param token Corresponding session token
 * @returns 
 */
export async function validateSessionToken(token: string): Promise<SessionValidationResult> {
    const sessionId = encodeHexLowerCase(sha256(new TextEncoder().encode(token)));
    const result = await prisma.session.findUnique({
        where: {
            id: sessionId
        },
        include: {
            user: true
        }
    });
    if (result === null) {
        return { session: null, user: null };
    }
    const { user, ...session } = result;
    if (Date.now() >= session.expiresAt.getTime()) {
        await prisma.session.delete({ where: { id: sessionId } });
        return { session: null, user: null };
    }
    if (Date.now() >= session.expiresAt.getTime() - 1000 * 60 * 60 * 24 * 15) {
        session.expiresAt = new Date(Date.now() + 1000 * 60 * 60 * 24 * 30);
        await prisma.session.update({
            where: {
                id: session.id
            },
            data: {
                expiresAt: session.expiresAt
            }
        });
    }
    return { session, user };
}

/**
 * Invalidates a session, effectively removing it from the database
 * @param sessionId Valid auth session id
 */
export async function invalidateSession(sessionId: string): Promise<void> {
    await prisma.session.delete({ where: { id: sessionId } });
}

/**
 * Removes all valid sessions for a given user
 * @param userId Id of the authenticated user
 */
export async function invalidateAllSessions(userId: number): Promise<void> {
    await prisma.session.deleteMany({
        where: {
            userId: userId
        }
    });
}

export type SessionValidationResult =
    | { session: Session; user: User }
    | { session: null; user: null };


/**
 * Sets the token for a 
 * @param event Request event
 * @param token Session token
 * @param expiresAt Date of validity of the session
 */
export function setSessionTokenCookie(event: RequestEvent, token: string, expiresAt: Date): void {
    event.cookies.set("session", token, {
        httpOnly: true,
        sameSite: "lax",
        expires: expiresAt,
        path: "/"
    });
}

export function deleteSessionTokenCookie(event: RequestEvent): void {
    event.cookies.set("session", "", {
        httpOnly: true,
        sameSite: "lax",
        maxAge: 0,
        path: "/"
    });
}
