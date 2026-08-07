import axios from "axios";


const CATEGORY_URL = "http://localhost:8080/categories";
const SUBCATEGORY_URL = "http://localhost:8080/subcategories";

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


//Gayatri's code//
// Get Only Active Categories (Dropdown)
export const getActiveCategories = () => {
    return axios.get(`${CATEGORY_URL}/active`);
};

// Get Category By Id
export const getCategoryById = (id) => {
    return axios.get(`${CATEGORY_URL}/${id}`);
};

// Add Category
export const addCategory = (category) => {
    return axios.post(CATEGORY_URL, category);
};

// Update Category
export const updateCategory = (id, category) => {
    return axios.put(`${CATEGORY_URL}/${id}`, category);
};

// Soft Delete Category
export const deleteCategory = (id) => {
    return axios.delete(`${CATEGORY_URL}/${id}`);
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