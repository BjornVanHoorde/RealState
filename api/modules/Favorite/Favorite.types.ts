import Property from "../Property/Property.entity";
import User from "../User/User.entity";

export interface FavoriteBody {
  property: Property;
  user: User;
}