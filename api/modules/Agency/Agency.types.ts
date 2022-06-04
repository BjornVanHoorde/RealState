import Address from "../Address/Address.entity";

export interface AgencyBody {
  name: string;
  tel: string;
  email: string;
  logo: string;
  address: Address;
}