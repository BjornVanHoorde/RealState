import { AiOutlineHeart } from "react-icons/ai";
import PropTypes from "prop-types";
import { useEffect } from "react";
import useMutation from "../../../../../core/hooks/useMutation";
import Button from "../../../../Design/Button/Button";

const LikeButton = ({ onSuccess, id, disabled, ...rest }) => {
  const { isLoading, error, mutate } = useMutation();

  const handleClick = () => {
    mutate(`${process.env.REACT_APP_API_URL}/favorites`, {
      method: "POST",
      data: { propertyId: id },
      onSuccess: () => {
        onSuccess();
      },
    });
  };

  useEffect(() => {
    if (error) {
      window.alert(error);
    }
  }, [error]);

  return (
    <Button
      onClick={handleClick}
      disabled={disabled || isLoading}
      {...rest}
    >
      <h4 className="text-danger">
        <AiOutlineHeart />
      </h4>
    </Button>
  );
};

LikeButton.propTypes = {
  onClick: PropTypes.func,
  disabled: PropTypes.bool,
  ...Button.propTypes,
};

export default LikeButton;
