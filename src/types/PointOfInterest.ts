import { Question } from './Rating';

export interface PointOfInterest {
    id: number
    name: String,
    street: string,
    postal: number,
    description: string,
    email: string,
    website: string,
    city: string,
    overallRatingPerQuestion: QuestionRatingObject[],
    coordinates: {
        x: number,
        y: number,
    }
}

export interface QuestionRatingObject {
    question: Question,
    rating: number,
  }