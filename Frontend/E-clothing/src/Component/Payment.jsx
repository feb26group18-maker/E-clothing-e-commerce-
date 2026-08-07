import { useState } from "react";
import { useNavigate, useLocation } from "react-router-dom";
import "./Payment.css";
import { placeOrder } from "../services/orderService";
// import { clearCart } from "../services/cartService";

export default function Payment() {

    const navigate = useNavigate();
    const location = useLocation();

    // ----------------------------------------
    // Payment Method
    // ----------------------------------------

    const [paymentMethod, setPaymentMethod] = useState("");
    const [paymentDetails, setPaymentDetails] = useState({
        upiId: "",
        cardHolderName: "",
        cardNumber: "",
        expiry: "",
        cvv: ""
    });
    const handlePaymentDetailChange = (e) => {

        setPaymentDetails({
            ...paymentDetails,
            [e.target.name]: e.target.value
        });

    };

    // ----------------------------------------
    // Delivery Address
    // ----------------------------------------

    const address =
        JSON.parse(
            localStorage.getItem("deliveryAddress")
        ) || {};

    // ----------------------------------------
    // Cart
    // ----------------------------------------

    // const cart =
    //     JSON.parse(
    //         localStorage.getItem("cart")
    //     ) || [];

    // // ----------------------------------------
    // // Get data from Address.jsx
    // // ----------------------------------------

    // const totalItems =
    //     location.state?.totalItems || 0;

    // const totalAmount =
    //     location.state?.totalAmount || 0;
    const cart =
        JSON.parse(localStorage.getItem("cart")) || [];

    const orderTotal =
        JSON.parse(
            localStorage.getItem("orderTotal")
        ) || {
            totalItems: 0,
            totalAmount: 0
        };

    const totalItems = orderTotal.totalItems;

    const total = orderTotal.totalAmount;

    // ----------------------------------------
    // Logged-in User
    // ----------------------------------------

    const user =
        JSON.parse(
            localStorage.getItem("user")
        );

    // ----------------------------------------
    // Place Order
    // ----------------------------------------

    const handlePlaceOrder = async () => {

        try {

            // -----------------------------------
            // Get logged-in user
            // -----------------------------------

            const user =
                JSON.parse(localStorage.getItem("user"));

            if (!user?.customerId) {

                alert(
                    "Customer information not found. Please login again."
                );

                return;
            }


            // -----------------------------------
            // Check cart
            // -----------------------------------

            if (cart.length === 0) {

                alert("Your cart is empty.");

                return;
            }


            // -----------------------------------
            // Check payment method
            // -----------------------------------

            if (!paymentMethod) {

                alert(
                    "Please select a payment method."
                );

                return;
            }


            // -----------------------------------
            // UPI validation
            // -----------------------------------

            if (paymentMethod === "UPI") {

                if (!paymentDetails.upiId.trim()) {

                    alert(
                        "Please enter your UPI ID."
                    );

                    return;
                }
            }


            // -----------------------------------
            // Card validation
            // -----------------------------------


            if (
                paymentMethod === "Credit_Card" ||
                paymentMethod === "Debit_Card"
            ) {

                if (!paymentDetails.cardHolderName.trim()) {

                    alert("Please enter card holder name.");

                    return;
                }

                if (!paymentDetails.cardNumber.trim()) {

                    alert("Please enter card number.");

                    return;
                }

                if (paymentDetails.cardNumber.length !== 16) {

                    alert("Card number must be 16 digits.");

                    return;
                }

                if (!paymentDetails.expiry.trim()) {

                    alert("Please enter expiry date.");

                    return;
                }

                if (!paymentDetails.cvv.trim()) {

                    alert("Please enter CVV.");

                    return;
                }

                if (paymentDetails.cvv.length !== 3) {

                    alert("CVV must be 3 digits.");

                    return;
                }
            }



            // -----------------------------------
            // Prepare Order Items
            // -----------------------------------

            const items = cart.map((item) => ({

                productId:
                    item.productId || item.id,

                quantity:
                    item.qty,

                price:
                    item.price

            }));


            // -----------------------------------
            // Prepare Order Data
            // -----------------------------------

            const orderData = {

                customerId:
                    user.customerId,

                totalAmount:
                    total,

                paymentMethod:
                    paymentMethod,

                items:
                    items

            };


            console.log(
                "Sending order data:",
                orderData
            );


            // -----------------------------------
            // Call Backend
            // -----------------------------------

            const response =
                await placeOrder(orderData);


            console.log(
                "Order created:",
                response
            );

            // -----------------------------------
            // Clear backend cart
            // -----------------------------------

            // await clearCart(user.customerId);

            // console.log("Backend cart cleared successfully");


            // -----------------------------------
            // SUCCESS
            // -----------------------------------

            alert(
                "Payment Successful!\n\n" +
                "Order placed successfully!\n\n" +
                "Payment Method: " +
                paymentMethod +
                "\n" +
                "Total Amount: ₹" +
                total
            );


            // -----------------------------------
            // Clear Cart
            // -----------------------------------

            localStorage.removeItem(
                "cart"
            );

            // localStorage.removeItem(
            //     "deliveryAddress"
            // );

            localStorage.removeItem(
                "orderTotal"
            );


            // -----------------------------------
            // Go Home
            // -----------------------------------

            navigate("/");


        }
        // catch (error) {

        //     console.error(
        //         "Order placement error:",
        //         error
        //     );

        //     alert(
        //         "Failed to place order. Please try again."
        //     );

        // }
        catch (error) {

            console.error(
                "Order placement error:",
                error
            );

            // ----------------------------------------
            // Insufficient Stock
            // ----------------------------------------

            if (error.status === 409) {

                alert(
                    error.message
                );

                return;
            }

            // ----------------------------------------
            // Other Errors
            // ----------------------------------------

            alert(
                error.message ||
                "Failed to place order. Please try again."
            );
        }


    };

    // ----------------------------------------
    // Not Logged In
    // ----------------------------------------

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

    // ----------------------------------------
    // Payment Page
    // ----------------------------------------

    return (

        <div className="payment-page">

            <div className="payment-container">

                {/* ==================================
                    LEFT SECTION
                ================================== */}

                <div className="payment-left">

                    <h2>
                        Delivery Address
                    </h2>

                    <div className="address-box">

                        <h3>
                            {address.fullName}
                        </h3>

                        <p>
                            <strong>
                                House No :
                            </strong>{" "}
                            {address.house}
                        </p>

                        <p>
                            <strong>
                                City :
                            </strong>{" "}
                            {address.city}
                        </p>

                        <p>
                            <strong>
                                State :
                            </strong>{" "}
                            {address.state}
                        </p>

                        <p>
                            <strong>
                                Pincode :
                            </strong>{" "}
                            {address.pincode}
                        </p>

                        <p>
                            <strong>
                                Mobile :
                            </strong>{" "}
                            {address.mobile}
                        </p>

                    </div>


                    {/* ==================================
                        PAYMENT METHOD
                    ================================== */}

                    <h2>
                        Payment Method
                    </h2>

                    <div className="payment-options">

                        {/* Payment Method Dropdown */}

                        {/* <label>
        Select Payment Method
    </label> */}

                        {/* <select
                            value={paymentMethod}
                            onChange={(e) => setPaymentMethod(e.target.value)}
                            className="payment-select"
                        >
                            <option value="">
                                Select Payment Method
                            </option>

                            <option value="Cash On Delivery">
                                Cash On Delivery
                            </option>

                            <option value="UPI">
                                UPI
                            </option>

                            <option value="Credit Card">
                                Credit Card
                            </option>

                            <option value="Debit Card">
                                Debit Card
                            </option>
                        </select> */}


                        <select
                            value={paymentMethod}
                            onChange={(e) => setPaymentMethod(e.target.value)}
                            className="payment-select"
                        >
                            <option value="">
                                Select Payment Method
                            </option>

                            <option value="Cash_On_Delivery">
                                Cash On Delivery
                            </option>

                            <option value="UPI">
                                UPI
                            </option>

                            <option value="Credit_Card">
                                Credit Card
                            </option>

                            <option value="Debit_Card">
                                Debit Card
                            </option>
                        </select>



                        {/* ==============================
        COD
    ============================== */}

                        {/* {paymentMethod === "Cash On Delivery" && (

                            <div className="payment-detail-box">

                                <h3>Cash On Delivery</h3>

                                <p>
                                    You can pay when your order is delivered.
                                </p>

                            </div>

                        )} */}

                        {paymentMethod === "Cash_On_Delivery" && (

                            <div className="payment-detail-box">

                                <h3>Cash On Delivery</h3>

                                <p>
                                    You can pay when your order is delivered.
                                </p>

                            </div>

                        )}



                        {/* ==============================
        UPI
    ============================== */}

                        {paymentMethod === "UPI" && (

                            <div className="payment-detail-box">

                                <h3>UPI Payment</h3>

                                <input
                                    type="text"
                                    name="upiId"
                                    placeholder="Enter UPI ID"
                                    value={paymentDetails.upiId}
                                    onChange={handlePaymentDetailChange}
                                />

                            </div>

                        )}


                        {/* ==============================
        CREDIT CARD
    ============================== */}

                        {/* {paymentMethod === "Credit Card" && (

                            <div className="payment-detail-box">

                                <h3>Credit Card Details</h3>

                                <input
                                    type="text"
                                    name="cardNumber"
                                    placeholder="Card Number"
                                    maxLength="16"
                                    value={paymentDetails.cardNumber}
                                    onChange={handlePaymentDetailChange}
                                />

                                <input
                                    type="text"
                                    name="cardHolderName"
                                    placeholder="Card Holder Name"
                                    value={paymentDetails.cardHolderName}
                                    onChange={handlePaymentDetailChange}
                                />

                                <div className="card-row">

                                    <input
                                        type="text"
                                        name="expiry"
                                        placeholder="MM/YY"
                                        value={paymentDetails.expiry}
                                        onChange={handlePaymentDetailChange}
                                    />

                                    <input
                                        type="password"
                                        name="cvv"
                                        placeholder="CVV"
                                        maxLength="3"
                                        value={paymentDetails.cvv}
                                        onChange={handlePaymentDetailChange}
                                    />

                                </div>

                                <div className="card-row">

                                    <input
                                        type="text"
                                        name="expiry"
                                        placeholder="MM/YY"
                                        value={paymentDetails.expiry}
                                        onChange={handlePaymentDetailChange}
                                    />

                                    <input
                                        type="password"
                                        name="cvv"
                                        placeholder="CVV"
                                        maxLength="3"
                                        value={paymentDetails.cvv}
                                        onChange={handlePaymentDetailChange}
                                    />

                                </div>

                            </div>

                        )} */}

                        {paymentMethod === "Credit_Card" && (

                            <div className="payment-detail-box">

                                <h3>Credit Card Details</h3>

                                <input
                                    type="text"
                                    name="cardNumber"
                                    placeholder="Card Number"
                                    maxLength="16"
                                    value={paymentDetails.cardNumber}
                                    onChange={handlePaymentDetailChange}
                                />

                                <input
                                    type="text"
                                    name="cardHolderName"
                                    placeholder="Card Holder Name"
                                    value={paymentDetails.cardHolderName}
                                    onChange={handlePaymentDetailChange}
                                />

                                <div className="card-row">

                                    <input
                                        type="text"
                                        name="expiry"
                                        placeholder="MM/YY"
                                        value={paymentDetails.expiry}
                                        onChange={handlePaymentDetailChange}
                                    />

                                    <input
                                        type="password"
                                        name="cvv"
                                        placeholder="CVV"
                                        maxLength="3"
                                        value={paymentDetails.cvv}
                                        onChange={handlePaymentDetailChange}
                                    />

                                </div>

                            </div>

                        )}



                        {/* ==============================
        DEBIT CARD
    ============================== */}

                        {/* {paymentMethod === "Debit Card" && (

                            <div className="payment-detail-box">

                                <h3>Debit Card Details</h3>

                                <input
                                    type="text"
                                    name="cardNumber"
                                    placeholder="Card Number"
                                    maxLength="16"
                                    value={paymentDetails.cardNumber}
                                    onChange={handlePaymentDetailChange}
                                />

                                <input
                                    type="text"
                                    name="cardHolderName"
                                    placeholder="Card Holder Name"
                                    value={paymentDetails.cardHolderName}
                                    onChange={handlePaymentDetailChange}
                                />

                                <div className="card-row">

                                    <input
                                        type="text"
                                        name="expiry"
                                        placeholder="MM/YY"
                                        value={paymentDetails.expiry}
                                        onChange={handlePaymentDetailChange}
                                    />

                                    <input
                                        type="password"
                                        name="cvv"
                                        placeholder="CVV"
                                        maxLength="3"
                                        value={paymentDetails.cvv}
                                        onChange={handlePaymentDetailChange}
                                    />

                                </div>

                            </div>

                        )} */}


                        {paymentMethod === "Debit_Card" && (

                            <div className="payment-detail-box">

                                <h3>Debit Card Details</h3>

                                <input
                                    type="text"
                                    name="cardNumber"
                                    placeholder="Card Number"
                                    maxLength="16"
                                    value={paymentDetails.cardNumber}
                                    onChange={handlePaymentDetailChange}
                                />

                                <input
                                    type="text"
                                    name="cardHolderName"
                                    placeholder="Card Holder Name"
                                    value={paymentDetails.cardHolderName}
                                    onChange={handlePaymentDetailChange}
                                />

                                <div className="card-row">

                                    <input
                                        type="text"
                                        name="expiry"
                                        placeholder="MM/YY"
                                        value={paymentDetails.expiry}
                                        onChange={handlePaymentDetailChange}
                                    />

                                    <input
                                        type="password"
                                        name="cvv"
                                        placeholder="CVV"
                                        maxLength="3"
                                        value={paymentDetails.cvv}
                                        onChange={handlePaymentDetailChange}
                                    />

                                </div>

                            </div>

                        )}


                    </div>

                </div>


                {/* ==================================
                    RIGHT SECTION
                ================================== */}

                <div className="payment-right">

                    <h3>
                        PRICE DETAILS
                    </h3>

                    {/* Total Items */}

                    <div className="price-row">

                        <span>
                            Price ({totalItems} Items)
                        </span>

                        <span>
                            ₹{total}
                        </span>

                    </div>


                    {/* Delivery */}

                    <div className="price-row">

                        <span>
                            Delivery Charges
                        </span>

                        <span className="green">
                            FREE
                        </span>

                    </div>


                    {/* Platform Fee */}

                    <div className="price-row">

                        <span>
                            Platform Fee
                        </span>

                        <span className="green">
                            FREE
                        </span>

                    </div>

                    <hr />


                    {/* Final Total */}

                    <div className="price-total">

                        <span>
                            Total Amount
                        </span>

                        <span>
                            ₹{total}
                        </span>

                    </div>


                    {/* Place Order */}

                    <button
                        className="place-order-btn"
                        onClick={handlePlaceOrder}
                    >
                        PLACE ORDER
                    </button>

                </div>

            </div>

        </div>

    );

}
