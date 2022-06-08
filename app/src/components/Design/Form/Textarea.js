import PropTypes from "prop-types";

const Textarea = ({
  name,
  disabled,
  value,
  onChange,
  onBlur,
  children,
  error,
  ...rest
}) => {
  return (
    <>
      <textarea
        className={`form-control border-primary ${error ? "is-invalid" : ""}`}
        name={name}
        disabled={disabled}
        value={value}
        onChange={onChange}
        onBlur={onBlur}
        {...rest}
      />
      {children}
      {error && <div className="invalid-feedback d-block"> {error} </div>}
    </>
  );
};

Textarea.propTypes = {
  name: PropTypes.string.isRequired,
  disabled: PropTypes.bool,
  onChange: PropTypes.func.isRequired,
  onBlur: PropTypes.func,
};

export default Textarea;
