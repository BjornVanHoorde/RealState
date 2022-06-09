import { useTranslation } from "react-i18next";
import { useNavigate, useSearchParams } from "react-router-dom";
import useFilter from "../../../../../core/hooks/useFilter";
import { AgencyRoutes, route } from "../../../../../core/routing";
import AgencyCard from "../../../../Design/Modules/Agency/AgencyCard";
import Col from "../../../../Design/Table/Col";
import Row from "../../../../Design/Table/Row";
import AgencySearch from "../Form/AgencySearch";

const AgencyGrid = ({ agencies, onRefresh, disabled }) => {
  const { t } = useTranslation();
  const [searchParams, setSearchParams] = useSearchParams();
  const { filteredData, handleReset } = useFilter(
    agencies,
    "agencies",
    searchParams
  );
  const navigate = useNavigate();

  const handleResetClick = () => {
    setSearchParams({});
    handleReset();
  };

  return (
    <Row className="mt-3">
      <Col size="4">
        <AgencySearch
          disabled={disabled}
          params={searchParams}
          onReset={handleResetClick}
        />
      </Col>
      <Col size="8">
        <Row gutter="3">
          {filteredData.map((agency) => (
            <AgencyCard
              agency={agency}
              onDelete={onRefresh}
              key={agency.email}
              onClick={() =>
                navigate(route(AgencyRoutes.Detail, { id: agency.id }))
              }
            />
          ))}
          {filteredData.length <= 0 && (
            <h2 className="text-center">{t("agencies.none")}</h2>
          )}
        </Row>
      </Col>
    </Row>
  );
};

export default AgencyGrid;
