import { Link, useNavigate, useLocation } from "react-router-dom";
import { useAuth } from "../auth/AuthContext";

const Navbar = () => {
  const { token, logout } = useAuth();
  const navigate = useNavigate();
  const location = useLocation();

  const handleLogout = () => {
    logout();
    navigate("/login");
  };

  const isActive = (path) =>
    location.pathname === path
      ? "border-bottom border-2 border-primary pb-1"
      : "pb-1";

  return (
    <nav className="navbar navbar-expand-lg navbar-dark bg-dark">
      <div className="container">
        <Link className="navbar-brand" to="/">Task Manager</Link>

        <button
          className="navbar-toggler"
          type="button"
          data-bs-toggle="collapse"
          data-bs-target="#navMenu"
        >
          <span className="navbar-toggler-icon"></span>
        </button>

        <div
          className="collapse navbar-collapse justify-content-center justify-content-lg-end"
          id="navMenu"
        >
          {token ? (
            <>
              {/* mobile menu (after login) */}
              <div className="d-lg-none d-flex flex-column align-items-center gap-2 mt-3">
                <Link className={`nav-link text-white ${isActive("/")}`} to="/">Tasks</Link>
                <Link className={`nav-link text-white ${isActive("/dashboard")}`} to="/dashboard">Dashboard</Link>
                <span
                  className="nav-link text-danger fw-bold"
                  style={{ cursor: "pointer" }}
                  onClick={handleLogout}
                >
                  Logout
                </span>
              </div>

              {/* desktop menu (after login) */}
              <div className="d-none d-lg-flex align-items-center gap-2">
                <Link className="btn btn-outline-light" to="/">Tasks</Link>
                <Link className="btn btn-outline-light" to="/dashboard">Dashboard</Link>
                <button className="btn btn-danger" onClick={handleLogout}>Logout</button>
              </div>
            </>
          ) : (
            <>
              {/* mobile menu (before login) */}
              <div className="d-lg-none d-flex flex-column align-items-center gap-2 mt-3">
                <Link className={`nav-link text-white ${isActive("/login")}`} to="/login">Login</Link>
                <Link className={`nav-link text-white ${isActive("/register")}`} to="/register">Register</Link>
              </div>

              {/* desktop menu (before login) */}
              <div className="d-none d-lg-flex align-items-center gap-2">
                <Link className="btn btn-outline-light" to="/login">Login</Link>
                <Link className="btn btn-success" to="/register">Register</Link>
              </div>
            </>
          )}
        </div>
      </div>
    </nav>
  );
};

export default Navbar;
