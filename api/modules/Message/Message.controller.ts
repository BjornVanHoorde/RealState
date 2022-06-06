import { NextFunction, Response } from "express";
import NotFoundError from "../../errors/NotFoundError";
import { AuthRequest } from "../../middleware/auth/auth.types";
import UserService from "../User/User.service";
import MessageService from "./Message.service";
import { MessageBody } from "./Message.types";

export default class MessageController {
  private messageService: MessageService;
  private userService: UserService;

  constructor() {
    this.messageService = new MessageService();
    this.userService = new UserService();
  }

  all = async (
    req: AuthRequest,
    res: Response,
    next: NextFunction
  ) => {

    const user = await this.userService.findOne(req.user.id);

    const messages = await this.messageService.all(user.agency.id);
    return res.json(messages);
  };

  find = async (
    req: AuthRequest<{ id: number }>,
    res: Response,
    next: NextFunction
  ) => {
    const message = await this.messageService.findOne(req.params.id);
    if (!message) {
      next(new NotFoundError());
    }
    return res.json(message);
  };

  findBy = async (
    req: AuthRequest<{}, {}, {}>,
    res: Response,
    next: NextFunction
  ) => {
    const message = await this.messageService.findOneBy({ ...req.body });
    if (!message) {
      next(new NotFoundError());
    }
    return res.json(message);
  };

  create = async (
    req: AuthRequest<{}, {}, MessageBody>,
    res: Response,
    next: NextFunction
  ) => {
    const message = await this.messageService.create(req.body);
    return res.json(message);
  };

  update = async (
    req: AuthRequest<{ id: string }, {}, MessageBody>,
    res: Response,
    next: NextFunction
  ) => {
    try {
      const message = await this.messageService.update(
        parseInt(req.params.id),
        req.body
      );
      if (!message) {
        next(new NotFoundError());
      }
      return res.json(message);
    } catch (err) {
      next(err);
    }
  };

  delete = async (
    req: AuthRequest<{ id: string }>,
    res: Response,
    next: NextFunction
  ) => {
    try {
      const message = await this.messageService.delete(parseInt(req.params.id));
      if (!message) {
        next(new NotFoundError());
      }
      return res.json({});
    } catch (err) {
      next(err);
    }
  };
}