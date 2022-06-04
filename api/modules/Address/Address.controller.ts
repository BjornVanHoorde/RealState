import { NextFunction, Response } from "express";
import NotFoundError from "../../errors/NotFoundError";
import { AuthRequest } from "../../middleware/auth/auth.types";
import CityService from "../City/City.service";
import AddressService from "./Address.service";
import { AddressBody } from "./Address.types";

export default class AddressController {
  private addressService: AddressService;
  private cityService: CityService;

  constructor() {
    this.addressService = new AddressService();
    this.cityService = new CityService();
  }

  all = async (
    req: AuthRequest,
    res: Response,
    next: NextFunction
  ) => {
    const addresses = await this.addressService.all();
    return res.json(addresses);
  };

  find = async (
    req: AuthRequest<{ id: number }>,
    res: Response,
    next: NextFunction
  ) => {
    const address = await this.addressService.findOne(req.params.id);
    if (!address) {
      next(new NotFoundError());
    }
    return res.json(address);
  };

  findBy = async (
    req: AuthRequest<{}, {}, {}>,
    res: Response,
    next: NextFunction
  ) => {
    const address = await this.addressService.findOneBy({ ...req.body });
    if (!address) {
      next(new NotFoundError());
    }
    return res.json(address);
  };

  create = async (
    req: AuthRequest<{}, {}, AddressBody>,
    res: Response,
    next: NextFunction
  ) => {
    const { body } = req;

    if (body.cityId) {
      body.city = await this.cityService.findOne(body.cityId);
    }

    const address = await this.addressService.create(req.body);
    return res.json(address);
  };

  update = async (
    req: AuthRequest<{ id: string }, {}, AddressBody>,
    res: Response,
    next: NextFunction
  ) => {
    try {
      const address = await this.addressService.update(
        parseInt(req.params.id),
        req.body
      );
      if (!address) {
        next(new NotFoundError());
      }
      return res.json(address);
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
      const address = await this.addressService.delete(parseInt(req.params.id));
      if (!address) {
        next(new NotFoundError());
      }
      return res.json({});
    } catch (err) {
      next(err);
    }
  };
}