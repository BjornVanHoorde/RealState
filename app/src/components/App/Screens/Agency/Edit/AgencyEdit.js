import { useNavigate, useOutletContext } from "react-router-dom";
import useMutation from "../../../../../core/hooks/useMutation";
import { AgencyRoutes, route } from "../../../../../core/routing";
import Alert from "../../../../Design/Alert/Alert";
import Container from "../../../../Design/Container/Container";
import AgencyForm from "../../../Shared/Agency/Form/AgencyForm";

const AgencyEdit = () => {
  const { agency, onUpdate } = useOutletContext();
  const { isLoading, error, mutate } = useMutation();
  const navigate = useNavigate();

  const handleSubmit = (agencyValues, addressValues) => {
    mutate(`${process.env.REACT_APP_API_URL}/addresses/${agencyValues.addressId}`, {
      method: "PATCH",
      data: addressValues,
      onSuccess: (result) => {
        agencyValues = { ...agencyValues, addressId: result.id };
        mutate(`${process.env.REACT_APP_API_URL}/agencies/${agency.id}`, {
          method: "PATCH",
          data: agencyValues,
          onSuccess: () => {
            onUpdate();
            navigate(route(AgencyRoutes.Detail, { id: agency.id }));
          },
        });
      },
    });
  };

  return (
    <Container>
      {error && <Alert color="danger">{error}</Alert>}
      {agency && (
        <AgencyForm
          initialData={agency}
          disabled={isLoading}
          onSubmit={handleSubmit}
          label="edit"
        />
      )}
    </Container>
  );
};

export default AgencyEdit;
