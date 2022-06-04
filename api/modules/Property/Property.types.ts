import Address from "../Address/Address.entity";
import Category from "../Category/Category.entity";
import Photo from "../Photo/Photo.entity";
import Agency from "../Agency/Agency.entity";
import { PropertyStatus } from "./Property.constants";

export interface PropertyBody {
  surface: number;
  category: Category;
  agency: Agency;
  yearOfConstruction: number;
  description: string;
  price: number;
  address: Address;
}