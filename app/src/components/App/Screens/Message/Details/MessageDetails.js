import { useTranslation } from "react-i18next";
import { useNavigate, useOutletContext } from "react-router-dom";
import { PropertyRoutes, route } from "../../../../../core/routing";
import Button from "../../../../Design/Button/Button";
import Container from "../../../../Design/Container/Container";
import MessagePropertyCard from "../../../../Design/Modules/Property/MessagePropertyCard";
import Col from "../../../../Design/Table/Col";
import Row from "../../../../Design/Table/Row";
import DeleteButton from "../../../Shared/Generic/Buttons/DeleteButton";

const MessageDetails = () => {
  const { t } = useTranslation();
  const { message, onDelete } = useOutletContext();
  const navigate = useNavigate();

  const handleClick = () => {
    navigate(route(PropertyRoutes.Detail, { id: message.property.id }));
  };

  return (
    <>
      <Container className="bg-white">
        <Row>
          <Col size="9">
            <h1>
              {message.sender.firstName} {message.sender.lastName}
            </h1>
            <h3>{message.sender.email}</h3>
            <h3>{message.sender.tel}</h3>
          </Col>
          <Col size="3" className="text-end">
            <Button>{t("messages.details.button")}</Button>
            <DeleteButton
              color="link"
              scope="messages"
              id={message.id}
              onSuccess={onDelete}
            ></DeleteButton>
          </Col>
        </Row>
        <hr></hr>
        <Row>
          <Col size="9">
            <p>{message.message}</p>
          </Col>
          <Col size="3">
            <MessagePropertyCard
              property={message.property}
              onClick={handleClick}
            />
          </Col>
        </Row>
      </Container>
    </>
  );
};

export default MessageDetails;
