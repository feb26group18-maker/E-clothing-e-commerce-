import { useNavigate } from "react-router-dom";
import "./WishlistLogin.css";

export default function WishlistLogin() {
  const navigate = useNavigate();

  return (
    <div className="wishlist-container">
      <img
        className="wishlist-img"
        src="https://cdn-icons-png.flaticon.com/512/2038/2038854.png"
        alt="empty wishlist"
      />

      <h2>Hey, it feels so light!</h2>

      <p>There is nothing in your bag. Let’s add some items.</p>

      <button
        className="wishlist-btn"
        onClick={() => navigate("/login")}
      >
        ADD ITEMS FROM WISHLIST
      </button>
    </div>
  );
}