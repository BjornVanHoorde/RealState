import { NextFunction, Response } from "express";
import NotFoundError from "../../errors/NotFoundError";
import { AuthRequest } from "../../middleware/auth/auth.types";
import PropertyService from "./Property.service";
import { PropertyBody } from "./Property.types";

export default class PropertyController {
  private propertyService: PropertyService;

  constructor() {
    this.propertyService = new PropertyService();
  }

  all = async (
    req: AuthRequest,
    res: Response,
    next: NextFunction
  ) => {
    const properties = await this.propertyService.all();
    return res.json(properties);
  };

  find = async (
    req: AuthRequest<{ id: number }>,
    res: Response,
    next: NextFunction
  ) => {
    const property = await this.propertyService.findOne(req.params.id);
    if (!property) {
      next(new NotFoundError());
    }
    return res.json(property);
  };

  findBy = async (
    req: AuthRequest<{}, {}, {}>,
    res: Response,
    next: NextFunction
  ) => {
    const property = await this.propertyService.findOneBy({ ...req.body });
    if (!property) {
      next(new NotFoundError());
    }
    return res.json(property);
  };

  create = async (
    req: AuthRequest<{}, {}, PropertyBody>,
    res: Response,
    next: NextFunction
  ) => {
    const property = await this.propertyService.create(req.body);
    return res.json(property);
  };

  update = async (
    req: AuthRequest<{ id: string }, {}, PropertyBody>,
    res: Response,
    next: NextFunction
  ) => {
    try {
      const property = await this.propertyService.update(
        parseInt(req.params.id),
        req.body
      );
      if (!property) {
        next(new NotFoundError());
      }
      return res.json(property);
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
      const property = await this.propertyService.delete(parseInt(req.params.id));
      if (!property) {
        next(new NotFoundError());
      }
      return res.json({});
    } catch (err) {
      next(err);
    }
  };
}