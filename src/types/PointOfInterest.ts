export interface PointOfInterest {
    id: number
    name: String,
    overallRating: number,
    street: string,
    postal: number,
    description: string,
    email: string,
    website: string,
    city: string,
    coordinates: {
        x: number,
        y: number,
    }
}