import "./DashboardHome.css";

export default function DashboardHome() {
  const user = JSON.parse(localStorage.getItem("user"));

  return (
    <div className="dashboard-home">

      <div className="welcome-card">
        <h2>
          Welcome Back{" "}
          <span className="admin-name">
            {(user?.name?.charAt(0).toUpperCase() + user?.name?.slice(1)) || "Admin"}
          </span>{" "}
        </h2>
        <p>
          Manage products, customers, sellers and orders.
        </p>
      </div>

      <div className="stats-grid">

        <div className="stat-card">
          <h4>Total Products</h4>
          <h2>120</h2>
        </div>

        <div className="stat-card">
          <h4>Total Orders</h4>
          <h2>84</h2>
        </div>

        <div className="stat-card">
          <h4>Customers</h4>
          <h2>56</h2>
        </div>

        <div className="stat-card">
          <h4>Sellers</h4>
          <h2>12</h2>
        </div>

      </div>

    </div>
  );
}