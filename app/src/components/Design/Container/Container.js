const Container = ({ className, onClick, children }) => {
    return <div onClick={onClick} className={`container ${className ? className : ''}`}>{children}</div>;
};

export default Container;