import { useTranslation } from "react-i18next";
import useForm from "../../../../../core/hooks/useForm";
import Button from "../../../../Design/Button/Button";
import FormContainer from "../../../../Design/Container/FormContainer";
import Field from "../../../../Design/Form/Field";
import Input from "../../../../Design/Form/Input";
import Label from "../../../../Design/Form/Label";
import PasswordInput from "../../../../Design/Form/PasswordInput";
import Title from "../../../../Design/Typography/Title";
import RealEstateSelect from "../../RealEstate/Select/RealEstateSelect";
import * as yup from "yup";

const getSchema = (isUpdate) => {
  return yup.object().shape({
    firstName: yup.string().required(),
    lastName: yup.string().required(),
    tel: yup.string().required(),
    email: yup.string().email().required(),
    password: isUpdate ? yup.string() : yup.string().required(),
    realEstateId: yup.string().nullable(),
  });
};

const defaultData = {
  firstName: "",
  lastName: "",
  tel: "",
  email: "",
  password: "",
  realEstateId: null,
};

const defaultOptions = {
  showRealEstate: true,
};

const transformData = (initialData) => {
  if (initialData.realEstate) {
    initialData = {
      ...initialData,
      realEstateId: initialData.realEstate.id,
    };
  }

  return initialData;
};

const transformValues = (values) => {
  if (values.password.length === 0) {
    const { password, ...rest } = values;
    values = rest;
  }
  return values;
};

const UserForm = ({
  initialData = {},
  disabled,
  onSubmit,
  label,
  options = {},
}) => {
  const { t } = useTranslation();
  const isUpdate = !!initialData.id;
  const { values, errors, handleChange, handleSubmit } = useForm(
    getSchema(isUpdate),
    {
      ...defaultData,
      ...transformData(initialData),
    }
  );

  const handleData = (values) => {
    onSubmit(transformValues(values));
  };

  options = { ...defaultOptions, ...options };

  return (
    <FormContainer>
      <Title>{t(`users.${label}.title`)}</Title>
      <form onSubmit={handleSubmit(handleData)} noValidate={true}>
        <Field>
          <Label htmlFor="firstName">{t("fields.firstName")}</Label>
          <Input
            name="firstName"
            value={values.firstName}
            onChange={handleChange}
            error={errors.firstName}
            disabled={disabled}
          />
        </Field>
        <Field>
          <Label htmlFor="lastName">{t("fields.lastName")}</Label>
          <Input
            name="lastName"
            value={values.lastName}
            onChange={handleChange}
            error={errors.lastName}
            disabled={disabled}
          />
        </Field>
        <Field>
          <Label htmlFor="email">{t("fields.email")}</Label>
          <Input
            name="email"
            type="email"
            value={values.email}
            onChange={handleChange}
            error={errors.email}
            disabled={disabled}
          />
        </Field>
        <Field>
          <Label htmlFor="tel">{t("fields.tel")}</Label>
          <Input
            name="tel"
            value={values.tel}
            onChange={handleChange}
            error={errors.tel}
            disabled={disabled}
          />
        </Field>
        {label === "edit" ? null : (
          <>
            <Label htmlFor="password">{t("fields.password")}</Label>
            <PasswordInput
              name="password"
              value={values.password}
              onChange={handleChange}
              error={errors.password}
            />
          </>
        )}
        {options.showRealEstate && (
          <Field>
            <Label htmlFor="realEstateId">{t("fields.realEstate")}</Label>
            <RealEstateSelect
              name="realEstateId"
              value={values.realEstateId}
              onChange={handleChange}
              error={errors.realEstateId}
            />
          </Field>
        )}
        <Button type="submit" disabled={disabled}>
          {label}
        </Button>
      </form>
    </FormContainer>
  );
};

export default UserForm;
