import { Repository } from "typeorm";
import { AppDataSource } from "../../database/DatabaseSource";
import Category from "./Category.entity";
import { CategoryBody } from "./Category.types";

export default class CategoryService {
  private repository: Repository<Category>;

  constructor() {
    const repository = AppDataSource.getRepository(Category);
    this.repository = repository;
  }

  all = async () => {
    const categories = await this.repository.find();
    return categories;
  };

  findOne = async (id: number) => {
    const category = await this.repository.findOneBy({ id });
    return category;
  };

  findOneBy = async (options: object) => {
    const category = await this.repository.findOneBy(options);
    return category;
  };

  create = async (body: CategoryBody) => {
    const category = await this.repository.save(this.repository.create(body));
    return category;
  };

  update = async (id: number, body: CategoryBody) => {
    let category = await this.findOne(id);
    if (category) {
      category = await this.repository.save({ ...category, ...body });
    }
    return category;
  };

  delete = async (id: number) => {
    let category = await this.findOne(id);
    if (category) {
      await this.repository.softDelete({ id });
    }
    return category;
  };
}
