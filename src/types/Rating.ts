import { PointOfInterest } from './PointOfInterest';

export interface Rating {
    id: number,
    poiId: number,
    userId: number,
    generalComment: string,
    categorieRatings: CategoryRating[], 
    creationDate?: Date,
    lastUpdated?: Date,
}

export interface CategoryRating {
    id: number,
    questionId: number,
    rating: RatingOptions,
    comment: string,
    tag: string[],
}

export interface Question {
    id: number,
    text: string,
    categoryId: number,
    subCategoryId: number,
    hasCheckbox: boolean;
    followUpQuestion: number[],
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