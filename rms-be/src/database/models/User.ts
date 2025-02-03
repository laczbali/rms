export interface User {
    id: number;

    email: string;
    displayName: string;
    permissions: string;

    passwordHash: string;
    passwordSalt: string;
}