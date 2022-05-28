import { NextFunction, Response } from "express";
import NotFoundError from "../../errors/NotFoundError";
import { AuthRequest } from "../../middleware/auth/auth.types";
import FavoriteService from "./Favorite.service";
import { FavoriteBody } from "./Favorite.types";

export default class FavoriteController {
  private favoriteService: FavoriteService;

  constructor() {
    this.favoriteService = new FavoriteService();
  }

  all = async (
    req: AuthRequest,
    res: Response,
    next: NextFunction
  ) => {
    const favorites = await this.favoriteService.all();
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
    const favorite = await this.favoriteService.create(req.body);
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
      const favorite = await this.favoriteService.delete(parseInt(req.params.id));
      if (!favorite) {
        next(new NotFoundError());
      }
      return res.json({});
    } catch (err) {
      next(err);
    }
  };
}