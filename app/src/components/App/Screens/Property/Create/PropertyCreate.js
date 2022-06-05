import { useTranslation } from "react-i18next";
import { useNavigate } from "react-router-dom";
import useMutation from "../../../../../core/hooks/useMutation";
import useTitle from "../../../../../core/hooks/useTitle";
import { isAdmin } from "../../../../../core/modules/users/utils";
import { PropertyRoutes, route } from "../../../../../core/routing";
import Alert from "../../../../Design/Alert/Alert";
import Container from "../../../../Design/Container/Container";
import { useUser } from "../../../Auth/AuthProvider";
import PropertyForm from "../../../Shared/Property/Form/PropertyForm";

const PropertyCreate = () => {
  const { t } = useTranslation();
  const navigate = useNavigate();
  const { isLoading, error, mutate } = useMutation();
  const user = useUser();

  useTitle(t("properties.create.title"));

  const handleSubmit = (propertyValues, addressValues) => {
    mutate(`${process.env.REACT_APP_API_URL}/addresses`, {
      method: "POST",
      data: addressValues,
      onSuccess: (result) => {
        propertyValues = { ...propertyValues, addressId: result.id };
        mutate(`${process.env.REACT_APP_API_URL}/properties`, {
          method: "POST",
          data: propertyValues,
          onSuccess: (result) => {
            // FIX LATER
            const photoValues = {
              propertyId: result.id,
              photos: [
                { path: "photo.png", alt: "photo.png" },
                { path: "photo.png", alt: "photo.png" },
              ],
            };
            mutate(`${process.env.REACT_APP_API_URL}/photos`, {
              method: "POST",
              data: photoValues,
              onSuccess: () => {
                navigate(route(PropertyRoutes.Index));
              },
            });
          },
        });
      },
    });
  };

  return (
    <Container>
      {error && <Alert color="danger">{error}</Alert>}
      <PropertyForm
        label="create"
        onSubmit={handleSubmit}
        disabled={isLoading}
        options={{
          showAgency: isAdmin(user)
        }}
      />
    </Container>
  );
};

export default PropertyCreate;
