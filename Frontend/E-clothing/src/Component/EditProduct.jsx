// import { useEffect, useState } from "react";
// import { useParams } from "react-router-dom";
// import Breadcrumb from "./Breadcrumb";
// import "./EditProduct.css";

// import {
//     getCategories,
//     getSubCategories
// } from "../services/categoryService";

// import {
//     getProductById,
//     updateProduct
// } from "../services/productService";

// export default function EditProduct() {

//     const { productId } = useParams();

//     const [categories, setCategories] = useState([]);
//     const [subCategories, setSubCategories] = useState([]);

//     const [product, setProduct] = useState({
//         categoryId: "",
//         subCategoryId: "",
//         productName: "",
//         description: "",
//         size: "",
//         price: ""
//     });

//     const [currentImages, setCurrentImages] = useState([]);
//     const [newImages, setNewImages] = useState([]);

//     useEffect(() => {
//         loadCategories();
//         loadProduct();
//     }, []);

//     const loadCategories = async () => {
//         const res = await getCategories();
//         setCategories(res.data);
//     };

//     const loadProduct = async () => {

//         const res = await getProductById(productId);

//         const p = res.data;

//         setProduct({
//             categoryId: p.categoryId,
//             subCategoryId: p.subCategoryId,
//             productName: p.productName,
//             description: p.description,
//             size: p.size,
//             price: p.price
//         });

//         setCurrentImages(p.images || []);

//         const sub = await getSubCategories(p.categoryId);

//         setSubCategories(sub.data);
//     };

//     const handleCategoryChange = async (e) => {

//         const categoryId = e.target.value;

//         setProduct({
//             ...product,
//             categoryId,
//             subCategoryId: ""
//         });

//         const res = await getSubCategories(categoryId);

//         setSubCategories(res.data);

//     };

//     const handleChange = (e) => {

//         setProduct({
//             ...product,
//             [e.target.name]: e.target.value
//         });

//     };

//     const handleImageChange = (e) => {

//         setNewImages([...e.target.files]);

//     };

//     const handleSubmit = async (e) => {

//     e.preventDefault();

//     try {

//         await updateProduct(
//     productId,
//     product,
//     newImages
// );

//         alert("Product Updated Successfully");

//     } catch (error) {

//         console.log(error);

//         alert("Failed to update product");

//     }

// };

//     return (

// <div className="edit-product-page">

// <Breadcrumb
// items={[
// {label:"Seller",path:"/seller"},
// {label:"Products",path:"/seller/products"},
// {label:"Edit Product"}
// ]}
// />

// <div className="edit-product-card">

// <h2>Edit Product</h2>

// <form onSubmit={handleSubmit}>

// <div className="form-grid">

// <div className="form-group">

// <label>Category</label>

// <select
// value={product.categoryId}
// onChange={handleCategoryChange}
// >

// <option value="">Select Category</option>

// {
// categories.map(cat=>(
// <option
// key={cat.categoryId}
// value={cat.categoryId}
// >
// {cat.categoryName}
// </option>
// ))
// }

// </select>

// </div>

// <div className="form-group">

// <label>Sub Category</label>

// <select
// name="subCategoryId"
// value={product.subCategoryId}
// onChange={handleChange}
// >

// <option value="">Select Sub Category</option>

// {
// subCategories.map(sub=>(
// <option
// key={sub.subCategoryId}
// value={sub.subCategoryId}
// >
// {sub.subCategoryName}
// </option>
// ))
// }

// </select>

// </div>

// <div className="form-group">

// <label>Product Name</label>

// <input
// type="text"
// name="productName"
// value={product.productName}
// onChange={handleChange}
// />

// </div>

// <div className="form-group">

// <label>Size</label>

// <select
// name="size"
// value={product.size}
// onChange={handleChange}
// >

// <option>S</option>
// <option>M</option>
// <option>L</option>
// <option>XL</option>

// </select>

// </div>

// <div className="form-group">

// <label>Price</label>

// <input
// type="number"
// name="price"
// value={product.price}
// onChange={handleChange}
// />

// </div>

// </div>

// <div className="form-group full">

// <label>Description</label>

// <textarea
// rows="4"
// name="description"
// value={product.description}
// onChange={handleChange}
// />

