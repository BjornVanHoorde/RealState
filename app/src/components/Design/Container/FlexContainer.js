const FlexContainer = ({ content, children }) => {
  return <div className={`d-flex ${content ? `justify-content-${content}` : ""}`}>{children}</div>;
};

export default FlexContainer;