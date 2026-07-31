import { NavLink, Outlet, useNavigate } from "react-router-dom";
import { FaShoppingBag } from "react-icons/fa";
import "./SellerDashboard.css";
import FooterBottom from "./FooterBottom";

export default function SellerDashboard() {
  const user = JSON.parse(localStorage.getItem("user"));
  const navigate = useNavigate();

  const logout = () => {
    localStorage.clear();
    navigate("/login");
  };

  return (
    <div className="admin-layout">

      {/* Sidebar */}
      <aside className="sidebar">

        <span className="brand">
          <FaShoppingBag className="brand-icon" />
          <span className="brand-text">E-Clothing</span>
        </span>

        <nav className="menu">
          <NavLink end to="/seller">
            Dashboard
          </NavLink>

          <NavLink to="sellerproducts">
             Products
          </NavLink>

          <NavLink to="inventory">
             Inventory
          </NavLink>

          <NavLink to="orders">
             Orders
          </NavLink>

           <NavLink to="salesreport">
             Sales Report
          </NavLink>

          <NavLink to="profile">
            Profile
          </NavLink>

          <button onClick={logout} className="logout-btn">
            Logout
          </button>
        </nav>

      </aside>

      {/* Right Side */}
      <div className="main-area">

        {/* Topbar */}
        <header className="topbar">

          <div className="profile">
            <span>Welcome, {user?.name || "Seller"}</span>

            <div className="avatar">
              {user?.name?.charAt(0).toUpperCase() || "S"}
            </div>
          </div>

        </header>

        {/* Content */}
        <div className="page-content">
          <Outlet />
          <FooterBottom />
        </div>

      </div>

    </div>
  );
}
