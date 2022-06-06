import { useNavigate, useOutletContext } from "react-router-dom";
import useMutation from "../../../../../core/hooks/useMutation";
import { ProfileRoutes } from "../../../../../core/routing";
import Alert from "../../../../Design/Alert/Alert";
import Container from "../../../../Design/Container/Container";
import UserForm from "../../../Shared/User/Form/UserForm ";

const ProfileEdit = () => {
  const { user, onUpdate } = useOutletContext();
  const navigate = useNavigate();
  const { isLoading, error, mutate } = useMutation();

  const handleSubmit = (values) => {
    mutate(`${process.env.REACT_APP_API_URL}/users/${user.id}`, {
      method: "PATCH",
      data: values,
      multipart: true,
      onSuccess: () => {
        onUpdate();
        navigate(ProfileRoutes.Index);
      },
    });
  };

  return (
    <Container>
      {error && <Alert color="danger">{error}</Alert>}
      <UserForm
        initialData={user}
        disabled={isLoading}
        label="edit"
        onSubmit={handleSubmit}
        options={{
          showAgency: false,
        }}
      />
    </Container>
  );
};

export default ProfileEdit;
