import { Link } from "react-router-dom";
import PropTypes from "prop-types";

const NavBar = ({ navItems }) => {
  return (
    <nav className="navbar navbar-dark navbar-expand-lg">
      <ul className="navbar-nav">
        {navItems.map((navItem) => (
          <li className="nav-item mx-2" key={navItem.href}>
            <Link
              className={`nav-link ${navItem.isActive ? "active" : ""}`}
              to={navItem.href}
            >
              {navItem.label}
            </Link>
          </li>
        ))}
      </ul>
    </nav>
  );
};

NavBar.propTypes = {
  navItems: PropTypes.arrayOf(
    PropTypes.shape({
      to: PropTypes.string,
      isActive: PropTypes.bool,
      label: PropTypes.string,
    })
  ).isRequired,
};

export default NavBar;
