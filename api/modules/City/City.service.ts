import { Repository } from "typeorm";
import { AppDataSource } from "../../database/DatabaseSource";
import City from "./City.entity";
import { CityBody } from "./City.types";

export default class CityService {
  private repository: Repository<City>;

  constructor() {
    const repository = AppDataSource.getRepository(City);
    this.repository = repository;
  }

  all = async () => {
    const cities = await this.repository.find();
    return cities;
  };

  findOne = async (id: number) => {
    const city = await this.repository.findOneBy({ id });
    return city;
  };

  create = async (body: CityBody) => {
    const city = await this.repository.save(this.repository.create(body));
    return city;
  };
}