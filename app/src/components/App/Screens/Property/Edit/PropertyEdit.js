import { useTranslation } from "react-i18next";
import { useNavigate, useOutletContext } from "react-router-dom";
import useMutation from "../../../../../core/hooks/useMutation";
import useTitle from "../../../../../core/hooks/useTitle";
import { PropertyRoutes, route } from "../../../../../core/routing";
import Alert from "../../../../Design/Alert/Alert";
import Container from "../../../../Design/Container/Container";
import PropertyForm from "../../../Shared/Property/Form/PropertyForm";

const PropertyEdit = () => {
  const { t } = useTranslation();
  const { property, onUpdate } = useOutletContext();
  const { isLoading, error, mutate } = useMutation();
  const navigate = useNavigate();

  useTitle(t("properties.edit.title"));

  const handleSubmit = (propertyValues, addressValues) => {
    mutate(
      `${process.env.REACT_APP_API_URL}/addresses/${propertyValues.addressId}`,
      {
        method: "PATCH",
        data: addressValues,
        onSuccess: (result) => {
          propertyValues = { ...propertyValues, addressId: result.id };
          mutate(`${process.env.REACT_APP_API_URL}/properties/${property.id}`, {
            method: "PATCH",
            data: propertyValues,
            onSuccess: () => {
              onUpdate();
              navigate(route(PropertyRoutes.Detail, { id: property.id }));
              //TODO edit/delete photos
            },
          });
        },
      }
    );
  };

  return (
    <Container>
      {error && <Alert color="danger">{error}</Alert>}
      {property && (
        <PropertyForm
          label="edit"
          initialData={property}
          disabled={isLoading}
          onSubmit={handleSubmit}
        />
      )}
    </Container>
  );
};

export default PropertyEdit;
