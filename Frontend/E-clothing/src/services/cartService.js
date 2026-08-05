const CART_API = "http://localhost:8080/cart";

// ===============================
// ADD TO CART
// ===============================

export const addToCart = async (
    customerId,
    productId,
    size,
    quantity
) => {

    const response = await fetch(
        `${CART_API}/add`,
        {
            method: "POST",

            headers: {
                "Content-Type": "application/json"
            },

            body: JSON.stringify({
                customerId: customerId,
                productId: productId,
                size: size,
                quantity: quantity
            })
        }
    );

    if (!response.ok) {

        const errorText =
            await response.text();

        throw new Error(errorText || "Failed to add product to cart");

    }

    return await response.json();
};


// ===============================
// GET CUSTOMER CART
// ===============================
export const getCart = async (customerId) => {

    const response = await fetch(
        `${CART_API}/${customerId}`
    );

    if (!response.ok) {
        throw new Error("Failed to get cart");
    }

    return await response.json();
};

// ===============================
// REMOVE CART ITEM
// ===============================

export const removeCartItem = async (cartItemId) => {

    const response = await fetch(
        `${CART_API}/item/${cartItemId}`,
        {
            method: "DELETE"
        }
    );

    if (!response.ok) {
        throw new Error("Failed to remove cart item");
    }

    return await response.text();
};


export const clearCart = async (customerId) => {

    const token = localStorage.getItem("token");

    if (!token) {
        throw new Error("JWT token not found");
    }

    const response = await fetch(
        `http://localhost:8080/cart/clear/${customerId}`,
        {
            method: "DELETE",
            headers: {
                "Authorization": `Bearer ${token}`
            }
        }
    );

    if (!response.ok) {

        const errorText = await response.text();

        console.error(
            "Clear Cart Error:",
            errorText
        );

        throw new Error(
            errorText || "Failed to clear cart"
        );
    }

    return await response.text();
};