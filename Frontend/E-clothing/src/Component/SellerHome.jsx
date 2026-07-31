import { useEffect, useState } from "react";
import "./SellerHome.css";
import { getProductCount } from "../services/productService";

export default function SellerHome() {
  const user = JSON.parse(localStorage.getItem("user"));

  const [totalProducts, setTotalProducts] = useState(0);
  useEffect(() => {
    loadProductCount();
  }, []);

  const loadProductCount = async () => {
    try {

      // Change this according to what you store in localStorage
      const sellerId = user.sellerId;

      const res = await getProductCount(sellerId);

      setTotalProducts(res.data);

    } catch (error) {
      console.log(error);
    }
  };

  return (
    <div className="seller-home">

      {/* Welcome Card */}
      <div className="seller-welcome-card">
        <h2>
          Welcome Back{" "}
          <span className="seller-name">
            {(user?.name?.charAt(0).toUpperCase() +
              user?.name?.slice(1)) || "Seller"}
          </span>
        </h2>

        <p>
          Manage your products, orders and inventory efficiently.
        </p>
      </div>

      {/* Statistics */}
      <div className="seller-stats-grid">

        <div className="seller-stat-card">
          <h4>Total Products</h4>
          <h2>{totalProducts}</h2>
        </div>

        {/* <div className="seller-stat-card">
          <h4>Active Products</h4>
          <h2>20</h2>
        </div> */}

        <div className="seller-stat-card">
          <h4>Pending Orders</h4>
          <h2>8</h2>
        </div>

        <div className="seller-stat-card">
          <h4>Completed Orders</h4>
          <h2>52</h2>
        </div>

      </div>

    </div>
  );
}