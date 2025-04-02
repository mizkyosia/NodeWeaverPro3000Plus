export function checkUsername(username: string): boolean {
    return username.length > 3;
}

export function checkEmail(email: string): boolean {
    return false;
}

export function checkPassword(password: string): boolean {
    return false;
}