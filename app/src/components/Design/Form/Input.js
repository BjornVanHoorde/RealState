import PropTypes from "prop-types"

const Input = ({
  type,
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
      <input
        className={`form-control border-primary ${error ? "is-invalid" : ""}`}
        type={type}
        name={name}
        disabled={disabled}
        value={value}
        onChange={onChange}
        onBlur={onBlur}
        {...rest}
      />
      {children}
      {error && <div className="invalid-feedback"> {error} </div>}
    </>
  );
};

Input.propTypes = {
  type: PropTypes.string,
  name: PropTypes.string.isRequired,
  disabled: PropTypes.bool,
  value: PropTypes.string,
  onChange: PropTypes.func.isRequired,
  onBlur: PropTypes.func,
}

export default Input;
