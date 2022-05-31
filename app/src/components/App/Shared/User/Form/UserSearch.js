import useForm from "../../../../../core/hooks/useForm";
import * as yup from "yup";
import Field from "../../../../Design/Form/Field";
import Label from "../../../../Design/Form/Label";
import Input from "../../../../Design/Form/Input";
import Button from "../../../../Design/Button/Button";
import { useTranslation } from "react-i18next";

const schema = yup.object().shape({
  firstName: yup.string(),
  lastName: yup.string(),
  email: yup.string().email(),
});

const defaultData = {
  firstName: "",
  lastName: "",
  email: "",
};

const transformData = (values) => {
  if (!!String(values)) {
    return {
      firstName: values.get("firstName"),
      lastName: values.get("lastName"),
      email: values.get("email"),
    }
  }
  return defaultData;
};

const UserSearch = ({ disabled, params, onReset }) => {
  const { t } = useTranslation();
  const { values, errors, handleChange } = useForm(schema, {
    ...defaultData,
    ...transformData(params)
  });

  return (
    <form noValidate={true}>
      <Field>
        <Label htmlFor="firstName">{t("fields.firstName")}</Label>
        <Input
          name="firstName"
          onChange={handleChange}
          value={values.firstName}
          error={errors.firstName}
          disabled={disabled}
        />
      </Field>
      <Field>
        <Label htmlFor="lastName">{t("fields.lastName")}</Label>
        <Input
          name="lastName"
          onChange={handleChange}
          value={values.lastName}
          error={errors.lastName}
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
