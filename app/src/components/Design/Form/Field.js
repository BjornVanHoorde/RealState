import PropTypes from "prop-types";

const Field = ({ password = false, children }) => {
  return <div className={`mb-3 ${password ? "d-flex" : ""}`}>{children}</div>;
};

Field.propTypes = {
  password: PropTypes.bool,
};

export default Field;
