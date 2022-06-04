import bodyParser = require("body-parser");
import { NextFunction, Request, Response } from "express";
import NotFoundError from "../../errors/NotFoundError";
import { AuthRequest } from "../../middleware/auth/auth.types";
import AgencyService from "../Agency/Agency.service";
import { UserRole } from "./User.constants";
import UserService from "./User.service";
import { UserBody } from "./User.types";

export default class UserController {
  private userService: UserService;
  private agencyService: AgencyService;

  constructor() {
    this.userService = new UserService();
    this.agencyService = new AgencyService();
  }

  all = async (
    req: AuthRequest<{}, {}, {}>,
    res: Response,
    next: NextFunction
  ) => {
    const users = await this.userService.all({...req.body});
    return res.json(users);
  };

  find = async (
    req: AuthRequest<{ id: number }>,
    res: Response,
    next: NextFunction
  ) => {
    const user = await this.userService.findOne(req.params.id);
    if (!user) {
      next(new NotFoundError());
    }
    return res.json(user);
  };

  create = async (
    req: AuthRequest<{}, {}, UserBody>,
    res: Response,
    next: NextFunction
  ) => {
    const { body } = req;

    if (body.agencyId) {
      body.agency = await this.agencyService.findOne(body.agencyId);
    }

    const user = await this.userService.create(body);
    return res.json(user);
  };

  update = async (
    req: AuthRequest<{ id: string }, {}, UserBody>,
    res: Response,
    next: NextFunction
  ) => {
    const { body } = req;

    if (body.agencyId) {
      body.agency = await this.agencyService.findOne(body.agencyId);
      body.role = UserRole.Agent;
    } else {
      body.agency = null;
      body.role = UserRole.User;
    }

    try {
      const user = await this.userService.update(
        parseInt(req.params.id),
        req.body
      );
      if (!user) {
        next(new NotFoundError());
      }
      return res.json(user);
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
      const user = await this.userService.delete(parseInt(req.params.id));
      if (!user) {
        next(new NotFoundError());
      }
      return res.json({});
    } catch (err) {
      next(err);
    }
  };
}
