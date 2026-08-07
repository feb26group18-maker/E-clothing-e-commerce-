// export default function Wishlist() {
//   return (
//     <div>
//       <h1>Your Wishlist</h1>
//       <p>Here you will show wishlist items</p>
//     </div>
//   );
// }

// // import { useState } from "react";
// // import "./Wishlist.css";

// // export default function Wishlist() {

// //     const [wishlist, setWishlist] = useState([
// //     {
// //         id: 1,
// //         brand: "Roadster",
// //         name: "Oversized Cotton T-Shirt",
// //         price: 799,
// //         image: "https://picsum.photos/300/400?random=1"
// //     },
// //     {
// //         id: 2,
// //         brand: "H&M",
// //         name: "Slim Fit Jeans",
// //         price: 1499,
// //         image: "https://picsum.photos/300/400?random=2"
// //     },
// //     {
// //         id: 3,
// //         brand: "Nike",
// //         name: "Sports Hoodie",
// //         price: 1999,
// //         image: "https://picsum.photos/300/400?random=3"
// //     }
// // ]);

// //     const handleRemove = (id) => {

// //         const confirmRemove = window.confirm(
// //             "Are you sure you want to remove this item from wishlist?"
// //         );

// //         if (!confirmRemove) {
// //             return;
// //         }

// //         setWishlist(
// //             wishlist.filter((item) => item.id !== id)
// //         );
// //     };

// //     const handleAddToCart = (item) => {

// //         alert(
// //             `${item.productName} added to cart`
// //         );

// //     };

// //     const addToCart = (product) => {

// //     // Get existing cart
// //     const cart =
// //         JSON.parse(localStorage.getItem("cart")) || [];

// //     // Check if product already exists
// //     const existingProduct = cart.find(
// //         (item) => item.id === product.id
// //     );

// //     if (existingProduct) {

// //         // Increase quantity
// //         existingProduct.qty += 1;

// //     } else {

// //         // Add new product
// //         cart.push({
// //             ...product,
// //             qty: 1
// //         });

// //     }

// //     // Save updated cart
// //     localStorage.setItem(
// //         "cart",
// //         JSON.stringify(cart)
// //     );

// //     // Remove product from wishlist
// //     const updatedWishlist = wishlist.filter(
// //         (item) => item.id !== product.id
// //     );

// //     // Update UI
// //     setWishlist(updatedWishlist);

// //     // Save updated wishlist
// //     localStorage.setItem(
// //         "wishlist",
// //         JSON.stringify(updatedWishlist)
// //     );

// //     alert("Product added to Cart successfully!");
// // };

// //     return (

// //         <div className="wishlist-page">

// //             {/* Header */}

// //             <div className="wishlist-header">

// //                 <div>

// //                     <h1>My Wishlist</h1>

// //                     <p>
// //                         Your favourite styles, saved for later.
// //                     </p>

// //                 </div>

// //                 <div className="wishlist-count">
// //                     {wishlist.length} Items
// //                 </div>

// //             </div>


// //             {/* Empty Wishlist */}

// //             {wishlist.length === 0 ? (

// //                 <div className="empty-wishlist">

// //                     <div className="empty-heart">
// //                         ♡
// //                     </div>

// //                     <h2>
// //                         Your Wishlist is Empty
// //                     </h2>

// //                     <p>
// //                         Save your favourite products
// //                         and shop them later.
// //                     </p>

// //                 </div>

// //             ) : (

// //                 <div className="wishlist-grid">

// //                     {wishlist.map((item) => (

// //                         <div
// //                             className="wishlist-card"
// //                             key={item.id}
// //                         >

// //                             {/* Image */}

// //                             <div className="wishlist-image-box">

// //                                 <img
// //                                     src={item.imageUrl}
// //                                     alt={item.productName}
// //                                 />

// //                                 <span className="wishlist-heart">
// //                                     ♥
// //                                 </span>

// //                             </div>


// //                             {/* Details */}

// //                             <div className="wishlist-details">

// //                                 <h4>
// //                                     {item.categoryName}
// //                                 </h4>

// //                                 <p className="wishlist-product-name">
// //                                     {item.productName}
// //                                 </p>

// //                                 <div className="wishlist-price">
// //                                     ₹{item.price}
// //                                 </div>


// //                                 {/* Buttons */}

// //                                 <div className="wishlist-actions">

// //                                     <button
// //                                         className="remove-wishlist-btn"
// //                                         onClick={() =>
// //                                             handleRemove(item.id)
// //                                         }
// //                                     >
// //                                         Remove
// //                                     </button>

