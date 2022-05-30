import { Navigate, Route, Routes } from "react-router-dom";
import { AuthRoutes } from "../../core/routing";
import AppLayout from "./AppLayout";
import AuthContainer from "./Auth/AuthContainer";
import AuthProvider from "./Auth/AuthProvider";
import TestLayout from "./Auth/OnBoardingLayout";
import LoginScreen from "./Auth/login/LoginScreen";
import TestScreen from "./Screens/TestScreen";
import RegisterScreen from "./Auth/register/RegisterScreen";

const App = () => {
  return (
    <AuthProvider>
      <Routes>
        <Route path={AuthRoutes.Index} element={<TestLayout />}>
          <Route path={AuthRoutes.Login} element={<LoginScreen />} />
          <Route path={AuthRoutes.Register} element={<RegisterScreen />} />
          <Route path="*" element={<Navigate to={AuthRoutes.Login} />} />
        </Route>
        <Route
          element={
            <AuthContainer>
              <AppLayout />
            </AuthContainer>
          }
        >
          <Route path="/test" element={<TestScreen />} />
          <Route path="*" element={<Navigate to="/test" />} />
        </Route>
      </Routes>
    </AuthProvider>
  );
};

export default App;
