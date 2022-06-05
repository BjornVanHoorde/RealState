import { NextFunction, Response } from "express";
import NotFoundError from "../../errors/NotFoundError";
import { AuthRequest } from "../../middleware/auth/auth.types";
import PropertyService from "../Property/Property.service";
import PhotoService from "./Photo.service";
import { PhotoBody, PhotosBody } from "./Photo.types";

export default class PhotoController {
  private photoService: PhotoService;
  private propertyService: PropertyService;

  constructor() {
    this.photoService = new PhotoService();
    this.propertyService = new PropertyService();
  }

  all = async (req: AuthRequest, res: Response, next: NextFunction) => {
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
    req: AuthRequest<{}, {}, PhotosBody>,
    res: Response,
    next: NextFunction
  ) => {
    const { body } = req;

    if (body.propertyId) {
      body.property = await this.propertyService.findOne(body.propertyId);
    }

    if (body.photos) {
      body.photos.forEach(async (photo: PhotoBody) => {
        let photobody: PhotoBody;
        photobody = {
          ...photo,
          propertyId: body.propertyId,
          property: body.property,
        };
        await this.photoService.create(photobody);
      });
    }

    return res.json(body);
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
