// // import axios from "axios";

// // const BASE_URL = "http://localhost:8081/sellers";

// // export const getSellers = () => {

// //     const token = localStorage.getItem("token");

// //     console.log("Seller API token:", token);

// //     return axios.get(BASE_URL, {
// //         headers: {
// //             Authorization: `Bearer ${token}`,
// //         },
// //     });

// //     export const getSellers = () => {
// //     return axios.get(BASE_URL, {
// //         headers: getAuthHeaders(),
// //     });
// // };

// // export const approveSeller = (userId) => {
// //     return axios.put(
// //         `${BASE_URL}/${userId}/approve`,
// //         {},
// //         {
// //             headers: getAuthHeaders(),
// //         }
// //     );
// // };

// // export const rejectSeller = (userId) => {
// //     return axios.put(
// //         `${BASE_URL}/${userId}/reject`,
// //         {},
// //         {
// //             headers: getAuthHeaders(),
// //         }
// //     );
// // };
// // };

// import axios from "axios";

// const BASE_URL = "http://localhost:8081/sellers";

// const getAuthHeaders = () => {

//     const token = localStorage.getItem("token");

//     return {
//         Authorization: `Bearer ${token}`
//     };
// };

// // Get All Sellers
// export const getSellers = () => {

//     return axios.get(BASE_URL, {
//         headers: getAuthHeaders()
//     });

// };

// // Approve Seller
// export const approveSeller = (userId) => {

//     return axios.put(
//         `${BASE_URL}/${userId}/approve`,
//         {},
//         {
//             headers: getAuthHeaders()
//         }
//     );

// };

// // Reject Seller
// export const rejectSeller = (userId) => {

//     return axios.put(
//         `${BASE_URL}/${userId}/reject`,
//         {},
//         {
//             headers: getAuthHeaders()
//         }
//     );

// };



// import axios from "axios";

// const BASE_URL = "http://localhost:8081/sellers";

// // Get JWT token from localStorage
// const getAuthHeaders = () => {

//     const token = localStorage.getItem("token");

//     return {
//         Authorization: `Bearer ${token}`
//     };
// };

// // Get All Sellers
// export const getSellers = () => {

//     return axios.get(BASE_URL, {
//         headers: getAuthHeaders()
//     });

// };

// // Approve Seller
// export const approveSeller = (userId) => {

//     return axios.put(
//         `${BASE_URL}/${userId}/approve`,
//         {},
//         {
//             headers: getAuthHeaders()
//         }
//     );

// };

// // Reject Seller
// export const rejectSeller = (userId) => {

//     return axios.put(
//         `${BASE_URL}/${userId}/reject`,
//         {},
//         {
//             headers: getAuthHeaders()
//         }
//     );

// };

import axios from "axios";

const BASE_URL = "http://localhost:8080/sellers";

// Get JWT token from localStorage
const getAuthHeaders = () => {

    const token = localStorage.getItem("token");

    return {
        Authorization: `Bearer ${token}`
    };
};

// Get All Sellers
export const getSellers = () => {

    return axios.get(BASE_URL, {
        headers: getAuthHeaders()
    });

};

// Approve Seller
export const approveSeller = (userId) => {

    return axios.put(
        `${BASE_URL}/${userId}/approve`,
        {},
        {
            headers: getAuthHeaders()
        }
    );

};

// Reject Seller
export const rejectSeller = (userId) => {

    return axios.put(
        `${BASE_URL}/${userId}/reject`,
        {},
        {
            headers: getAuthHeaders()
        }
    );

};

// Get Total Active Sellers Count
export const getSellerCount = () => {

    return axios.get(
        `${BASE_URL}/count`,
        {
            headers: getAuthHeaders()
        }
    );

};