import { useTranslation } from "react-i18next";
import { FaUserCircle } from "react-icons/fa";
import { useLocation, useNavigate } from "react-router-dom";
import { getImagePath } from "../../../../../core/helpers/api";
import {
  isAdmin,
  isAgent,
  isUser,
} from "../../../../../core/modules/users/utils";
import {
  CategoryRoutes,
  FavoriteRoutes,
  MessageRoutes,
  PropertyRoutes,
  AgencyRoutes,
  UserRoutes,
  ProfileRoutes,
  route,
  HomeRoutes,
  AuthRoutes,
} from "../../../../../core/routing";
import Button from "../../../../Design/Button/Button";
import Container from "../../../../Design/Container/Container";
import NavBar from "../../../../Design/NavBar/NavBar";
import Col from "../../../../Design/Table/Col";
import Row from "../../../../Design/Table/Row";
import { useAuthContext, useUser } from "../../../Auth/AuthProvider";

const Header = () => {
  const { t } = useTranslation();
  const location = useLocation();
  const user = useUser();
  const { logout } = useAuthContext();
  const navigate = useNavigate();

  let items = [
    {
      href: PropertyRoutes.Index,
      isActive: location.pathname.includes(PropertyRoutes.Index),
      label: t("navigation.properties"),
    },
  ];

  if (isAdmin(user)) {
    items = [
      ...items,
      {
        href: AgencyRoutes.Index,
        isActive: location.pathname.includes(AgencyRoutes.Index),
        label: t("navigation.agencies"),
      },
      {
        href: UserRoutes.Index,
        isActive: location.pathname.includes(UserRoutes.Index),
        label: t("navigation.users"),
      },
      {
        href: CategoryRoutes.Index,
        isActive: location.pathname.includes(CategoryRoutes.Index),
        label: t("navigation.categories"),
      },
    ];
  }

  if (isAgent(user)) {
    items = [
      ...items,
      {
        href: route(AgencyRoutes.Detail, { id: user.agency.id }),
        isActive: location.pathname.includes(AgencyRoutes.Index),
        label: t("navigation.agency"),
      },
      {
        href: MessageRoutes.Index,
        isActive: location.pathname.includes(MessageRoutes.Index),
        label: t("navigation.messages"),
      },
    ];
  }

  if (isUser(user)) {
    items = [
      ...items,
      {
        href: FavoriteRoutes.Index,
        isActive: location.pathname.includes(FavoriteRoutes.Index),
        label: t("navigation.favorites"),
      },
    ];
  }

  return (
    <header className="bg-secondary px-5 py-2 mb-4 d-flex justify-content-between align-items-center text-white">
      <div className="brand">
        <Container onClick={() => navigate(HomeRoutes.Index)}>
          <img
            style={{ width: "10rem" }}
            src={getImagePath("public/images/RealState.png")}
            alt="RealState.png"
          />
        </Container>
      </div>
      <NavBar navItems={items} />
      <Row size="2">
        {user && (
          <>
            <Col>
              <Button color="danger" onClick={logout}>
                {t("header.logout")}
              </Button>
            </Col>
            <Col>
              <Button color="link" href={ProfileRoutes.Index}>
                <h2 className="ml-5 text-white">
                  <FaUserCircle />
                </h2>
              </Button>
            </Col>
          </>
        )}
        {!user && (
          <Col>
            <Button href={AuthRoutes.Login}>{t("header.login")}</Button>
          </Col>
        )}
      </Row>
    </header>
  );
};

export default Header;
