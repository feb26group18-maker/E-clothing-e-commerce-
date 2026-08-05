// import { useEffect, useState } from "react";
// import { useLocation, useNavigate } from "react-router-dom";
// import "./CustomerOrderDetails.css";
// import { getProductById } from "../services/productService";
// import { getCustomerProfile } from "../services/customerService";

// export default function CustomerOrderDetails() {

//     const { state: order } = useLocation();
//     const navigate = useNavigate();



//     const [products, setProducts] = useState({});
//     const [loadingProducts, setLoadingProducts] = useState(true);

//     // ----------------------------------------
//     // Load Delivery Address
//     // ----------------------------------------

//     const address =
//         JSON.parse(
//             localStorage.getItem("deliveryAddress")
//         ) || {};

//     // ----------------------------------------
//     // Load Product Details
//     // ----------------------------------------

//     useEffect(() => {

//         const loadProducts = async () => {

//             if (!order?.items) {
//                 setLoadingProducts(false);
//                 return;
//             }

//             try {

//                 const productData = {};

//                 await Promise.all(

//                     order.items.map(async (item) => {

//                         try {

//                             const response =
//                                 await getProductById(
//                                     item.productId
//                                 );

//                             productData[item.productId] =
//                                 response.data;

//                         } catch (error) {

//                             console.error(
//                                 "Product loading error:",
//                                 item.productId,
//                                 error
//                             );

//                         }

//                     })

//                 );

//                 console.log(
//                     "Product Details:",
//                     productData
//                 );

//                 setProducts(productData);

//             } catch (error) {

//                 console.error(
//                     "Failed to load products:",
//                     error
//                 );

//             } finally {

//                 setLoadingProducts(false);

//             }

//         };

//         loadProducts();

//     }, [order]);


//     // ----------------------------------------
//     // No Order
//     // ----------------------------------------

//     if (!order) {

//         return (

//             <div className="order-details-page">

//                 <h2>No Order Found</h2>

//                 <button
//                     className="back-btn"
//                     onClick={() =>
//                         navigate("/orders")
//                     }
//                 >
//                     Back to My Orders
//                 </button>

//             </div>

//         );

//     }


//     // ----------------------------------------
//     // Page
//     // ----------------------------------------

//     return (

//         <div className="order-details-page">

//             {/* =================================
//                 HEADER
//             ================================= */}

//             <div className="order-header">

//                 <div>

//                     <h2>
//                         Order Details
//                     </h2>

//                     <p>
//                         Order #{order.orderId}
//                     </p>

//                 </div>

//                 <span className="status pending">

//                     {order.orderStatus || "Pending"}

//                 </span>

//             </div>


//             {/* =================================
//                 DELIVERY ADDRESS
//             ================================= */}

//             <div className="detail-card">

//                 <h3>
//                     Delivery Address
//                 </h3>

//                 {address.fullName ? (

//                     <>
//                         <p>
//                             <strong>
//                                 {address.fullName}
//                             </strong>
//                         </p>

//                         <p>
//                             {address.house}
//                         </p>

//                         <p>
//                             {address.city},{" "}
//                             {address.state}
//                         </p>

//                         <p>
//                             {address.pincode}
//                         </p>

//                         <p>
//                             Mobile : {address.mobile}
//                         </p>
//                     </>

//                 ) : (

//                     <p>
//                         Delivery address is not available.
//                     </p>

//                 )}

//             </div>


//             {/* =================================
//                 PRODUCTS
//             ================================= */}

//             <div className="detail-card">

//                 <h3>
//                     Ordered Products
//                 </h3>

//                 {loadingProducts ? (

//                     <p>
//                         Loading product details...
//                     </p>

//                 ) : (

//                     <table className="product-table">

//                         <thead>

//                             <tr>

//                                 <th>
//                                     Image
//                                 </th>

//                                 <th>
//                                     Product
//                                 </th>

//                                 <th>
//                                     Qty
//                                 </th>

//                                 <th>
//                                     Price
//                                 </th>

//                                 <th>
//                                     Total
//                                 </th>

//                             </tr>

//                         </thead>

//                         <tbody>

//                             {order.items?.map(
//                                 (item, index) => {

//                                     const product =
//                                         products[
//                                             item.productId
//                                         ];

//                                     const quantity =
//                                         item.quantity || 0;

//                                     const price =
//                                         Number(
//                                             item.price || 0
//                                         );

//                                     const itemTotal =
//                                         price * quantity;

//                                     return (

//                                         <tr
//                                             key={
//                                                 item.itemId ||
//                                                 index
//                                             }
//                                         >

//                                             {/* IMAGE */}

//                                             <td>

//                                                 <img
//                                                     src={
//                                                         product?.imageUrls?.[0]
//                                                             ? product.imageUrls[0]
//                                                             : "https://via.placeholder.com/70"
//                                                     }
//                                                     alt={
//                                                         product?.productName ||
//                                                         "Product"
//                                                     }
//                                                     className="product-image"
//                                                 />

//                                             </td>


