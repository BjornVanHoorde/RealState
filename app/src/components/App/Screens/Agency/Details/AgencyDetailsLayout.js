import { Outlet, useNavigate, useParams } from "react-router-dom";
import useFetch from "../../../../../core/hooks/useFetch";
import { AgencyRoutes } from "../../../../../core/routing";
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

  const handleUpdate = () => {
    invalidate();
  };

  const handleDelete = () => {
    navigate(AgencyRoutes.Index);
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
          onUpdate: handleUpdate,
          onDelete: handleDelete,
        }}
      />
    </>
  );
};

export default AgencyDetailsLayout;
