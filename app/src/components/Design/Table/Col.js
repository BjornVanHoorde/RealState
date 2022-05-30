import PropTypes from "prop-types";

const Col = ({ size, children }) => {
  return <div className={`col${size ? `-${size}` : ''}`}>{children}</div>;
};

Col.propTypes = {
  size: PropTypes.string,
}

export default Col;
