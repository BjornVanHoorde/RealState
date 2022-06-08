import { NextFunction, Response } from "express";
import NotFoundError from "../../errors/NotFoundError";
import { AuthRequest } from "../../middleware/auth/auth.types";
import PropertyService from "../Property/Property.service";
import UserService from "../User/User.service";
import FavoriteService from "./Favorite.service";
import { FavoriteBody } from "./Favorite.types";

export default class FavoriteController {
  private favoriteService: FavoriteService;
  private userService: UserService;
  private propertyService: PropertyService;

  constructor() {
    this.favoriteService = new FavoriteService();
    this.userService = new UserService();
    this.propertyService = new PropertyService();
  }

  all = async (req: AuthRequest, res: Response, next: NextFunction) => {
    const favorites = await this.favoriteService.all(req.user.id);
    return res.json(favorites);
  };

  find = async (
    req: AuthRequest<{ id: number }>,
    res: Response,
    next: NextFunction
  ) => {
    const favorite = await this.favoriteService.findOne(req.params.id);
    if (!favorite) {
      next(new NotFoundError());
    }
    return res.json(favorite);
  };

  findBy = async (
    req: AuthRequest<{}, {}, {}>,
    res: Response,
    next: NextFunction
  ) => {
    const favorite = await this.favoriteService.findOneBy({ ...req.body });
    if (!favorite) {
      next(new NotFoundError());
    }
    return res.json(favorite);
  };

  create = async (
    req: AuthRequest<{}, {}, FavoriteBody>,
    res: Response,
    next: NextFunction
  ) => {
    const { body } = req;

    body.userId = req.user.id;
    body.user = await this.userService.findOne(req.user.id);

    if (body.propertyId) {
      body.property = await this.propertyService.findOne(body.propertyId);
    }

    const favorite = await this.favoriteService.create(body);
    return res.json(favorite);
  };

  update = async (
    req: AuthRequest<{ id: string }, {}, FavoriteBody>,
    res: Response,
    next: NextFunction
  ) => {
    try {
      const favorite = await this.favoriteService.update(
        parseInt(req.params.id),
        req.body
      );
      if (!favorite) {
        next(new NotFoundError());
      }
      return res.json(favorite);
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
      const favorite = await this.favoriteService.delete(
        parseInt(req.params.id)
      );
      if (!favorite) {
        next(new NotFoundError());
      }
      return res.json({});
    } catch (err) {
      next(err);
    }
  };
}
