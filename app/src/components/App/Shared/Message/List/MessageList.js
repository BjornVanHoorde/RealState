import { useNavigate } from "react-router-dom";
import useMutation from "../../../../../core/hooks/useMutation";
import { messageStatusses } from "../../../../../core/modules/messages/Constants";
import { MessageRoutes, route } from "../../../../../core/routing";
import MessageListItem from "../../../../Design/Modules/Message/MessageListItem";

const MessageList = ({ messages, onDelete }) => {
  const navigate = useNavigate();
  const { mutate } = useMutation();

  const handleClick = (id) => {
    mutate(`${process.env.REACT_APP_API_URL}/messages/${id}`, {
      method: "PATCH",
      data: { status: messageStatusses.read },
      onSuccess: () => {
        navigate(route(MessageRoutes.Detail, { id }));
      },
    });
  };

  return (
    <>
      {messages.map((message) => (
        <MessageListItem
          key={message.id}
          message={message}
          onDelete={onDelete}
          onClick={handleClick}
        />
      ))}
    </>
  );
};

export default MessageList;
