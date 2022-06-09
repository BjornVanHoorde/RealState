import { useTranslation } from "react-i18next";
import useForm from "../../../../../core/hooks/useForm";
import * as yup from "yup";
import Field from "../../../../Design/Form/Field";
import Label from "../../../../Design/Form/Label";
import Button from "../../../../Design/Button/Button";
import CitySelect from "../../City/Select/CitySelect";
import StatusSelect from "../Select/StatusSelect";
import CategorySelect from "../../Category/Select/CategorySelect";
import Input from "../../../../Design/Form/Input";
import AgencySelect from "../../Agency/Select/AgencySelect";

const schema = yup.object().shape({
  cityId: yup.number(),
  status: yup.string(),
  categoryId: yup.number(),
  minPrice: yup.number(),
  maxPrice: yup.number(),
  agencyId: yup.number(),
});

const defaultData = {
  cityId: "",
  status: "",
  categoryId: "",
  minPrice: "",
  maxPrice: "",
  agencyId: "",
};

const transformData = (values) => {
  if (!!String(values)) {
    return {
      cityId: values.get("cityId"),
      status: values.get("status"),
      categoryId: values.get("categoryId"),
      minPrice: values.get("minPrice"),
      maxPrice: values.get("maxPrice"),
      agencyId: values.get("agencyId"),
    };
  }
  return defaultData;
};

const PropertySearch = ({ disabled, params, onReset, options = {} }) => {
  const { t } = useTranslation();
  const { values, errors, handleChange } = useForm(schema, {
    ...defaultData,
    ...transformData(params),
  });

  return (
    <form noValidate={true}>
      {options.showAgency && (
        <Field>
          <Label htmlFor="agencyId">{t("fields.agency")}</Label>
          <AgencySelect
            name="agencyId"
            onChange={handleChange}
            value={values.agencyId}
            error={errors.agencyId}
            disabled={disabled}
          />
        </Field>
      )}
      <Field>
        <Label htmlFor="cityId">{t("fields.city")}</Label>
        <CitySelect
          name="cityId"
          onChange={handleChange}
          value={values.cityId}
          error={errors.cityId}
          disabled={disabled}
        />
      </Field>
      <Field>
        <Label htmlFor="status">{t("fields.status")}</Label>
        <StatusSelect
          name="status"
          onChange={handleChange}
          value={values.status}
          error={errors.status}
          disabled={disabled}
        />
      </Field>
      <Field>
        <Label htmlFor="categoryId">{t("fields.category")}</Label>
        <CategorySelect
          name="categoryId"
          onChange={handleChange}
          value={values.categoryId}
          error={errors.categoryId}
          disabled={disabled}
        />
      </Field>
      <Field>
        <Label htmlFor="minPrice">{t("fields.minPrice")}</Label>
        <Input
          name="minPrice"
          type="number"
          onChange={handleChange}
          value={values.minPrice}
          error={errors.minPrice}
          disabled={disabled}
        />
      </Field>
      <Field>
        <Label htmlFor="maxPrice">{t("fields.maxPrice")}</Label>
        <Input
          name="maxPrice"
          type="number"
          onChange={handleChange}
          value={values.maxPrice}
          error={errors.maxPrice}
          disabled={disabled}
        />
      </Field>
      <Button type="submit" disabled={disabled}>
        {t("buttons.search")}
      </Button>
      <Button type="reset" onClick={onReset} color="danger" disabled={disabled}>
        {t("buttons.reset")}
      </Button>
    </form>
  );
};

export default PropertySearch;
