import { useSearchParams } from "react-router-dom";
import UserCard from "../../../../Design/Modules/User/UserCard";
import Col from "../../../../Design/Table/Col";
import Row from "../../../../Design/Table/Row";
import UserSearch from "../Form/UserSearch";

const UserGrid = ({ users, onRefresh, disabled }) => {
  const [searchParams, setSearchParams] = useSearchParams();

  if (!!String(searchParams)) {
    users = users.filter((user) =>
      user.firstName.includes(searchParams.get("firstName"))
    );
    users = users.filter((user) =>
      user.lastName.includes(searchParams.get("lastName"))
    );
    users = users.filter((user) =>
      user.email.includes(searchParams.get("email"))
    );
  }

  const handleReset = () => {
    setSearchParams({});
    console.log(searchParams);
  }

  return (
    <Row className="mt-3">
      <Col size="4">
        <UserSearch disabled={disabled} params={searchParams} onReset={handleReset} />
      </Col>
      <Col size="8">
        <Row gutter="3">
          {users.map((user) => (
            <UserCard user={user} onDelete={onRefresh} key={user.email} />
          ))}
        </Row>
      </Col>
    </Row>
  );
};

export default UserGrid;
