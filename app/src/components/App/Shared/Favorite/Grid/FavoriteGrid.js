import { useNavigate } from "react-router-dom";
import { PropertyRoutes, route } from "../../../../../core/routing";
import FavoriteCard from "../../../../Design/Modules/Favorite/FavoriteCard";
import Row from "../../../../Design/Table/Row";

const FavoriteGrid = ({ favorites, onRefresh }) => {
  const navigate = useNavigate();

  const handleClick = (id) => {
    navigate(route(PropertyRoutes.Detail, { id }))
  };

  return (
    <Row>
      {favorites.map((favorite) => (
        <FavoriteCard
          favorite={favorite}
          onClick={handleClick}
          onDelete={onRefresh}
          key={favorite.id}
        />
      ))}
    </Row>
  );
};

export default FavoriteGrid;
