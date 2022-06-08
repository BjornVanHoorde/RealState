import PropTypes from "prop-types";

const ClickableCol = ({ size, className, onClick, children }) => {
  return (
    <div
      onClick={onClick}
      className={`container align-items-center col${
        size ? `-md-${size}` : ""
      } ${className ? `${className}` : ""} cursor-pointer`}
    >
      {children}
    </div>
  );
};

ClickableCol.propTypes = {
  size: PropTypes.string,
  className: PropTypes.string,
  onClick: PropTypes.func.isRequired,
};

export default ClickableCol;