// //                                     <button
// //                                         className="cart-btn"
// //                                         onClick={() => addToCart(item)}
// //                                     >
// //                                         Add to Cart
// //                                     </button>

// //                                 </div>

// //                             </div>

// //                         </div>

// //                     ))}

// //                 </div>

// //             )}

// //         </div>
// //     );
// // }


// import { useState } from "react";
// import "./Wishlist.css";
// import Size from "./Size";

// export default function Wishlist() {

//     const [wishlist, setWishlist] = useState([
//         {
//             id: 1,
//             categoryName: "Roadster",
//             productName: "Oversized Cotton T-Shirt",
//             price: 799,
//             imageUrl: "https://picsum.photos/300/400?random=1"
//         },
//         {
//             id: 2,
//             categoryName: "H&M",
//             productName: "Slim Fit Jeans",
//             price: 1499,
//             imageUrl: "https://picsum.photos/300/400?random=2"
//         },
//         {
//             id: 3,
//             categoryName: "Nike",
//             productName: "Sports Hoodie",
//             price: 1999,
//             imageUrl: "https://picsum.photos/300/400?random=3"
//         }
//     ]);

//     // Popup
//     const [showSizePopup, setShowSizePopup] = useState(false);

//     // Selected Product
//     const [selectedProduct, setSelectedProduct] = useState(null);

//     //-------------------------------------------------------
//     // Remove
//     //-------------------------------------------------------

//     const handleRemove = (id) => {

//         if (
//             window.confirm(
//                 "Remove this item from wishlist?"
//             )
//         ) {

//             const updated =
//                 wishlist.filter(
//                     item => item.id !== id
//                 );

//             setWishlist(updated);

//             localStorage.setItem(
//                 "wishlist",
//                 JSON.stringify(updated)
//             );
//         }
//     };

//     //-------------------------------------------------------
//     // Open Size Popup
//     //-------------------------------------------------------

//     const openSizePopup = (product) => {

//         setSelectedProduct(product);

//         setShowSizePopup(true);

//     };

//     //-------------------------------------------------------
//     // After Selecting Size
//     //-------------------------------------------------------

//     // const confirmSize = (size) => {

//     //     const cart =
//     //         JSON.parse(
//     //             localStorage.getItem("cart")
//     //         ) || [];

//     //     const existing =
//     //         cart.find(
//     //             item =>
//     //                 item.id === selectedProduct.id &&
//     //                 item.size === size
//     //         );

//     //     if (existing) {

//     //         existing.qty += 1;

//     //     }

//     //     else {

//     //         cart.push({

//     //             id: selectedProduct.id,

//     //             brand: selectedProduct.categoryName,

//     //             name: selectedProduct.productName,

//     //             image: selectedProduct.imageUrl,

//     //             price: selectedProduct.price,

//     //             size: size,

//     //             qty: 1

//     //         });

//     //     }

//     //     localStorage.setItem(
//     //         "cart",
//     //         JSON.stringify(cart)
//     //     );

//     const handleAddToCart = (data) => {

//     const cart =
//         JSON.parse(localStorage.getItem("cart")) || [];

//     const existing = cart.find(

//         item =>

//             item.id === selectedProduct.id &&

//             item.size === data.size

//     );

//     if (existing) {

//         existing.qty += data.qty;

//     }

//     else {

//         cart.push({

//             id: selectedProduct.id,

//             brand: selectedProduct.categoryName,

//             name: selectedProduct.productName,

//             image: selectedProduct.imageUrl,

//             price: selectedProduct.price,

//             size: data.size,

//             qty: data.qty

//         });

//     }

//     localStorage.setItem(

//         "cart",

//         JSON.stringify(cart)

//     );

//     const updatedWishlist = wishlist.filter(

//         item => item.id !== selectedProduct.id

//     );

//     setWishlist(updatedWishlist);

//     localStorage.setItem(

//         "wishlist",

//         JSON.stringify(updatedWishlist)

//     );

//     setShowSizePopup(false);

//     setSelectedProduct(null);

//     alert("Product added to Cart");

// };

//         //-------------------------------------------------

//         const updatedWishlist =
//             wishlist.filter(
//                 item =>
//                     item.id !== selectedProduct.id
//             );

//         setWishlist(updatedWishlist);

//         localStorage.setItem(
//             "wishlist",
//             JSON.stringify(updatedWishlist)
//         );

//         //-------------------------------------------------

//         setShowSizePopup(false);

//         setSelectedProduct(null);

//         alert("Product added to Cart");

//     };

//     return (

//         <div className="wishlist-page">

//             {/* Header */}

//             <div className="wishlist-header">

//                 <div>

//                     <h1>My Wishlist</h1>

//                     <p>

