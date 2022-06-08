import { NextFunction, Response } from "express";
import NotFoundError from "../../errors/NotFoundError";
import { AuthRequest } from "../../middleware/auth/auth.types";
import CityService from "./City.service";
import { CityBody } from "./City.types";

export default class CityController {
  private cityService: CityService;

  constructor() {
    this.cityService = new CityService();
  }

  all = async (req: AuthRequest, res: Response, next: NextFunction) => {
    const cities = await this.cityService.all();
    return res.json(cities);
  };

  find = async (
    req: AuthRequest<{ id: number }>,
    res: Response,
    next: NextFunction
  ) => {
    const city = await this.cityService.findOne(req.params.id);
    if (!city) {
      next(new NotFoundError());
    }
    return res.json(city);
  };

  create = async (
    req: AuthRequest<{}, {}, CityBody>,
    res: Response,
    next: NextFunction
  ) => {
    const city = await this.cityService.create(req.body);
    return res.json(city);
  };

  seed = async (req: AuthRequest, res: Response, next: NextFunction) => {
    const data = require("./cities.json");

    data.forEach(async (city: CityBody) => {
      await this.cityService.create(city);
    });

    return res.json(data);
  };
}
