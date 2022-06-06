import { useTranslation } from "react-i18next";
import { useNavigate } from "react-router-dom";
import useMutation from "../../../../../core/hooks/useMutation";
import useTitle from "../../../../../core/hooks/useTitle";
import { AgencyRoutes, route } from "../../../../../core/routing";
import Alert from "../../../../Design/Alert/Alert";
import Container from "../../../../Design/Container/Container";
import AgencyForm from "../../../Shared/Agency/Form/AgencyForm";

const AgencyCreate = () => {
  const { t } = useTranslation();
  const navigate = useNavigate();
  const { isLoading, error, mutate } = useMutation();

  useTitle(t("agencies.create.title"));

  const handleSubmit = (agencyValues, addressValues) => {
    console.log(agencyValues);
    mutate(`${process.env.REACT_APP_API_URL}/addresses`, {
      method: "POST",
      data: addressValues,
      onSuccess: (result) => {
        agencyValues = { ...agencyValues, addressId: result.id };
        mutate(`${process.env.REACT_APP_API_URL}/agencies`, {
          method: "POST",
          data: agencyValues,
          multipart: true,
          onSuccess: () => {
            navigate(route(AgencyRoutes.Index));
          },
        });
      },
    });
  };

  return (
    <Container>
      {error && <Alert color="danger">{error}</Alert>}
      <AgencyForm label="create" onSubmit={handleSubmit} disabled={isLoading} />
    </Container>
  );
};

export default AgencyCreate;
