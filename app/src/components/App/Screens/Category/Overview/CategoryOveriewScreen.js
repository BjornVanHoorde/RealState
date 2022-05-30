import { useTranslation } from "react-i18next";
import useFetch from "../../../../../core/hooks/useFetch";
import useTitle from "../../../../../core/hooks/useTitle";
import { CategoryRoutes } from "../../../../../core/routing";
import Alert from "../../../../Design/Alert/Alert";
import Button from "../../../../Design/Button/Button";
import Container from "../../../../Design/Container/Container";
import TopBar from "../../../../Design/Container/TopBar";
import Row from "../../../../Design/Table/Row";
import Title from "../../../../Design/Typography/Title";
import CategoryCard from "../../../Shared/Category/CategoryCard";
import LoadingIndicator from "../../../Shared/Generic/LoadingIndicator/LoadingIndicator";

const CategoryOverviewScreen = () => {
  const { t } = useTranslation();
  const { isLoading, data: categories, error } = useFetch("/categories");
  useTitle(t("categories.title"));

  if (isLoading) {
    return <LoadingIndicator />;
  }
  if (error) {
    return <Alert color="danger">{error}</Alert>;
  }

  return (
    <Container>
      <TopBar>
        <Title>{t("categories.title")}</Title>
        <Button href={CategoryRoutes.Add}>{t("categories.add")}</Button>
      </TopBar>
      <Row gutter="3" className="justify-content-center mt-3">
        {categories.map((category) => (
          <CategoryCard category={category.name} />
        ))}
      </Row>
    </Container>
  );
};

export default CategoryOverviewScreen;
