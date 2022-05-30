import PropTypes from "prop-types";

const Row = ({ size, gutter, className, children }) => {
  return (
    <div
      className={`row align-items-center ${size ? `row-cols${size}` : ""} ${
        gutter ? `g-${gutter}` : ""
      } ${className ? `${className}` : ""}`}
    >
      {children}
    </div>
  );
};

Row.propTypes = {
  size: PropTypes.string,
  gutter: PropTypes.string,
  className: PropTypes.string,
};

export default Row;
