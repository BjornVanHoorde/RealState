import * as yup from "yup";
import { useTranslation } from "react-i18next";
import useForm from "../../../../../core/hooks/useForm";
import Field from "../../../../Design/Form/Field";
import Label from "../../../../Design/Form/Label";
import Input from "../../../../Design/Form/Input";
import Button from "../../../../Design/Button/Button";

const schema = yup.object().shape({
  name: yup.string().required(),
});

const defaultData = {
  name: "",
};

const CategoryForm = ({ initialData = {}, disabled, onSubmit, label }) => {
  const { t } = useTranslation();

  const { values, errors, handleChange, handleSubmit } = useForm(schema, {
    ...defaultData,
  });

  const handleData = (values) => {
    onSubmit(values);
  };

  return (
    <form onSubmit={handleSubmit(handleData)} noValidate={true}>
      <Field>
        <Label htmlFor="name">{t("fields.name")}</Label>
        <Input
          type="name"
          name="name"
          onChange={handleChange}
          value={values.name}
          error={errors.name}
          disabled={disabled}
        />
      </Field>
      <Button type="submit" disabled={disabled}>
        {label}
      </Button>
    </form>
  );
};

export default CategoryForm;
