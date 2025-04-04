import { validate } from "email-validator";

/**
 * Checks if the given username is valid
 * @param username 
 * @returns 
 */
export function checkUsername(username: string): boolean {
    return (username.match(/^\w{4,30}$/)?.length ?? -1) > 0;
}

/**
 * Checks if the given email is valid
 * @param email 
 * @returns 
 */
export function checkEmail(email: string): boolean {
    return validate(email);
}

/**
 * Check if the given password is valid
 * @param password 
 * @returns 
 */
export function checkPassword(password: string): boolean {
    return (password.match(/^(?=.*[a-zA-Z])(?=.*\d)(?=.*[@$!%*?&_+-])[A-Za-z\d@$!%*?&_+-]{8,30}$/)?.length ?? -1) > 0;
}