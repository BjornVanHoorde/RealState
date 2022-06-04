import { useSearchParams } from "react-router-dom";
import AgencyCard from "../../../../Design/Modules/Agency/AgencyCard";
import Col from "../../../../Design/Table/Col";
import Row from "../../../../Design/Table/Row";
import AgencySearch from "../Form/AgencySearch";

const AgencyGrid = ({ agencies, onRefresh, disabled }) => {
  const [searchParams, setSearchParams] = useSearchParams();

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
            />
          ))}
        </Row>
      </Col>
    </Row>
  );
};

export default AgencyGrid;
