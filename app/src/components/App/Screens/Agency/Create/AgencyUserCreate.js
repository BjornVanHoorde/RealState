import { useTranslation } from "react-i18next";
import { useNavigate, useOutletContext } from "react-router-dom";
import useMutation from "../../../../../core/hooks/useMutation";
import useTitle from "../../../../../core/hooks/useTitle";
import { isAdmin } from "../../../../../core/modules/users/utils";
import { AgencyRoutes, route } from "../../../../../core/routing";
import Alert from "../../../../Design/Alert/Alert";
import Container from "../../../../Design/Container/Container";
import { useUser } from "../../../Auth/AuthProvider";
import UserForm from "../../../Shared/User/Form/UserForm ";

const AgencyUserCreate = () => {
  const { t } = useTranslation();
  const navigate = useNavigate();
  const { agency } = useOutletContext();
  const { error, isLoading, mutate } = useMutation();
  const user = useUser();

  useTitle(t("agencies.users.create"));

  const handleSubmit = (values) => {
    mutate(`${process.env.REACT_APP_API_URL}/users`, {
      method: "POST",
      data: values,
      onSuccess: () => {
        navigate(route(AgencyRoutes.Detail, { id: agency.id }));
      },
    });
  };

  const transformData = (data) => {
    if (data.id) {
      data = { agencyId: data.id };
    }
    return data;
  };

  return (
    <Container>
      {error && <Alert color="danger">{error}</Alert>}
      {agency && (
        <UserForm
          label="create"
          onSubmit={handleSubmit}
          disabled={isLoading}
          initialData={transformData(agency)}
          options={{
            showAgency: isAdmin(user),
          }}
        />
      )}
    </Container>
  );
};

export default AgencyUserCreate;
