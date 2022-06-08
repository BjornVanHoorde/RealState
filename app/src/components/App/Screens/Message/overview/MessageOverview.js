import { useTranslation } from "react-i18next";
import useFetch from "../../../../../core/hooks/useFetch";
import useTitle from "../../../../../core/hooks/useTitle";
import Alert from "../../../../Design/Alert/Alert";
import Container from "../../../../Design/Container/Container";
import LoadingIndicator from "../../../Shared/Generic/LoadingIndicator/LoadingIndicator";
import MessageList from "../../../Shared/Message/List/MessageList";

const MessageOverview = () => {
  const { t } = useTranslation();
  const {
    isLoading,
    error,
    data: messages,
    invalidate,
  } = useFetch("/messages");

  useTitle(t("messages.title"));
  
  if (isLoading) {
    return <LoadingIndicator />;
  }

  if (error) {
    return <Alert color="danger">{error}</Alert>;
  }

  return (
    <Container>
      <MessageList messages={messages} onDelete={invalidate}/>
      {messages.length <= 0 && <h2>{t("messages.none")}</h2>}
    </Container>
  )
};

export default MessageOverview;
