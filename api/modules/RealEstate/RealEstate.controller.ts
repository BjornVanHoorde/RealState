import { NextFunction, Response } from "express";
import NotFoundError from "../../errors/NotFoundError";
import { AuthRequest } from "../../middleware/auth/auth.types";
import RealEstateService from "./RealEstate.service";
import { RealEstateBody } from "./RealEstate.types";

export default class RealEstateController {
  private realEstateService: RealEstateService;

  constructor() {
    this.realEstateService = new RealEstateService();
  }

  all = async (
    req: AuthRequest,
    res: Response,
    next: NextFunction
  ) => {
    const realEstates = await this.realEstateService.all();
    return res.json(realEstates);
  };

  find = async (
    req: AuthRequest<{ id: number }>,
    res: Response,
    next: NextFunction
  ) => {
    const realEstate = await this.realEstateService.findOne(req.params.id);
    if (!realEstate) {
      next(new NotFoundError());
    }
    return res.json(realEstate);
  };

  findBy = async (
    req: AuthRequest<{}, {}, {}>,
    res: Response,
    next: NextFunction
  ) => {
    const realEstate = await this.realEstateService.findOneBy({ ...req.body });
    if (!realEstate) {
      next(new NotFoundError());
    }
    return res.json(realEstate);
  };

  create = async (
    req: AuthRequest<{}, {}, RealEstateBody>,
    res: Response,
    next: NextFunction
  ) => {
    const realEstate = await this.realEstateService.create(req.body);
    return res.json(realEstate);
  };

  update = async (
    req: AuthRequest<{ id: string }, {}, RealEstateBody>,
    res: Response,
    next: NextFunction
  ) => {
    try {
      const realEstate = await this.realEstateService.update(
        parseInt(req.params.id),
        req.body
      );
      if (!realEstate) {
        next(new NotFoundError());
      }
      return res.json(realEstate);
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
      const realEstate = await this.realEstateService.delete(parseInt(req.params.id));
      if (!realEstate) {
        next(new NotFoundError());
      }
      return res.json({});
    } catch (err) {
      next(err);
    }
  };
}