//                         Your favourite styles,
//                         saved for later.

//                     </p>

//                 </div>

//                 <div className="wishlist-count">

//                     {wishlist.length} Items

//                 </div>

//             </div>

//             {/* Empty */}

//             {

//                 wishlist.length === 0 ?

//                     (

//                         <div className="empty-wishlist">

//                             <div className="empty-heart">

//                                 ♡

//                             </div>

//                             <h2>

//                                 Your Wishlist is Empty

//                             </h2>

//                             <p>

//                                 Save products to buy later.

//                             </p>

//                         </div>

//                     )

//                     :

//                     (

//                         <div className="wishlist-grid">

//                             {

//                                 wishlist.map(item => (

//                                     <div
//                                         className="wishlist-card"
//                                         key={item.id}
//                                     >

//                                         <div className="wishlist-image-box">

//                                             <img
//                                                 src={item.imageUrl}
//                                                 alt=""
//                                             />

//                                             <span className="wishlist-heart">

//                                                 ♥

//                                             </span>

//                                         </div>

//                                         <div className="wishlist-details">

//                                             <h4>

//                                                 {item.categoryName}

//                                             </h4>

//                                             <p className="wishlist-product-name">

//                                                 {item.productName}

//                                             </p>

//                                             <div className="wishlist-price">

//                                                 ₹{item.price}

//                                             </div>

//                                             <div className="wishlist-actions">

//                                                 <button
//                                                     className="remove-wishlist-btn"
//                                                     onClick={() =>
//                                                         handleRemove(item.id)
//                                                     }
//                                                 >
//                                                     Remove
//                                                 </button>

//                                                 <button
//                                                     className="cart-btn"
//                                                     onClick={() =>
//                                                         openSizePopup(item)
//                                                     }
//                                                 >
//                                                     Add to Cart
//                                                 </button>

//                                             </div>

//                                         </div>

//                                     </div>

//                                 ))

//                             }

//                         </div>

//                     )

//             }

//             {/* Size Popup */}

//             {

//                 showSizePopup &&

//                             <Size

//                     onClose={() => {

//                         setShowSizePopup(false);

//                         setSelectedProduct(null);

//                     }}

//                     onAddToCart={handleAddToCart}

//                 />

//             }

//         </div>

//     );



import { useEffect, useState } from "react";
import "./Wishlist.css";
import Size from "./Size";
import Navbar from "./Navbar";

import {
    getWishlist,
    removeFromWishlist
} from "../services/wishlistService";

import {
    getProductById
} from "../services/productService";

import {
    addToCart
} from "../services/cartService";
// import Size from "./Size";

