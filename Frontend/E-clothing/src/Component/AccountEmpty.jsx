import { useNavigate } from "react-router-dom";
import "./AccountEmpty.css";

export default function AccountEmpty() {
  const navigate = useNavigate();

  return (
    <div className="account-container">
      <img
        className="account-img"
        src="https://cdn-icons-png.flaticon.com/512/847/847969.png"
        alt="account"
      />

      <h2>Welcome</h2>
      <p>
        To access account and manage orders
      </p>
      <button
        className="account-btn"
        onClick={() => navigate("/login")}
      >
        LOGIN
      </button>
    </div>
  );
}