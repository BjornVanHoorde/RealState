import { useTranslation } from "react-i18next";
import { Outlet, useNavigate, useParams } from "react-router-dom";
import useFetch from "../../../../../core/hooks/useFetch";
import useTitle from "../../../../../core/hooks/useTitle";
import { PropertyRoutes, route } from "../../../../../core/routing";
import Alert from "../../../../Design/Alert/Alert";
import LoadingIndicator from "../../../Shared/Generic/LoadingIndicator/LoadingIndicator";

const PropertyDetailsLayout = () => {
  const { id } = useParams();
  const {
    isLoading,
    error,
    data: property,
    invalidate,
  } = useFetch(`/properties/${id}`);
  const navigate = useNavigate();
  const { t } = useTranslation();

  useTitle(t("properties.details.title"));

  const handleEditClick = () => {
    navigate(route(PropertyRoutes.Edit, { id: property.id }));
  };

  const handleUpdate = () => {
    invalidate();
  };

  const handleDelete = () => {
    navigate(PropertyRoutes.Index);
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
          property,
          onEditClick: handleEditClick,
          onUpdate: handleUpdate,
          onDelete: handleDelete,
        }}
      />
    </>
  );
};

export default PropertyDetailsLayout;
