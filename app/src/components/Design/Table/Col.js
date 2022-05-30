import PropTypes from "prop-types";

const Col = ({ size, className, children }) => {
  return (
    <div
      className={`align-items-center col${size ? `-md-${size}` : ""} ${
        className ? `${className}` : ""
      }`}
    >
      {children}
    </div>
  );
};

Col.propTypes = {
  size: PropTypes.string,
  className: PropTypes.string,
};

export default Col;
