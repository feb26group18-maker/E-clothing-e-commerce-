// import { useState } from "react";
// import "./Size.css";

// export default function Size({
//     product,
//     onClose,

//     onAddToCart

// }) {

//     const [selectedSize, setSelectedSize] = useState("");

//     const [qty, setQty] = useState(1);

//     // const sizes = ["S", "M", "L", "XL", "XXL"];
//     const availableSize = product?.size;

//     const handleAdd = () => {

//         if (!selectedSize) {

//             alert("Please select a size.");

//             return;

//         }

//         onAddToCart({

//             size: selectedSize,

//             qty: qty

//         });

//     };

//     return (

//         <div className="size-overlay">

//             <div className="size-modal">

//                 <button
//                     className="close-btn"
//                     onClick={onClose}
//                 >
//                     ×
//                 </button>

//                 <h2>

//                     Select Size

//                 </h2>

//                 <div className="size-buttons">

//                     {/* {

//                         sizes.map(size => (

//                             <button

//                                 key={size}

//                                 className={

//                                     selectedSize === size

//                                         ?

//                                         "active-size"

//                                         :

//                                         ""

//                                 }

//                                 onClick={() =>
//                                     setSelectedSize(size)
//                                 }

//                             >

//                                 {size}

//                             </button>

//                         ))

//                     } */}
//                     {availableSize && (
//     <button
//         type="button"
//         className={
//             selectedSize === availableSize
//                 ? "active-size"
//                 : ""
//         }
//         onClick={() => setSelectedSize(availableSize)}
//     >
//         {availableSize}
//     </button>
// )}

//                 </div>

//                 <h3>

//                     Quantity

//                 </h3>

//                 <div className="qty-box">

//                     <button

//                         onClick={() =>

//                             qty > 1 &&

//                             setQty(qty - 1)

//                         }

//                     >

//                         −

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

import { useEffect, useState } from "react";
import "./Size.css";

import { getAvailableStock } from "../services/inventoryService";

export default function Size({
    product,
    onClose,
    onAddToCart
}) {

    const [selectedSize, setSelectedSize] = useState("");

    const [qty, setQty] = useState(1);

    const [availableStock, setAvailableStock] = useState(0);

    const [loadingStock, setLoadingStock] = useState(true);


    // --------------------------------------------------
    // Load Available Stock
    // --------------------------------------------------

    useEffect(() => {

        const loadStock = async () => {

            try {

                setLoadingStock(true);

                const data =
                    await getAvailableStock(
                        product.productId
                    );

                console.log(
                    "Available Stock:",
                    data
                );

                setAvailableStock(
                    data.availableStock
                );

            } catch (error) {

                console.log(
                    "Stock loading error:",
                    error
                );

                setAvailableStock(0);

            } finally {

                setLoadingStock(false);

            }

        };

        if (product?.productId) {

            loadStock();

        }

    }, [product]);


    // --------------------------------------------------
    // Select Size
    // --------------------------------------------------

    const availableSize = product?.size;


    // --------------------------------------------------
    // Increase Quantity
    // --------------------------------------------------

    const increaseQty = () => {

        if (qty >= availableStock) {

            alert(
                `Only ${availableStock} quantity available.`
            );

            return;

        }

        setQty(qty + 1);

    };


    // --------------------------------------------------
    // Decrease Quantity
    // --------------------------------------------------

    const decreaseQty = () => {

        if (qty > 1) {

            setQty(qty - 1);

        }

    };


    // --------------------------------------------------
    // Add To Cart
    // --------------------------------------------------

    const handleAdd = () => {

        if (!selectedSize) {

            alert("Please select a size.");

            return;

        }


        if (availableStock <= 0) {

            alert("Product is Out of Stock.");

            return;

        }


        if (qty > availableStock) {

            alert(
                `Only ${availableStock} quantity available.`
            );

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


                {/* Close */}

                <button
                    className="close-btn"
                    onClick={onClose}
                >
                    ×
                </button>


                <h2>
                    Select Size
                </h2>


                {/* Product Information */}

                <div className="size-product-info">

                    <h3>
                        {product?.productName}
                    </h3>

                    <p>
                        ₹{product?.price}
                    </p>

                </div>


                {/* -------------------------------- */}
                {/* SIZE */}
                {/* -------------------------------- */}

                <div className="size-buttons">

                    {availableSize && (

                        <button
                            type="button"
                            className={
                                selectedSize === availableSize
                                    ? "active-size"
                                    : ""
                            }
                            onClick={() =>
                                setSelectedSize(
                                    availableSize
                                )
                            }
                        >
                            {availableSize}
                        </button>

                    )}

                </div>


                {/* -------------------------------- */}
                {/* STOCK */}
                {/* -------------------------------- */}

                {loadingStock ? (

                    <p>
                        Checking stock...
                    </p>

                ) : availableStock > 0 ? (

                    <p className="stock-message">

                        {availableStock} items available

                    </p>

                ) : (

                    <p className="out-stock-message">

                        Out of Stock

                    </p>

                )}


                {/* -------------------------------- */}
                {/* QUANTITY */}
                {/* -------------------------------- */}

                <h3>
                    Quantity
                </h3>


                <div className="qty-box">


                    <button
                        type="button"
                        onClick={decreaseQty}
                        disabled={qty <= 1}
                    >
                        −
                    </button>


                    <span>
                        {qty}
                    </span>


                    <button
                        type="button"
                        onClick={increaseQty}
                        disabled={
                            loadingStock ||
                            availableStock <= 0 ||
                            qty >= availableStock
                        }
                    >
                        +
                    </button>


                </div>


                {/* -------------------------------- */}
                {/* ACTION BUTTONS */}
                {/* -------------------------------- */}

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
                        disabled={
                            loadingStock ||
                            availableStock <= 0
                        }
                    >

                        {availableStock <= 0
                            ? "Out of Stock"
                            : "Add To Cart"}

                    </button>


                </div>


            </div>

        </div>

    );

}