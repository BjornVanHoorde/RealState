import useFetch from "../../../../../core/hooks/useFetch";
import Select from "../../../../Design/Form/Select";

const RealEstateSelect = (props) => {
  const { data: realEstates } = useFetch("/realEstates");

  const options = realEstates
    ? realEstates.map((re) => ({ value: re.id, label: re.name }))
    : null;

  return <Select options={options} {...props} />;
};

export default RealEstateSelect;
