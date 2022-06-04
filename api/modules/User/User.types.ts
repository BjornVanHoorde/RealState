import RealEstate from "../RealEstate/RealEstate.entity";
import { UserRole } from "./User.constants";

export interface UserBody {
    firstName: string;
    lastName: string;
    email: string;
    tel: string;
    role: UserRole;
    avatar?: string;
    password?: string;
    realEstateId?: number;
    realEstate?: RealEstate;
}