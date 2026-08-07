import axios from "axios";

const BASE_URL = "http://localhost:8080/subcategories";

// Get All SubCategories
export const getSubCategories = () => {
    return axios.get(BASE_URL);
};

// Get Active SubCategories (Optional)
export const getActiveSubCategories = () => {
    return axios.get(`${BASE_URL}/active`);
};

// Get SubCategory By Id
export const getSubCategoryById = (id) => {
    return axios.get(`${BASE_URL}/${id}`);
};

// Add SubCategory
export const addSubCategory = (subCategory) => {
    return axios.post(BASE_URL, subCategory);
};

// Update SubCategory
export const updateSubCategory = (id, subCategory) => {
    return axios.put(`${BASE_URL}/${id}`, subCategory);
};

// Soft Delete SubCategory
export const deleteSubCategory = (id) => {
    return axios.delete(`${BASE_URL}/${id}`);
};

// Get SubCategories By Category
export const getSubCategoriesByCategory = (categoryId) => {
    return axios.get(`${BASE_URL}/category/${categoryId}`);
};