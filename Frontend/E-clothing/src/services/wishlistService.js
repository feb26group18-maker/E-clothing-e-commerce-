// const WISHLIST_API = "http://localhost:8080/wishlist";


// export const addToWishlist = async (customerId, productId) => {

//     const response = await fetch(WISHLIST_API, {
//         method: "POST",
//         headers: {
//             "Content-Type": "application/json"
//         },
//         body: JSON.stringify({
//             customerId: customerId,
//             productId: productId
//         })
//     });

//     if (!response.ok) {
//         throw new Error("Failed to add to wishlist");
//     }

//     return await response.json();
// };


// export const getWishlist = async (customerId) => {

//     const response = await fetch(
//         `${WISHLIST_API}/${customerId}`
//     );

//     if (!response.ok) {
//         throw new Error("Failed to get wishlist");
//     }

//     return await response.json();
// };

const WISHLIST_API = "http://localhost:8080/wishlist";


// ===============================
// ADD TO WISHLIST
// ===============================

export const addToWishlist = async (customerId, productId) => {

    const response = await fetch(WISHLIST_API, {
        method: "POST",

        headers: {
            "Content-Type": "application/json"
        },

        body: JSON.stringify({
            customerId: customerId,
            productId: productId
        })
    });

    if (!response.ok) {
        throw new Error("Failed to add to wishlist");
    }

    return await response.json();
};


// ===============================
// GET CUSTOMER WISHLIST
// ===============================

export const getWishlist = async (customerId) => {

    const response = await fetch(
        `${WISHLIST_API}/${customerId}`
    );

    if (!response.ok) {
        throw new Error("Failed to get wishlist");
    }

    return await response.json();
};


// ===============================
// REMOVE FROM WISHLIST
// ===============================

export const removeFromWishlist = async (
    customerId,
    productId
) => {

    const response = await fetch(
        `${WISHLIST_API}/remove/${customerId}/${productId}`,
        {
            method: "PUT"
        }
    );

    if (!response.ok) {
        throw new Error("Failed to remove from wishlist");
    }

    return await response.text();
};