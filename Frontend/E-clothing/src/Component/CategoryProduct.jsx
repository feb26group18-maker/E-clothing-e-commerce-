// import { useEffect, useState } from "react";
// import "./CategoryProduct.css";
// import {
//     getProductsByCategory,
//     getProductsBySubCategory,
//     getSubCategoriesByCategory,
//     getProductsByPriceRange
// } from "../services/productService";

// export default function CategoryProduct({
//     categoryId,
//     title
// }) {

//     const [products, setProducts] = useState([]);
//     const [subCategories, setSubCategories] = useState([]);
//     const [loading, setLoading] = useState(true);
//     const [minPrice,setMinPrice] = useState("");
//     const [maxPrice,setMaxPrice] = useState("");    
//     const [selectedSubCategory, setSelectedSubCategory] = useState(null);

//     useEffect(() => {
//         loadProducts();
//         loadSubCategories();
//     }, [categoryId]);

//     const loadProducts = async () => {
//         try {

//             setLoading(true);

//             const data =
//                 await getProductsByCategory(categoryId);

//             setProducts(data);

//         }
//         catch (error) {

//             console.log(error);

//         }
//         finally {

//             setLoading(false);

//         }
//     };

//     const loadSubCategories = async () => {

//         try {

//             const data =
//                 await getSubCategoriesByCategory(categoryId);

//             setSubCategories(data);

//         }
//         catch (error) {

//             console.log(error);

//         }

//     };

//     const loadSubCategoryProducts = async (subCategoryId) => {

//         try {

//             setLoading(true);

//             setSelectedSubCategory(subCategoryId);

//             const data =
//                 await getProductsBySubCategory(subCategoryId);

//             setProducts(data);

//         }
//         catch (error) {

//             console.log(error);

//         }
//         finally {

//             setLoading(false);

//         }

//     };

//     const showAllProducts = () => {

//         setSelectedSubCategory(null);

//         loadProducts();

//     };

//     return (

//         <div className="category-page">

//             {/* Banner */}

//             <div className="category-banner">

//                 <div className="banner-content">

//                     <h1>{title}</h1>

//                     <p>
//                         Explore trendy styles crafted just for you.
//                     </p>

//                     {/* <button>
//                         Shop Now
//                     </button> */}

//                 </div>

//             </div>

//             {/* Filter */}

//             <div className="filter-bar">

//                 <button
//                     className={
//                         selectedSubCategory === null
//                             ? "active-filter"
//                             : ""
//                     }
//                     onClick={showAllProducts}
//                 >
//                     All
//                 </button>

//                 {
//                     subCategories.map((item) => (

//                         <button
//                             key={item.subCategoryId}
//                             className={
//                                 selectedSubCategory === item.subCategoryId
//                                     ? "active-filter"
//                                     : ""
//                             }
//                             onClick={() =>
//                                 loadSubCategoryProducts(item.subCategoryId)
//                             }
//                         >

//                             {item.subCategoryName}

//                         </button>

//                     ))
//                 }

//             </div>

//             {
//                 loading ?

//                     <h2 className="message">
//                         Loading Products...
//                     </h2>

//                     :

//                     products.length === 0 ?

//                         <h2 className="message">
//                             No Products Available
//                         </h2>

//                         :

//                         <div className="product-grid">

//                             {
//                                 products.map((item) => (

//                                     <div
//                                         className="product-card"
//                                         key={item.productId}
//                                     >

//                                         <div className="image-box">

//                                             <img
//                                                 src={
//                                                     item.imageUrls?.length
//                                                         ? item.imageUrls[0]
//                                                         : "https://via.placeholder.com/300x350?text=No+Image"
//                                                 }
//                                                 alt={item.productName}
//                                             />

//                                             <span className="wishlist">
//                                                 ♡
//                                             </span>

//                                         </div>

//                                         <div className="details">

//                                             <h4>
//                                                 {item.categoryName}
//                                             </h4>

//                                             <p>
//                                                 {item.productName}
//                                             </p>

//                                             <div className="price">

//                                                 <span className="new">

//                                                     ₹{item.price}

//                                                 </span>

//                                             </div>

//                                             <button>

//                                                 Add To Cart

//                                             </button>

//                                         </div>

//                                     </div>

//                                 ))
//                             }

//                         </div>

//             }

//         </div>

//     );

// }

import { useEffect, useState } from "react";
import "./CategoryProduct.css";

import {
    getProductsByCategory,
    getProductsBySubCategory,
    getSubCategoriesByCategory,
    getProductsByPriceRange
} from "../services/productService";


