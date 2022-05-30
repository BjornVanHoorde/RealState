import useMutation from "../../../../core/hooks/useMutation";
import { useAuthContext } from "../AuthProvider";
import * as yup from "yup";
import useForm from "../../../../core/hooks/useForm";
import Container from "../../../Design/Container/Container";
import useTitle from "../../../../core/hooks/useTitle";
import { useTranslation } from "react-i18next";
import AuthContainer from "../../../Design/Container/AuthContainer";
import Title from "../../../Design/Typography/Title";
import Button from "../../../Design/Button/Button";
import { AuthRoutes } from "../../../../core/routing";
import Field from "../../../Design/Form/Field";
import Label from "../../../Design/Form/Label";
import Input from "../../../Design/Form/Input";
import { getImagePath } from "../../../../core/helpers/api";
import Col from "../../../Design/Table/Col";
import Alert from "../../../Design/Alert/Alert";
import PasswordInput from "../../../Design/Form/PasswordInput";

const schema = yup.object().shape({
  firstName: yup.string().required(),
  lastName: yup.string().required(),
  tel: yup.string().required(),
  email: yup.string().email().required(),
  password: yup.string().required(),
});

const defaultData = {
  firstName: "",
  lastName: "",
  tel: "",
  email: "",
  password: "",
};

const RegisterScreen = () => {
  const { login } = useAuthContext();
  const { t } = useTranslation();
  const { isLoading, error, mutate } = useMutation();
  useTitle(t("onboarding.register.title"));

  const { values, errors, handleChange, handleSubmit } = useForm(schema, {
    ...defaultData,
  });

  const handleData = (values) => {
    mutate(`${process.env.REACT_APP_API_URL}/register`, {
      method: "POST",
      data: values,
      onSuccess: (data) => {
        login(data);
      },
    });
  };

  return (
    <Container>
      <AuthContainer>
        <Col>
          <Title>{t("onboarding.register.title")}</Title>
          <p>
            {t("onboarding.register.new?")}
            <Button href={AuthRoutes.Login} color="link">
              {t("onboarding.register.link")}
            </Button>
          </p>
          <form onSubmit={handleSubmit(handleData)} noValidate={true}>
            {error && <Alert color="danger">{error}</Alert>}
            <Field>
              <Label htmlFor="firstName">{t("fields.firstName")}</Label>
              <Input
                type="text"
                name="firstName"
                onChange={handleChange}
                value={values.firstName}
                error={errors.firstName}
                disabled={isLoading}
              />
            </Field>
            <Field>
              <Label htmlFor="lastName">{t("fields.lastName")}</Label>
              <Input
                type="text"
                name="lastName"
                onChange={handleChange}
                value={values.lastName}
                error={errors.lastName}
                disabled={isLoading}
              />
            </Field>
            <Field>
              <Label htmlFor="tel">{t("fields.tel")}</Label>
              <Input
                type="text"
                name="tel"
                onChange={handleChange}
                value={values.tel}
                error={errors.tel}
                disabled={isLoading}
              />
            </Field>
            <Field>
              <Label htmlFor="email">{t("fields.email")}</Label>
              <Input
                type="email"
                name="email"
                onChange={handleChange}
                value={values.email}
                error={errors.email}
                disabled={isLoading}
              />
            </Field>
            <Label htmlFor="password">{t("fields.password")}</Label>
            <PasswordInput
              name="password"
              onChange={handleChange}
              value={values.password}
              error={errors.password}
              disabled={isLoading}
            />
            <Button type="submit" disabled={isLoading}>
              {t("onboarding.register.button")}
            </Button>
          </form>
        </Col>
        <Col>
          <img
            style={{ width: "100%" }}
            src={getImagePath("public/images/register.jpg")}
            alt="login.jpg"
          ></img>
        </Col>
      </AuthContainer>
    </Container>
  );
};

export default RegisterScreen;
