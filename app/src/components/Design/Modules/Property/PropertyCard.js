import { useTranslation } from "react-i18next";
import { getImagePath } from "../../../../core/helpers/api";
import DeleteButton from "../../../App/Shared/Generic/Buttons/DeleteButton";
import LikeButton from "../../../App/Shared/Generic/Buttons/LikeButton";
import Container from "../../Container/Container";
import ClickableCol from "../../Table/ClickableCol";

const PropertyCard = ({ property, onDelete, onClick, options, onLike }) => {
  const { t } = useTranslation();

  return (
    <ClickableCol
      onClick={onClick}
      size="3"
      className="bg-white mx-3 p-0 shadow position-relative"
    >
      <div className="position-absolute top-0 end-0">
        {options.showDelete && (
          <DeleteButton
            scope="properties"
            id={property.id}
            onSuccess={onDelete}
            color="link"
          ></DeleteButton>
        )}
        {options.showLikeButton && (
          <LikeButton
            id={property.id}
            onSuccess={onLike}
            color="link"
          ></LikeButton>
        )}
      </div>

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
        {options.showAddress && (
          <p>
            {property.address.street} {property.address.number}
            {property.address.box ? ` box ${property.address.box}` : ""}
          </p>
        )}
      </Container>
    </ClickableCol>
  );
};

export default PropertyCard;
