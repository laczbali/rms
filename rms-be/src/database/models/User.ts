export interface User {
    id: number;

    email: string;
    displayName: string;

    passwordHash: string;
    passwordSalt: string;

    groups: string;
}