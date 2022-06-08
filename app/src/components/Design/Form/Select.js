import PropTypes from "prop-types";

const Select = ({ options = [], error, name, disabled, value, onChange }) => {
  return (
    <>
      <select
        className={`form-control border-dark ${error ? "is-invalid" : ""}`}
        name={name}
        disabled={disabled}
        value={String(value) || ""}
        onChange={onChange}
      >
        <option></option>
        {options &&
          options.map((option) => (
            <option key={option.value} value={option.value}>
              {option.label}
            </option>
          ))}
      </select>
      {error && <div className="invalid-feedback">{error}</div>}
    </>
  );
};

Select.propTypes = {
  label: PropTypes.string,
  name: PropTypes.string.isRequired,
  value: PropTypes.oneOfType([PropTypes.string, PropTypes.number]),
  options: PropTypes.arrayOf(
    PropTypes.shape({
      value: PropTypes.oneOfType([PropTypes.string, PropTypes.number]),
      label: PropTypes.string,
    })
  ),
  disabled: PropTypes.bool,
  onChange: PropTypes.func.isRequired,
};

export default Select;
