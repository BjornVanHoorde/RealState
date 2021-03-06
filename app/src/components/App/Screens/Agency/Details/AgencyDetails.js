import { useTranslation } from "react-i18next";
import { useOutletContext } from "react-router-dom";
import { getImagePath } from "../../../../../core/helpers/api";
import useFetch from "../../../../../core/hooks/useFetch";
import useTitle from "../../../../../core/hooks/useTitle";
import {
  addressNotation,
  cityNotation,
} from "../../../../../core/modules/addresses/utils";
import { AgencyRoutes, route } from "../../../../../core/routing";
import Alert from "../../../../Design/Alert/Alert";
import Button from "../../../../Design/Button/Button";
import ProfileContainer from "../../../../Design/Container/ProfileContainer";
import UserCardAgency from "../../../../Design/Modules/User/UserCardAgency";
import Col from "../../../../Design/Table/Col";
import Row from "../../../../Design/Table/Row";
import DeleteButton from "../../../Shared/Generic/Buttons/DeleteButton";
import LoadingIndicator from "../../../Shared/Generic/LoadingIndicator/LoadingIndicator";

const AgencyDetails = () => {
  const { t } = useTranslation();
  const { agency, onDelete } = useOutletContext();
  const {
    isLoading,
    error,
    data: users,
  } = useFetch(`/agencies/${agency.id}/users`);
  useTitle(agency ? agency.name : "");

  return (
    <>
      <ProfileContainer>
        <Row>
          <Col size="4">
            <img
              style={{ width: "100%" }}
              src={getImagePath(agency.logo)}
              alt={agency.logo}
            ></img>
          </Col>
          <Col size="4">
            <h2 className="mb-3">{agency.name}</h2>
            <h4 className="mb-3">{agency.email}</h4>
            <h4 className="mb-3">{agency.tel}</h4>
            <h4 className="mb-3">{addressNotation(agency.address)}</h4>
            <h4 className="mb-3">{cityNotation(agency.address.city)}</h4>
          </Col>
          <Col size="4" className="text-end">
            <Button href={route(AgencyRoutes.Edit, { id: agency.id })}>
              {t("agencies.edit.title")}
            </Button>
            <Button href={route(AgencyRoutes.CreateUser, { id: agency.id })}>
              {t("agencies.users.create")}
            </Button>
            <DeleteButton
              scope="agencies"
              id={agency.id}
              onSuccess={onDelete}
              color="link"
            ></DeleteButton>
          </Col>
        </Row>
      </ProfileContainer>
      <hr></hr>
      <h2>{t("agencies.users.title")}</h2>
      <Row className="justify-content-center">
        {isLoading && <LoadingIndicator />}
        {error && <Alert color="danger">{error}</Alert>}
        {users &&
          users.map((user) => <UserCardAgency user={user} key={user.email} />)}
      </Row>
    </>
  );
};

export default AgencyDetails;
