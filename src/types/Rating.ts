import { PointOfInterest } from './PointOfInterest';
import { User } from './User';

export interface Rating {
    id: number,
    pointOfInterest: PointOfInterest,
    user: User,
    generalComment: string,
    categoryRatings: CategoryRating[], 
    creationDate?: Date,
    lastUpdated?: Date,
}

export interface CategoryRating {
    id: number,
    question: Question,
    rating: RatingOptions,
    comment: string,
    tag: string[],
}

export interface Question {
    id: number,
    text: string,
    category: Category,
    subCategory: SubCategory,
    hasCheckbox: boolean;
    followUpQuestions: number[],
}

export interface Category {
    id: number,
    name: string,
}

export interface SubCategory {
    id: number,
    name: string,
    category: Category
}

export enum RatingOptions {
    YES = 'YES',
    FALSE = 'FALSE',
    UNDECIDED = 'UNDECIDED',
  }