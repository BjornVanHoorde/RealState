import { useTranslation } from "react-i18next";
import { useNavigate } from "react-router-dom";
import useFetch from "../../../../../core/hooks/useFetch";
import useTitle from "../../../../../core/hooks/useTitle";
import { MessageRoutes } from "../../../../../core/routing";
import Alert from "../../../../Design/Alert/Alert";
import Container from "../../../../Design/Container/Container";
import LoadingIndicator from "../../../Shared/Generic/LoadingIndicator/LoadingIndicator";
import MessageList from "../../../Shared/Message/List/MessageList";

const MessageOverview = () => {
  const { t } = useTranslation();
  const navigate = useNavigate();
  const {
    isLoading,
    error,
    data: messages,
    invalidate,
  } = useFetch("/messages");

  useTitle(t("messages.title"));

  const handleRefresh = () => {
    navigate(MessageRoutes.Index);
    invalidate();
  };

  if (isLoading) {
    return <LoadingIndicator />;
  }

  if (error) {
    return <Alert color="danger">{error}</Alert>;
  }

  return (
    <Container>
      <MessageList messages={messages} onDelete={handleRefresh} />
      {messages.length <= 0 && <h2 className="text-center">{t("messages.none")}</h2>}
    </Container>
  );
};

export default MessageOverview;
