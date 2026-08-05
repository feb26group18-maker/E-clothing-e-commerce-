// // // import { useState } from "react";
// // // import "./Size.css";

// // // export default function Size({

// // //     product,

// // //     onClose,

// // //     onAddToCart

// // // }) {

// // //     const [selectedSize, setSelectedSize] = useState("");

// // //     const [qty, setQty] = useState(1);

// // //     const sizes = ["S", "M", "L", "XL", "XXL"];

// // //     const handleAdd = () => {

// // //         if (!selectedSize) {

// // //             alert("Please select a size.");

// // //             return;

// // //         }

// // //         onAddToCart({

// // //             ...product,

// // //             size: selectedSize,

// // //             qty: qty

// // //         });

// // //         onClose();

// // //     };

// // //     return (

// // //         <div className="size-overlay">

// // //             <div className="size-modal">

// // //                 <h2>Select Size</h2>

// // //                 <img
// // //                     src={product.image}
// // //                     alt={product.name}
// // //                     className="size-product-image"
// // //                 />

// // //                 <h3>{product.brand}</h3>

// // //                 <p>{product.name}</p>

// // //                 <h4>₹{product.price}</h4>

// // //                 <div className="size-buttons">

// // //                     {sizes.map(size => (

// // //                         <button

// // //                             key={size}

// // //                             className={
// // //                                 selectedSize === size
// // //                                     ? "active-size"
// // //                                     : ""
// // //                             }

// // //                             onClick={() =>
// // //                                 setSelectedSize(size)
// // //                             }

// // //                         >

// // //                             {size}

// // //                         </button>

// // //                     ))}

// // //                 </div>

// // //                 <div className="qty-box">

// // //                     <button
// // //                         onClick={() =>
// // //                             qty > 1 &&
// // //                             setQty(qty - 1)
// // //                         }
// // //                     >
// // //                         -
// // //                     </button>

// // //                     <span>{qty}</span>

// // //                     <button
// // //                         onClick={() =>
// // //                             setQty(qty + 1)
// // //                         }
// // //                     >
// // //                         +
// // //                     </button>

// // //                 </div>

// // //                 <div className="size-actions">

// // //                     <button
// // //                         className="cancel-btn"
// // //                         onClick={onClose}
// // //                     >
// // //                         Cancel
// // //                     </button>

// // //                     <button
// // //                         className="cart-btn"
// // //                         onClick={handleAdd}
// // //                     >
// // //                         Add To Cart
// // //                     </button>

// // //                 </div>

// // //             </div>

// // //         </div>

// // //     );

// // // }


// // import { useState } from "react";
// // import "./Size.css";

// // export default function Size({

// //     product,

// //     onClose,

// //     onAddToCart

// // }) {

// //     const [selectedSize, setSelectedSize] = useState("");

// //     const [qty, setQty] = useState(1);

// //     const sizes = ["S", "M", "L", "XL", "XXL"];


// //     const handleAdd = () => {

// //         if (!selectedSize) {

// //             alert("Please Select Size");

// //             return;

// //         }

// //         onAddToCart({

// //             ...product,

// //             size: selectedSize,

// //             qty: qty

// //         });

// //     };


// //     return (

// //         <div className="size-overlay">

// //             <div className="size-modal">

// //                 <button
// //                     className="close-size"
// //                     onClick={onClose}
// //                 >
// //                     ✕
// //                 </button>

// //                 <img
// //                     src={product.imageUrl || product.image}
// //                     alt={product.productName || product.name}
// //                     className="size-product-image"
// //                 />

// //                 <h3>
// //                     {product.categoryName || product.brand}
// //                 </h3>

// //                 <p>
// //                     {product.productName || product.name}
// //                 </p>

// //                 <h2>
// //                     ₹{product.price}
// //                 </h2>

// //                 <h4>Select Size</h4>

// //                 <div className="size-buttons">

// //                     {sizes.map((size) => (

// //                         <button

// //                             key={size}

// //                             className={
// //                                 selectedSize === size
// //                                     ? "active-size"
// //                                     : ""
// //                             }

// //                             onClick={() =>
// //                                 setSelectedSize(size)
// //                             }

// //                         >
// //                             {size}
// //                         </button>

// //                     ))}

// //                 </div>

// //                 <h4>Quantity</h4>

// //                 <div className="qty-box">

