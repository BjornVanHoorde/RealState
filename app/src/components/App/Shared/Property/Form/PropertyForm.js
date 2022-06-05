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
import CategorySelect from "../../Category/Select/CategorySelect";
import StatusSelect from "../Select/StatusSelect";
import Textarea from "../../../../Design/Form/Textarea";
import AgencySelect from "../../Agency/Select/AgencySelect";

const schema = yup.object().shape({
  agencyId: yup.number().required(),
  categoryId: yup.number().required(),
  status: yup.string().required(),
  yearOfConstruction: yup.number().required(),
  surface: yup.number().required(),
  cityId: yup.number().required(),
  street: yup.string().required(),
  number: yup.number().required(),
  box: yup.string(),
  price: yup.number().required(),
  description: yup.string().required(),
});

const defaultData = {
  agencyId: "",
  categoryId: "",
  status: "",
  yearOfConstruction: "",
  surface: "",
  cityId: "",
  street: "",
  number: "",
  box: "",
  price: "",
  description: "",
};

const transformData = (initialData) => {
  if (initialData.agency) {
    initialData = {
      ...initialData,
      agencyId: initialData.agency.id,
    };
  }

  if (initialData.category) {
    initialData = {
      ...initialData,
      categoryId: initialData.category.id,
    };
  }

  if (initialData.address) {
    if (initialData.address.city) {
      initialData = {
        ...initialData,
        cityId: initialData.address.city.id,
      };
    }
  }

  if (initialData.address) {
    initialData = {
      ...initialData,
      street: initialData.address.street,
      number: initialData.address.number,
      box: initialData.address.box,
      addressId: initialData.address.id,
    };
  }
  return initialData;
};

const getPropertyValues = (values) => {
  const propertyValues = {
    agencyId: values.agencyId,
    categoryId: values.categoryId,
    status: values.status,
    yearOfConstruction: values.yearOfConstruction,
    surface: values.surface,
    price: values.price,
    description: values.description,
    addressId: values.addressId ? values.addressId : null,
  };
  return propertyValues;
};

const getAddressValues = (values) => {
  const addressValues = {
    cityId: values.cityId,
    street: values.street,
    number: values.number,
    box: values.box,
  };
  return addressValues;
};

const PropertyForm = ({ initialData = {}, disabled, onSubmit, label }) => {
  const { t } = useTranslation();
  const { values, errors, handleChange, handleSubmit } = useForm(schema, {
    ...defaultData,
    ...transformData(initialData),
  });

  const handleData = (values) => {
    onSubmit(getPropertyValues(values), getAddressValues(values));
  };

  return (
    <FormContainer>
      <Title>{t(`properties.${label}.title`)}</Title>
      <form onSubmit={handleSubmit(handleData)} noValidate={true}>
        <Field>
          <Label htmlFor="agencyId">{t("fields.agency")}</Label>
          <AgencySelect
            name="agencyId"
            value={values.agencyId}
            error={errors.agencyId}
            onChange={handleChange}
          />
        </Field>
        <Field>
          <Label htmlFor="categoryId">{t("fields.category")}</Label>
          <CategorySelect
            name="categoryId"
            value={values.categoryId}
            error={errors.categoryId}
            onChange={handleChange}
          />
        </Field>
        <Field>
          <Label htmlFor="status">{t("fields.status")}</Label>
          <StatusSelect
            name="status"
            value={values.status}
            error={errors.status}
            onChange={handleChange}
          />
        </Field>
        <Field>
          <Label htmlFor="yearOfConstruction">
            {t("fields.yearOfConstruction")}
          </Label>
          <Input
            name="yearOfConstruction"
            type="number"
            value={values.yearOfConstruction}
            error={errors.yearOfConstruction}
            onChange={handleChange}
            disabled={disabled}
          />
        </Field>
        <Field>
          <Label htmlFor="surface">{t("fields.surface")}</Label>
          <Input
            name="surface"
            type="number"
            value={values.surface}
            error={errors.surface}
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
        <Field>
          <Label htmlFor="price">{t("fields.price")}</Label>
          <Input
            name="price"
            type="number"
            value={values.price}
            error={errors.price}
            onChange={handleChange}
            disabled={disabled}
          />
        </Field>
        <Field>
          <Label htmlFor="description">{t("fields.description")}</Label>
          <Textarea
            name="description"
            value={values.description}
            error={errors.description}
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

export default PropertyForm;
