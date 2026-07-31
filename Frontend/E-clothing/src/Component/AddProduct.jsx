// import { useEffect, useRef, useState } from "react";
// import Breadcrumb from "./Breadcrumb";
// import "./AddProduct.css";

// import { addProduct } from "../services/productService";
// import {
//     getCategories,
//     getSubCategories
// } from "../services/categoryService";

// export default function AddProduct() {

//     const sellerId = Number(localStorage.getItem("sellerId"));

//     const fileInputRef = useRef(null);

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

//     const [images, setImages] =useState([]);

//     useEffect(() => {
//         loadCategories();
//     }, []);

//     const loadCategories = async () => {

//         try {

//             const response = await getCategories();
//             setCategories(response.data);

//         } catch (error) {

//             console.log(error);

//         }

//     };

//     const handleCategoryChange = async (e) => {

//         const categoryId = e.target.value;

//         setProduct({
//             ...product,
//             categoryId,
//             subCategoryId: ""
//         });

//         if (!categoryId) {
//             setSubCategories([]);
//             return;
//         }

//         try {

//             const response =
//                 await getSubCategories(categoryId);

//             setSubCategories(response.data);

//         } catch (error) {

//             console.log(error);

//         }

//     };

//     const handleChange = (e) => {

//         setProduct({

//             ...product,

//             [e.target.name]: e.target.value

//         });

//     };

//     const handleImageChange = (e) => {

//         setImages([...e.target.files]);

//     };

//     const handleSubmit = async (e) => {

//         e.preventDefault();

//         if (!product.categoryId) {
//             alert("Please select Category");
//             return;
//         }

//         if (!product.subCategoryId) {
//             alert("Please select Sub Category");
//             return;
//         }

//         if (images.length === 0) {
//             alert("Please select product images");
//             return;
//         }

//         try {

//             const request = {

//                 sellerId,
//                 subCategoryId: Number(product.subCategoryId),
//                 productName: product.productName,
//                 description: product.description,
//                 size: product.size,
//                 price: Number(product.price)

//             };

//             const response =
//                 await addProduct(request, images);

//             alert(response.data);

//             setProduct({
//                 categoryId: "",
//                 subCategoryId: "",
//                 productName: "",
//                 description: "",
//                 size: "",
//                 price: ""
//             });

//             setImages([]);
//             setSubCategories([]);

//             if (fileInputRef.current) {
//                 fileInputRef.current.value = "";
//             }

//         }
//         catch (error) {

//             console.log(error);
//             alert("Failed to add product");

//         }

//     };

//     return (

//         <div className="add-product-page">

//             <Breadcrumb
//                 items={[
//                     { label: "Seller", path: "/seller" },
//                     { label: "Products", path: "/seller/products" },
//                     { label: "Add Product" }
//                 ]}
//             />

//             <div className="add-product-card">

//                 <h2>Add Product</h2>

//                 <form onSubmit={handleSubmit}>

//                     <div className="form-grid">

//                         {/* CATEGORY */}

//                         <div className="form-group">

//                             <label>Category</label>

//                             <select
//                                 value={product.categoryId}
//                                 onChange={handleCategoryChange}
//                                 required
//                             >

//                                 <option value="">
//                                     Select Category
//                                 </option>

//                                 {categories.map((cat) => (

//                                     <option
//                                         key={cat.categoryId}
//                                         value={cat.categoryId}
//                                     >
//                                         {cat.categoryName}
//                                     </option>

//                                 ))}

//                             </select>

//                         </div>

//                         {/* SUB CATEGORY */}

//                         <div className="form-group">

//                             <label>Sub Category</label>

//                             <select
//                                 name="subCategoryId"
//                                 value={product.subCategoryId}
//                                 onChange={handleChange}
//                                 disabled={!product.categoryId}
//                                 required
//                             >

//                                 <option value="">
//                                     Select Sub Category
//                                 </option>

//                                 {subCategories.map((sub) => (

//                                     <option
//                                         key={sub.subCategoryId}
//                                         value={sub.subCategoryId}
//                                     >
//                                         {sub.subCategoryName}
//                                     </option>

