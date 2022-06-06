import { Outlet } from "react-router-dom";
import Container from "../Design/Container/Container";
import Header from "./Shared/Generic/Header/Header";

const GuestAppLayout = () => {
  return (
    <>
      <Header />
      <Container>
        <Outlet />
      </Container>
    </>
  );
};

export default GuestAppLayout;
