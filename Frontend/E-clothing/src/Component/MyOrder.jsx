import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import "./MyOrder.css";

import {
    getCustomerOrders,
    getOrderItems
} from "../services/orderService";

import { getProductById } from "../services/productService";


export default function MyOrder() {

    const navigate = useNavigate();

    // ----------------------------------------
    // State
    // ----------------------------------------

    const [orders, setOrders] = useState([]);
    const [loading, setLoading] = useState(true);


    // ----------------------------------------
    // Load Orders
    // ----------------------------------------

    useEffect(() => {

        const loadOrders = async () => {

            try {

                // Get logged-in user
                const user =
                    JSON.parse(
                        localStorage.getItem("user")
                    );


                if (!user?.customerId) {

                    console.log(
                        "Customer ID not found"
                    );

                    setLoading(false);

                    return;
                }


                // ========================================
                // STEP 1
                // Get customer's orders
                // ========================================

                const orderData =
                    await getCustomerOrders(
                        user.customerId
                    );


                console.log(
                    "Customer Orders:",
                    orderData
                );


                // ========================================
                // STEP 2
                // Get items for every order
                // ========================================

                const ordersWithItems =
                    await Promise.all(

                        orderData.map(
                            async (order) => {

                                const items =
                                    await getOrderItems(
                                        order.orderId
                                    );


                                console.log(
                                    `Items for Order ${order.orderId}:`,
                                    items
                                );


                                // ========================================
                                // STEP 3
                                // Get Product Details
                                // ========================================

                                const itemsWithProducts =
                                    await Promise.all(

                                        items.map(
                                            async (item) => {

                                                try {

                                                    const productResponse =
                                                        await getProductById(
                                                            item.productId
                                                        );


                                                    const product =
                                                        productResponse.data;


                                                    console.log(
                                                        "Product Details:",
                                                        product
                                                    );


                                                    return {

                                                        // Existing order item data
                                                        ...item,


                                                        // Product name
                                                        productName:
                                                            product.productName,


                                                        // Product size
                                                        size:
                                                            product.size,


                                                        // First product image
                                                        image:
                                                            product.imageUrls &&
                                                                product.imageUrls.length > 0
                                                                ? product.imageUrls[0]
                                                                : null

                                                    };


                                                } catch (error) {

                                                    console.error(
                                                        `Failed to load product ${item.productId}:`,
                                                        error
                                                    );


                                                    // Return original item
                                                    // if product API fails
                                                    return item;

                                                }

                                            }
                                        )

                                    );


                                // Return complete order
                                return {

                                    ...order,

                                    items:
                                        itemsWithProducts

                                };

                            }
                        )

                    );


                console.log(
                    "Final Orders:",
                    ordersWithItems
                );


                // Save in state
                setOrders(
                    ordersWithItems
                );


            } catch (error) {

                console.error(
                    "Failed to load orders:",
                    error
                );

            } finally {

                setLoading(false);

            }

        };


        loadOrders();

    }, []);


    // ----------------------------------------
    // Loading
    // ----------------------------------------

    if (loading) {

        return (

            <div className="empty-orders">

                <h2>
                    Loading Orders...
                </h2>

            </div>

        );

    }


    // ----------------------------------------
    // No Orders
    // ----------------------------------------

    if (orders.length === 0) {

        return (

            <div className="myorder-page">

                <div className="empty-orders">

                    <div className="empty-icon">
                        📦
                    </div>


                    <h2>
                        No Orders Yet
                    </h2>


                    <p>
                        Looks like you haven't
                        placed any order.
                    </p>


                    <button
                        className="shop-btn"
                        onClick={() =>
                            navigate("/")
                        }
                    >
                        Continue Shopping
                    </button>

                </div>

            </div>

        );

    }


    // ----------------------------------------
    // Orders UI
    // ----------------------------------------

    return (

        <div className="myorder-page">


            {/* =====================================
                HEADER
            ===================================== */}

            <div className="myorder-header">

                <div>

                    <h1>
                        My Orders
                    </h1>

                    <p>
                        Track your recent orders
                    </p>

                </div>


                <div className="order-count">

                    {orders.length}

                    {" "}

                    {orders.length === 1
                        ? "Order"
                        : "Orders"}

                </div>

            </div>


            {/* =====================================
                ORDERS LIST
            ===================================== */}

            <div className="orders-list">

                {orders
                    .slice()
                    .reverse()
                    .map((order) => (

                        <div
                            className="order-card"
                            key={order.orderId}
                        >


                            {/* =================================
                                ORDER HEADER
                            ================================= */}

                            <div className="order-top">

                                <div>

                                    {/* <h3>
                                        Order #{order.orderId}
                                    </h3> */}
                                     <span
                                    className={`status ${order.orderStatus ===
                                            "Delivered"
                                            ? "delivered"
                                            : "pending"
                                        }`}
                                >

                                    {order.orderStatus}

                                </span>


                                    <p>

                                        {new Date(
                                            order.orderDate
                                        ).toLocaleString()}

                                    </p>

                                </div>


                               

                            </div>


                            <hr />


                            {/* =================================
                                ORDER INFORMATION
                            ================================= */}

                            <div className="order-info">


                                {/* Payment */}

                                <div>

                                    <label>
                                        Payment Status
                                    </label>

                                    <span>
                                        {order.paymentStatus}
                                    </span>

                                </div>


                                {/* Customer */}

                                {/* <div>

                                    <label>
                                        Customer ID
                                    </label>

                                    <span>
                                        {order.customerId}
                                    </span>

                                </div> */}


                                {/* Total */}

                                <div>

                                    <label>
                                        Total Amount
                                    </label>

                                    <span>
                                        ₹{order.totalAmount}
                                    </span>

                                </div>

                            </div>


                            {/* =================================
                                ORDER ITEMS
                            ================================= */}

                            <div className="product-preview">

                                <h4
                                    style={{
                                        marginBottom: "20px"
                                    }}
                                >
                                    Ordered Products
                                </h4>


                                {order.items?.map(
                                    (item) => (

                                        <div
                                            className="product-row"
                                            key={item.itemId}
                                        >


                                            {/* =================================
                                                PRODUCT IMAGE
                                            ================================= */}

                                            <img
                                                src={
                                                    item.image ||
                                                    "https://via.placeholder.com/80x100?text=Product"
                                                }
                                                alt={
                                                    item.productName ||
                                                    "Product"
                                                }
                                            />


                                            {/* =================================
                                                PRODUCT DETAILS
                                            ================================= */}

                                            <div>

                                                <h4>

                                                    {item.productName ||
                                                        `Product ID: ${item.productId}`}

                                                </h4>


                                                <p>

                                                    Size:
                                                    {" "}
                                                    {item.size ||
                                                        "N/A"}

                                                </p>


                                                <p>

                                                    Quantity:
                                                    {" "}
                                                    {item.quantity}

                                                </p>


                                                <p>

                                                    Price:
                                                    {" "}
                                                    ₹{item.price}

                                                </p>

                                            </div>

                                        </div>

                                    )
                                )}

                            </div>


                            {/* =================================
                                BUTTONS
                            ================================= */}

                            <div className="order-buttons">


                                <button
                                    className="details-btn"
                                    onClick={() =>
                                        navigate(
                                            `/customer/order-details/${order.orderId}`,
                                            {
                                                state: order
                                            }
                                        )
                                    }
                                >
                                    View Details
                                </button>


                            </div>


                        </div>

                    ))}

            </div>

        </div>

    );

}
