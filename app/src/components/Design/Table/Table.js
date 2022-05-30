const Table = ({ children }) => {
  return (
      <table className="table table-borderless">
          <tbody>{children}</tbody>
      </table>
  );
};

export default Table;