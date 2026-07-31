import axios from "axios";

const CATEGORY_URL = "http://localhost:8082/categories";
const SUBCATEGORY_URL = "http://localhost:8082/subcategories";

// Get all categories
export const getCategories = async () => {
    return await axios.get(CATEGORY_URL);
};

// Get subcategories by category
export const getSubCategories = async (categoryId) => {
    return await axios.get(
        `${SUBCATEGORY_URL}/category/${categoryId}`
    );
};