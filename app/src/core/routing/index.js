const AuthRoutes = {
  Index: "/auth",
  Login: "/auth/login",
  Register: "/auth/register",
};

const PropertyRoutes = {
  Index: "/properties",
};

const CategoryRoutes = {
  Index: "/categories",
  Add: "/categories/add",
};

const UserRoutes = {
  Index: "/users",
};

const RealEstateRoutes = {
  Index: "/realEstates",
  Detail: "/realEstates/:id",
};

const MessageRoutes = {
  Index: "/messages",
};

const FavoriteRoutes = {
  Index: "/favorites",
};

export const route = (path, options = {}) => {
  Object.keys(options).forEach((key) => {
    path = path.replace(`:${key}`, options[key]);
  });
  return path;
};

export {
  AuthRoutes,
  PropertyRoutes,
  CategoryRoutes,
  UserRoutes,
  RealEstateRoutes,
  MessageRoutes,
  FavoriteRoutes,
};
