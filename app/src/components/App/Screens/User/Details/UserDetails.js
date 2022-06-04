import { useTranslation } from "react-i18next";
import { useOutletContext } from "react-router-dom";
import { getImagePath } from "../../../../../core/helpers/api";
import ProfileContainer from "../../../../Design/Container/ProfileContainer";
import Col from "../../../../Design/Table/Col";
import Row from "../../../../Design/Table/Row";
import DeleteButton from "../../../Shared/Generic/Buttons/DeleteButton";
import Button from "../../../../Design/Button/Button";

const UserDetails = () => {
  const { t } = useTranslation();
  const { user, onEditClick, onDelete } = useOutletContext();

  return (
    <ProfileContainer>
      <Row>
        <Col size="4">
          <img
            style={{ width: "100%" }}
            src={getImagePath(`public/images/${user.avatar}`)}
            alt={user.avatar}
          ></img>
        </Col>
        <Col size="4">
          <h2 className="mb-3">{`${user.firstName} ${user.lastName}`}</h2>
          <h4 className="mb-3">{user.email}</h4>
          <h4 className="mb-3">{user.tel}</h4>
          {user.agency && <h4 className="mb-3">{user.agency.name}</h4>}
        </Col>
        <Col size="4" className="text-end">
          <Button onClick={onEditClick}>{t("users.edit.title")}</Button>
          <DeleteButton
            scope="users"
            id={user.id}
            onSuccess={onDelete}
            color="link"
          >
            {t("users.delete.title")}
          </DeleteButton>
        </Col>
      </Row>
    </ProfileContainer>
  );
};

export default UserDetails;
