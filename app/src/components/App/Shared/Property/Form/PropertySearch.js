import { useTranslation } from "react-i18next";
import useForm from "../../../../../core/hooks/useForm";
import * as yup from "yup";
import Field from "../../../../Design/Form/Field";
import Label from "../../../../Design/Form/Label";
import Button from "../../../../Design/Button/Button";
import CitySelect from "../../City/Select/CitySelect";

const schema = yup.object().shape({
  cityId: yup.number(),
});

const defaultData = {
  cityId: "",
};

const transformData = (values) => {
  if (!!String(values)) {
    return {
      cityId: values.get("cityId"),
    };
  }
  return defaultData;
};

const PropertySearch = ({ disabled, params, onReset }) => {
  const { t } = useTranslation();
  const { values, errors, handleChange } = useForm(schema, {
    ...defaultData,
    ...transformData(params),
  });

  return (
    <form noValidate={true}>
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
