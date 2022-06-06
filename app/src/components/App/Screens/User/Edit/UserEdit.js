import { useTranslation } from "react-i18next";
import { useNavigate, useOutletContext } from "react-router-dom";
import useMutation from "../../../../../core/hooks/useMutation";
import useTitle from "../../../../../core/hooks/useTitle";
import { isAdmin } from "../../../../../core/modules/users/utils";
import { route, UserRoutes } from "../../../../../core/routing";
import Alert from "../../../../Design/Alert/Alert";
import Container from "../../../../Design/Container/Container";
import { useUser } from "../../../Auth/AuthProvider";
import UserForm from "../../../Shared/User/Form/UserForm ";

const UserEdit = () => {
  const { t } = useTranslation();
  const { user, onUpdate } = useOutletContext();
  const { isLoading, error, mutate } = useMutation();
  const navigate = useNavigate();
  const currentUser = useUser()

  useTitle(t("users.edit.title"));

  const handleSubmit = (values) => {
    mutate(`${process.env.REACT_APP_API_URL}/users/${user.id}`, {
      method: "PATCH",
      data: values,
      multipart: true,
      onSuccess: () => {
        onUpdate();
        navigate(route(UserRoutes.Detail, { id: user.id }));
      },
    });
  };

  return (
    <Container>
      {error && <Alert color="danger">{error}</Alert>}
      {user && (
        <UserForm
          initialData={user}
          disabled={isLoading}
          onSubmit={handleSubmit}
          label="edit"
          options={{
            showAgency: isAdmin(currentUser),
          }}
        />
      )}
    </Container>
  );
};

export default UserEdit;
