import { Navigate, Outlet, Route, Routes } from "react-router-dom";
import { AuthRoutes, CategoryRoutes, UserRoutes } from "../../core/routing";
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
import UserLayout from "./Screens/User/UserLayout";
import UserOverview from "./Screens/User/Overview/UserOverview";
import UserCreate from "./Screens/User/Create/UserCreate";
import UserDetailsLayout from "./Screens/User/Details/UserDetailsLayout";
import UserDetails from "./Screens/User/Details/UserDetails";
import UserEdit from "./Screens/User/Edit/UserEdit";

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
            {/* USERS ROUTES */}
            <Route path={UserRoutes.Index} element={<UserLayout />}>
              <Route index element={<UserOverview />} />
              <Route path={UserRoutes.Add} element={<UserCreate />} />
              <Route path={UserRoutes.Detail} element={<UserDetailsLayout />}>
                <Route index element={<UserDetails />} />
                <Route path={UserRoutes.Edit} element={<UserEdit />} />
              </Route>
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
