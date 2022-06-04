import { useNavigate, useSearchParams } from "react-router-dom";
import { AgencyRoutes, route } from "../../../../../core/routing";
import AgencyCard from "../../../../Design/Modules/Agency/AgencyCard";
import Col from "../../../../Design/Table/Col";
import Row from "../../../../Design/Table/Row";
import AgencySearch from "../Form/AgencySearch";

const AgencyGrid = ({ agencies, onRefresh, disabled }) => {
  const [searchParams, setSearchParams] = useSearchParams();
  const navigate = useNavigate();

  if (!!String(searchParams)) {
    agencies = agencies.filter((agency) =>
      agency.name.includes(searchParams.get("name"))
    );
  }

  const handleReset = () => {
    setSearchParams({});
  };

  return (
    <Row className="mt-3">
      <Col size="4">
        <AgencySearch
          disabled={disabled}
          params={searchParams}
          onReset={handleReset}
        />
      </Col>
      <Col size="8">
        <Row gutter="3">
          {agencies.map((agency) => (
            <AgencyCard
              agency={agency}
              onDelete={onRefresh}
              key={agency.email}
              onClick={() =>
                navigate(route(AgencyRoutes.Detail, { id: agency.id }))
              }
            />
          ))}
        </Row>
      </Col>
    </Row>
  );
};

export default AgencyGrid;
