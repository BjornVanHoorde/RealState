const AuthRoutes = {
  Index: "/auth",
  Login: "/auth/login",
  Register: "/auth/register",
};

const PropertyRoutes = {
  Index: "/properties",
  Create: "/properties/create",
  Detail: "/properties/:id",
  Edit: "/properties/:id/edit",
};

const CategoryRoutes = {
  Index: "/categories",
  Create: "/categories/create",
};

const UserRoutes = {
  Index: "/users",
  Create: "/users/create",
  Detail: "/users/:id",
  Edit: "/users/:id/edit",
};

const AgencyRoutes = {
  Index: "/agencies",
  Create: "/agencies/create",
  CreateUser: "/agencies/:id/createUser",
  Detail: "/agencies/:id",
  Edit: "/agencies/:id/edit",
};

const MessageRoutes = {
  Index: "/messages",
  Detail: "/messages/:id",
};

const FavoriteRoutes = {
  Index: "/favorites",
};

const ProfileRoutes = {
  Index: "/profile",
  Edit: "/profile/edit",
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
  AgencyRoutes,
  MessageRoutes,
  FavoriteRoutes,
  ProfileRoutes,
};
