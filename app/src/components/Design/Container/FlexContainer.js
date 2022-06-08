import PropTypes from "prop-types";

const FlexContainer = ({ content, children }) => {
  return (
    <div className={`d-flex ${content ? `justify-content-${content}` : ""}`}>
      {children}
    </div>
  );
};

FlexContainer.propTypes = {
  content: PropTypes.oneOf(["start", "end", "center", "between", "around"]),
};

export default FlexContainer;
