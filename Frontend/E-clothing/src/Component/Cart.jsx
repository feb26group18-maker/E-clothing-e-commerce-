import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import "./Cart.css";
import CartEmpty from "./CartEmpty";
import { getCart } from "../services/cartService";
import { getProductById } from "../services/productService";

export default function Cart() {

    const [cartItems, setCartItems] = useState([]);

    const user = JSON.parse(localStorage.getItem("user"));

    const navigate = useNavigate();

    // ----------------------------------------------------
    // Load Cart
    // ----------------------------------------------------

    useEffect(() => {

        const loadCart = async () => {

            if (!user) return;

            try {

                const data = await getCart(user.customerId);

                console.log("Cart from backend:", data);

                const cartWithProducts = await Promise.all(

                    data.map(async (item) => {

                        const response =
                            await getProductById(item.productId);

                        return {

                            // Product details first
                            ...response.data,

                            // Cart item details after
                            // so cart size remains correct
                            ...item,

                            qty: item.quantity,

                            id: item.productId,

                            name: response.data.productName,

                            brand: response.data.categoryName,

                            image:
                                response.data.imageUrls?.[0]

                        };

                    })

                );

                setCartItems(cartWithProducts);

                localStorage.setItem(
                    "cart",
                    JSON.stringify(cartWithProducts)
                );

            } catch (error) {

                console.log(
                    "Cart loading error:",
                    error
                );

            }

        };

        loadCart();

    }, []);

    // ----------------------------------------------------
    // Save Cart
    // ----------------------------------------------------

    const saveCart = (updatedCart) => {

        setCartItems(updatedCart);

        localStorage.setItem(
            "cart",
            JSON.stringify(updatedCart)
        );

    };

    // ----------------------------------------------------
    // Remove Product
    // ----------------------------------------------------

    const removeItem = (id, size) => {

        const updated = cartItems.filter(

            item =>
                !(item.id === id && item.size === size)

        );

        saveCart(updated);

    };

    // ----------------------------------------------------
    // Price Details
    // ----------------------------------------------------

    const totalMRP = cartItems.reduce(

        (sum, item) =>

            sum + item.price * item.qty,

        0

    );

    // No discount
    const delivery = 0;

    // Simple calculation
    const totalAmount =
        totalMRP + delivery;

    // ----------------------------------------------------

    if (!user) {

        return (

            <h2
                style={{
                    textAlign: "center",
                    marginTop: "80px"
                }}
            >
                Please Login First
            </h2>

        );

    }

    if (cartItems.length === 0) {

        return <CartEmpty />;

    }

    // ----------------------------------------------------
    // UI
    // ----------------------------------------------------

    return (

        <div className="cart-page">

            <div className="cart-header">

                <div>

                    <h1>Shopping Bag</h1>

                    <p>
                        {cartItems.length} Items
                    </p>

                </div>

            </div>

            <div className="cart-content">

                {/* Left Side */}

                <div className="cart-left">

                    {
                        cartItems.map(item => (

                            <div
                                className="cart-card"
                                key={`${item.id}-${item.size}`}
                            >

                                <div className="cart-image-box">

                                    <img
                                        src={item.image}
                                        alt={item.name}
                                    />

                                </div>

                                <div className="cart-details">

                                    <h3>
                                        {item.brand}
                                    </h3>

                                    <p>
                                        {item.name}
                                    </p>

                                    <h4>
                                        ₹{item.price}
                                    </h4>

                                    <p>

                                        <strong>
                                            Size :
                                        </strong>

                                        {" "}

                                        {item.size}

                                    </p>

                                    <div className="qty-section">

                                        <div className="qty-controls">

                                            <span className="qty-value">
                                                Quantity: {item.qty}
                                            </span>

                                        </div>

                                        <div className="item-total">

                                            ₹
                                            {item.price * item.qty}

                                        </div>

                                    </div>

                                    <div className="cart-actions">

                                        <button
                                            className="remove-btn"
                                            onClick={() =>
                                                removeItem(
                                                    item.id,
                                                    item.size
                                                )
                                            }
                                        >
                                            Remove
                                        </button>

                                    </div>

                                </div>

                            </div>

                        ))
                    }

                </div>

                {/* Right Side */}

                <div className="cart-right">

                    <div className="cart-summary">

                        <h3>
                            PRICE DETAILS
                        </h3>

                        <div className="summary-row">

                            <span>
                                Total MRP
                            </span>

                            <span>
                                ₹{totalMRP}
                            </span>

                        </div>

                        <div className="summary-row">

                            <span>
                                Delivery Charges
                            </span>

                            <span>
                                FREE
                            </span>

                        </div>

                        <div className="summary-total">

                            <span>
                                Total Amount
                            </span>

                            <span>
                                ₹{totalAmount}
                            </span>

                        </div>

                        {/* <button
                            className="place-order-btn"
                            onClick={() =>
                                navigate("/customer/address")
                            }
                        >
                            PLACE ORDER
                        </button> */}
                        <button
                            className="place-order-btn"
                            onClick={() => {
                                localStorage.setItem(
                                    "orderTotal",
                                    JSON.stringify({
                                        totalItems: cartItems.length,
                                        totalAmount: totalAmount
                                    })
                                );

                                navigate("/customer/address");
                            }}
                        >
                            PLACE ORDER
                        </button>

                    </div>

                </div>

            </div>

        </div>

    );

}
