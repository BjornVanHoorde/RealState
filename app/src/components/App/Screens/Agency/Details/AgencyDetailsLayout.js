import { Outlet, useNavigate, useParams } from "react-router-dom";
import useFetch from "../../../../../core/hooks/useFetch";
import { AgencyRoutes, route } from "../../../../../core/routing";
import Alert from "../../../../Design/Alert/Alert";
import LoadingIndicator from "../../../Shared/Generic/LoadingIndicator/LoadingIndicator";

const AgencyDetailsLayout = () => {
  const { id } = useParams();
  const {
    isLoading,
    error,
    data: agency,
    invalidate,
  } = useFetch(`/agencies/${id}`);
  const navigate = useNavigate();

  const handleEditClick = () => {
    navigate(route(AgencyRoutes.Edit, { id: agency.id }))
  };

  const handleCreateUserClick = () => {
    navigate(route(AgencyRoutes.CreateUser, { id: agency.id }))
  };

  const handleUpdate = () => {
    invalidate();
  };

  const handleDelete = () => {
    navigate(AgencyRoutes.Index)
  };

  if (isLoading) {
    return <LoadingIndicator />;
  }

  if (error) {
    return <Alert color="danger">{error}</Alert>;
  }

  return (
    <>
      <Outlet
        context={{
          agency,
          onEditClick: handleEditClick,
          onCreateUserClick: handleCreateUserClick,
          onUpdate: handleUpdate,
          onDelete: handleDelete,
        }}
      />
    </>
  );
};

export default AgencyDetailsLayout;
