const AuthContainer = ({ children }) => {
  return (
    <div className="authContainer row bg-white position-absolute top-50 start-50 translate-middle p-5 border border-dark shadow p-3 mb-5 bg-body">
      {children}
    </div>
  );
};

export default AuthContainer;
