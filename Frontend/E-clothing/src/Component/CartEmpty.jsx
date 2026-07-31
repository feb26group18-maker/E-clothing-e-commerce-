import { useNavigate } from "react-router-dom";
import "./CartEmpty.css";

export default function CartEmpty() {
  const navigate = useNavigate();

  return (
    <div className="cart-container">
      <img
        className="cart-img"
        src="https://cdn-icons-png.flaticon.com/512/2038/2038854.png"
        alt="empty cart"
      />

      <h2>No products in your cart</h2>

      <p>Not sure where to start?</p>

      <button
        className="cart-btn"
        onClick={() => navigate("/login")}
      >
        EXPLORE PRODUCTS
      </button>
    </div>
  );
}