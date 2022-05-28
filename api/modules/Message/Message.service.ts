import { Repository } from "typeorm";
import { AppDataSource } from "../../database/DatabaseSource";
import Message from "./Message.entity";
import { MessageBody } from "./Message.types";

export default class MessageService {
  private repository: Repository<Message>;

  constructor() {
    const repository = AppDataSource.getRepository(Message);
    this.repository = repository;
  }

  all = async () => {
    const messages = await this.repository.find({
      relations: ["property", "sender", "receiver"],
    });
    return messages;
  };

  findOne = async (id: number) => {
    const message = await this.repository.findOne({
      where: { id },
      relations: ["property", "sender", "receiver"],
    });
    return message;
  };

  findOneBy = async (options: object) => {
    const message = await this.repository.findOneBy(options);
    return message;
  };

  create = async (body: MessageBody) => {
    const message = await this.repository.save(this.repository.create(body));
    return message;
  };

  update = async (id: number, body: MessageBody) => {
    let message = await this.findOne(id);
    if (message) {
      message = await this.repository.save({ ...message, ...body });
    }
    return message;
  };

  delete = async (id: number) => {
    let message = await this.findOne(id);
    if (message) {
      await this.repository.softDelete({ id });
    }
    return message;
  };
}