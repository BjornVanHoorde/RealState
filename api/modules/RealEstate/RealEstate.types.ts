import Address from "../Address/Address.entity";

export interface RealEstateBody {
  name: string;
  tel: string;
  email: string;
  logo: string;
  address: Address;
}