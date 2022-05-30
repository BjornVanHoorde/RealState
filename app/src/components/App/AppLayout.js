import { Navigate, Outlet, useLocation } from "react-router-dom";
import { AuthRoutes } from "../../core/routing";
import Container from "../Design/Container/Container";
import { useAuthContext } from "./Auth/AuthProvider";
import Header from "./Shared/Generic/Header/Header";

const AppLayout = () => {
  const { auth } = useAuthContext();
  const location = useLocation();

  if (auth) {
    return (
      <>
        <Header />
        <Container>
          <Outlet />
        </Container>
      </>
    );
  }

  return <Navigate to={AuthRoutes.Login} state={{ from: location }} replace />;
};

export default AppLayout;
