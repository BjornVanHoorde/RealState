import { Repository } from "typeorm";
import { AppDataSource } from "../../database/DatabaseSource";
import Property from "./Property.entity";
import { PropertyBody } from "./Property.types";

export default class PropertyService {
  private repository: Repository<Property>;

  constructor() {
    const repository = AppDataSource.getRepository(Property);
    this.repository = repository;
  }

  all = async () => {
    const properties = await this.repository.find({
      relations: ["address", "address.city", "photos", "agency", "category"],
    });
    return properties;
  };

  findOne = async (id: number) => {
    const property = await this.repository.findOne({
      where: { id },
      relations: ["address", "address.city", "photos", "agency", "category"],
    });
    return property;
  };

  findOneBy = async (options: object) => {
    const property = await this.repository.findOneBy(options);
    return property;
  };

  create = async (body: PropertyBody) => {
    const property = await this.repository.save(this.repository.create(body));
    return property;
  };

  update = async (id: number, body: PropertyBody) => {
    let property = await this.findOne(id);
    if (property) {
      property = await this.repository.save({ ...property, ...body });
    }
    return property;
  };

  delete = async (id: number) => {
    let property = await this.findOne(id);
    if (property) {
      await this.repository.softDelete({ id });
    }
    return property;
  };
}
