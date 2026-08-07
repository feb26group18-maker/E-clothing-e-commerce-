import axios from "axios";

const BASE_URL = "http://localhost:8080/products";
// Seller Product List
export const getSellerProducts = async (sellerId) => {
    return await axios.get(`${BASE_URL}/seller/${sellerId}`);
};

// Get Single Product (Edit/View)
export const getProductById = async (productId) => {
    return await axios.get(`${BASE_URL}/${productId}`);
};

// Delete Product
export const deleteProduct = async (productId) => {
    return await axios.delete(`${BASE_URL}/${productId}`);
};


// Update Product
// export const updateProduct = async (
//     productId,
//     product,
//     newImages
// )=>{


// const formData = new FormData();


// formData.append(
// "product",
// new Blob(
// [
// JSON.stringify(product)
// ],
// {
// type:"application/json"
// }
// )
// );



// newImages.forEach(image=>{

// formData.append(
// "images",
// image
// );

// });



// return await axios.put(

// `${BASE_URL}/${productId}`,

// formData,

// {
// headers:{
// "Content-Type":
// "multipart/form-data"
// }
// }

// );


// };

export const updateProduct = async (
    productId,
    product,
    newImages
) => {

    const formData = new FormData();

    formData.append(
        "product",
        new Blob(
            [JSON.stringify(product)],
            {
                type: "application/json"
            }
        )
    );

    newImages.forEach((image) => {
        formData.append("images", image);
    });

    return await axios.put(
        `${BASE_URL}/${productId}`,
        formData
    );
};

export const getProductCount = async (sellerId) => {
        console.log(`${BASE_URL}/count/seller/${sellerId}`);

    return await axios.get(
        `${BASE_URL}/count/seller/${sellerId}`
    );
};

export const getProductCountt = async () => {

    return await axios.get(
        `${BASE_URL}/count`
    );

};


// Add Product
// export const addProduct = async (product, images) => {

//     const formData = new FormData();

//     formData.append(
//         "product",
//         new Blob(
//             [JSON.stringify(product)],
//             {
//                 type: "application/json"
//             }
//         )
//     );

//     images.forEach((image) => {
//         formData.append("images", image);
//     });

//     return await axios.post(
//         BASE_URL,
//         formData,
//         {
//             headers: {
//                 "Content-Type": "multipart/form-data"
//             }
//         }
//     );
// };

export const addProduct = async (product, images) => {

    const formData = new FormData();

    formData.append(
        "product",
        new Blob(
            [JSON.stringify(product)],
            {
                type: "application/json"
            }
        )
    );

    images.forEach((image) => {
        formData.append("images", image);
    });

    try {

        const response = await axios.post(
            BASE_URL,
            formData
        );

        return response;

    } catch (error) {
        console.log("STATUS:", error.response?.status);
        console.log(
            "BACKEND RESPONSE:",
            error.response?.data
        );

        throw error;
    }
};


// ================= CUSTOMER PRODUCT APIs =================

// Get Products by Category
export const getProductsByCategory = async (categoryId) => {

    const response = await axios.get(
        `${BASE_URL}/category/${categoryId}`
    );

    return response.data;
};


// Get Products by SubCategory
export const getProductsBySubCategory = async (subCategoryId) => {

    const response = await axios.get(
        `${BASE_URL}/subcategory/${subCategoryId}`
    );

    return response.data;
};


// Search Products
export const searchProducts = async (keyword) => {

    const response = await axios.get(
        `${BASE_URL}/search`,
        {
            params: {
                keyword
            }
        }
    );

    return response.data;
};


// Filter Products
export const filterProducts = async (filters) => {

    const response = await axios.get(
        `${BASE_URL}/filter`,
        {
            params: filters
        }
    );

    return response.data;
};


// Get All Approved Products
export const getApprovedProducts = async () => {

    const response = await axios.get(
        `${BASE_URL}/approved`
    );

    return response.data;
};

export const getSubCategoriesByCategory = async (categoryId) => {

    const response = await axios.get(
        // `http://localhost:8082/subcategories/category/${categoryId}`
        `http://localhost:8080/subcategories/category/${categoryId}`
    );

    return response.data;
};

export const getProductsByPriceRange = async(
    categoryId,
    minPrice,
    maxPrice
)=>{


    const response = await fetch(

        // `http://localhost:8082/products/search-filter?categoryId=${categoryId}&minPrice=${minPrice}&maxPrice=${maxPrice}`
        `http://localhost:8080/products/search-filter?categoryId=${categoryId}&minPrice=${minPrice}&maxPrice=${maxPrice}`

    );


    if(!response.ok){

        throw new Error(
            "Price filter failed"
        );

    }


    return await response.json();

};



