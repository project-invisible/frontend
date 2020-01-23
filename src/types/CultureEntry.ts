import { User } from "./User";

export interface CultureEntry {
  id: number;
  name: string;
  description: string;
  coords: {
    x: number;
    y: number;
  };
  creationDate: Date;
  user: User;
  image?: {
    data: string;
  }
}
