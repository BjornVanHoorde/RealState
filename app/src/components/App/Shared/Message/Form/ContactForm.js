import useForm from "../../../../../core/hooks/useForm";
import Button from "../../../../Design/Button/Button";
import FormContainer from "../../../../Design/Container/FormContainer";
import Field from "../../../../Design/Form/Field";
import Label from "../../../../Design/Form/Label";
import * as yup from "yup";
import { useTranslation } from "react-i18next";
import Textarea from "../../../../Design/Form/Textarea";

const schema = yup.object().shape({
  message: yup.string().required(),
});

const defaultData = {
  message: "",
};

const ContactForm = ({ disabled, onSubmit }) => {
  const { t } = useTranslation();
  const { values, errors, handleChange, handleSubmit } = useForm(schema, {
    ...defaultData,
  });

  const handleData = (values) => {
  };

  return (
    <FormContainer>
      <form onSubmit={handleSubmit(handleData)} noValidate={true}>
        <Field>
          <Label htmlFor="message">{t("fields.message")}</Label>
          <Textarea
            name="message"
            value={values.message}
            error={errors.message}
            onChange={handleChange}
            disabled={disabled}
          />
        </Field>
        <Button type="submit" disabled={disabled}>
          {t("buttons.send")}
        </Button>
      </form>
    </FormContainer>
  );
};

export default ContactForm;
