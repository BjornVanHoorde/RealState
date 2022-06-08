import { getImagePath } from "../../../../core/helpers/api";
import {
  addressNotation,
  cityNotation,
} from "../../../../core/modules/addresses/utils";
import DeleteButton from "../../../App/Shared/Generic/Buttons/DeleteButton";
import Container from "../../Container/Container";
import ClickableCol from "../../Table/ClickableCol";
import PropTypes from "prop-types";

const AgencyCard = ({ agency, onDelete, onClick }) => {
  return (
    <ClickableCol onClick={onClick} size="4">
      <Container className="bg-white p-0 shadow position-relative">
        <div className="position-absolute top-0 end-0">
          <DeleteButton
            scope="agencies"
            id={agency.id}
            onSuccess={onDelete}
            color="link"
          ></DeleteButton>
        </div>
        <img
          style={{ width: "100%" }}
          src={getImagePath(agency.logo)}
          alt={agency.logo}
        />
        <Container>
          <h4>{agency.name}</h4>
          <p>{agency.email}</p>
          <p>{agency.tel}</p>
          <p className="m-0">{cityNotation(agency.address.city)}</p>
          <p>{addressNotation(agency.address)}</p>
        </Container>
      </Container>
    </ClickableCol>
  );
};

AgencyCard.propTypes = {
  agency: PropTypes.object.isRequired,
  onDelete: PropTypes.func.isRequired,
  onClick: PropTypes.func.isRequired,
}

export default AgencyCard;
