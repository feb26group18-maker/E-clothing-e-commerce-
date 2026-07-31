// import { useEffect, useState } from "react";
// import "./Women.css";

// import {
//     getProductsByCategory,
//     getProductsBySubCategory,
//     getSubCategoriesByCategory
// } from "../services/productService";


// export default function Women() {


//     // Women category id = 2
//     const CATEGORY_ID = 2;


//     const [products, setProducts] = useState([]);

//     const [subCategories, setSubCategories] = useState([]);

//     const [loading, setLoading] = useState(true);

//     const [selectedSubCategory, setSelectedSubCategory] = useState(null);



//     useEffect(() => {

//         loadProducts();

//         loadSubCategories();

//     }, []);



//     // Load all women products

//     const loadProducts = async () => {

//         try {

//             setLoading(true);


//             const data =
//                 await getProductsByCategory(
//                     CATEGORY_ID
//                 );


//             console.log(
//                 "Women Products:",
//                 data
//             );


//             setProducts(data);

//         }
//         catch(error) {

//             console.log(
//                 "Product loading error",
//                 error
//             );

//         }
//         finally {

//             setLoading(false);

//         }

//     };




//     // Load women subcategories dynamically

//     const loadSubCategories = async () => {

//         try {


//             const data =
//                 await getSubCategoriesByCategory(
//                     CATEGORY_ID
//                 );


//             console.log(
//                 "Women SubCategories:",
//                 data
//             );


//             setSubCategories(data);


//         }
//         catch(error) {

//             console.log(
//                 "Subcategory loading error",
//                 error
//             );

//         }

//     };





//     // Load products based on subcategory

//     const loadSubCategoryProducts = async (
//         subCategoryId
//     ) => {


//         try {


//             setLoading(true);


//             setSelectedSubCategory(
//                 subCategoryId
//             );



//             const data =
//                 await getProductsBySubCategory(
//                     subCategoryId
//                 );


//             setProducts(data);


//         }
//         catch(error) {

//             console.log(
//                 "Subcategory product error",
//                 error
//             );

//         }
//         finally {

//             setLoading(false);

//         }


//     };





//     // Show all products

//     const showAllProducts = () => {


//         setSelectedSubCategory(null);


//         loadProducts();


//     };




//     return (

//         <div className="women-page">



//             {/* Banner */}

//             <div className="women-banner">


//                 <div className="banner-content">


//                     <h1>
//                         Women's Collection
//                     </h1>


//                     <p>
//                         Explore trendy styles crafted just for you.
//                     </p>


//                     <button>
//                         Shop Now
//                     </button>


//                 </div>


//             </div>





//             {/* Dynamic Filter Buttons */}


//             <div className="filter-bar">


//                 <button

//                     className={
//                         selectedSubCategory === null
//                         ?
//                         "active-filter"
//                         :
//                         ""
//                     }


//                     onClick={
//                         showAllProducts
//                     }

//                 >

//                     All

//                 </button>





//                 {
//                     subCategories.map(
//                         (item)=>(


//                         <button

//                             key={
//                                 item.subCategoryId
//                             }


//                             className={
//                                 selectedSubCategory === item.subCategoryId
//                                 ?
//                                 "active-filter"
//                                 :
//                                 ""
//                             }


//                             onClick={
//                                 () =>
//                                 loadSubCategoryProducts(
//                                     item.subCategoryId
//                                 )
//                             }


//                         >

//                             {
//                                 item.subCategoryName
//                             }


//                         </button>


//                     ))
//                 }



//             </div>







//             {/* Products */}


//             {
//                 loading ?

//                 <h2
//                     style={{
//                         textAlign:"center",
//                         padding:"50px"
//                     }}
//                 >

//                     Loading Products...

//                 </h2>


//                 :


//                 products.length === 0 ?


//                 <h2
//                     style={{
//                         textAlign:"center",
//                         padding:"50px"
//                     }}
//                 >

//                     No Products Available

//                 </h2>



//                 :



//                 <div className="product-grid">


//                 {
//                     products.map(
//                         (item)=>(


//                         <div

//                             className="product-card"

//                             key={
//                                 item.productId
//                             }

//                         >



//                             <div className="image-box">


//                                 <img

//                                     src={

//                                         item.imageUrls?.length > 0

//                                         ?

//                                         item.imageUrls[0]

//                                         :

//                                         "https://via.placeholder.com/300x350?text=No+Image"

//                                     }


//                                     alt={
//                                         item.productName
//                                     }


//                                 />



//                                 <span className="wishlist">

//                                     ♡

//                                 </span>



//                             </div>





//                             <div className="details">


//                                 <h4>

//                                     {
//                                         item.categoryName
//                                     }

//                                 </h4>



//                                 <p>

//                                     {
//                                         item.productName
//                                     }

//                                 </p>





//                                 <div className="price">


//                                     <span className="new">

//                                         ₹{item.price}

//                                     </span>


//                                 </div>





//                                 <button>

//                                     Add To Cart

//                                 </button>



//                             </div>



//                         </div>


//                     ))
//                 }
//                 </div>
//             }
//         </div>
//     );

// }

import { useEffect, useState } from "react";

import CategoryProduct from "./CategoryProduct";

export default function Women() {
    return (
        <CategoryProduct
            categoryId={2}
            title="Women's Collection"
        />
    );
}