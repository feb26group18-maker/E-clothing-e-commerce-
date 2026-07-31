import axios from "axios";
const BASE_URL = "http://localhost:8082";
export const getSellerInventory = async (sellerId) => {
    const response =
        await fetch(
            `${BASE_URL}/inventory/seller/${sellerId}`
        );

    if (!response.ok) {
        throw new Error("Failed to fetch inventory");
    }
    return await response.json();
};

export const addInventoryStock = async (data) => {
    const response =
        await axios.post(
            "http://localhost:8082/inventory",
            data
        );
    return response.data;
}


