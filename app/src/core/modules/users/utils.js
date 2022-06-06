import { userRoles } from "./constants";

const isAdmin = (user) => {
  if(user) {
    return user.role === userRoles.Admin;
  }
  return false
};

const isAgent = (user) => {
  if(user) {
    return user.role === userRoles.Agent;
  }
  return false
};

const isUser = (user) => {
  if(user) {
    return user.role === userRoles.User;
  }
  return false
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