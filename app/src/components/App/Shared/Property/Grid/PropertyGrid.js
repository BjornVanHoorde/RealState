import { useNavigate, useSearchParams } from "react-router-dom";
import { PropertyRoutes, route } from "../../../../../core/routing";
import PropertyCard from "../../../../Design/Modules/Property/PropertyCard";
import Col from "../../../../Design/Table/Col";
import Row from "../../../../Design/Table/Row";
import PropertySearch from "../Form/PropertySearch";

const PropertyGrid = ({ properties, onRefresh, disabled }) => {
  const [searchParams, setSearchParams] = useSearchParams();
  const navigate = useNavigate();

  if (!!String(searchParams)) {
    properties = properties.filter((agency) =>
      agency.name.includes(searchParams.get("name"))
    );
  }

  const handleReset = () => {
    setSearchParams({});
  };

  return (
    <Row className="mt-3">
      <Col size="4">
        <PropertySearch
          disabled={disabled}
          params={searchParams}
          onReset={handleReset}
        />
      </Col>
      <Col size="8">
        <Row gutter="3">
          {properties.map((property) => (
            <PropertyCard
              property={property}
              onDelete={onRefresh}
              key={property.id}
              onClick={() =>
                navigate(route(PropertyRoutes.Detail, { id: property.id }))
              }
            />
          ))}
        </Row>
      </Col>
    </Row>
  );
};

export default PropertyGrid;
