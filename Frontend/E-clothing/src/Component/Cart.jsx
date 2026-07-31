import { useEffect, useState } from "react";
import CartEmpty from "./CartEmpty";
import "./Cart.css";


export default function Cart() {
  const [cartItems, setCartItems] = useState([]);

  const user = JSON.parse(localStorage.getItem("user"));

  useEffect(() => {
    if (!user) return;

    const storedCart = JSON.parse(localStorage.getItem("cart")) || [];

    setCartItems(storedCart);
  }, []);

  // If not logged in → redirect UI or message
  if (!user) {
    return (
      <div style={{ textAlign: "center", marginTop: "50px" }}>
        <h2>Please login to view your cart</h2>
      </div>
    );
  }

  return (
    <div>
      {cartItems.length > 0 ? (
        <div>
          <h2>Your Cart Items</h2>

          {cartItems.map((item, index) => (
            <div key={index}>
              <h4>{item.name}</h4>
              <p>Price: {item.price}</p>
            </div>
          ))}
        </div>
      ) : (
        <CartEmpty />
      )}
    </div>
  );
}