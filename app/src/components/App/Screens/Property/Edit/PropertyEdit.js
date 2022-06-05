import { useTranslation } from "react-i18next";
import { useNavigate, useOutletContext } from "react-router-dom";
import useMutation from "../../../../../core/hooks/useMutation";
import useTitle from "../../../../../core/hooks/useTitle";
import Alert from "../../../../Design/Alert/Alert";
import Container from "../../../../Design/Container/Container";
import PropertyForm from "../../../Shared/Property/Form/PropertyForm";

const PropertyEdit = () => {
  const { t } = useTranslation();
  const { property, onUpdate } = useOutletContext();
  const { isLoading, error, mutate } = useMutation();
  const navigate = useNavigate();

  useTitle(t("properties.edit.title"));

  const handleSubmit = (values) => {};

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
