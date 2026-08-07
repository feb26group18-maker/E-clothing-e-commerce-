// import { useEffect, useState } from "react";
// import "./SellerHome.css";
// import { getProductCount } from "../services/productService";

// export default function SellerHome() {
//   const user = JSON.parse(localStorage.getItem("user"));

//   const [totalProducts, setTotalProducts] = useState(0);
//   useEffect(() => {
//     loadProductCount();
//   }, []);

//   const loadProductCount = async () => {
//     try {

//       // Change this according to what you store in localStorage
//       const sellerId = user.sellerId;

//       const res = await getProductCount(sellerId);

//       setTotalProducts(res.data);

//     } catch (error) {
//       console.log(error);
//     }
//   };

//   return (
//     <div className="seller-home">

//       {/* Welcome Card */}
//       <div className="seller-welcome-card">
//         <h2>
//           Welcome Back{" "}
//           <span className="seller-name">
//             {(user?.name?.charAt(0).toUpperCase() +
//               user?.name?.slice(1)) || "Seller"}
//           </span>
//         </h2>

//         <p>
//           Manage your products, orders and inventory efficiently.
//         </p>
//       </div>

//       {/* Statistics */}
//       <div className="seller-stats-grid">

//         <div className="seller-stat-card">
//           <h4>Total Products</h4>
//           <h2>{totalProducts}</h2>
//         </div>

//         <div className="seller-stat-card">
//           <h4>Pending Orders</h4>
//           <h2>8</h2>
//         </div>

//         <div className="seller-stat-card">
//           <h4>Completed Orders</h4>
//           <h2>52</h2>
//         </div>

//       </div>

//     </div>
//   );
// }

import { useEffect, useState } from "react";
import "./SellerHome.css";
import { getProductCount } from "../services/productService";

export default function SellerHome() {

  const user = JSON.parse(localStorage.getItem("user"));

  // ==========================================
  // STATES
  // ==========================================

  const [totalProducts, setTotalProducts] = useState(0);

  const [pendingOrders, setPendingOrders] = useState(0);

  const [completedOrders, setCompletedOrders] = useState(0);


  // ==========================================
  // LOAD DASHBOARD DATA
  // ==========================================

  useEffect(() => {

    loadDashboardData();

  }, []);


  // ==========================================
  // LOAD PRODUCT + ORDER COUNTS
  // ==========================================

  const loadDashboardData = async () => {

    try {

      // const sellerId = user?.sellerId;

      // if (!sellerId) {
      //   console.log("Seller ID not found");
      //   return;
      // }


      // // ==========================================
      // // 1. TOTAL PRODUCTS
      // // ==========================================

      // const productResponse =
      //   await getProductCount(sellerId);

      // setTotalProducts(productResponse.data);
      const sellerId = user?.sellerId;

const productResponse =
    await getProductCount(sellerId);

setTotalProducts(productResponse.data);


      // ==========================================
      // 2. SELLER ORDERS
      // ==========================================

      const orderResponse =
        await fetch(
          `http://localhost:8080/orders/seller/${sellerId}`
        );


      if (!orderResponse.ok) {

        throw new Error(
          "Failed to fetch seller orders"
        );

      }


      const orders =
        await orderResponse.json();


      console.log(
        "Seller Dashboard Orders:",
        orders
      );


      // ==========================================
      // 3. PENDING ORDERS COUNT
      // ==========================================

      const pendingCount =
        orders.filter(
          (order) =>
            order.orderStatus === "Pending"
        ).length;


      setPendingOrders(pendingCount);


      // ==========================================
      // 4. COMPLETED ORDERS COUNT
      // ==========================================

      const completedCount =
        orders.filter(
          (order) =>
            order.orderStatus === "Delivered"
        ).length;


      setCompletedOrders(completedCount);


    } catch (error) {

      console.error(
        "Error loading seller dashboard:",
        error
      );

    }

  };


  // ==========================================
  // UI
  // ==========================================

  return (

    <>

      {/* ==========================================
          WELCOME CARD
      ========================================== */}

      <div className="seller-welcome-card">

        <h2>

          Welcome{" "}

          <span className="seller-name">

            {(user?.name?.charAt(0).toUpperCase() +
              user?.name?.slice(1)) || "Seller"}

          </span>

        </h2>


        <p>

          Manage your products, orders and inventory
          efficiently.

        </p>

      </div><br></br>


      {/* ==========================================
          STATISTICS
      ========================================== */}

      <div className="seller-stats-grid">


        {/* TOTAL PRODUCTS */}

        <div className="seller-stat-card">

          <h4>
            Total Products
          </h4>

          <h2>
            {totalProducts}
          </h2>

        </div>


        {/* PENDING ORDERS */}

        <div className="seller-stat-card">

          <h4>
            Pending Orders
          </h4>

          <h2>
            {pendingOrders}
          </h2>

        </div>


        {/* COMPLETED ORDERS */}

        <div className="seller-stat-card">

          <h4>
            Completed Orders
          </h4>

          <h2>
            {completedOrders}
          </h2>

        </div>


      </div>

    </>

  );

}
