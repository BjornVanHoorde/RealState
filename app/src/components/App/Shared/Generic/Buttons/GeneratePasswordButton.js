import Button from "../../../../Design/Button/Button";
import { useTranslation } from "react-i18next";

const GeneratePasswordButton = ({ onClick }) => {
  const { t } = useTranslation();

  const generatePassword = () => {
    const password = Math.random().toString(36).substr(2);
    onClick(password);
  };

  return (
    <Button color="secondary" onClick={generatePassword}>
      {t("buttons.generatePassword")}
    </Button>
  );
};

export default GeneratePasswordButton;
