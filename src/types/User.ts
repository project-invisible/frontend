export interface User {
    id: number,
    email: string,
    username: string,
    anonymous: boolean,
    role: Role,
    creationDate: Date,
    password: string,
    contact: Contact,
    status: Status,
}

export enum Role {
    USER = 'USER',
    ADMIN = 'ADMIN',
    MODERATOR = 'MODERATOR'
}

export interface Contact {
    email: string,
    urls: string[],
    phone: number,
}

export enum Status {
    ACTIVE = 'ACTIVE',
    DEACTIVATED = 'DEACTIVATED',
    BANNED = 'BANNED',
}