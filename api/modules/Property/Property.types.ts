import Address from "../Address/Address.entity";
import Category from "../Category/Category.entity";
import Photo from "../Photo/Photo.entity";
import RealEstate from "../RealEstate/RealEstate.entity";
import { PropertyStatus } from "./Property.constants";

export interface PropertyBody {
  surface: number;
  category: Category;
  realEstate: RealEstate;
  yearOfConstruction: number;
  description: string;
  price: number;
  address: Address;
}