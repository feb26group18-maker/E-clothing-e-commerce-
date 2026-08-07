import { useEffect, useState } from "react";
import { useSelector } from "react-redux";
import Breadcrumb from "./Breadcrumb";
import "./AddInventory.css";

export default function AddInventory() {

    // ==========================================
    // LOGGED-IN SELLER
    // ==========================================

    const user = useSelector(
        (state) => state.auth.user
    );

    const sellerId = user?.sellerId;


    // ==========================================
    // STATE
    // ==========================================

    const [products, setProducts] = useState([]);

    const [productId, setProductId] = useState("");

    const [quantity, setQuantity] = useState("");

    const [loading, setLoading] = useState(false);

    const [productsLoading, setProductsLoading] = useState(true);

    const [message, setMessage] = useState("");

    const [error, setError] = useState("");


    // ==========================================
    // LOAD SELLER PRODUCTS
    // ==========================================

    useEffect(() => {

        if (!sellerId) {

            setProductsLoading(false);

            setError("Seller ID not found.");

            return;
        }

        fetch(
            `http://localhost:8080/products/seller/${sellerId}`
        )
            .then((response) => {

                if (!response.ok) {

                    throw new Error(
                        "Failed to fetch products"
                    );

                }

                return response.json();

            })
            .then((data) => {

                console.log(
                    "Seller Products:",
                    data
                );

                // setProducts(data);
                 const approvedProducts = data.filter(
        (product) =>
            product.approvalStatus === "Approved"
    );

    setProducts(approvedProducts);

                setProductsLoading(false);

            })
            .catch((error) => {

                console.error(
                    "Error loading products:",
                    error
                );

                setError(
                    "Unable to load products."
                );

                setProductsLoading(false);

            });

    }, [sellerId]);


    // ==========================================
    // HANDLE SUBMIT
    // ==========================================

    const handleSubmit = async (e) => {

        e.preventDefault();

        setMessage("");
        setError("");


        // --------------------------------------
        // Validate Product
        // --------------------------------------

        if (!productId) {

            setError(
                "Please select a product."
            );

            return;
        }


        // --------------------------------------
        // Validate Quantity
        // --------------------------------------

        if (!quantity || Number(quantity) <= 0) {

            setError(
                "Please enter a valid quantity."
            );

            return;
        }


        setLoading(true);


        try {

            // ----------------------------------
            // Inventory API will be connected
            // here
            // ----------------------------------

            // const response = await fetch(
                // "http://localhost:8080/inventory/add",
                const response = await fetch(
    "http://localhost:8080/inventory",
                {
                    method: "POST",

                    headers: {
                        "Content-Type": "application/json"
                    },

                    body: JSON.stringify({

                        productId: Number(productId),

                        // quantity: Number(quantity)
                            initialStock: Number(quantity)


                    })
                }
            );


            if (!response.ok) {

                const errorText =
                    await response.text();

                throw new Error(
                    errorText ||
                    "Failed to add inventory"
                );

            }


            const data =
                await response.json();


            console.log(
                "Inventory Added:",
                data
            );


            setMessage(
                "Inventory added successfully!"
            );


            // Clear form

            setProductId("");

            setQuantity("");


        } catch (error) {

            console.error(
                "Inventory error:",
                error
            );

            setError(
                error.message ||
                "Unable to add inventory."
            );

        } finally {

            setLoading(false);

        }

    };


    // ==========================================
    // LOADING PRODUCTS
    // ==========================================

    if (productsLoading) {

        return (

            <>

                <Breadcrumb
                    items={[
                        {
                            label: "Seller",
                            path: "/seller"
                        },
                        {
                            label: "Inventory",
                            path: "/seller/inventory"
                        },
                        {
                            label: "Add Inventory"
                        }
                    ]}
                />

                <div className="inventory-loading">

                    Loading products...

                </div>

            </>

        );

    }


    // ==========================================
    // PAGE
    // ==========================================

    return (

        <>

            {/* ==================================
                BREADCRUMB
            ================================== */}

            <Breadcrumb
                items={[
                    {
                        label: "Seller",
                        path: "/seller"
                    },
                    {
                        label: "Inventory",
                        path: "/seller/inventory"
                    },
                    {
                        label: "Add Inventory"
                    }
                ]}
            />


            {/* ==================================
                MAIN PAGE
            ================================== */}

            <div className="add-inventory-page">


                {/* ==================================
                    CARD
                ================================== */}

                <div className="add-inventory-card">


                    {/* HEADER */}

                    <div className="inventory-header">

                        <h2>
                            Add Inventory
                        </h2>

                        <p>
                            Add stock for your product
                        </p>

                    </div>


                    {/* ==================================
                        SUCCESS MESSAGE
                    ================================== */}

                    {message && (

                        <div className="inventory-success">

                            {message}

                        </div>

                    )}


                    {/* ==================================
                        ERROR MESSAGE
                    ================================== */}

                    {error && (

                        <div className="inventory-error">

                            {error}

                        </div>

                    )}


                    {/* ==================================
                        FORM
                    ================================== */}

                    <form
                        onSubmit={handleSubmit}
                        className="inventory-form"
                    >


                        {/* PRODUCT */}

                        <div className="form-group">

                            <label>
                                Select Product
                            </label>

                            <select
                                value={productId}
                                onChange={(e) =>
                                    setProductId(
                                        e.target.value
                                    )
                                }
                            >

                                <option value="">
                                    -- Select Product --
                                </option>


                                {products.map(
                                    (product) => (

                                        <option
                                            key={
                                                product.productId
                                            }
                                            value={
                                                product.productId
                                            }
                                        >

                                            {product.productName}
                                            {" - "}
                                            ₹{product.price}
                                            {" - "}
                                            Size: {product.size}

                                        </option>

                                    )
                                )}

                            </select>

                        </div>


                        {/* QUANTITY */}

                        <div className="form-group">

                            <label>
                                Quantity
                            </label>

                            <input
                                type="number"
                                min="1"
                                placeholder="Enter quantity"
                                value={quantity}
                                onChange={(e) =>
                                    setQuantity(
                                        e.target.value
                                    )
                                }
                            />

                        </div>


                        {/* BUTTON */}

                        <button
                            type="submit"
                            className="add-inventory-btn"
                            disabled={loading}
                        >

                            {loading
                                ? "Adding..."
                                : "ADD INVENTORY"}

                        </button>

                    </form>

                </div>

            </div>

        </>

    );

}