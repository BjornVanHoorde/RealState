import { Repository } from "typeorm";
import { AppDataSource } from "../../database/DatabaseSource";
import RealEstate from "./RealEstate.entity";
import { RealEstateBody } from "./RealEstate.types";

export default class RealEstateService {
  private repository: Repository<RealEstate>;

  constructor() {
    const repository = AppDataSource.getRepository(RealEstate);
    this.repository = repository;
  }

  all = async () => {
    const realEstates = await this.repository.find({
      relations: ["address", "address.city"],
    });
    return realEstates;
  };

  findOne = async (id: number) => {
    const realEstate = await this.repository.findOne({
      where: { id },
      relations: ["address", "address.city"],
    });
    return realEstate;
  };

  findOneBy = async (options: object) => {
    const realEstate = await this.repository.findOneBy(options);
    return realEstate;
  };

  create = async (body: RealEstateBody) => {
    const realEstate = await this.repository.save(this.repository.create(body));
    return realEstate;
  };

  update = async (id: number, body: RealEstateBody) => {
    let realEstate = await this.findOne(id);
    if (realEstate) {
      realEstate = await this.repository.save({ ...realEstate, ...body });
    }
    return realEstate;
  };

  delete = async (id: number) => {
    let realEstate = await this.findOne(id);
    if (realEstate) {
      await this.repository.softDelete({ id });
    }
    return realEstate;
  };
}