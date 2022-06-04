import { useTranslation } from "react-i18next";
import useForm from "../../../../../core/hooks/useForm";
import * as yup from "yup";
import Field from "../../../../Design/Form/Field";
import Label from "../../../../Design/Form/Label";
import Input from "../../../../Design/Form/Input";
import Button from "../../../../Design/Button/Button";

const schema = yup.object().shape({
  name: yup.string(),
});

const defaultData = {
  name: "",
};

const transformData = (values) => {
  if (!!String(values)) {
    return {
      name: values.get("name"),
    };
  }
  return defaultData;
};

const AgencySearch = ({ disabled, params, onReset }) => {
  const { t } = useTranslation();
  const { values, errors, handleChange } = useForm(schema, {
    ...defaultData,
    ...transformData(params),
  });

  return (
    <form noValidate={true}>
      <Field>
        <Label htmlFor="name">{t("fields.name")}</Label>
        <Input
          name="name"
          onChange={handleChange}
          value={values.name}
          error={errors.name}
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

export default AgencySearch;
