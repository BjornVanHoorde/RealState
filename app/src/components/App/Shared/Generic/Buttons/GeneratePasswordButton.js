import Button from "../../../../Design/Button/Button";
import { useTranslation } from "react-i18next";
import randomize from "randomatic";

const GeneratePasswordButton = ({ onClick }) => {
  const { t } = useTranslation();

  const generatePassword = () => {
    const password = randomize("Aa0", 20);
    onClick(password);
  };

  return (
    <Button color="secondary" onClick={generatePassword}>{t("buttons.generatePassword")}</Button>
  );
};

export default GeneratePasswordButton;
