import { userRoles } from "./constants";

const isAdmin = (user) => {
  return user.role === userRoles.Admin;
};

const isAgent = (user) => {
  return user.role === userRoles.Agent;
};

const isUser = (user) => {
  return user.role === userRoles.User;
};

export { isAdmin, isAgent, isUser }