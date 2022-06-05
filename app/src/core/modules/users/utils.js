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

const getAuthorization = (user, agencyId) => {
  if (isAdmin(user)) {
    return true;
  }

  if (isUser(user)) {
    return false;
  }

  if (isAgent(user)) {
    return user.agency.id === agencyId;
  }
};

export { isAdmin, isAgent, isUser, getAuthorization }