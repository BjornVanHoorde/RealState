import { Link } from "react-router-dom";
import { route, UserRoutes } from "../../../../core/routing";
import DeleteButton from "../../../App/Shared/Generic/Buttons/DeleteButton";
import Container from "../../Container/Container";
import FlexContainer from "../../Container/FlexContainer";
import Col from "../../Table/Col";
import PropTypes from "prop-types";

const UserCard = ({ user, onDelete }) => {
  return (
    <Col size="4">
      <Container className="bg-white shadow">
        <FlexContainer content="between">
          <Link
            className="m-0 p-2"
            to={route(UserRoutes.Detail, {
              id: user.id,
            })}
          >{`${user.firstName} ${user.lastName}`}</Link>
          <DeleteButton
            scope="users"
            id={user.id}
            onSuccess={onDelete}
            color="link"
          />
        </FlexContainer>
      </Container>
    </Col>
  );
};

UserCard.propTypes = {
  user: PropTypes.object.isRequired,
  onDelete: PropTypes.func.isRequired,
};

export default UserCard;
