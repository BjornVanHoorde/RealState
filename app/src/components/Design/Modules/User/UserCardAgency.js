import { Link } from "react-router-dom";
import { route, UserRoutes } from "../../../../core/routing";
import Col from "../../Table/Col";
import PropTypes from "prop-types";

const UserCardAgency = ({ user }) => {
  return (
    <Col size="2" className="bg-white mx-3 shadow p-3 text-center">
      <Link
        to={route(UserRoutes.Detail, {
          id: user.id,
        })}
      >{`${user.firstName} ${user.lastName}`}</Link>
    </Col>
  );
};

UserCardAgency.propTypes = {
  user: PropTypes.object.isRequired,
};

export default UserCardAgency;
