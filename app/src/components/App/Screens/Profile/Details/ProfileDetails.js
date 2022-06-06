import { useTranslation } from "react-i18next";
import { useOutletContext } from "react-router-dom";
import { getImagePath } from "../../../../../core/helpers/api";
import useTitle from "../../../../../core/hooks/useTitle";
import { ProfileRoutes } from "../../../../../core/routing";
import Button from "../../../../Design/Button/Button";
import ProfileContainer from "../../../../Design/Container/ProfileContainer";
import Col from "../../../../Design/Table/Col";
import Row from "../../../../Design/Table/Row";
import DeleteButton from "../../../Shared/Generic/Buttons/DeleteButton";

const ProfileDetails = () => {
  const { t } = useTranslation();
  const { user } = useOutletContext();

  useTitle(t("profile.title"));

  const handleDelete = () => {};

  return (
    <ProfileContainer>
      <Row>
        <Col size="4">
          <img
            style={{ width: "100%" }}
            src={getImagePath(user.avatar)}
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
          <Button href={ProfileRoutes.Edit}>{t("profile.edit.title")}</Button>
          <DeleteButton
            scope="users"
            id={user.id}
            onSuccess={handleDelete}
            color="link"
          ></DeleteButton>
        </Col>
      </Row>
    </ProfileContainer>
  );
};

export default ProfileDetails;
