import Property from "../Property/Property.entity";
import Agency from "../Agency/Agency.entity";
import User from "../User/User.entity";

export interface MessageBody {
  message: string;
  property: Property;
  sender: User;
  receiver: Agency;
}