//                                             {/* PRODUCT NAME */}

//                                             <td>

//                                                 {product?.productName ||
//                                                     `Product ID: ${item.productId}`}

//                                             </td>


//                                             {/* QUANTITY */}

//                                             <td>

//                                                 {quantity}

//                                             </td>


//                                             {/* PRICE */}

//                                             <td>

//                                                 ₹{price}

//                                             </td>


//                                             {/* ITEM TOTAL */}

//                                             <td>

//                                                 ₹{itemTotal}

//                                             </td>

//                                         </tr>

//                                     );

//                                 }

//                             )}

//                         </tbody>

//                     </table>

//                 )}

//             </div>


//             {/* =================================
//                 PAYMENT
//             ================================= */}

//             <div className="detail-card">

//                 <h3>
//                     Payment Details
//                 </h3>

//                 <div className="detail-grid">

//                     <div>

//                         <label>
//                             Payment Method
//                         </label>

//                         <span>
//                             Payment information
//                             available in payment record
//                         </span>

//                     </div>


//                     <div>

//                         <label>
//                             Order Date
//                         </label>

//                         <span>
//                             {order.orderDate
//                                 ? new Date(
//                                     order.orderDate
//                                 ).toLocaleString()
//                                 : "-"}
//                         </span>

//                     </div>


//                     <div>

//                         <label>
//                             Payment Status
//                         </label>

//                         <span className="paid-status">

//                             {order.paymentStatus ||
//                                 "Pending"}

//                         </span>

//                     </div>

//                 </div>

//             </div>


//             {/* =================================
//                 PRICE SUMMARY
//             ================================= */}

//             <div className="detail-card">

//                 <h3>
//                     Price Summary
//                 </h3>

//                 <div className="price-row">

//                     <span>
//                         Total Amount
//                     </span>

//                     <span>

//                         ₹
//                         {Number(
//                             order.totalAmount || 0
//                         )}

//                     </span>

//                 </div>

//             </div>


//             {/* =================================
//                 BUTTON
//             ================================= */}

//             <div className="button-group">

//                 <button
//                     className="back-btn"
//                     onClick={() =>
//                         navigate(
//                             "/orders"
//                         )
//                     }
//                 >
//                     ← Back to My Orders
//                 </button>

//             </div>

//         </div>

//     );

// }

import { useEffect, useState } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import "./CustomerOrderDetails.css";
import { getCustomerProfile } from "../services/customerService";
import { getPaymentByOrderId } from "../services/orderService";

