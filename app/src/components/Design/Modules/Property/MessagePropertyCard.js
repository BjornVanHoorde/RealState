import { useTranslation } from "react-i18next";
import { getImagePath } from "../../../../core/helpers/api";
import {
  addressNotation,
  cityNotation,
} from "../../../../core/modules/addresses/utils";
import Container from "../../Container/Container";
import PropTypes from "prop-types";

const MessagePropertyCard = ({ property, onClick }) => {
  const { t } = useTranslation();

  return (
    <Container
      onClick={onClick}
      size="3"
      className="bg-white mx-3 p-0 shadow position-relative"
    >
      <img
        style={{ width: "100%" }}
        src={getImagePath(property.photos[0].path)}
        alt={property.photos[0].alt}
      />
      <Container>
        <h5>
          {property.category.name} {t(`properties.status.${property.status}`)}
        </h5>
        <h3>€ {property.price.toLocaleString("en-US")}</h3>
        <p className="m-0">{cityNotation(property.address.city)}</p>
        <p>{addressNotation(property.address)}</p>
      </Container>
    </Container>
  );
};

MessagePropertyCard.propTypes = {
  property: PropTypes.object.isRequired,
  onClick: PropTypes.func.isRequired,
};

export default MessagePropertyCard;
