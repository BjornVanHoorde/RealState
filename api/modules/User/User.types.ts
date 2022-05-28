import RealEstate from "../RealEstate/RealEstate.entity";

export interface UserBody {
    firstName: string;
    lastName: string;
    email: string;
    tel: string;
    avatar?: string;
    password?: string;
    realEstate?: RealEstate;
}