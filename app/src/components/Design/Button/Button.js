import PropTypes from "prop-types";
import { Link } from "react-router-dom";

const Button = ({
  children,
  onClick,
  color = "primary",
  type = "button",
  disabled = false,
  href,
}) => {
  const props = {
    className: `btn btn-${color} ${color === "link" ? "" : "text-uppercase"}`,
    onClick: onClick,
    disabled: disabled,
  };

  if (href) {
    return (
      <Link to={href} {...props}>
        {children}
      </Link>
    );
  } else {
    return (
      <button type={type} {...props}>
        {children}
      </button>
    );
  }
};

export default Button;

Button.propTypes = {
  onClick: PropTypes.func,
  color: PropTypes.oneOf(["primary", "secondary", "danger", "success", "link"]),
  type: PropTypes.oneOf(["button", "submit", "reset"]),
  disabled: PropTypes.bool,
  href: PropTypes.string,
};
