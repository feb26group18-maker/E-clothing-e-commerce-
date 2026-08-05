import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import "./Address.css";
import { getCustomerProfile } from "../services/customerService";

export default function Address() {

    const navigate = useNavigate();

    // ----------------------------------------
    // Logged-in User
    // ----------------------------------------

    const user = JSON.parse(
        localStorage.getItem("user")
    );

    // ----------------------------------------
    // Address State
    // ----------------------------------------

    const [address, setAddress] = useState({
        fullName: "",
        mobile: "",
        pincode: "",
        city: "",
        state: "",
        house: ""
        // area: "",
        // landmark: ""
    });

    // ----------------------------------------
    // Load Customer Profile
    // ----------------------------------------

    useEffect(() => {

        const loadCustomerProfile = async () => {

            if (!user?.customerId) {

                console.log(
                    "Customer ID not found"
                );

                return;

            }

            try {

                const data =
                    await getCustomerProfile(
                        user.customerId
                    );

                console.log(
                    "Customer Profile:",
                    data
                );

                // Fill form with backend data
                setAddress({

                    fullName:
                        data.name || "",

                    mobile:
                        data.mobile || "",

                    pincode:
                        data.pincode || "",

                    city:
                        data.city || "",

                    state:
                        data.state || "",

                    house:
                        data.address || ""

                    // area: "",

                    // landmark: ""

                });

            } catch (error) {

                console.log(
                    "Customer profile loading error:",
                    error
                );

            }

        };

        loadCustomerProfile();

    }, []);

    // ----------------------------------------
    // Handle Input Changes
    // ----------------------------------------

    const handleChange = (e) => {

        setAddress({

            ...address,

            [e.target.name]:
                e.target.value

        });

    };
    // ----------------------------------------
    // Order Total
    // ----------------------------------------

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
    // Submit Address
    // ----------------------------------------

    const handleSubmit = (e) => {

        e.preventDefault();

        if (
            !address.fullName.trim() ||
            !address.mobile.trim() ||
            !address.pincode.trim() ||
            !address.city.trim() ||
            !address.state.trim() ||
            !address.house.trim()
        ) {

            alert(
                "Please fill all required fields."
            );

            return;

        }

        // Save address locally
        localStorage.setItem(
            "deliveryAddress",
            JSON.stringify(address)
        );

        alert(
            "Address saved successfully!"
        );

        // navigate(
        //     "/customer/payment"
        // );
        navigate("/customer/payment", {
    state: {
        totalItems: totalItems,
        totalAmount: total
    }
});

    };

    // ----------------------------------------
    // If User Not Logged In
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
    // Page
    // ----------------------------------------

    return (

        <div className="address-page">

            <div className="address-container">

                {/* =================================
                    LEFT SIDE
                ================================= */}

                <div className="address-form-box">

                    <h2>
                        Delivery Address
                    </h2>

                    <form
                        onSubmit={handleSubmit}
                    >

                        {/* Full Name + Mobile */}

                        <div className="form-row">

                            <input
                                type="text"
                                name="fullName"
                                placeholder="Full Name"
                                value={
                                    address.fullName
                                }
                                onChange={
                                    handleChange
                                }
                            />

                            <input
                                type="text"
                                name="mobile"
                                placeholder="Mobile Number"
                                value={
                                    address.mobile
                                }
                                onChange={
                                    handleChange
                                }
                            />

                        </div>

                        {/* Pincode + City */}

                        <div className="form-row">

                            <input
                                type="text"
                                name="pincode"
                                placeholder="Pincode"
                                value={
                                    address.pincode
                                }
                                onChange={
                                    handleChange
                                }
                            />

                            <input
                                type="text"
                                name="city"
                                placeholder="City"
                                value={
                                    address.city
                                }
                                onChange={
                                    handleChange
                                }
                            />

                        </div>

                        {/* State + House */}

                        <div className="form-row">

                            <input
                                type="text"
                                name="state"
                                placeholder="State"
                                value={
                                    address.state
                                }
                                onChange={
                                    handleChange
                                }
                            />

                            <input
                                type="text"
                                name="house"
                                placeholder="House No / Flat"
                                value={
                                    address.house
                                }
                                onChange={
                                    handleChange
                                }
                            />

                        </div>

                        {/* Area */}

                        {/* <textarea
                            rows="4"
                            name="area"
                            placeholder="Area / Street / Colony"
                            value={
                                address.area
                            }
                            onChange={
                                handleChange
                            }
                        /> */}

                        {/* Landmark */}

                        {/* <input
                            type="text"
                            name="landmark"
                            placeholder="Landmark (Optional)"
                            value={
                                address.landmark
                            }
                            onChange={
                                handleChange
                            }
                        /> */}

                        {/* Submit */}

                        <button
                            type="submit"
                            className="save-address-btn"
                        >
                            CONTINUE
                        </button>

                    </form>

                </div>

                {/* =================================
                    RIGHT SIDE
                ================================= */}

                <div className="address-summary">

                    <h3>
                        PRICE DETAILS
                    </h3>

                    {/* Total Items */}

                    <div className="summary-row">

                        <span>
                            Total Items
                        </span>

                        {/* <span>
                            {cart.length}
                        </span> */}
                        <span>
                            {totalItems}
                        </span>

                    </div>

                    {/* Total Amount */}

                    <div className="summary-row">

                        <span>
                            Total Amount
                        </span>

                        <span>
                            ₹{total}
                        </span>

                    </div>

                    {/* Delivery */}

                    <div className="summary-row">

                        <span>
                            Delivery Charges
                        </span>

                        <span
                            style={{
                                color: "green",
                                fontWeight: "600"
                            }}
                        >
                            FREE
                        </span>

                    </div>

                    <hr />

                    {/* Final Total */}

                    <div className="summary-total">

                        <span>
                            Total
                        </span>

                        <span>
                            ₹{total}
                        </span>

                    </div>

                </div>

            </div>

        </div>

    );

}
