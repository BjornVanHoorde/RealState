import { useTranslation } from "react-i18next";
import { getImagePath } from "../../../../core/helpers/api";
import Container from "../../Container/Container";

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
        src={getImagePath(`public/images/${property.photos[0].path}`)}
        alt={property.photos[0].alt}
      />
      <Container>
        <h5>
          {property.category.name} {t(`properties.status.${property.status}`)}
        </h5>
        <h3>€ {property.price.toLocaleString("en-US")}</h3>
        <p className="m-0">
          {property.address.city.zip} {property.address.city.name}
        </p>
        <p>
          {property.address.street} {property.address.number}
          {property.address.box ? ` box ${property.address.box}` : ""}
        </p>
      </Container>
    </Container>
  );
};

export default MessagePropertyCard;
