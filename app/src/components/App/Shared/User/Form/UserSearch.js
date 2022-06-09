import useForm from "../../../../../core/hooks/useForm";
import * as yup from "yup";
import Field from "../../../../Design/Form/Field";
import Label from "../../../../Design/Form/Label";
import Input from "../../../../Design/Form/Input";
import Button from "../../../../Design/Button/Button";
import { useTranslation } from "react-i18next";
import AgencySelect from "../../Agency/Select/AgencySelect";

const schema = yup.object().shape({
  name: yup.string(),
  email: yup.string(),
  agencyId: yup.number(),
});

const defaultData = {
  name: "",
  email: "",
  agencyId: "",
};

const transformData = (values) => {
  if (!!String(values)) {
    return {
      name: values.get("name"),
      email: values.get("email"),
      agencyId: values.get("agencyId"),
    };
  }
  return defaultData;
};

const UserSearch = ({ disabled, params, onReset }) => {
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
      <Field>
        <Label htmlFor="email">{t("fields.email")}</Label>
        <Input
          name="email"
          type="email"
          onChange={handleChange}
          value={values.email}
          error={errors.email}
          disabled={disabled}
        />
      </Field>
      <Field>
        <Label htmlFor="agencyId">{t("fields.agency")}</Label>
        <AgencySelect
          name="agencyId"
          type="agencyId"
          onChange={handleChange}
          value={values.agencyId}
          error={errors.agencyId}
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

export default UserSearch;
