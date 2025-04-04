import { prisma } from "$lib/server/session";
import { hashPassword } from "./password";

/**
 * Creates a new user account
 * @param email 
 * @param name 
 * @param password 
 * @returns Newly generated user data
 */
export async function signupUser(email: string, name: string, password: string) {
    const passwordHash = await hashPassword(password);

    return await prisma.user.create({
        data: {
            name,
            email,
            passwordHash,
        }
    });
}