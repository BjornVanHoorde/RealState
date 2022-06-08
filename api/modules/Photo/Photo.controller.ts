import { NextFunction, Response } from "express";
import { UploadedFile } from "express-fileupload";
import { UPLOAD_FOLDER } from "../../constants";
import NotFoundError from "../../errors/NotFoundError";
import { AuthRequest } from "../../middleware/auth/auth.types";
import PropertyService from "../Property/Property.service";
import PhotoService from "./Photo.service";
import { PhotoBody } from "./Photo.types";

const getPhotoPath = (req) => {
  if (req.files.photo) {
    const photo: UploadedFile = Array.isArray(req.files.photo)
      ? req.files.photo[0]
      : req.files.photo;
    const path = `${UPLOAD_FOLDER}/${new Date().getTime()}_${photo.name}`;
    photo.mv(path);
    return path;
  }
  return null;
};

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
    req: AuthRequest<{}, {}, PhotoBody>,
    res: Response,
    next: NextFunction
  ) => {
    const { body } = req;
    const photo = getPhotoPath(req);
    if (photo) {
      body.path = photo;
      body.alt = photo;
    }

    if (body.propertyId) {
      body.property = await this.propertyService.findOne(body.propertyId);
    }

    await this.photoService.create(body);

    return res.json(body);
  };

  update = async (
    req: AuthRequest<{ id: string }, {}, PhotoBody>,
    res: Response,
    next: NextFunction
  ) => {
    try {
      const { body } = req;
      const photo = getPhotoPath(req);
      if (photo) {
        body.path = photo;
        body.alt = photo;
      }

      if (body.propertyId) {
        body.property = await this.propertyService.findOne(body.propertyId);
      }

      const photoEnt = await this.photoService.update(
        parseInt(req.params.id),
        req.body
      );
      if (!photo) {
        next(new NotFoundError());
      }
      return res.json(photoEnt);
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
