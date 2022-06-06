import MessageListItem from "../../../../Design/Modules/Message/MessageListItem";

const MessageList = ({ messages, onDelete }) => {

  const handleClick = () => {
    
  }

  return (
    <>
      {messages.map((message) => (
        <MessageListItem message={message} onDelete={onDelete} onClick={handleClick} />
      ))}
    </>
  );
};

export default MessageList;
