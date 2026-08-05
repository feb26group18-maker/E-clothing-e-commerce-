import { NavLink, useNavigate } from "react-router-dom";

export default function Navbar() {
  const navigate = useNavigate();
  const user = JSON.parse(localStorage.getItem("user"));

  const handleWishlist = () => {
    if (user) {
      navigate("/wishlist");
    } else {
      navigate("/wishlist-login");
    }
  };

  const handleCart = () => {
    if (user) {
      navigate("/cart");
    } else {
      navigate("/cart-empty");
    }
  };

  const handleAccount = () => {
    if (user) {
      navigate("/account");
    } else {
      navigate("/account-empty");
    }
  };

  const logout = () => {
    localStorage.removeItem("user");
    window.location.href = "/";
  };

  return (
    <nav className="navbar">
      <div className="logo">
        <div className="logo-box">
          <i className="bi bi-bag-heart-fill"></i>
        </div>

        <div className="logo-text">
          <h2>
            Fashion<span>Hub</span>
          </h2>
          <p>Premium Fashion Store</p>
        </div>
      </div>

      <div className="nav-categories">
        <NavLink to="/men" className="nav-category">
          Men
        </NavLink>

        <NavLink to="/women" className="nav-category">
          Women
        </NavLink>

        <NavLink to="/kids" className="nav-category">
          Kids
        </NavLink>
      </div>

      <div className="nav-right">
        <div className="nav-icon" onClick={handleWishlist}>
          <i className="bi bi-heart"></i>
          <span>Wishlist</span>
        </div>

        <div className="nav-icon" onClick={handleCart}>
          <i className="bi bi-cart3"></i>
          <span>Cart</span>
        </div>

        <div className="nav-icon" onClick={handleAccount}>
          <i className="bi bi-person-circle"></i>
          <span>Account</span>
        </div>

        {!user && (
          <div className="nav-icon" onClick={() => navigate("/login")}>
            <i className="bi bi-box-arrow-in-right"></i>
            <span>Login</span>
          </div>
        )}

        {user && (
          <div className="nav-icon" onClick={logout}>
            <i className="bi bi-box-arrow-right"></i>
            <span>Logout</span>
          </div>
        )}
      </div>
    </nav>
  );
}