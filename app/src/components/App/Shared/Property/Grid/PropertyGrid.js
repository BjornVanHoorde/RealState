import { useTranslation } from "react-i18next";
import { useNavigate, useSearchParams } from "react-router-dom";
import useFilter from "../../../../../core/hooks/useFilter";
import {
  getAuthorization,
  isAdmin,
  isUser,
} from "../../../../../core/modules/users/utils";
import { PropertyRoutes, route } from "../../../../../core/routing";
import PropertyCard from "../../../../Design/Modules/Property/PropertyCard";
import Col from "../../../../Design/Table/Col";
import Row from "../../../../Design/Table/Row";
import { useUser } from "../../../Auth/AuthProvider";
import PropertySearch from "../Form/PropertySearch";

const PropertyGrid = ({ properties, onRefresh, disabled }) => {
  const { t } = useTranslation();
  const [searchParams, setSearchParams] = useSearchParams();
  const { filteredData, handleReset } = useFilter(
    properties,
    "properties",
    searchParams
  );
  const navigate = useNavigate();
  const user = useUser();

  const handleClickReset = () => {
    setSearchParams({});
    handleReset();
  };

  return (
    <Row className="mt-3">
      <Col size="4">
        <PropertySearch
          disabled={disabled}
          params={searchParams}
          onReset={handleClickReset}
          options={{
            showAgency: isAdmin(user),
          }}
        />
      </Col>
      <Col size="8">
        <Row>
          {filteredData.map((property) => (
            <PropertyCard
              property={property}
              onDelete={onRefresh}
              key={property.id}
              onClick={() =>
                navigate(route(PropertyRoutes.Detail, { id: property.id }))
              }
              onLike={onRefresh}
              options={{
                showDelete: getAuthorization(user, property.agency.id),
                showLikeButton: isUser(user),
                showAddress: !!user,
              }}
            />
          ))}
          {filteredData.length <= 0 && (
            <h2 className="text-center">{t("properties.none")}</h2>
          )}
        </Row>
      </Col>
    </Row>
  );
};

export default PropertyGrid;
