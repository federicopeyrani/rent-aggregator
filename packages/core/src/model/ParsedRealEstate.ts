import type { DetailedRealEstate, Photo, Location } from "./Props";

export interface ParsedRealEstate {
  id: number;
  uuid: string;
  url: string;
  title: string;
  description?: string;
  location: Location;
  price: number;
  condominiumExpenses?: number;
  contract: DetailedRealEstate["contractValue"];
  surface: number;
  photos: Photo[];
}
