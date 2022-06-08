import { useTranslation } from "react-i18next";
import { useNavigate } from "react-router-dom";
import useFetch from "../../../../../core/hooks/useFetch";
import useTitle from "../../../../../core/hooks/useTitle";
import { isUser } from "../../../../../core/modules/users/utils";
import { PropertyRoutes } from "../../../../../core/routing";
import Alert from "../../../../Design/Alert/Alert";
import Button from "../../../../Design/Button/Button";
import Container from "../../../../Design/Container/Container";
import TopBar from "../../../../Design/Container/TopBar";
import Title from "../../../../Design/Typography/Title";
import { useUser } from "../../../Auth/AuthProvider";
import LoadingIndicator from "../../../Shared/Generic/LoadingIndicator/LoadingIndicator";
import PropertyGrid from "../../../Shared/Property/Grid/PropertyGrid";

const PropertyOverview = () => {
  const { t } = useTranslation();
  const {
    isLoading,
    error,
    data: properties,
    invalidate,
  } = useFetch("/properties");
  const user = useUser();
  const navigate = useNavigate();

  useTitle(t("properties.title"));

  const handleRefresh = () => {
    navigate(PropertyRoutes.Index);
    invalidate();
  };

  if (isLoading) {
    return <LoadingIndicator />;
  }

  if (error) {
    return <Alert color="danger">{error}</Alert>;
  }

  return (
    <Container>
      <TopBar>
        <Title>{t("properties.title")}</Title>
        {!isUser(user) && user && (
          <Button href={PropertyRoutes.Create}>
            {t("properties.create.title")}
          </Button>
        )}
      </TopBar>
      <PropertyGrid
        properties={properties}
        onRefresh={handleRefresh}
        disabled={isLoading}
      />
      {properties.length <= 0 && <h2>{t("properties.none")}</h2>}
    </Container>
  );
};

export default PropertyOverview;
