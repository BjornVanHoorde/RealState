import { Repository } from "typeorm";
import { AppDataSource } from "../../database/DatabaseSource";
import Address from "./Address.entity";
import { AddressBody } from "./Address.types";

export default class AddressService {
  private repository: Repository<Address>;

  constructor() {
    const repository = AppDataSource.getRepository(Address);
    this.repository = repository;
  }

  all = async () => {
    const addresses = await this.repository.find({
      relations: ["city"],
    });
    return addresses;
  };

  findOne = async (id: number) => {
    const address = await this.repository.findOne({
      where: { id },
      relations: ["city"],
    });
    return address;
  };

  findOneBy = async (options: object) => {
    const address = await this.repository.findOneBy(options);
    return address;
  };

  create = async (body: AddressBody) => {
    const address = await this.repository.save(this.repository.create(body));
    return address;
  };

  update = async (id: number, body: AddressBody) => {
    let address = await this.findOne(id);
    if (address) {
      address = await this.repository.save({ ...address, ...body });
    }
    return address;
  };

  delete = async (id: number) => {
    let address = await this.findOne(id);
    if (address) {
      await this.repository.softDelete({ id });
    }
    return address;
  };
}
