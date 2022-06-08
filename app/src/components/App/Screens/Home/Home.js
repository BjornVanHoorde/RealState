import { useTranslation } from "react-i18next";
import { getImagePath } from "../../../../core/helpers/api";
import { PropertyRoutes } from "../../../../core/routing";
import Button from "../../../Design/Button/Button";
import Container from "../../../Design/Container/Container";
import Col from "../../../Design/Table/Col";
import Row from "../../../Design/Table/Row";

const Home = () => {
  const { t } = useTranslation();

  return (
    <Row>
      <Col size="6">
        <Container>
          <img
            style={{ width: "100%" }}
            src={getImagePath("public/images/RealStateBig.png")}
            alt="RealState.png"
          />
        </Container>
      </Col>
      <Col size="6">
        <h1>RealState</h1>
        <hr></hr>
        <h5>{t("home.description")}</h5>
        <h3>{t("home.action")}</h3>
        <Button href={PropertyRoutes.Index}>{t("home.button")}</Button>
      </Col>
    </Row>
  );
};

export default Home;
