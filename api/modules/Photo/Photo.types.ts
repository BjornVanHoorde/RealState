import Property from "../Property/Property.entity";

export interface PhotoBody {
  path: string;
  alt: string;
  property: Property;
  propertyId: number;
}