export default function CategoryProduct({
    categoryId,
    title
}) {


    const [products,setProducts] = useState([]);

    const [subCategories,setSubCategories] = useState([]);

    const [loading,setLoading] = useState(true);

    const [selectedSubCategory,setSelectedSubCategory] = useState(null);


    const [minPrice,setMinPrice] = useState("");

    const [maxPrice,setMaxPrice] = useState("");




    useEffect(()=>{

        loadProducts();

        loadSubCategories();

    },[categoryId]);





    // Load category products

    const loadProducts = async()=>{

        try{

            setLoading(true);


            const data =
                await getProductsByCategory(
                    categoryId
                );


            console.log(
                "Category Products:",
                data
            );


            setProducts(data);


        }
        catch(error){

            console.log(
                "Product loading error",
                error
            );

        }
        finally{

            setLoading(false);

        }

    };





    // Load subcategories

    const loadSubCategories = async()=>{

        try{


            const data =
                await getSubCategoriesByCategory(
                    categoryId
                );


            console.log(
                "Sub Categories:",
                data
            );


            setSubCategories(data);


        }
        catch(error){

            console.log(
                "SubCategory error",
                error
            );

        }

    };






    // Filter by subcategory

    const loadSubCategoryProducts = async(
        subCategoryId
    )=>{


        try{


            setLoading(true);


            setSelectedSubCategory(
                subCategoryId
            );



            const data =
                await getProductsBySubCategory(
                    subCategoryId
                );


            setProducts(data);


        }
        catch(error){

            console.log(error);

        }
        finally{

            setLoading(false);

        }


    };






    // Show all products

    const showAllProducts = ()=>{


        setSelectedSubCategory(null);

        setMinPrice("");

        setMaxPrice("");

        loadProducts();


    };






    // Price Filter

    const applyPriceFilter = async()=>{


        try{


            if(
                minPrice === "" ||
                maxPrice === ""
            ){

                alert(
                    "Please enter min and max price"
                );

                return;

            }



            setLoading(true);



            // const data =
            //     await getProductsByPriceRange(
            //         minPrice,
            //         maxPrice
            //     );



            // console.log(
            //     "Price Filter:",
            //     data
            // );
            const data =
await getProductsByPriceRange(
    categoryId,
    minPrice,
    maxPrice
);
 console.log(
                "Price Filter:",
                data
            );



            setProducts(data);



        }
        catch(error){

            console.log(
                "Price filter error",
                error
            );

        }
        finally{

            setLoading(false);

        }


    };






return (

<div className="category-page">


    {/* Banner */}

    <div className="category-banner">


        <div className="banner-content">


            <h1>
                {title}
            </h1>


            <p>
                Explore trendy styles crafted just for you.
            </p>

{/* 
            <button>
                Shop Now
            </button> */}


        </div>


    </div>






    {/* SubCategory Filter */}


    <div className="filter-bar">


        <button

        className={
            selectedSubCategory === null
            ?
            "active-filter"
            :
            ""
        }


        onClick={showAllProducts}

        >

            All

        </button>





        {
            subCategories.map(
                (item)=>(


                <button

                key={
                    item.subCategoryId
                }


                className={
                    selectedSubCategory === item.subCategoryId
                    ?
                    "active-filter"
                    :
                    ""
                }


                onClick={()=>
                    loadSubCategoryProducts(
                        item.subCategoryId
                    )
                }


                >

                {
                    item.subCategoryName
                }


                </button>


            ))
        }



    </div>







    {/* Price Filter */}


    <div className="price-filter">


        <input

        type="number"

        placeholder="Min Price"

        value={minPrice}

        onChange={
            (e)=>
            setMinPrice(
                e.target.value
            )
        }

        />




        <input

        type="number"

        placeholder="Max Price"

        value={maxPrice}

        onChange={
            (e)=>
            setMaxPrice(
                e.target.value
            )
        }

        />





        <button

        onClick={applyPriceFilter}

        >

            Apply

        </button>



    </div>








{
loading ?


<h2 className="message">

Loading Products...

</h2>



:

products.length === 0 ?


<h2 className="message">

No Products Available

</h2>



:


<div className="product-grid">


{
products.map(
(item)=>(


<div

className="product-card"

key={
    item.productId
}

>


<div className="image-box">


<img

src={

item.imageUrls?.length

?

item.imageUrls[0]

:

"https://via.placeholder.com/300x350?text=No+Image"

}


alt={
item.productName
}

/>


<span className="wishlist">

♡

</span>



</div>





<div className="details">


<h4>

{
item.categoryName
}

</h4>




<p>

{
item.productName
}

</p>





<div className="price">


<span className="new">

₹{item.price}

</span>



</div>



</div>



</div>


))

}


</div>


}



</div>

);


}