// </div>

// <div className="form-group full">

// <label>Current Images</label>

// <div className="current-images">

// {
// currentImages.map((img,index)=>(

// <img
// key={index}
// src={img.imageUrl}
// alt=""
// className="preview-image"
// />

// ))
// }

// </div>

// </div>

// <div className="form-group full">

// <label>Replace Images</label>

// <input
// type="file"
// multiple
// onChange={handleImageChange}
// />

// <div className="selected-images">

// {
// newImages.map((img,index)=>(
// <div
// key={index}
// className="image-item"
// >
// ✓ {img.name}
// </div>
// ))
// }

// </div>

// </div>

// <div className="submit-area">

// <button className="update-btn">

// Update Product

// </button>

// </div>

// </form>

// </div>

// </div>

//     );

// }

import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";

import Breadcrumb from "./Breadcrumb";
import "./EditProduct.css";

import {
    getCategories,
    getSubCategories
} from "../services/categoryService";

import {
    getProductById,
    updateProduct
} from "../services/productService";


export default function EditProduct() {


    const { productId } = useParams();



    const [categories, setCategories] = useState([]);

    const [subCategories, setSubCategories] = useState([]);



    const [product, setProduct] = useState({

        categoryId: "",

        subCategoryId: "",

        productName: "",

        description: "",

        size: "",

        price: ""

    });



    // Existing images from backend

    const [currentImages, setCurrentImages] = useState([]);



    // New images selected by seller

    const [newImages, setNewImages] = useState([]);




    useEffect(() => {

        loadProduct();

    }, []);





    // Load product + category + subcategory

    const loadProduct = async () => {


        try {


            // Get product details

            const productResponse =
                await getProductById(productId);



            const p = productResponse.data;





            // Get categories

            const categoryResponse =
                await getCategories();



            const categoryList =
                categoryResponse.data;



            setCategories(categoryList);





            // Find category id using category name

            const selectedCategory =
                categoryList.find(

                    (cat) =>
                        cat.categoryName === p.categoryName

                );



            let categoryId = "";



            if(selectedCategory){

                categoryId =
                    selectedCategory.categoryId;

            }





            let subCategoryId = "";





            // Load subcategories

            if(categoryId){



                const subResponse =
                    await getSubCategories(categoryId);



                setSubCategories(
                    subResponse.data
                );





                // Find subcategory id using name

                const selectedSubCategory =
                    subResponse.data.find(

                        (sub)=>

                            sub.subCategoryName ===
                            p.subCategoryName

                    );





                if(selectedSubCategory){


                    subCategoryId =
                        selectedSubCategory.subCategoryId;


                }



            }





            // Set product form data

            setProduct({


                categoryId: categoryId,


                subCategoryId: subCategoryId,


                productName: p.productName,


                description: p.description,


                size: p.size,


                price: p.price



            });





            // Existing images

            setCurrentImages(
                p.imageUrls || []
            );



        }

        catch(error){


            console.log(error);


        }


    };







    // Category change

    const handleCategoryChange = async (e) => {


        const categoryId =
            e.target.value;




        setProduct({

            ...product,

            categoryId: categoryId,

            subCategoryId: ""

        });




        if(categoryId === ""){


            setSubCategories([]);

            return;

        }





        try {


            const response =
                await getSubCategories(categoryId);



            setSubCategories(
                response.data
            );


        }

        catch(error){


            console.log(error);


        }


    };








    // Input change

    const handleChange = (e) => {


        setProduct({

            ...product,

            [e.target.name]:
                e.target.value

        });


    };







    // Multiple image selection

    const handleImageChange = (e) => {


        const selectedFiles =
            Array.from(e.target.files);




        setNewImages(prev => [

            ...prev,

            ...selectedFiles

        ]);



        // reset input

        e.target.value = "";

    };







    // Remove selected new image

    const removeNewImage = (index) => {


        const updatedImages =
            newImages.filter(

                (_, i) => i !== index

            );



        setNewImages(updatedImages);


    };







    // Submit update

    const handleSubmit = async (e) => {


        e.preventDefault();



        try {


            await updateProduct(

                productId,

                product,

                newImages

            );



            alert("Product Updated Successfully");
// navigate("/seller/sellerproducts");


        }

        catch(error){


            console.log(error);


            alert(
                "Failed to update product"
            );


        }


    };

        return (

        <div className="edit-product-page">


            <Breadcrumb

                items={[

                    {
                        label:"Seller",
                        path:"/seller"
                    },

                    {
                        label:"Products",
                        path:"/seller/products"
                    },

                    {
                        label:"Edit Product"
                    }

                ]}

            />




            <div className="edit-product-card">



                <h2>
                    Edit Product
                </h2>




                <form onSubmit={handleSubmit}>


                    <div className="form-grid">





                        {/* CATEGORY */}

                        <div className="form-group">


                            <label>
                                Category
                            </label>



                            <select

                                value={product.categoryId}

                                onChange={handleCategoryChange}

                            >


                                <option value="">
                                    Select Category
                                </option>



                                {

                                    categories.map((cat)=>(


                                        <option

                                            key={cat.categoryId}

                                            value={cat.categoryId}

                                        >

                                            {cat.categoryName}

                                        </option>


                                    ))

                                }



                            </select>


                        </div>









                        {/* SUB CATEGORY */}


                        <div className="form-group">


                            <label>
                                Sub Category
                            </label>



                            <select


                                name="subCategoryId"

                                value={product.subCategoryId}

                                onChange={handleChange}


                            >


                                <option value="">
                                    Select Sub Category
                                </option>




                                {

                                    subCategories.map((sub)=>(


                                        <option

                                            key={sub.subCategoryId}

                                            value={sub.subCategoryId}

                                        >

                                            {sub.subCategoryName}

                                        </option>


                                    ))

                                }



                            </select>



                        </div>









                        {/* PRODUCT NAME */}


                        <div className="form-group">


                            <label>
                                Product Name
                            </label>



                            <input

                                type="text"

                                name="productName"

                                value={product.productName}

                                onChange={handleChange}

                            />


                        </div>









                        {/* SIZE */}


                        <div className="form-group">


                            <label>
                                Size
                            </label>




                            <select

                                name="size"

                                value={product.size}

                                onChange={handleChange}

                            >


                                <option value="">
                                    Select Size
                                </option>


                                <option>
                                    XS
                                </option>


                                <option>
                                    S
                                </option>


                                <option>
                                    M
                                </option>


                                <option>
                                    L
                                </option>


                                <option>
                                    XL
                                </option>


                                <option>
                                    XXL
                                </option>


                            </select>


                        </div>









                        {/* PRICE */}


                        <div className="form-group">


                            <label>
                                Price
                            </label>



                            <input

                                type="number"

                                name="price"

                                value={product.price}

                                onChange={handleChange}

                            />


                        </div>



                    </div>









                    {/* DESCRIPTION */}



                    <div className="form-group full">


                        <label>
                            Description
                        </label>



                        <textarea

                            rows="4"

                            name="description"

                            value={product.description}

                            onChange={handleChange}

                        />


                    </div>









                    {/* CURRENT IMAGES */}



                    <div className="form-group full">


                        <label>
                            Current Images
                        </label>




                        <div className="current-images">



                            {

                                currentImages.map((img,index)=>(


                                    <img

                                        key={index}

                                        src={img}

                                        alt="product"

                                        className="preview-image"

                                    />


                                ))

                            }



                        </div>



                    </div>









                    {/* NEW IMAGES */}



                    <div className="form-group full">


                        <label>
                            Add New Images
                        </label>




                        <input

                            type="file"

                            multiple

                            onChange={handleImageChange}

                        />





                        <div className="selected-images">



                            {

                                newImages.map((img,index)=>(



                                    <div

                                        className="image-item"

                                        key={index}

                                    >


                                        <span>
                                            ✓ {img.name}
                                        </span>



                                        <button

                                            type="button"

                                            className="remove-btn"

                                            onClick={()=>
                                                removeNewImage(index)
                                            }

                                        >

                                            ✕


                                        </button>



                                    </div>



                                ))

                            }



                        </div>



                    </div>









                    {/* UPDATE BUTTON */}



                    <div className="submit-area">


                        <button

                            type="submit"

                            className="update-btn"

                        >

                            Update Product


                        </button>



                    </div>




                </form>



            </div>



        </div>


    );

}