import { Navigate, Outlet, Route, Routes } from "react-router-dom";
import { AgencyRoutes, AuthRoutes, CategoryRoutes, FavoriteRoutes, MessageRoutes, ProfileRoutes, PropertyRoutes, UserRoutes } from "../../core/routing";
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
import AgencyLayout from "./Screens/Agency/AgencyLayout";
import AgencyOverview from "./Screens/Agency/Overview/AgencyOverview";
import AgencyCreate from "./Screens/Agency/Create/AgencyCreate";
import AgencyDetailsLayout from "./Screens/Agency/Details/AgencyDetailsLayout";
import AgencyDetails from "./Screens/Agency/Details/AgencyDetails";
import AgencyEdit from "./Screens/Agency/Edit/AgencyEdit";
import AgencyUserCreate from "./Screens/Agency/Create/AgencyUserCreate";
import PropertyLayout from "./Screens/Property/PropertyLayout";
import PropertyOverview from "./Screens/Property/Overview/PropertyOverview";
import PropertyDetailsLayout from "./Screens/Property/Details/PropertyDetailsLayout";
import PropertyDetails from "./Screens/Property/Details/PropertyDetails";
import PropertyCreate from "./Screens/Property/Create/PropertyCreate";
import PropertyEdit from "./Screens/Property/Edit/PropertyEdit";
import ProfileLayout from "./Screens/Profile/ProfileLayout";
import ProfileDetails from "./Screens/Profile/Details/ProfileDetails";
import MessageLayout from "./Screens/Message/MessageLayout";
import MessageOverview from "./Screens/Message/overview/MessageOverview";
import MessageDetailsLayout from "./Screens/Message/Details/MessageDetailsLayout";
import MessageDetails from "./Screens/Message/Details/MessageDetails";
import Favoritelayout from "./Screens/Favorite/FavoriteLayout";
import FavoriteOverview from "./Screens/Favorite/overview/FavoriteOverview";

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
          {/* GENERAL ROUTES */}
          {/* PROFILE ROUTES */}
          <Route path={ProfileRoutes.Index} element={<ProfileLayout />}>
            <Route index element={<ProfileDetails />} />
          </Route>
          {/* USER ROUTES */}
          <Route
            element={
              <RoleContainer roles={[userRoles.User]}>
                <Outlet />
              </RoleContainer>
            }
          >
            {/* AGENCY ROUTES */}
            <Route path={AgencyRoutes.Index} element={<AgencyLayout />}>
              <Route path={AgencyRoutes.Detail} element={<AgencyDetailsLayout />}>
                <Route index element={<AgencyDetails />} />
              </Route>
            </Route>
            {/* PROPERTY ROUTES */}
            <Route path={PropertyRoutes.Index} element={<PropertyLayout />}>
              <Route index element={<PropertyOverview />} />
              <Route path={PropertyRoutes.Detail} element={<PropertyDetailsLayout />}>
                <Route index element={<PropertyDetails />} />
              </Route>
            </Route>
            {/* FAVORITE ROUTES */}
            <Route path={FavoriteRoutes.Index} element={<Favoritelayout />}>
              <Route index element={<FavoriteOverview />} />
            </Route>
          </Route>
          {/* AGENT ROUTES */}
          <Route
            element={
              <RoleContainer roles={[userRoles.Agent]}>
                <Outlet />
              </RoleContainer>
            }
          >
            {/* AGENCY ROUTES */}
            <Route path={AgencyRoutes.Index} element={<AgencyLayout />}>
              <Route path={AgencyRoutes.Detail} element={<AgencyDetailsLayout />}>
                <Route index element={<AgencyDetails />} />
                <Route path={AgencyRoutes.Edit} element={<AgencyEdit />} />
                <Route path={AgencyRoutes.CreateUser} element={<AgencyUserCreate />} />
              </Route>
            </Route>
            {/* PROPERTY ROUTES */}
            <Route path={PropertyRoutes.Index} element={<PropertyLayout />}>
              <Route index element={<PropertyOverview />} />
              <Route path={PropertyRoutes.Create} element={<PropertyCreate />} />
              <Route path={PropertyRoutes.Detail} element={<PropertyDetailsLayout />}>
                <Route index element={<PropertyDetails />} />
                <Route path={PropertyRoutes.Edit} element={<PropertyEdit />} />
              </Route>
            </Route>
            {/* MESSAGE ROUTES */}
            <Route path={MessageRoutes.Index} element={<MessageLayout />}>
              <Route index element={<MessageOverview />} />
              <Route path={MessageRoutes.Detail} element={<MessageDetailsLayout />}>
                <Route index element={<MessageDetails />} />
              </Route>
            </Route>
          </Route>
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
              <Route path={UserRoutes.Create} element={<UserCreate />} />
              <Route path={UserRoutes.Detail} element={<UserDetailsLayout />}>
                <Route index element={<UserDetails />} />
                <Route path={UserRoutes.Edit} element={<UserEdit />} />
              </Route>
            </Route>
            {/* AGENCY ROUTES */}
            <Route path={AgencyRoutes.Index} element={<AgencyLayout />}>
              <Route index element={<AgencyOverview />} />
              <Route path={AgencyRoutes.Create} element={<AgencyCreate />} />
              <Route path={AgencyRoutes.Detail} element={<AgencyDetailsLayout />}>
                <Route index element={<AgencyDetails />} />
                <Route path={AgencyRoutes.Edit} element={<AgencyEdit />} />
                <Route path={AgencyRoutes.CreateUser} element={<AgencyUserCreate />} />
              </Route>
            </Route>
            {/* PROPERTY ROUTES */}
            <Route path={PropertyRoutes.Index} element={<PropertyLayout />}>
              <Route index element={<PropertyOverview />} />
              <Route path={PropertyRoutes.Create} element={<PropertyCreate />} />
              <Route path={PropertyRoutes.Detail} element={<PropertyDetailsLayout />}>
                <Route index element={<PropertyDetails />} />
                <Route path={PropertyRoutes.Edit} element={<PropertyEdit />} />
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
