export default function Dashboard() {
  return (
    <div>
      <h2 style={{ color: "#ff3f6c" }}>Admin Dashboard</h2>

      <div style={{ display: "flex", gap: "20px", marginTop: "20px" }}>

        <div className="card">
          <h3>Users</h3>
          <p>1200</p>
        </div>

        <div className="card">
          <h3>Products</h3>
          <p>450</p>
        </div>

        <div className="card">
          <h3>Orders</h3>
          <p>320</p>
        </div>

      </div>
    </div>
  );
}