import { useTranslation } from "react-i18next";
import { useNavigate, useOutletContext } from "react-router-dom";
import useMutation from "../../../../../core/hooks/useMutation";
import useTitle from "../../../../../core/hooks/useTitle";
import { isAdmin } from "../../../../../core/modules/users/utils";
import { PropertyRoutes, route } from "../../../../../core/routing";
import Alert from "../../../../Design/Alert/Alert";
import Container from "../../../../Design/Container/Container";
import { useUser } from "../../../Auth/AuthProvider";
import PropertyForm from "../../../Shared/Property/Form/PropertyForm";

const PropertyEdit = () => {
  const { t } = useTranslation();
  const { property, onUpdate } = useOutletContext();
  const { isLoading, error, mutate } = useMutation();
  const navigate = useNavigate();
  const user = useUser();

  useTitle(t("properties.edit.title"));

  const handleSubmit = (propertyValues, addressValues, photo) => {
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
            onSuccess: (result) => {
              mutate(`${process.env.REACT_APP_API_URL}/photos`, {
                method: "POST",
                data: { ...photo, propertyId: result.id },
                multipart: true,
                onSuccess: () => {
                  onUpdate();
                  navigate(route(PropertyRoutes.Detail, { id: property.id }));
                },
              });
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
          options={{
            showAgency: isAdmin(user),
          }}
        />
      )}
    </Container>
  );
};

export default PropertyEdit;