// //                     <button
// //                         onClick={() =>
// //                             qty > 1 &&
// //                             setQty(qty - 1)
// //                         }
// //                     >
// //                         -
// //                     </button>

// //                     <span>{qty}</span>

// //                     <button
// //                         onClick={() =>
// //                             setQty(qty + 1)
// //                         }
// //                     >
// //                         +
// //                     </button>

// //                 </div>

// //                 <div className="size-actions">

// //                     <button
// //                         className="cancel-btn"
// //                         onClick={onClose}
// //                     >
// //                         Cancel
// //                     </button>

// //                     <button
// //                         className="cart-btn"
// //                         onClick={handleAdd}
// //                     >
// //                         Add To Cart
// //                     </button>

// //                 </div>

// //             </div>

// //         </div>

// //     );

// // }



// import { useState } from "react";
// import "./Size.css";

// export default function Size({

//     onClose,

//     onAddToCart

// }) {

//     const [selectedSize, setSelectedSize] = useState("");

//     const [qty, setQty] = useState(1);

//     const sizes = ["S", "M", "L", "XL", "XXL"];

//     const handleAdd = () => {

//         if (!selectedSize) {

//             alert("Please select size");

//             return;

//         }

//         onAddToCart({

//             size: selectedSize,

//             qty: qty

//         });

//         onClose();

//     };

//     return (

//         <div className="size-overlay">

//             <div className="size-modal">

//                 <h2>Select Size</h2>

//                 <div className="size-buttons">

//                     {

//                         sizes.map((size) => (

//                             <button

//                                 key={size}

//                                 className={
//                                     selectedSize === size
//                                         ? "active-size"
//                                         : ""
//                                 }

//                                 onClick={() =>
//                                     setSelectedSize(size)
//                                 }

//                             >

//                                 {size}

//                             </button>

//                         ))

//                     }

//                 </div>

//                 <h3 className="qty-title">

//                     Quantity

//                 </h3>

//                 <div className="qty-box">

//                     <button

//                         onClick={() =>
//                             qty > 1 &&
//                             setQty(qty - 1)
//                         }

//                     >

//                         -

//                     </button>

//                     <span>

//                         {qty}

//                     </span>

//                     <button

//                         onClick={() =>
//                             setQty(qty + 1)
//                         }

//                     >

//                         +

//                     </button>

//                 </div>

//                 <div className="size-actions">

//                     <button

//                         className="cancel-btn"

//                         onClick={onClose}

//                     >

//                         Cancel

//                     </button>

//                     <button

//                         className="cart-btn"

//                         onClick={handleAdd}

//                     >

//                         Add To Cart

//                     </button>

//                 </div>

//             </div>

//         </div>

//     );

// }

import { useState } from "react";
import "./Size.css";

export default function Size({

    onClose,

    onAddToCart

}) {

    const [selectedSize, setSelectedSize] = useState("");

    const [qty, setQty] = useState(1);

    const sizes = ["S", "M", "L", "XL", "XXL"];

    const handleAdd = () => {

        if (!selectedSize) {

            alert("Please select a size.");

            return;

        }

        onAddToCart({

            size: selectedSize,

            qty: qty

        });

    };

    return (

        <div className="size-overlay">

            <div className="size-modal">

                <button
                    className="close-btn"
                    onClick={onClose}
                >
                    ×
                </button>

                <h2>

                    Select Size

                </h2>

                <div className="size-buttons">

                    {

                        sizes.map(size => (

                            <button

                                key={size}

                                className={

                                    selectedSize === size

                                        ?

                                        "active-size"

                                        :

                                        ""

                                }

                                onClick={() =>
                                    setSelectedSize(size)
                                }

                            >

                                {size}

                            </button>

                        ))

                    }

                </div>

                <h3>

                    Quantity

                </h3>

                <div className="qty-box">

                    <button

                        onClick={() =>

                            qty > 1 &&

                            setQty(qty - 1)

                        }

                    >

                        −

                    </button>

                    <span>

                        {qty}

                    </span>

                    <button

                        onClick={() =>
                            setQty(qty + 1)
                        }

                    >

                        +

                    </button>

                </div>

                <div className="size-actions">

                    <button

                        className="cancel-btn"

                        onClick={onClose}

                    >

                        Cancel

                    </button>

                    <button

                        className="cart-btn"

                        onClick={handleAdd}

                    >

                        Add To Cart

                    </button>

                </div>

            </div>

        </div>

    );

}