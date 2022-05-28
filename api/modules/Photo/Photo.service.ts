import { Repository } from "typeorm";
import { AppDataSource } from "../../database/DatabaseSource";
import Photo from "./Photo.entity";
import { PhotoBody } from "./Photo.types";

export default class PhotoService {
  private repository: Repository<Photo>;

  constructor() {
    const repository = AppDataSource.getRepository(Photo);
    this.repository = repository;
  }

  all = async () => {
    const photos = await this.repository.find();
    return photos;
  };

  findOne = async (id: number) => {
    const photo = await this.repository.findOneBy({ id });
    return photo;
  };

  findOneBy = async (options: object) => {
    const photo = await this.repository.findOneBy(options);
    return photo;
  };

  create = async (body: PhotoBody) => {
    const photo = await this.repository.save(this.repository.create(body));
    return photo;
  };

  update = async (id: number, body: PhotoBody) => {
    let photo = await this.findOne(id);
    if (photo) {
      photo = await this.repository.save({ ...photo, ...body });
    }
    return photo;
  };

  delete = async (id: number) => {
    let photo = await this.findOne(id);
    if (photo) {
      await this.repository.softDelete({ id });
    }
    return photo;
  };
}
