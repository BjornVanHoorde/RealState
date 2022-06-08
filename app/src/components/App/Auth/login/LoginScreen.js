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
  email: yup.string().email().required(),
  password: yup.string().required(),
});

const defaultData = {
  email: "",
  password: "",
};

const LoginScreen = () => {
  const { login } = useAuthContext();
  const { t } = useTranslation();
  const { isLoading, error, mutate } = useMutation();
  useTitle(t("onboarding.login.title"));

  const { values, errors, handleChange, handleSubmit } = useForm(schema, {
    ...defaultData,
  });

  const handleData = (values) => {
    mutate(`${process.env.REACT_APP_API_URL}/login`, {
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
          <Title>{t("onboarding.login.title")}</Title>
          <p>
            {t("onboarding.login.new?")}
            <Button href={AuthRoutes.Register} color="link">
              {t("onboarding.login.link")}
            </Button>
          </p>
          <form onSubmit={handleSubmit(handleData)} noValidate={true}>
            {error && <Alert color="danger">{error}</Alert>}
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
              {t("onboarding.login.button")}
            </Button>
          </form>
        </Col>
        <Col>
          <img
            style={{ width: "100%" }}
            src={getImagePath("public/images/login.jpg")}
            alt="login.jpg"
          ></img>
        </Col>
      </AuthContainer>
    </Container>
  );
};

export default LoginScreen;
