import { useEffect, useState } from "react";
import "./DashboardHome.css";

import { getSellerCount } from "../services/sellerService";
import { getCustomerCount } from "../services/customerService";
import { getProductCountt } from "../services/productService";
import { getOrderCount } from "../services/orderService";

export default function DashboardHome() {

  const user = JSON.parse(localStorage.getItem("user"));

  const [totalProducts, setTotalProducts] = useState(0);
  const [totalSellers, setTotalSellers] = useState(0);
  const [totalCustomers, setTotalCustomers] = useState(0);
  const [totalorder, setTotalOrder] = useState(0);

  useEffect(() => {
    loadProductCount();
    loadSellerCount();
    loadCustomerCount();
     loadOrderCount();
  }, []);

  // const loadProductCount = async () => {
  //   try {
  //     const response = await getTotalProductCount();
  //     setTotalProducts(response.data);
  //   } catch (error) {
  //     console.error("Error Loading Product Count", error);
  //   }
  // };

  const loadProductCount = async () => {

    try {

        const response = await getProductCountt();

        console.log("Product Count:", response.data);

        setTotalProducts(response.data);

    } catch (error) {

        console.error(
            "Error Loading Product Count",
            error
        );

    }

};


  const loadSellerCount = async () => {
    try {
      const response = await getSellerCount();
      setTotalSellers(response.data);
    } catch (error) {
      console.error("Error Loading Seller Count", error);
    }
  };

  const loadCustomerCount = async () => {
    try {
      const response = await getCustomerCount();
      setTotalCustomers(response.data);
    } catch (error) {
      console.error("Error Loading Customer Count", error);
    }
  };

 const loadOrderCount = async () => {
    try {
        const response = await getOrderCount();
       setTotalOrder(response.data);
    } catch (error) {
        console.error("Error Loading Order Count", error);
    }
};

  return (
    <div className="dashboard-home">

      <div className="welcome-card">
        <h2>
          Welcome {" "}
          <span className="admin-name">
            {(user?.name?.charAt(0).toUpperCase() +
              user?.name?.slice(1)) || "Admin"}
          </span>
        </h2>

        <p>
          Manage products, customers, sellers and orders.
        </p>
      </div>

      <div className="stats-grid">

         <div className="stat-card">
          <h4>Total Products</h4>
          <h2>{totalProducts}</h2>
        </div> 

        {/* <div className="stat-card">
          <h4>Total Orders</h4>
          <h3>{totalorder}</h3>
        </div> */}

        <div className="stat-card">
          <h4>Total Customers</h4>
          <h2>{totalCustomers}</h2>
        </div>

        <div className="stat-card">
          <h4>Total Sellers</h4>
          <h2>{totalSellers}</h2>
        </div>

      </div>

    </div>
  );
}