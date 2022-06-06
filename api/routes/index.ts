import { NextFunction, Request, Response, Router } from "express";
import * as express from "express";
import NotFoundError from "../errors/NotFoundError";
import { authJwt, authLocal, withRole } from "../middleware/auth";
import AuthController from "../modules/User/Auth.controller";
import { UserRole } from "../modules/User/User.constants";
import UserController from "../modules/User/User.controller";
import * as path from "path";
import { UPLOAD_FOLDER } from "../constants";
import CityController from "../modules/City/City.controller";
import fetch from "node-fetch";
import AddressController from "../modules/Address/Address.controller";
import AgencyController from "../modules/Agency/Agency.controller";
import PhotoController from "../modules/Photo/Photo.controller";
import CategoryController from "../modules/Category/Category.controller";
import PropertyController from "../modules/Property/Property.controller";
import FavoriteController from "../modules/Favorite/Favorite.controller";
import MessageController from "../modules/Message/Message.controller";

// catch error since Express doesn't catch errors in async functions
// this will catch the controller method + will send the error through next() method
// this way we don't have to do try/catch in every controller method
const useMethod =
  (func: (req: any, res: Response, next: NextFunction) => Promise<any>) =>
  async (req: Request, res: Response, next: NextFunction) => {
    try {
      await func(req, res, next);
    } catch (err) {
      next(err);
    }
  };

const registerOnboardingRoutes = (router: Router) => {
  const authController = new AuthController();
  router.post("/login", authLocal, useMethod(authController.login));

  const userController = new UserController();
  router.post("/register", useMethod(userController.create));

  //   // test route REMOVE after
  //   const userController = new UserController();
  //   if (process.env.ENV === "development") {
  //     router.post("/dev/users", useMethod(userController.create));
  //   }
};

const registerAdminRoutes = (router: Router) => {
  const adminRouter = Router();

  const userController = new UserController();
  adminRouter.get("/users", useMethod(userController.all));
  adminRouter.get("/users/:id", useMethod(userController.find));
  adminRouter.post("/users", useMethod(userController.create));
  adminRouter.patch("/users/:id", useMethod(userController.update));
  adminRouter.delete("/users/:id", useMethod(userController.delete));

  const agencyController = new AgencyController();
  adminRouter.get("/agencies", useMethod(agencyController.all));
  adminRouter.get("/agencies/:id", useMethod(agencyController.find));
  adminRouter.get("/agencies/:id/users", useMethod(agencyController.getUsers));
  adminRouter.post("/agencies", useMethod(agencyController.create));
  adminRouter.patch("/agencies/:id", useMethod(agencyController.update));

  adminRouter.delete("/agencies/:id", useMethod(agencyController.delete));

  const categoryController = new CategoryController();
  adminRouter.get("/categories", useMethod(categoryController.all));
  adminRouter.get("/categories/:id", useMethod(categoryController.find));
  adminRouter.post("/categories", useMethod(categoryController.create));
  adminRouter.patch("/categories/:id", useMethod(categoryController.update));
  adminRouter.delete("/categories/:id", useMethod(categoryController.delete));

  const cityController = new CityController();
  adminRouter.post("/cities", useMethod(cityController.create));

  router.use(withRole(UserRole.Admin), adminRouter);
};

const registerAuthenticatedRoutes = (router: Router) => {
  const authRouter = Router();

  const addressController = new AddressController();
  authRouter.get("/addresses", useMethod(addressController.all));
  authRouter.get("/addresses/:id", useMethod(addressController.find));
  authRouter.post("/addresses", useMethod(addressController.create));
  authRouter.patch("/addresses/:id", useMethod(addressController.update));
  authRouter.delete("/addresses/:id", useMethod(addressController.delete));

  const photoController = new PhotoController();
  authRouter.get("/photos", useMethod(photoController.all));
  authRouter.get("/photos/:id", useMethod(photoController.find));
  authRouter.post("/photos", useMethod(photoController.create));
  authRouter.patch("/photos/:id", useMethod(photoController.update));
  authRouter.delete("/photos/:id", useMethod(photoController.delete));

  const propertyController = new PropertyController();
  authRouter.get("/properties", useMethod(propertyController.all));
  authRouter.get("/properties/:id", useMethod(propertyController.find));
  authRouter.post("/properties", useMethod(propertyController.create));
  authRouter.patch("/properties/:id", useMethod(propertyController.update));
  authRouter.delete("/properties/:id", useMethod(propertyController.delete));

  const favoriteController = new FavoriteController();
  authRouter.get("/favorites", useMethod(favoriteController.all));
  authRouter.get("/favorites/:id", useMethod(favoriteController.find));
  authRouter.post("/favorites", useMethod(favoriteController.create));
  authRouter.patch("/favorites/:id", useMethod(favoriteController.update));
  authRouter.delete("/favorites/:id", useMethod(favoriteController.delete));

  const messageController = new MessageController();
  authRouter.get("/messages", useMethod(messageController.all));
  authRouter.get("/messages/:id", useMethod(messageController.find));
  authRouter.post("/messages", useMethod(messageController.create));
  authRouter.patch("/messages/:id", useMethod(messageController.update));
  authRouter.delete("/messages/:id", useMethod(messageController.delete));

  const cityController = new CityController();
  authRouter.get("/cities", useMethod(cityController.all));
  authRouter.get("/cities/:id", useMethod(cityController.find));

  const categoryController = new CategoryController();
  authRouter.get("/categories", useMethod(categoryController.all));
  authRouter.get("/categories/:id", useMethod(categoryController.find));

  const agencyController = new AgencyController();
  authRouter.get("/agencies/:id", useMethod(agencyController.find));
  authRouter.get("/agencies/:id/users", useMethod(agencyController.getUsers));

  const userController = new UserController();
  authRouter.post("/users", useMethod(userController.create));
  authRouter.get("/users/:id", useMethod(userController.find));

  registerAdminRoutes(authRouter);

  // authenticated routes use authJWT
  router.use(authJwt, authRouter);
};

const registerRoutes = (app: Router) => {
  // public folder
  app.use("/public", express.static(path.resolve(__dirname, "../public")));

  // onboarding routes (login, ...)
  registerOnboardingRoutes(app);

  // authenticated routes (authentication required)
  registerAuthenticatedRoutes(app);

  // fallback route, return our own 404 instead of default
  app.use((req: Request, res: Response, next: NextFunction) => {
    next(new NotFoundError());
  });
};

export { registerRoutes };
