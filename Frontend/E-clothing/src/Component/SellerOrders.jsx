// import { useState } from "react";
// import { useNavigate } from "react-router-dom";
// import Breadcrumb from "./Breadcrumb";
// import "./SellerOrders.css";

// export default function SellerOrders() {

//   const navigate = useNavigate();

//   const [orders] = useState([
//     {
//       id: 101,
//       customer: "Amit Verma",
//       product: "Formal White Shirt",
//       quantity: 2,
//       amount: "₹2998",
//       date: "09 Jul 2026",
//       status: "Pending",
//       payment: "Paid"
//     },
//     {
//       id: 102,
//       customer: "Priya Singh",
//       product: "Printed T-Shirt",
//       quantity: 1,
//       amount: "₹799",
//       date: "10 Jul 2026",
//       status: "Shipped",
//       payment: "Paid"
//     },
//     {
//       id: 103,
//       customer: "Rohan Joshi",
//       product: "Kids Hoodie",
//       quantity: 1,
//       amount: "₹1199",
//       date: "11 Jul 2026",
//       status: "Delivered",
//       payment: "Pending"
//     }
//   ]);

//   return (
//     <div className="orders-page">

//       <Breadcrumb
//         items={[
//           { label: "Seller", path: "/seller" },
//           { label: "Orders", path: "/seller/orders" },
//           { label: "Manage Orders" }
//         ]}
//       />

//       <div className="orders-card">

//         <table className="orders-table">

//           <thead>
//             <tr>
//               <th>Order ID</th>
//               <th>Customer</th>
//               <th>Product</th>
//               <th>Qty</th>
//               <th>Amount</th>
//               <th>Date</th>
//               <th>Order Status</th>
//               <th>Action</th>
//             </tr>
//           </thead>

//           <tbody>

//             {orders.map((order) => (

//               <tr key={order.id}>

//                 <td>#{order.id}</td>

//                 <td>{order.customer}</td>

//                 <td>{order.product}</td>

//                 <td>{order.quantity}</td>

//                 <td>{order.amount}</td>

//                 <td>{order.date}</td>

//                 <td>
//                   <span className={`order-status ${order.status.toLowerCase()}`}>
//                     {order.status}
//                   </span>
//                 </td>

//                 <td>

//                   <div className="order-actions">

//                     <button
//                       className="view-btn"
//                       onClick={() => navigate(`/seller/orders/${order.id}`)}
//                     >
//                       View
//                     </button>

//                     <button
//                       className="update-btn"
//                       onClick={() => navigate(`/seller/orders/update/${order.id}`)}
//                     >
//                       Update
//                     </button>

//                   </div>

//                 </td>

//               </tr>

//             ))}

//           </tbody>

//         </table>

//       </div>

//     </div>
//   );
// }


import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { useSelector } from "react-redux";

import Breadcrumb from "./Breadcrumb";
import "./SellerOrders.css";

