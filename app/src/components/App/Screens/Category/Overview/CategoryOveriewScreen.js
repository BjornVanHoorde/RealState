import { useTranslation } from "react-i18next";
import useTitle from "../../../../../core/hooks/useTitle";
import Button from "../../../../Design/Button/Button";
import Container from "../../../../Design/Container/Container";
import TopBar from "../../../../Design/Container/TopBar";
import Title from "../../../../Design/Typography/Title";

const CategoryOverviewScreen = () => {
  const { t } = useTranslation();
  useTitle(t("categories.title"));

  return (
    <Container>
      <TopBar>
        <Title>{t("categories.title")}</Title>
        <Button>
          {t("categories.add")}
        </Button>
      </TopBar>
    </Container>
  );
};

export default CategoryOverviewScreen;
