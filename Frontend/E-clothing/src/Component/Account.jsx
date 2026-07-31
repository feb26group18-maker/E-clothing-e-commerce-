import "./Account.css";
import { useNavigate } from "react-router-dom";

export default function Account() {
  const navigate = useNavigate();
  const user = JSON.parse(localStorage.getItem("user"));

  if (!user) {
    navigate("/account-empty");
    return null;
  }

  return (
    <div className="account-page">
      {/* Profile Header */}
      <div className="profile-header">
        <img
          src="https://cdn-icons-png.flaticon.com/512/3135/3135715.png"
          alt="Profile"
          className="profile-pic"
        />

        <div>
          <h1>Hello, {user.name} 👋</h1>
          <p>Welcome back to your account</p>
        </div>
      </div>

      {/* Personal Information */}
      <div className="details-card">
        <h2>Personal Information</h2>

        <div className="detail-row">
          <span>Name</span>
          <span>{user.name}</span>
        </div>

        <div className="detail-row">
          <span>Email</span>
          <span>{user.email}</span>
        </div>

        <div className="detail-row">
          <span>Role</span>
          {/* <span>{user.role === 3 ? "Customer" : "Admin"}</span> */}
          <span>{user.role}</span>
        </div>
      </div>

      {/* Quick Actions */}
      <div className="feature-grid">
        <div
          className="feature-card"
          onClick={() => navigate("/orders")}
        >
          <i className="bi bi-bag-check"></i>
          <h3>My Orders</h3>
          <p>Track your purchases</p>
        </div>

        <div
          className="feature-card"
          onClick={() => navigate("/wishlist")}
        >
          <i className="bi bi-heart"></i>
          <h3>Wishlist</h3>
          <p>Your favourite products</p>
        </div>
      </div>

      {/* Buttons */}
      <div className="btn-section">
        <button
          className="dashboard-btn"
          onClick={() => navigate("/user")}
        >
          Back to Dashboard
        </button>

        <button
          className="logout-btn"
          onClick={() => {
            localStorage.removeItem("user");
            navigate("/");
          }}
        >
          Logout
        </button>
      </div>
    </div>
  );
}