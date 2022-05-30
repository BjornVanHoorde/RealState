import { Navigate, Outlet, useLocation } from "react-router-dom";
import Container from "../../Design/Container/Container";
import { useAuthContext } from "./AuthProvider"

const OnboardingLayout = () => {
  const { auth } = useAuthContext();
  const location = useLocation();

  if (!auth) {
    return (
      <Container>
        <Outlet/>
      </Container>
    );
  }

  const from = location.state?.from?.pathname || "/";

  return <Navigate to={from} state={{ replace: true }} />;
};

export default OnboardingLayout;