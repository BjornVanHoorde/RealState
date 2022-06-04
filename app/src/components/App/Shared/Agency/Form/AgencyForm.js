import { useTranslation } from "react-i18next";
import useForm from "../../../../../core/hooks/useForm";
import FormContainer from "../../../../Design/Container/FormContainer";
import Title from "../../../../Design/Typography/Title";
import * as yup from "yup";
import Field from "../../../../Design/Form/Field";
import Label from "../../../../Design/Form/Label";
import Input from "../../../../Design/Form/Input";
import CitySelect from "../../City/Select/CitySelect";
import Button from "../../../../Design/Button/Button";

const schema = yup.object().shape({
  name: yup.string().required(),
  email: yup.string().email().required(),
  tel: yup.string().required(),
  cityId: yup.number().required(),
  street: yup.string().required(),
  number: yup.number().required(),
  box: yup.string(),
});

const defaultData = {
  name: "",
  email: "",
  tel: "",
  cityId: "",
  street: "",
  number: "",
  box: "",
};

const transformData = (initialData) => {
  if (initialData.city) {
    initialData = {
      ...initialData,
      cityId: initialData.city.id,
    };
  }
  return initialData;
};

const getAgencyValues = (values) => {
  const agencyValues = {
    name: values.name,
    email: values.email, 
    tel: values.tel, 
    addressId: null, 
  };
  return agencyValues;
};

const getAddressValues = (values) => {
  const agencyValues = {
    cityId: values.cityId,
    street: values.street, 
    number: values.number, 
    box: values.box,
    email: values.email, 
  };
  return agencyValues;
};

const AgencyForm = ({ initialData = {}, disabled, onSubmit, label }) => {
  const { t } = useTranslation();
  const { values, errors, handleChange, handleSubmit } = useForm(schema, {
    ...defaultData,
    ...transformData(initialData),
  });

  const handleData = (values) => {
    onSubmit(getAgencyValues(values), getAddressValues(values));
  };

  return (
    <FormContainer>
      <Title>{t("agencies.create.title")}</Title>
      <form onSubmit={handleSubmit(handleData)} noValidate={true}>
        <Field>
          <Label htmlFor="name">{t("fields.name")}</Label>
          <Input
            name="name"
            value={values.name}
            error={errors.name}
            onChange={handleChange}
            disabled={disabled}
          />
        </Field>
        <Field>
          <Label htmlFor="email">{t("fields.email")}</Label>
          <Input
            name="email"
            type="email"
            value={values.email}
            error={errors.email}
            onChange={handleChange}
            disabled={disabled}
          />
        </Field>
        <Field>
          <Label htmlFor="tel">{t("fields.tel")}</Label>
          <Input
            name="tel"
            value={values.tel}
            error={errors.tel}
            onChange={handleChange}
            disabled={disabled}
          />
        </Field>
        <Field>
          <Label htmlFor="cityId">{t("fields.city")}</Label>
          <CitySelect
            name="cityId"
            value={values.cityId}
            error={errors.cityId}
            onChange={handleChange}
          />
        </Field>
        <Field>
          <Label htmlFor="street">{t("fields.street")}</Label>
          <Input
            name="street"
            value={values.street}
            error={errors.street}
            onChange={handleChange}
            disabled={disabled}
          />
        </Field>
        <Field>
          <Label htmlFor="number">{t("fields.number")}</Label>
          <Input
            name="number"
            type="number"
            value={values.number}
            error={errors.number}
            onChange={handleChange}
            disabled={disabled}
          />
        </Field>
        <Field>
          <Label htmlFor="box">{t("fields.box")}</Label>
          <Input
            name="box"
            value={values.box}
            error={errors.box}
            onChange={handleChange}
            disabled={disabled}
          />
        </Field>
        <Button type="submit" disabled={disabled}>
          {label}
        </Button>
      </form>
    </FormContainer>
  );
};

export default AgencyForm;