//                                 ))}

//                             </select>

//                         </div>

//                         {/* PRODUCT NAME */}

//                         <div className="form-group">

//                             <label>Product Name</label>

//                             <input
//                                 type="text"
//                                 name="productName"
//                                 value={product.productName}
//                                 onChange={handleChange}
//                                 placeholder="Enter product name"
//                                 required
//                             />

//                         </div>

//                         {/* SIZE */}

//                         <div className="form-group">

//                             <label>Size</label>

//                             <select
//                                 name="size"
//                                 value={product.size}
//                                 onChange={handleChange}
//                                 required
//                             >

//                                 <option value="">
//                                     Select Size
//                                 </option>

//                                 <option>XS</option>
//                                 <option>S</option>
//                                 <option>M</option>
//                                 <option>L</option>
//                                 <option>XL</option>
//                                 <option>XXL</option>
//                             </select>

//                         </div>

//                         {/* PRICE */}

//                         <div className="form-group">

//                             <label>Price</label>

//                             <input
//                                 type="number"
//                                 name="price"
//                                 value={product.price}
//                                 onChange={handleChange}
//                                 placeholder="Enter price"
//                                 required
//                             />

//                         </div>

//                     </div>

//                     {/* DESCRIPTION */}

//                     <div className="form-group full">

//                         <label>Description</label>

//                         <textarea
//                             rows="4"
//                             name="description"
//                             value={product.description}
//                             onChange={handleChange}
//                             placeholder="Enter description"
//                             required
//                         />

//                     </div>

//                     {/* IMAGES */}

//                     <div className="form-group full">

//                         <label>Images</label>

//                         <input
//                             ref={fileInputRef}
//                             type="file"
//                             multiple
//                             onChange={handleImageChange}
//                             required
//                         />
                        

//                         <div className="selected-images">

//                             {images.map((img, index) => (

//                                 <div
//                                     className="image-item"
//                                     key={index}
//                                 >
//                                     ✓ {img.name}
//                                 </div>

//                             ))}

//                         </div>

//                     </div>

//                     <div className="submit-area">

//                         <button
//                             type="submit"
//                             className="add-btn"
//                         >
//                             Add Product
//                         </button>

//                     </div>

//                 </form>

//             </div>

//         </div>

//     );

// }

import { useEffect, useRef, useState } from "react";
import Breadcrumb from "./Breadcrumb";
import "./AddProduct.css";

import { addProduct } from "../services/productService";

import {
    getCategories,
    getSubCategories
} from "../services/categoryService";


