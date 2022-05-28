import { NextFunction, Response } from "express";
import NotFoundError from "../../errors/NotFoundError";
import { AuthRequest } from "../../middleware/auth/auth.types";
import PhotoService from "./Photo.service";
import { PhotoBody } from "./Photo.types";

export default class PhotoController {
  private photoService: PhotoService;

  constructor() {
    this.photoService = new PhotoService();
  }

  all = async (
    req: AuthRequest,
    res: Response,
    next: NextFunction
  ) => {
    const photos = await this.photoService.all();
    return res.json(photos);
  };

  find = async (
    req: AuthRequest<{ id: number }>,
    res: Response,
    next: NextFunction
  ) => {
    const photo = await this.photoService.findOne(req.params.id);
    if (!photo) {
      next(new NotFoundError());
    }
    return res.json(photo);
  };

  findBy = async (
    req: AuthRequest<{}, {}, {}>,
    res: Response,
    next: NextFunction
  ) => {
    const photo = await this.photoService.findOneBy({ ...req.body });
    if (!photo) {
      next(new NotFoundError());
    }
    return res.json(photo);
  };

  create = async (
    req: AuthRequest<{}, {}, PhotoBody>,
    res: Response,
    next: NextFunction
  ) => {
    const photo = await this.photoService.create(req.body);
    return res.json(photo);
  };

  update = async (
    req: AuthRequest<{ id: string }, {}, PhotoBody>,
    res: Response,
    next: NextFunction
  ) => {
    try {
      const photo = await this.photoService.update(
        parseInt(req.params.id),
        req.body
      );
      if (!photo) {
        next(new NotFoundError());
      }
      return res.json(photo);
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
      const photo = await this.photoService.delete(parseInt(req.params.id));
      if (!photo) {
        next(new NotFoundError());
      }
      return res.json({});
    } catch (err) {
      next(err);
    }
  };
}