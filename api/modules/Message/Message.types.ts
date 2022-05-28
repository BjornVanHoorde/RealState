import Property from "../Property/Property.entity";
import RealEstate from "../RealEstate/RealEstate.entity";
import User from "../User/User.entity";

export interface MessageBody {
  message: string;
  property: Property;
  sender: User;
  receiver: RealEstate;
}