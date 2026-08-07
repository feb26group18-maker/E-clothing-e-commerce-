// // import { useState } from "react";
// // import Breadcrumb from "./Breadcrumb";
// // import "./ProductList.css";

// // export default function OrderList() {

// //   const [orders] = useState([]);

// //   return (
// //     <div className="product-page">

// //       <Breadcrumb
// //         items={[
// //           { label: "Admin", path: "/admin" },
// //           { label: "Orders", path: "/admin/orders" },
// //           { label: "Order List" },
// //         ]}
// //       />

// //       <div className="product-card">

// //         <table className="product-table">

// //           <thead>
// //             <tr>
// //               <th>Order ID</th>
// //               <th>Customer ID</th>
// //               <th>Order Date</th>
// //               <th>Total Amount</th>
// //               <th>Order Status</th>
// //               <th>Payment Status</th>
// //               <th>Actions</th>
// //             </tr>
// //           </thead>

// //           <tbody>

// //             {orders.length === 0 && (
// //               <tr>
// //                 <td colSpan="7" style={{ textAlign: "center" }}>
// //                   No Orders Found
// //                 </td>
// //               </tr>
// //             )}

// //           </tbody>

// //         </table>

// //       </div>

// //     </div>
// //   );
// // }

// import { useEffect, useState } from "react";
// import Breadcrumb from "./Breadcrumb";
// import "./ProductList.css";
// import { getAllOrders } from "../services/OrderService";

// export default function OrderList() {

//     const [orders, setOrders] = useState([]);

//     useEffect(() => {
//         loadOrders();
//     }, []);

//     const loadOrders = async () => {

//         try {

//             const response = await getAllOrders();

//             setOrders(response.data);

//         } catch (err) {

//             console.error(err);

//         }

//     };

//     return (
//         <div className="product-page">

//             <Breadcrumb
//                 items={[
//                     { label: "Admin", path: "/admin" },
//                     { label: "Orders", path: "/admin/orders" },
//                     { label: "Order List" }
//                 ]}
//             />

//             <div className="product-card">

//                 <table className="product-table">

//                     <thead>

//                         <tr>

//                             <th>Order ID</th>
//                             <th>Customer ID</th>
//                             <th>Order Date</th>
//                             <th>Total</th>
//                             <th>Order Status</th>
//                             <th>Payment Status</th>

//                         </tr>

//                     </thead>

//                     <tbody>

//                         {orders.map((order) => (

//                             <tr key={order.orderId}>

//                                 <td>#{order.orderId}</td>

//                                 <td>{order.customerId}</td>

//                                 <td>{order.orderDate}</td>

//                                 <td>₹{order.totalAmount}</td>

//                                 <td>
//                                     <span className={`status-badge ${order.orderStatus.toLowerCase()}`}>
//                                         {order.orderStatus}
//                                     </span>
//                                 </td>

//                                 <td>
//                                     <span className={`status-badge ${order.paymentStatus.toLowerCase()}`}>
//                                         {order.paymentStatus}
//                                     </span>
//                                 </td>

//                             </tr>

//                         ))}

//                         {orders.length === 0 && (

//                             <tr>

//                                 <td colSpan="6" style={{ textAlign: "center" }}>
//                                     No Orders Found
//                                 </td>

//                             </tr>

//                         )}

//                     </tbody>

//                 </table>

//             </div>

//         </div>
//     );



// }




// import { useState } from "react";
// import Breadcrumb from "./Breadcrumb";
// import "./ProductList.css";

// export default function OrderList() {

//   const [orders] = useState([]);

//   return (
//     <div className="product-page">

//       <Breadcrumb
//         items={[
//           { label: "Admin", path: "/admin" },
//           { label: "Orders", path: "/admin/orders" },
//           { label: "Order List" },
//         ]}
//       />

//       <div className="product-card">

//         <table className="product-table">

//           <thead>
//             <tr>
//               <th>Order ID</th>
//               <th>Customer ID</th>
//               <th>Order Date</th>
//               <th>Total Amount</th>
//               <th>Order Status</th>
//               <th>Payment Status</th>
//               <th>Actions</th>
//             </tr>
//           </thead>

//           <tbody>

//             {orders.length === 0 && (
//               <tr>
//                 <td colSpan="7" style={{ textAlign: "center" }}>
//                   No Orders Found
//                 </td>
//               </tr>
//             )}

//           </tbody>

//         </table>

//       </div>

//     </div>
//   );
// }

import { useEffect, useState } from "react";
import Breadcrumb from "./Breadcrumb";
import "./ProductList.css";
import { getAllOrders } from "../services/OrderService";

export default function OrderList() {

    const [orders, setOrders] = useState([]);

    useEffect(() => {
        loadOrders();
    }, []);

    const loadOrders = async () => {

        try {

            const response = await getAllOrders();

            setOrders(response.data);

        } catch (err) {

            console.error(err);

        }

    };

    return (
        <div className="product-page">

            <Breadcrumb
                items={[
                    { label: "Admin", path: "/admin" },
                    { label: "Orders", path: "/admin/orders" },
                    { label: "Order List" }
                ]}
            />

            <div className="product-card">

                <table className="product-table">

                    <thead>

                        <tr>

                            <th>Order ID</th>
                            <th>Customer ID</th>
                            <th>Order Date</th>
                            <th>Total</th>
                            <th>Order Status</th>
                            <th>Payment Status</th>

                        </tr>

                    </thead>

                    <tbody>

                        {orders.map((order) => (

                            <tr key={order.orderId}>

                                <td>#{order.orderId}</td>

                                <td>{order.customerId}</td>

                                <td>{order.orderDate}</td>

                                <td>₹{order.totalAmount}</td>

                                <td>
                                    <span className={`status-badge ${order.orderStatus.toLowerCase()}`}>
                                        {order.orderStatus}
                                    </span>
                                </td>

                                <td>
                                    <span className={`status-badge ${order.paymentStatus.toLowerCase()}`}>
                                        {order.paymentStatus}
                                    </span>
                                </td>

                            </tr>

                        ))}

                        {orders.length === 0 && (

                            <tr>

                                <td colSpan="6" style={{ textAlign: "center" }}>
                                    No Orders Found
                                </td>

                            </tr>

                        )}

                    </tbody>

                </table>

            </div>

        </div>
    );
}