import Agency from "../Agency/Agency.entity";
import { UserRole } from "./User.constants";

export interface UserBody {
    firstName: string;
    lastName: string;
    email: string;
    tel: string;
    role: UserRole;
    avatar?: string;
    password?: string;
    agencyId?: number | null;
    agency?: Agency;
    id?: number;
}