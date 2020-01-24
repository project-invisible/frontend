import { User } from './User';
import { Rating } from './Rating';

export interface UserReport {
     id: number,
     reportingUser: User,
     reportedUser: User,
     reportDate: Date,
     solved: boolean,
}

export interface RatingReport {
    id: number,
    reportingUser: User,
    rating: Rating,
    reportDate: Date,
    solved: boolean,
}

export interface Feedback {
    id: number,
    user: User,
    editor: User;
    solved: boolean,
    message: string,
}