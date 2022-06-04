import City from "../City/City.entity";

export interface AddressBody {
    street: string;
    number: number;
    box?: string;
    city: City;
    cityId: number;
}