import { Navigate, Outlet, Route, Routes } from "react-router-dom";
import { AuthRoutes, CategoryRoutes } from "../../core/routing";
import AppLayout from "./AppLayout";
import AuthContainer from "./Auth/AuthContainer";
import AuthProvider from "./Auth/AuthProvider";
import LoginScreen from "./Auth/login/LoginScreen";
import TestScreen from "./Screens/TestScreen";
import RegisterScreen from "./Auth/register/RegisterScreen";
import CategoryLayout from "./Screens/Category/CategoryLayout";
import CategoryOverviewScreen from "./Screens/Category/Overview/CategoryOveriewScreen";
import OnboardingLayout from "./Auth/OnBoardingLayout";
import RoleContainer from "./Auth/RoleContainer";
import { userRoles } from "../../core/modules/users/constants";

const App = () => {
  return (
    <AuthProvider>
      <Routes>
        {/* AUTHROUTES */}
        <Route path={AuthRoutes.Index} element={<OnboardingLayout />}>
          <Route path={AuthRoutes.Login} element={<LoginScreen />} />
          <Route path={AuthRoutes.Register} element={<RegisterScreen />} />
          <Route path="*" element={<Navigate to={AuthRoutes.Login} />} />
        </Route>
        {/* AUTHENTICATED ROUTES */}
        <Route
          element={
            <AuthContainer>
              <AppLayout />
            </AuthContainer>
          }
        >
          <Route path="/test" element={<TestScreen />} />
          {/* ADMIN ROUTES */}
          <Route
            element={
              <RoleContainer roles={[userRoles.Admin]}>
                <Outlet />
              </RoleContainer>
            }
          >
            {/* CATEGORY ROUTES */}
            <Route path={CategoryRoutes.Index} element={<CategoryLayout />}>
              <Route index element={<CategoryOverviewScreen />} />
            </Route>
          </Route>
          {/* REST ROUTES */}
          <Route path="*" element={<Navigate to="/test" />} />
        </Route>
      </Routes>
    </AuthProvider>
  );
};

export default App;
