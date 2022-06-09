import { useTranslation } from "react-i18next";
import { useSearchParams } from "react-router-dom";
import useFilter from "../../../../../core/hooks/useFilter";
import UserCard from "../../../../Design/Modules/User/UserCard";
import Col from "../../../../Design/Table/Col";
import Row from "../../../../Design/Table/Row";
import UserSearch from "../Form/UserSearch";

const UserGrid = ({ users, onRefresh, disabled }) => {
  const { t } = useTranslation();
  const [searchParams, setSearchParams] = useSearchParams();
  const { filteredData, handleReset } = useFilter(users, "users", searchParams);

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

  const handleResetClick = () => {
    setSearchParams({});
    handleReset();
  };

  return (
    <Row className="mt-3">
      <Col size="4">
        <UserSearch
          disabled={disabled}
          params={searchParams}
          onReset={handleResetClick}
        />
      </Col>
      <Col size="8">
        <Row gutter="3">
          {filteredData.map((user) => (
            <UserCard user={user} onDelete={onRefresh} key={user.email} />
          ))}
          {filteredData.length <= 0 && (
            <h2 className="text-center" >{t("users.none")}</h2>
          )}
        </Row>
      </Col>
    </Row>
  );
};

export default UserGrid;
