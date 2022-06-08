import { useTranslation } from "react-i18next";
import useFetch from "../../../../../core/hooks/useFetch";
import useTitle from "../../../../../core/hooks/useTitle";
import { UserRoutes } from "../../../../../core/routing";
import Alert from "../../../../Design/Alert/Alert";
import Button from "../../../../Design/Button/Button";
import Container from "../../../../Design/Container/Container";
import TopBar from "../../../../Design/Container/TopBar";
import Title from "../../../../Design/Typography/Title";
import LoadingIndicator from "../../../Shared/Generic/LoadingIndicator/LoadingIndicator";
import UserGrid from "../../../Shared/User/Grid/UserGrid";

const UserOverview = () => {
  const { t } = useTranslation();
  const { isLoading, error, data: users, invalidate } = useFetch("/users");
  useTitle(t("users.title"));

  if (isLoading) {
    return <LoadingIndicator />;
  }

  if (error) {
    return <Alert color="danger">{error}</Alert>;
  }

  return (
    <Container>
      <TopBar>
        <Title>{t("users.title")}</Title>
        <Button href={UserRoutes.Create}>{t("users.create.title")}</Button>
      </TopBar>
      <UserGrid users={users} onRefresh={invalidate} disabled={isLoading} />
    </Container>
  );
};

export default UserOverview;
