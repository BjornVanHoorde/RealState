import PropTypes from "prop-types";

const Label = ({ children, htmlFor }) => {
  return (
    <label htmlFor={htmlFor} className="form-label d-block mb-0">
      {children}
    </label>
  );
};

Label.propTypes = {
  htmlFor: PropTypes.string,
};

export default Label;
