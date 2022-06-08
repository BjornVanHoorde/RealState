import PropTypes from "prop-types";

const Container = ({ className, onClick, children }) => {
  return (
    <div
      onClick={onClick}
      className={`container ${className ? className : ""}`}
    >
      {children}
    </div>
  );
};

Container.propTypes = {
  className: PropTypes.string,
  onClick: PropTypes.func,
};

export default Container;
