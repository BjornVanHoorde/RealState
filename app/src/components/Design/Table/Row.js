import PropTypes from "prop-types";

const Row = ({ size, children }) => {
  return <div className={`row ${size ? `row-cols${size}` : ''}`}>{children}</div>;
};

Row.propTypes = {
  size: PropTypes.string,
}

export default Row;