export default function CustomerOrderDetails() {

    const { state: order } = useLocation();
    const navigate = useNavigate();

    // ----------------------------------------
    // Customer Address
    // ----------------------------------------

    const [address, setAddress] = useState({});
    const [loadingAddress, setLoadingAddress] = useState(true);

    const [payment, setPayment] = useState(null);
    const [loadingPayment, setLoadingPayment] = useState(true);

    // ----------------------------------------
    // Load Customer Address
    // ----------------------------------------

    useEffect(() => {

        const loadAddress = async () => {

            try {

                if (!order?.customerId) {

                    console.log(
                        "Customer ID not found in order"
                    );

                    setLoadingAddress(false);

                    return;
                }

                console.log(
                    "Fetching customer profile:",
                    order.customerId
                );

                const data =
                    await getCustomerProfile(
                        order.customerId
                    );

                console.log(
                    "Customer Profile:",
                    data
                );

                setAddress(data);

            } catch (error) {

                console.error(
                    "Failed to load customer address:",
                    error
                );

            } finally {

                setLoadingAddress(false);

            }

        };

        loadAddress();

    }, [order]);

    useEffect(() => {

        const loadPayment = async () => {

            try {

                if (!order?.orderId) {

                    console.log(
                        "Order ID not found"
                    );

                    setLoadingPayment(false);

                    return;
                }

                console.log(
                    "Fetching payment:",
                    order.orderId
                );

                const data =
                    await getPaymentByOrderId(
                        order.orderId
                    );

                console.log(
                    "Payment Details:",
                    data
                );

                setPayment(data);

            } catch (error) {

                console.error(
                    "Failed to load payment:",
                    error
                );

            } finally {

                setLoadingPayment(false);

            }

        };

        loadPayment();

    }, [order]);



    // ----------------------------------------
    // No Order
    // ----------------------------------------

    if (!order) {

        return (

            <div className="order-details-page">

                <h2>
                    No Order Found
                </h2>

                <button
                    className="back-btn"
                    onClick={() =>
                        navigate("/orders")
                    }
                >
                    Back to My Orders
                </button>

            </div>

        );

    }


    // ----------------------------------------
    // Products
    // ----------------------------------------

    const items = order.items || [];


    // ----------------------------------------
    // Total Amount
    // ----------------------------------------

    const totalAmount =
        Number(order.totalAmount) || 0;


    // ----------------------------------------
    // Order Status
    // ----------------------------------------

    const orderStatus =
        order.orderStatus || "Pending";


    // ----------------------------------------
    // Payment Status
    // ----------------------------------------

    const paymentStatus =
        order.paymentStatus || "Pending";


    // ----------------------------------------
    // Page
    // ----------------------------------------

    return (

        <div className="order-details-page">


            {/* =====================================
                HEADER
            ===================================== */}

            <div className="order-header">

                <div>

                    <h2>
                        Order Details
                    </h2>

                    <p>
                        Order #{order.orderId}
                    </p>

                </div>


                <span
                    className={`status ${orderStatus === "Delivered"
                            ? "delivered"
                            : "pending"
                        }`}
                >
                    {orderStatus}
                </span>

            </div>


            {/* =====================================
                DELIVERY ADDRESS
            ===================================== */}

            <div className="detail-card">

                <h3>
                    Delivery Address
                </h3>

                {loadingAddress ? (

                    <p>
                        Loading address...
                    </p>

                ) : (

                    <>

                        <p>
                            <strong>
                                {address.name}
                            </strong>
                        </p>

                        <p>
                            {address.address}
                        </p>

                        <p>
                            {address.city},{" "}
                            {address.state}
                        </p>

                        <p>
                            {address.pincode}
                        </p>

                        <p>
                            Mobile : {address.mobile}
                        </p>

                    </>

                )}

            </div>


            {/* =====================================
                ORDERED PRODUCTS
            ===================================== */}

            <div className="detail-card">

                <h3>
                    Ordered Products
                </h3>

                <table className="product-table">

                    <thead>

                        <tr>

                            <th>
                                Image
                            </th>

                            <th>
                                Product
                            </th>

                            <th>
                                Qty
                            </th>

                            <th>
                                Price
                            </th>

                            <th>
                                Total
                            </th>

                        </tr>

                    </thead>


                    <tbody>

                        {items.length === 0 ? (

                            <tr>

                                <td
                                    colSpan="5"
                                    style={{
                                        textAlign: "center"
                                    }}
                                >
                                    No products found
                                </td>

                            </tr>

                        ) : (

                            items.map(
                                (item, index) => {

                                    const quantity =
                                        Number(
                                            item.quantity ??
                                            item.qty
                                        ) || 0;

                                    const price =
                                        Number(
                                            item.price
                                        ) || 0;

                                    const itemTotal =
                                        price *
                                        quantity;

                                    return (

                                        <tr
                                            key={
                                                item.itemId ||
                                                index
                                            }
                                        >

                                            {/* Image */}

                                            <td>

                                                <img
                                                    src={
                                                        item.image ||
                                                        "https://via.placeholder.com/70"
                                                    }
                                                    alt={
                                                        item.name ||
                                                        "Product"
                                                    }
                                                    className="product-image"
                                                />

                                            </td>


                                            {/* Product */}

                                            <td>

                                                {item.name ||
                                                    `Product ID: ${item.productId}`}

                                            </td>


                                            {/* Quantity */}

                                            <td>

                                                {quantity}

                                            </td>


                                            {/* Price */}

                                            <td>

                                                ₹{price}

                                            </td>


                                            {/* Total */}

                                            <td>

                                                ₹{itemTotal}

                                            </td>

                                        </tr>

                                    );

                                }

                            )

                        )}

                    </tbody>

                </table>

            </div>



            {/* =====================================
    PAYMENT DETAILS
===================================== */}

            <div className="detail-card">

                <h3>
                    Payment Details
                </h3>

                {loadingPayment ? (

                    <p>
                        Loading payment details...
                    </p>

                ) : payment ? (

                    <div className="detail-grid">

                        {/* Payment Method */}

                        <div>

                            <label>
                                Payment Method
                            </label>

                            <span>
                                {payment.paymentMethod
                                    ? payment.paymentMethod
                                        .replaceAll("_", " ")
                                    : "N/A"}
                            </span>

                        </div>


                        {/* Payment Status */}

                        <div>

                            <label>
                                Payment Status
                            </label>

                            <span>
                                {payment.paymentStatus || "Pending"}
                            </span>

                        </div>


                        {/* Order Date */}

                        <div>

                            <label>
                                Order Date
                            </label>

                            <span>

                                {order.orderDate
                                    ? new Date(
                                        order.orderDate
                                    ).toLocaleString()
                                    : "N/A"}

                            </span>

                        </div>

                    </div>

                ) : (

                    <p>
                        Payment details not found.
                    </p>

                )}

            </div>



            {/* =====================================
                PRICE SUMMARY
            ===================================== */}

            <div className="detail-card">

                <h3>
                    Price Summary
                </h3>

                <div className="price-row">

                    <span>
                        Total Amount
                    </span>

                    <span>
                        ₹{totalAmount}
                    </span>

                </div>

            </div>


            {/* =====================================
                BUTTONS
            ===================================== */}

            <div className="button-group">

                <button
                    className="back-btn"
                    onClick={() =>
                        navigate(
                            "/orders"
                        )
                    }
                >
                    ← Back to My Orders
                </button>

            </div>

        </div>

    );

}
