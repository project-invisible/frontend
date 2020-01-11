import { PointOfInterest } from './PointOfInterest';

export interface Rating {
    id: number,
    pointOfInterest: PointOfInterest,
    overallRating: number,
    criteriaRatings: Criteria[], 
    creationDate?: Date,
    lastUpdated?: Date,
}

export interface Criteria {
    id: number,
    name: string,
    overallRating: number,
    criteriaRatings: CriteriaObject[];
}

export interface CriteriaObject {
    name: string,
    criteriaRating: number,
    criteriaText: string,
}