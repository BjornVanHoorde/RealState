import Property from "../Property/Property.entity";
import Agency from "../Agency/Agency.entity";
import User from "../User/User.entity";

export interface MessageBody {
  message: string;
  property: Property;
  propertyId: number;
  sender: User;
  senderId: number;
  receiver: Agency;
  receiverId: number;
}