export default function AddProduct() {


    const sellerId = Number(localStorage.getItem("sellerId"));

    const fileInputRef = useRef(null);


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


    const [images, setImages] = useState([]);




    // Load Categories

    useEffect(() => {

        loadCategories();

    }, []);



    const loadCategories = async () => {

        try {

            const response = await getCategories();

            setCategories(response.data);

        }
        catch (error) {

            console.log(error);

        }

    };





    // Category Change

    const handleCategoryChange = async (e) => {


        const categoryId = e.target.value;


        setProduct({

            ...product,

            categoryId: categoryId,

            subCategoryId: ""

        });



        if (categoryId === "") {

            setSubCategories([]);

            return;

        }



        try {


            const response =
                await getSubCategories(categoryId);


            setSubCategories(response.data);


        }
        catch (error) {

            console.log(error);

        }

    };






    // Input Change

    const handleChange = (e) => {


        setProduct({

            ...product,

            [e.target.name]: e.target.value

        });


    };







    // Multiple Image Selection

    const handleImageChange = (e) => {


        const selectedFiles =
            Array.from(e.target.files);



        setImages(prev => [

            ...prev,

            ...selectedFiles

        ]);



        e.target.value = "";


    };






    // Remove Image

    const removeImage = (index) => {


        const updatedImages =
            images.filter(
                (_, i) => i !== index
            );


        setImages(updatedImages);


    };






    // Submit

    const handleSubmit = async (e) => {


        e.preventDefault();



        if (!product.categoryId) {

            alert("Please select category");

            return;

        }


        if (!product.subCategoryId) {

            alert("Please select sub category");

            return;

        }


        if (images.length === 0) {

            alert("Please select product images");

            return;

        }




        try {


            const request = {


                sellerId: sellerId,


                subCategoryId:
                    Number(product.subCategoryId),


                productName:
                    product.productName,


                description:
                    product.description,


                size:
                    product.size,


                price:
                    Number(product.price)

            };




            const response =
                await addProduct(
                    request,
                    images
                );



            alert(response.data);




            setProduct({

                categoryId: "",
                subCategoryId: "",
                productName: "",
                description: "",
                size: "",
                price: ""

            });



            setImages([]);

            setSubCategories([]);



        }
        catch (error) {


            console.log(error);

            alert("Failed to add product");


        }


    };

    return (


        <div className="add-product-page">



            <Breadcrumb

                items={[

                    {
                        label: "Seller",
                        path: "/seller"
                    },

                    {
                        label: "Products",
                        path: "/seller/products"
                    },

                    {
                        label: "Add Product"
                    }

                ]}

            />





            <div className="add-product-card">


                <h2>Add Product</h2>




                <form onSubmit={handleSubmit}>




                    <div className="form-grid">





                        <div className="form-group">

                            <label>
                                Category
                            </label>


                            <select

                                value={product.categoryId}

                                onChange={handleCategoryChange}

                                required

                            >

                                <option value="">
                                    Select Category
                                </option>



                                {

                                    categories.map(cat => (


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








                        <div className="form-group">


                            <label>
                                Sub Category
                            </label>


                            <select


                                name="subCategoryId"

                                value={product.subCategoryId}

                                onChange={handleChange}

                                required


                            >


                                <option value="">
                                    Select Sub Category
                                </option>




                                {

                                    subCategories.map(sub => (


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







                        <div className="form-group">


                            <label>
                                Product Name
                            </label>


                            <input

                                type="text"

                                name="productName"

                                value={product.productName}

                                onChange={handleChange}

                                required

                            />


                        </div>







                        <div className="form-group">


                            <label>
                                Size
                            </label>



                            <select

                                name="size"

                                value={product.size}

                                onChange={handleChange}

                                required

                            >


                                <option value="">
                                    Select Size
                                </option>


                                <option>XS</option>

                                <option>S</option>

                                <option>M</option>

                                <option>L</option>

                                <option>XL</option>

                                <option>XXL</option>


                            </select>


                        </div>








                        <div className="form-group">


                            <label>
                                Price
                            </label>


                            <input

                                type="number"

                                name="price"

                                value={product.price}

                                onChange={handleChange}

                                required

                            />


                        </div>




                    </div>







                    <div className="form-group full">


                        <label>
                            Description
                        </label>



                        <textarea

                            rows="4"

                            name="description"

                            value={product.description}

                            onChange={handleChange}

                            required

                        />



                    </div>








                    <div className="form-group full">


                        <label>
                            Product Images
                        </label>



                        <input

                            type="file"

                            accept="image/*"

                            multiple

                            hidden

                            ref={fileInputRef}

                            onChange={handleImageChange}

                        />




                        <button

                            type="button"

                            className="choose-image-btn"

                            onClick={() =>
                                fileInputRef.current.click()
                            }

                        >

                            + Choose Images

                        </button>







                        <div className="selected-images">


                            {

                                images.map((img,index)=>(


                                    <div

                                        className="image-preview-card"

                                        key={index}

                                    >


                                        <img

                                            src={
                                                URL.createObjectURL(img)
                                            }

                                            alt="preview"

                                        />



                                        <p>
                                            {img.name}
                                        </p>



                                        <button

                                            type="button"

                                            className="remove-image-btn"

                                            onClick={() =>
                                                removeImage(index)
                                            }

                                        >

                                            Remove

                                        </button>



                                    </div>


                                ))

                            }


                        </div>



                    </div>








                    <div className="submit-area">


                        <button

                            type="submit"

                            className="add-btn"

                        >

                            Add Product


                        </button>


                    </div>





                </form>



            </div>



        </div>


    );

}