export default function Wishlist() {

    const [wishlist, setWishlist] = useState([]);

const [loading, setLoading] = useState(false);

    const [showSizePopup, setShowSizePopup] = useState(false);

    const [selectedProduct, setSelectedProduct] = useState(null);

    //------------------------------------------------------
    // Remove Product
    //------------------------------------------------------

    const handleRemove = async (productId) => {

    if (!window.confirm("Remove this item from wishlist?"))
        return;

    try {

        const user = JSON.parse(
            localStorage.getItem("user")
        );

        const customerId = user.customerId;

        // Call backend
        await removeFromWishlist(
            customerId,
            productId
        );

        // Remove from screen immediately
        const updatedWishlist =
            wishlist.filter(
                item => item.productId !== productId
            );

        setWishlist(updatedWishlist);

        alert("Product removed from wishlist.");

    } catch (error) {

        console.log(
            "Remove wishlist error:",
            error
        );

        alert("Failed to remove product from wishlist.");

    }

};

    const loadWishlist = async () => {

        try {

            const user = JSON.parse(
                localStorage.getItem("user")
            );

            if (!user) {
                setWishlist([]);
                return;
            }

            const customerId = user.customerId;

            const wishlistData = await getWishlist(customerId);

            console.log("Wishlist from backend:", wishlistData);

            const activeWishlist = wishlistData.filter(
                item => item.status === 1
            );

            const productData = await Promise.all(

                activeWishlist.map(async (item) => {

                    const response =
                        await getProductById(item.productId);

                    return {
                        wishlistId: item.wishlistId,
                        customerId: item.customerId,
                        productId: item.productId,
                        status: item.status,

                        ...response.data
                    };

                })

            );

            setWishlist(productData);

        } catch (error) {

            console.log(
                "Wishlist loading error:",
                error
            );

        } finally {

            setLoading(false);

        }
    };


    useEffect(() => {

        loadWishlist();

    }, []);

    //------------------------------------------------------
    // Open Size Popup
    //------------------------------------------------------

    const openSizePopup = (product) => {

        setSelectedProduct(product);

        setShowSizePopup(true);

    };

    //------------------------------------------------------
    // Add To Cart
    //------------------------------------------------------

    // const handleAddToCart = ({ size, qty }) => {

    //     let cart =
    //         JSON.parse(localStorage.getItem("cart")) || [];

    //     const existingProduct = cart.find(

    //         item =>

    //             item.id === selectedProduct.productId &&

    //             item.size === size

    //     );

    //     if (existingProduct) {

    //         existingProduct.qty += qty;

    //     }

    //     else {

    //         cart.push({

    //             // id: selectedProduct.id,
    //             id: selectedProduct.productId,

    //             brand: selectedProduct.categoryName,

    //             name: selectedProduct.productName,

    //             // image: selectedProduct.imageUrl,
    //             image: selectedProduct.imageUrls?.[0],

    //             price: selectedProduct.price,

    //             size: size,

    //             qty: qty

    //         });

    //     }

    //     localStorage.setItem(
    //         "cart",
    //         JSON.stringify(cart)
    //     );

    //     //--------------------------------------------------
    //     // Remove from Wishlist
    //     //--------------------------------------------------

    //     const updatedWishlist =
    //         wishlist.filter(
    //             // item => item.id !== selectedProduct.id
    //             item => item.productId !== selectedProduct.productId

    //         );

    //     setWishlist(updatedWishlist);

    //     localStorage.setItem(
    //         "wishlist",
    //         JSON.stringify(updatedWishlist)
    //     );

    //     setShowSizePopup(false);

    //     setSelectedProduct(null);

    //     alert("Product added to Cart.");

    // };

    const handleAddToCart = async ({ size, qty }) => {

    try {

        const user = JSON.parse(
            localStorage.getItem("user")
        );

        const customerId = user.customerId;

        await addToCart(
            customerId,
            selectedProduct.productId,
            size,
            qty
        );

        alert("Product added to Cart.");
        setWishlist(
    wishlist.filter(
        item => item.productId !== selectedProduct.productId
    )
);

setShowSizePopup(false);
setSelectedProduct(null);

    } catch (error) {

        console.log(
            "Add to cart error:",
            error
        );

        alert(
            error.message || "Failed to add product to cart."
        );

    }

};
    return (
        <>
        <Navbar />
        <div className="wishlist-page">

            {/* Header */}

            <div className="wishlist-header">

                <div>

                    <h1>My Wishlist</h1>

                    <p>
                        Your favourite styles, saved for later.
                    </p>

                </div>

                <div className="wishlist-count">

                    {wishlist.length} Items

                </div>

            </div>

            {/* Empty Wishlist */}

            {

                wishlist.length === 0 ?

                    (

                        <div className="empty-wishlist">

                            <div className="empty-heart">

                                ♡

                            </div>

                            <h2>

                                Your Wishlist is Empty

                            </h2>

                            <p>

                                Save products to buy later.

                            </p>

                        </div>

                    )

                    :

                    (

                        <div className="wishlist-grid">

                            {

                                wishlist.map((item) => (

                                    <div
                                        className="wishlist-card"
                                        key={item.wishlistId}
                                    >

                                        {/* Product Image */}

                                        <div className="wishlist-image-box">

                                            <img
                                                // src={item.imageUrl}
                                                src={item.imageUrls?.[0]}

                                                alt={item.productName}
                                            />

                                            <span className="wishlist-heart">

                                                ♥

                                            </span>

                                        </div>

                                        {/* Details */}

                                        <div className="wishlist-details">

                                            <h4>

                                                {item.categoryName}

                                            </h4>

                                            <p className="wishlist-product-name">

                                                {item.productName}

                                            </p>

                                            <div className="wishlist-price">

                                                ₹{item.price}

                                            </div>

                                            <div className="wishlist-actions">

                                                <button
                                                    className="remove-wishlist-btn"
                                                    onClick={() =>
                                                        handleRemove(item.productId)
                                                    }
                                                >
                                                    Remove
                                                </button>

                                                <button

                                                    className="cart-btn"

                                                    onClick={() =>
                                                        openSizePopup(item)
                                                    }

                                                >

                                                    Add To Cart

                                                </button>

                                            </div>

                                        </div>

                                    </div>

                                ))

                            }

                        </div>

                    )

            }

            {/* Size Popup */}

            {

                showSizePopup && (

                    <Size
                        product={selectedProduct}
                        onClose={() => {

                            setShowSizePopup(false);

                            setSelectedProduct(null);

                        }}

                        onAddToCart={handleAddToCart}

                    />

                )
            }

        </div>
 </>
    );
}