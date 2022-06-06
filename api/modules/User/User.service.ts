import User from "./User.entity";
import { Repository } from "typeorm";
import { UserBody } from "./User.types";
import { AppDataSource } from "../../database/DatabaseSource";
import { UserRole } from "./User.constants";

export default class UserService {
  private repository: Repository<User>;

  constructor() {
    const repository = AppDataSource.getRepository(User);
    this.repository = repository;
  }

  all = async (options: object) => {
    const users = await this.repository.find({
      relations: ["agency"],
      where: options,
    });
    return users;
  };

  getUsersByAgency = async (id: number) => {
    const users = await this.repository.find({
      relations: ["agency"],
      where: { agency: { id } },
    });
    return users;
  };

  findOne = async (id: number) => {
    const user = await this.repository.findOne({
      where: { id },
      relations: ["agency"],
    });
    return user;
  };

  findOneBy = async (options: object) => {
    const user = await this.repository.findOneBy(options);
    return user;
  };

  // filter = async (options: object) => {
  //   const users = await this.repository.find({where: options});
  //   return users;
  // };

  findByEmailWithPassword = async (email: string) => {
    const user = await this.repository
      .createQueryBuilder("user")
      .where("user.email = :email", { email })
      .select("user.password")
      .getOne();
    return user;
  };

  create = async (body: UserBody) => {
    const user = await this.repository.save(this.repository.create(body));
    return user;
  };

  update = async (id: number, body: UserBody) => {
    let user = await this.findOne(id);
    if (user) {
      user = await this.repository.save({ ...user, ...body });
    }
    return user;
  };

  delete = async (id: number) => {
    let user = await this.findOne(id);
    if (user) {
      await this.repository.softDelete({ id });
    }
    return user;
  };
}
