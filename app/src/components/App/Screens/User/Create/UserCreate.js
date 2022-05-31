import { useTranslation } from "react-i18next";
import { useNavigate } from "react-router-dom";
import useMutation from "../../../../../core/hooks/useMutation";
import useTitle from "../../../../../core/hooks/useTitle";
import { UserRoutes } from "../../../../../core/routing";
import Alert from "../../../../Design/Alert/Alert";
import Container from "../../../../Design/Container/Container";
import UserForm from "../../../Shared/User/Form/UserForm ";

const UserCreate = () => {
  const { t } = useTranslation();
  const navigate = useNavigate();
  useTitle(t("users.create.title"));

  const { isLoading, error, mutate } = useMutation();

  const handleSubmit = (values) => {
    mutate(`${process.env.REACT_APP_API_URL}/users`, {
      method: "POST",
      data: values,
      onSuccess: () => {
        navigate(UserRoutes.Index);
      },
    });
  };

  return (
    <Container>
      {error && <Alert color="danger">{error}</Alert>}
      <UserForm label="create" onSubmit={handleSubmit} disabled={isLoading} />
    </Container>
  );
};

export default UserCreate;
