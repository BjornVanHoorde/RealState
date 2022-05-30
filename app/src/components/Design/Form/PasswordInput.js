import { BiShow, BiHide } from "react-icons/bi";
import { useState } from "react";
import Input from "./Input";
import Button from "../Button/Button";
import Field from "./Field";

const PasswordInput = (props) => {
  const [isVisible, setIsVisible] = useState(false);

  const handleToggleClick = () => {
    setIsVisible(!isVisible);
  };

  return (
    <Field password={true}>
      <Input type={isVisible ? "text" : "password"} {...props}>
        <Button color="secondary" onClick={handleToggleClick}>
          {isVisible ? <BiHide /> : <BiShow />}
        </Button>
      </Input>
    </Field>
  );
};

PasswordInput.propTypes = {
  ...Input.propTypes,
};

export default PasswordInput;
