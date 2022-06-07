import { useTranslation } from "react-i18next";
import { getImagePath } from "../../../../core/helpers/api";
import {
  addressNotation,
  cityNotation,
} from "../../../../core/modules/addresses/utils";
import DeleteButton from "../../../App/Shared/Generic/Buttons/DeleteButton";
import Container from "../../Container/Container";
import ClickableCol from "../../Table/ClickableCol";

const FavoriteCard = ({ favorite, onDelete, onClick }) => {
  const { t } = useTranslation();

  return (
    <ClickableCol
      onClick={() => onClick(favorite.property.id)}
      size="3"
      className="bg-white p-0 pb-1 shadow position-relative"
    >
      <div className="position-absolute top-0 end-0">
        <DeleteButton
          scope="favorites"
          id={favorite.id}
          onSuccess={onDelete}
          color="link"
        ></DeleteButton>
      </div>

      <img
        style={{ width: "100%" }}
        src={getImagePath(`public/images/${favorite.property.photos[0].path}`)}
        alt={favorite.property.photos[0].alt}
      />
      <Container>
        <h5>
          {favorite.property.category.name}{" "}
          {t(`properties.status.${favorite.property.status}`)}
        </h5>
        <h3>€ {favorite.property.price.toLocaleString("en-US")}</h3>
        <p className="m-0">{cityNotation(favorite.property.address.city)}</p>
        <p>{addressNotation(favorite.property.address)}</p>
      </Container>
    </ClickableCol>
  );
};

export default FavoriteCard;
