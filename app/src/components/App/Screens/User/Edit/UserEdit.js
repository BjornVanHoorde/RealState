import { useNavigate, useOutletContext } from "react-router-dom";
import useMutation from "../../../../../core/hooks/useMutation";
import { route, UserRoutes } from "../../../../../core/routing";
import Alert from "../../../../Design/Alert/Alert";
import Container from "../../../../Design/Container/Container";
import UserForm from "../../../Shared/User/Form/UserForm ";

const UserEdit = () => {
  const { user, onUpdate } = useOutletContext();
  const { isLoading, error, mutate } = useMutation();
  const navigate = useNavigate();

  const handleSubmit = (values) => {
    mutate(`${process.env.REACT_APP_API_URL}/users/${user.id}`, {
      method: 'PATCH',
      data: values,
      onSuccess: () => {
        onUpdate();
        navigate(route(UserRoutes.Detail, { id: user.id }));
      }
    })
  };

  return (
    <Container>
      {error && <Alert color="danger">{error}</Alert>}
      {user && <UserForm initialData={user} disabled={isLoading} onSubmit={handleSubmit} label="edit"/>}
    </Container>
  )
};

export default UserEdit;
