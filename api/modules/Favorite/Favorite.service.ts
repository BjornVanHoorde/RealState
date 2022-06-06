import { Repository } from "typeorm";
import { AppDataSource } from "../../database/DatabaseSource";
import Favorite from "./Favorite.entity";
import { FavoriteBody } from "./Favorite.types";

export default class FavoriteService {
  private repository: Repository<Favorite>;

  constructor() {
    const repository = AppDataSource.getRepository(Favorite);
    this.repository = repository;
  }

  all = async (id: number) => {
    const favorites = await this.repository.find({
      relations: [
        "property",
        "user",
        "property.photos",
        "property.address",
        "property.address.city",
        "property.category",
      ],
      where: { user: {id} }
    });
    return favorites;
  };

  findOne = async (id: number) => {
    const favorite = await this.repository.findOne({
      where: { id },
      relations: [
        "property",
        "user",
        "property.photos",
        "property.address",
        "property.address.city",
        "property.category",
      ],
    });
    return favorite;
  };

  findOneBy = async (options: object) => {
    const favorite = await this.repository.findOneBy(options);
    return favorite;
  };

  create = async (body: FavoriteBody) => {
    const favorite = await this.repository.save(this.repository.create(body));
    return favorite;
  };

  update = async (id: number, body: FavoriteBody) => {
    let favorite = await this.findOne(id);
    if (favorite) {
      favorite = await this.repository.save({ ...favorite, ...body });
    }
    return favorite;
  };

  delete = async (id: number) => {
    let favorite = await this.findOne(id);
    if (favorite) {
      await this.repository.softDelete({ id });
    }
    return favorite;
  };
}
