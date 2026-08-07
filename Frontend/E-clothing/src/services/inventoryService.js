// import axios from "axios";
// const BASE_URL = "http://localhost:8080";
// export const getSellerInventory = async (sellerId) => {
//     const response =
//         await fetch(
//             `${BASE_URL}/inventory/seller/${sellerId}`
//         );

//     if (!response.ok) {
//         throw new Error("Failed to fetch inventory");
//     }
//     return await response.json();
// };

// export const addInventoryStock = async (data) => {
//     const response =
//         await axios.post(
//             "http://localhost:8080/inventory",
//             data
//         );
//     return response.data;
// }


import axios from "axios";

const BASE_URL = "http://localhost:8080/inventory";

// Get seller inventory
export const getSellerInventory = (sellerId) => {
    return axios
        .get(`${BASE_URL}/seller/${sellerId}`)
        .then((response) => response.data);
};


// Add inventory
export const addInventoryStock = (data) => {
    return axios
        .post(BASE_URL, data)
        .then((response) => response.data);
};

// Get available stock for a product
export const getAvailableStock = async (productId) => {

    const response = await axios.get(
        `${BASE_URL}/available/${productId}`
    );

    return response.data;
};


