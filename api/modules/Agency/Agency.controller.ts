import { NextFunction, Response } from "express";
import NotFoundError from "../../errors/NotFoundError";
import { AuthRequest } from "../../middleware/auth/auth.types";
import AgencyService from "./Agency.service";
import { AgencyBody } from "./Agency.types";

export default class AgencyController {
  private agencyService: AgencyService;
Agency
  constructor() {
    this.agencyService = new AgencyService();
  }

  all = async (
    req: AuthRequest,
    res: Response,
    next: NextFunction
  ) => {
    const agenciess = await this.agencyService.all();
    return res.json(agenciess);
  };

  find = async (
    req: AuthRequest<{ id: number }>,
    res: Response,
    next: NextFunction
  ) => {
    const agency = await this.agencyService.findOne(req.params.id);
    if (!agency) {
      next(new NotFoundError());
    }
    return res.json(agency);
  };

  findBy = async (
    req: AuthRequest<{}, {}, {}>,
    res: Response,
    next: NextFunction
  ) => {
    const agency = await this.agencyService.findOneBy({ ...req.body });
    if (!agency) {
      next(new NotFoundError());
    }
    return res.json(agency);
  };

  create = async (
    req: AuthRequest<{}, {}, AgencyBody>,
    res: Response,
    next: NextFunction
  ) => {
    const agency = await this.agencyService.create(req.body);
    return res.json(agency);
  };

  update = async (
    req: AuthRequest<{ id: string }, {}, AgencyBody>,
    res: Response,
    next: NextFunction
  ) => {
    try {
      const agency = await this.agencyService.update(
        parseInt(req.params.id),
        req.body
      );
      if (!agency) {
        next(new NotFoundError());
      }
      return res.json(agency);
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
      const agency = await this.agencyService.delete(parseInt(req.params.id));
      if (!agency) {
        next(new NotFoundError());
      }
      return res.json({});
    } catch (err) {
      next(err);
    }
  };
}