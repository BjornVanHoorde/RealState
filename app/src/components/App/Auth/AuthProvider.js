import { createContext, useContext, useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { AuthRoutes } from "../../../core/routing";

const KEY = "REALSTATE_AUTH";

const AuthContext = createContext();

const getAuthFromStorage = () => {
  const auth = localStorage.getItem(KEY);
  if (auth) {
    // base64 encode
    return JSON.parse(atob(auth));
  }
  return null;
};

const saveAuthToStorage = (auth) => {
  // base64 decode
  localStorage.setItem(KEY, btoa(JSON.stringify(auth)));
};

const AuthProvider = ({ children }) => {
  const [auth, setAuth] = useState(getAuthFromStorage());
  const navigate = useNavigate();

  useEffect(() => {
    if (auth) {
      saveAuthToStorage(auth);
    } else {
      localStorage.removeItem(KEY);
    }
  }, [auth]);

  const handleLogout = () => {
    setAuth(null);
    navigate(AuthRoutes.Login);
  };

  const handleLogin = (auth) => {
    setAuth(auth);
  };

  return (
    <AuthContext.Provider
      value={{ auth, login: handleLogin, logout: handleLogout }}
    >
      {children}
    </AuthContext.Provider>
  );
};

export const useAuthContext = () => {
  return useContext(AuthContext);
};

export const useUser = () => {
  const { auth } = useAuthContext();
  return auth?.user;
};

export default AuthProvider;
