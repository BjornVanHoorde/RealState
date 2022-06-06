import { useTranslation } from "react-i18next";
import { Outlet, useNavigate, useParams } from "react-router-dom";
import useFetch from "../../../../../core/hooks/useFetch";
import useTitle from "../../../../../core/hooks/useTitle";
import { MessageRoutes } from "../../../../../core/routing";
import Alert from "../../../../Design/Alert/Alert";
import { useUser } from "../../../Auth/AuthProvider";
import LoadingIndicator from "../../../Shared/Generic/LoadingIndicator/LoadingIndicator";

const MessageDetailsLayout = () => {
  const { id } = useParams();
  const {
    isLoading,
    error,
    data: message,
  } = useFetch(`/messages/${id}`);
  const navigate = useNavigate();
  const { t } = useTranslation();
  const user = useUser();

  useTitle(t("messages.details.title"));

  const handleDelete = () => {
    navigate(MessageRoutes.Index);
  };

  if (isLoading) {
    return <LoadingIndicator />;
  }

  if (error) {
    return <Alert color="danger">{error}</Alert>;
  }

  if (message.receiver.id !== user.agency.id) {
    navigate(MessageRoutes.Index);
  }

  return (
    <>
      <Outlet
        context={{
          message,
          onDelete: handleDelete,
        }}
      />
    </>
  );
};

export default MessageDetailsLayout;
