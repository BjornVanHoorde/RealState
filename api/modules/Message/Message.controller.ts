import { NextFunction, Response } from "express";
import NotFoundError from "../../errors/NotFoundError";
import { AuthRequest } from "../../middleware/auth/auth.types";
import MessageService from "./Message.service";
import { MessageBody } from "./Message.types";

export default class MessageController {
  private messageService: MessageService;

  constructor() {
    this.messageService = new MessageService();
  }

  all = async (
    req: AuthRequest,
    res: Response,
    next: NextFunction
  ) => {
    const messages = await this.messageService.all();
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