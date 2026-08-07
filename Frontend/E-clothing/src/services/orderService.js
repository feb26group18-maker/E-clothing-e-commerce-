import axios from "axios";
const API_URL = "http://localhost:8080/orders";


// export const placeOrder = async (orderData) => {

//     const token = localStorage.getItem("token");

//     if (!token) {
//         throw new Error("JWT token not found");
//     }

//     const response = await fetch(
//         `${API_URL}/place`,
//         {
//             method: "POST",

//             headers: {
//                 "Content-Type": "application/json",
//                 "Authorization": `Bearer ${token}`
//             },

//             body: JSON.stringify(orderData)
//         }
//     );

//     if (!response.ok) {

//         const errorText = await response.text();

//         console.log(
//             "Place Order Error:",
//             errorText
//         );

//         throw new Error(
//             errorText || "Failed to place order"
//         );
//     }

//     return await response.json();
// };


export const placeOrder = async (orderData) => {

    const token = localStorage.getItem("token");

    if (!token) {
        throw new Error("JWT token not found");
    }

    const response = await fetch(
        `${API_URL}/place`,
        {
            method: "POST",

            headers: {
                "Content-Type": "application/json",
                "Authorization": `Bearer ${token}`
            },

            body: JSON.stringify(orderData)
        }
    );

    if (!response.ok) {

        let errorMessage = "Failed to place order";

        try {

            const errorData = await response.json();

            errorMessage =
                errorData.message ||
                errorMessage;

        } catch (error) {

            console.log(
                "Error response could not be parsed:",
                error
            );

        }

        const customError = new Error(errorMessage);

        customError.status = response.status;

        throw customError;
    }

    return await response.json();
};


export const getCustomerOrders = async (customerId) => {

    const token = localStorage.getItem("token");

    if (!token) {
        throw new Error("JWT token not found");
    }

    const response = await fetch(
        `http://localhost:8080/orders/customer/${customerId}`,
        {
            method: "GET",

            headers: {
                "Authorization": `Bearer ${token}`
            }
        }
    );

    if (!response.ok) {

        const errorText = await response.text();

        console.log(
            "Get Customer Orders Error:",
            errorText
        );

        throw new Error(
            "Failed to fetch customer orders"
        );
    }

    return await response.json();
};

export const getOrderItems = async (orderId) => {

    const token = localStorage.getItem("token");

    if (!token) {
        throw new Error("JWT token not found");
    }

    const response = await fetch(
        `${API_URL}/${orderId}/items`,
        {
            method: "GET",

            headers: {
                "Authorization": `Bearer ${token}`
            }
        }
    );

    if (!response.ok) {

        const errorText = await response.text();

        console.log(
            "Get Order Items Error:",
            errorText
        );

        throw new Error(
            "Failed to fetch order items"
        );
    }

    return await response.json();
};


export const getPaymentByOrderId = async (orderId) => {

    const response = await fetch(
        `http://localhost:8080/orders/payment/${orderId}`
    );

    if (!response.ok) {
        throw new Error("Failed to fetch payment details");
    }

    return await response.json();
};



export const getAllOrders = async () => {
    return await axios.get(API_URL);
};

export const getOrderCount = async () => {
    return await axios.get(`${API_URL}/count`);
};
