import { NextFunction, Response } from "express";
import NotFoundError from "../../errors/NotFoundError";
import { AuthRequest } from "../../middleware/auth/auth.types";
import AddressService from "../Address/Address.service";
import AgencyService from "../Agency/Agency.service";
import CategoryService from "../Category/Category.service";
import UserService from "../User/User.service";
import PropertyService from "./Property.service";
import { PropertyBody } from "./Property.types";

export default class PropertyController {
  private propertyService: PropertyService;
  private agencyService: AgencyService;
  private categoryService: CategoryService;
  private addressService: AddressService;
  private userService: UserService;

  constructor() {
    this.propertyService = new PropertyService();
    this.agencyService = new AgencyService();
    this.categoryService = new CategoryService();
    this.addressService = new AddressService();
    this.userService = new UserService();
  }

  all = async (req: AuthRequest, res: Response, next: NextFunction) => {
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
    const { body } = req;

    if (req.user.isAgent()) {
      const user = await this.userService.findOne(req.user.id);
      body.agency = await this.agencyService.findOne(user.agency.id);
      body.agencyId = user.agency.id;
    }

    if (body.agencyId) {
      body.agency = await this.agencyService.findOne(body.agencyId);
    }

    if (body.categoryId) {
      body.category = await this.categoryService.findOne(body.categoryId);
    }

    if (body.addressId) {
      body.address = await this.addressService.findOne(body.addressId);
    }

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
      const property = await this.propertyService.delete(
        parseInt(req.params.id)
      );
      if (!property) {
        next(new NotFoundError());
      }
      return res.json({});
    } catch (err) {
      next(err);
    }
  };
}