export default function SellerOrders() {

  const navigate = useNavigate();

  // Get logged-in seller from Redux
  const user = useSelector((state) => state.auth.user);

  const sellerId = user?.sellerId;

  const [orders, setOrders] = useState([]);

  const [loading, setLoading] = useState(true);

  const [error, setError] = useState("");


  // ==========================================
  // LOAD SELLER ORDERS
  // ==========================================

  useEffect(() => {

    if (!sellerId) {
      setLoading(false);
      setError("Seller ID not found.");
      return;
    }

    fetch(`http://localhost:8080/orders/seller/${sellerId}`)
      .then((response) => {

        if (!response.ok) {
          throw new Error("Failed to fetch seller orders");
        }

        return response.json();
      })
      .then((data) => {

        console.log("Seller Orders:", data);

        setOrders(data);

        setLoading(false);
      })
      .catch((error) => {

        console.error("Error loading seller orders:", error);

        setError("Unable to load orders.");

        setLoading(false);
      });

  }, [sellerId]);


  // ==========================================
  // LOADING
  // ==========================================

  if (loading) {

    return (
      <>
        <Breadcrumb
          items={[
            { label: "Seller", path: "/seller" },
            { label: "Orders", path: "/seller/orders" },
            { label: "Manage Orders" }
          ]}
        />

        <div className="orders-card">

          <p>Loading orders...</p>

        </div>
      </>
    );
  }


  // ==========================================
  // ERROR
  // ==========================================

  if (error) {

    return (
      <>
        <Breadcrumb
          items={[
            { label: "Seller", path: "/seller" },
            { label: "Orders", path: "/seller/orders" },
            { label: "Manage Orders" }
          ]}
        />

        <div className="orders-card">

          <p>{error}</p>

        </div>
      </>
    );
  }


const markAsDelivered = async (orderId) => {

  try {
    const token = localStorage.getItem("token");

const response = await fetch(
    `http://localhost:8080/orders/${orderId}/deliver`,
    {
        method: "PUT",
        headers: {
            "Authorization": `Bearer ${token}`
        }
    }
);

    // const response = await fetch(
    //   `http://localhost:8080/orders/${orderId}/deliver`,
    //   {
    //     method: "PUT"
    //   }
    // );

    if (!response.ok) {
      throw new Error("Failed to update order status");
    }

    const updatedOrder = await response.json();

    console.log("Order updated:", updatedOrder);

    setOrders((previousOrders) =>
      previousOrders.map((order) =>
        order.orderId === orderId
          ? {
              ...order,
              orderStatus: "Delivered"
            }
          : order
      )
    );

  } catch (error) {

    console.error(
      "Error updating order:",
      error
    );

    alert("Unable to update order status.");

  }
};



  return (

    <>

      {/* ==========================================
          BREADCRUMB
      ========================================== */}

      <Breadcrumb
        items={[
          { label: "Seller", path: "/seller" },
          { label: "Orders", path: "/seller/orders" },
          { label: "Manage Orders" }
        ]}
      />


      {/* ==========================================
          ORDERS TABLE
      ========================================== */}

      <div className="orders-card">

        <table className="orders-table">

          <thead>

            <tr>

              <th>Order ID</th>

              <th>Customer</th>

              <th>Product</th>

              <th>Qty</th>

              <th>Amount</th>

              <th>Date</th>

              <th>Order Status</th>

              <th>Action</th>

            </tr>

          </thead>


          <tbody>

            {orders.length === 0 ? (

              <tr>

                <td colSpan="8" style={{ textAlign: "center" }}>

                  No orders found.

                </td>

              </tr>

            ) : (

              orders.map((order) => (

                /*
                 * One order can contain multiple products.
                 * So we display each item as a separate row.
                 */

                order.items?.map((item) => (

                  <tr
                    key={`${order.orderId}-${item.itemId}`}
                  >

                    {/* ORDER ID */}

                    <td>
                      #{order.orderId}
                    </td>


                    {/* CUSTOMER */}

                    <td>
                      Customer #{order.customerId}
                    </td>


                    {/* PRODUCT */}

                    <td>

                      <div>

                        <strong>
                          {item.productName}
                        </strong>

                        <br />

                        <small>
                          Size: {item.size}
                        </small>

                      </div>

                    </td>


                    {/* QUANTITY */}

                    <td>
                      {item.quantity}
                    </td>


                    {/* AMOUNT */}

                    <td>
                      ₹{item.price}
                    </td>


                    {/* DATE */}

                    <td>

                      {new Date(
                        order.orderDate
                      ).toLocaleDateString("en-IN", {
                        day: "2-digit",
                        month: "short",
                        year: "numeric"
                      })}

                    </td>


                    {/* ORDER STATUS */}

                    <td>

                      <span
                        className={`order-status ${order.orderStatus?.toLowerCase()}`}
                      >
                        {order.orderStatus}
                      </span>

                    </td>


                    {/* ACTION */}

                    <td>

                      <div className="order-actions">
                        {/* 
                        <button
                          className="view-btn"
                          onClick={() =>
                            navigate(
                              `/seller/orders/${order.orderId}`
                            )
                          }
                        >
                          View
                        </button> */}



                        
                        <button
                          className="update-btn"
                          onClick={() => markAsDelivered(order.orderId)}
                          disabled={order.orderStatus === "Delivered"}
                        >
                          {order.orderStatus === "Delivered"
                            ? "Delivered"
                            : "Update"}
                        </button>
                        



                      </div>

                    </td>

                  </tr>

                ))

              ))

            )}

          </tbody>

        </table>

      </div>

    </>

  );
}