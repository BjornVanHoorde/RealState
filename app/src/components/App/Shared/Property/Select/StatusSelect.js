import { useTranslation } from "react-i18next";
import { propertyStatusses } from "../../../../../core/modules/properties/Constants";
import Select from "../../../../Design/Form/Select";

const StatusSelect = (props) => {
  const { t } = useTranslation();
  const statusses = [
    {
      label: `${t(`properties.status.${propertyStatusses.forRent}`)}`,
      value: propertyStatusses.forRent,
    },
    {
      label: `${t(`properties.status.${propertyStatusses.forSale}`)}`,
      value: propertyStatusses.forSale,
    },
    {
      label: `${t(`properties.status.${propertyStatusses.rented}`)}`,
      value: propertyStatusses.rented,
    },
    {
      label: `${t(`properties.status.${propertyStatusses.sold}`)}`,
      value: propertyStatusses.sold,
    },
  ];

  const options = statusses
    ? statusses.map((s) => ({ value: s.value, label: s.label }))
    : null;

  return <Select options={options} {...props} />;
};

export default StatusSelect;
