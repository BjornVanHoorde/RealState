import { useTranslation } from "react-i18next";
import useFetch from "../../../../../core/hooks/useFetch";
import useTitle from "../../../../../core/hooks/useTitle";
import { AgencyRoutes } from "../../../../../core/routing";
import Alert from "../../../../Design/Alert/Alert";
import Button from "../../../../Design/Button/Button";
import Container from "../../../../Design/Container/Container";
import TopBar from "../../../../Design/Container/TopBar";
import Title from "../../../../Design/Typography/Title";
import AgencyGrid from "../../../Shared/Agency/Grid/AgencyGrid";
import LoadingIndicator from "../../../Shared/Generic/LoadingIndicator/LoadingIndicator";

const AgencyOverview = () => {
  const { t } = useTranslation();
  const {
    error,
    isLoading,
    invalidate,
    data: agencies,
  } = useFetch("/agencies");

  useTitle(t("agencies.title"));

  if (isLoading) {
    return <LoadingIndicator />;
  }

  if (error) {
    return <Alert color="danger">{error}</Alert>;
  }

  return (
    <Container>
      <TopBar>
        <Title>{t("agencies.title")}</Title>
        <Button href={AgencyRoutes.Create}>{t("agencies.create.title")}</Button>
      </TopBar>
      <AgencyGrid
        agencies={agencies}
        onRefresh={invalidate}
        disabled={isLoading}
      />
      {agencies.length <= 0 && <h2>{t("agencies.none")}</h2>}
    </Container>
  );
};

export default AgencyOverview;
