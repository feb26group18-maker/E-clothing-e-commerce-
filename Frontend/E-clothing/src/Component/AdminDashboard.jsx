import { NavLink, Outlet, useNavigate } from "react-router-dom";
import { FaShoppingBag } from "react-icons/fa";
import "./AdminDashboard.css";
import FooterBottom from "./FooterBottom";

export default function AdminDashboard() {
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
          <span className="brand-text"> E-Clothing</span>
        </span>

        <nav className="menu">
          <NavLink end to="/admin">Dashboard</NavLink>
          <NavLink to="sellers">Sellers</NavLink>
          <NavLink to="customers">Customers</NavLink>
          <NavLink to="products">Products</NavLink>
          <NavLink to="categories">Category</NavLink>
          <NavLink to="orders">Orders</NavLink>
          {/* <NavLink to="reports">Reports</NavLink> */}

          <button onClick={logout} className="logout-btn">
            Logout
          </button>
        </nav>
      </aside>

      {/* Right Side */}
      <div className="main-area">

        {/* Top Navbar */}
        <header className="topbar">

          {/* <input
            type="text"
            placeholder="Search..."
            className="search-box"
          /> */}

          <div className="profile">
            <span>Admin</span>
            <div className="avatar">A</div>
          </div>

        </header>

        {/* Page Content */}
        <div className="page-content">
          <Outlet />
          <FooterBottom/>
        </div>

      </div>
    </div>
  );
}