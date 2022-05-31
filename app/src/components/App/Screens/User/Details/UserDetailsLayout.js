import { Outlet, useNavigate, useParams } from "react-router-dom";
import useFetch from "../../../../../core/hooks/useFetch";
import useTitle from "../../../../../core/hooks/useTitle";
import { UserRoutes } from "../../../../../core/routing";
import Alert from "../../../../Design/Alert/Alert";
import LoadingIndicator from "../../../Shared/Generic/LoadingIndicator/LoadingIndicator";

const UserDetailsLayout = () => {
  const { id } = useParams();
  const { isLoading, error, data: user, invalidate } = useFetch(`/users/${id}`);
  useTitle(user ? `${user.firstName} ${user.lastName}` : "");
  const navigate = useNavigate();

  const handleUpdate = () => {
    invalidate();
  }

  const handleDelete = () => {
    navigate(UserRoutes.Index);
  }

  if (error) {
    return <Alert color="danger">{error}</Alert>
  }

  if (isLoading) {
    return <LoadingIndicator />
  }

  return <Outlet context={{ user, onUpdate: handleUpdate, onDelete: handleDelete }} />
};

export default UserDetailsLayout;
