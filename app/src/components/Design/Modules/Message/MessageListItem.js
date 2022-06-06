import { messageStatusses } from "../../../../core/modules/messages/Constants";
import DeleteButton from "../../../App/Shared/Generic/Buttons/DeleteButton";
import Container from "../../Container/Container";
import Col from "../../Table/Col";
import Row from "../../Table/Row";

const MessageListItem = ({ message, onDelete, onClick }) => {
  return (
    <Container
      onClick={() => onClick(message.id)}
      className={`bg-white mt-3 ${
        message.status === messageStatusses.unread
          ? "border border-dark shadow"
          : ""
      }`}
    >
      <Row>
        <Col size="3">
          <h4>
            {message.sender.firstName} {message.sender.lastName}
          </h4>
        </Col>
        <Col size="7">
          <p>{message.message.slice(0, 20)}...</p>
        </Col>
        <Col size="2" className="text-end">
          <DeleteButton
            color="link"
            scope="messages"
            id={message.id}
            onSuccess={onDelete}
          ></DeleteButton>
        </Col>
      </Row>
    </Container>
  );
};

export default MessageListItem;
