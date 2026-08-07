// import { useState, useEffect } from "react";
// import Breadcrumb from "./Breadcrumb";
// import "./ManageInventory.css";
// import { useNavigate } from "react-router-dom";

// import {
//   getSellerInventory,
//   addInventoryStock
// } from "../services/inventoryService";

// export default function ManageInventory() {

//       const navigate = useNavigate();

//   const [inventory, setInventory] = useState([]);
//   const [showModal, setShowModal] = useState(false);
//   const [selectedProduct, setSelectedProduct] = useState(null);
//   const [quantity, setQuantity] = useState("");
//   const [loading, setLoading] = useState(false);
  

//   useEffect(() => {

//     loadInventory();

//   }, []);

//   const loadInventory = async () => {

//     try {
//       const sellerId =
//         localStorage.getItem("sellerId");
//       const data =
//         await getSellerInventory(sellerId);
//       setInventory(data);
//     }
//     catch (error) {
//       console.log(
//         "Inventory fetch error:",
//         error
//       );
//     }

//   };

//   const updateStock = (item) => {
//     setSelectedProduct(item);
//     setQuantity("");
//     setShowModal(true);
//   };

//   const handleAddStock = async () => {


//     try {


//       if (!quantity || Number(quantity) <= 0) {

//         alert("Enter valid quantity");

//         return;

//       }



//       setLoading(true);



//       const data = {

//         productId: selectedProduct.productId,

//         initialStock: Number(quantity)

//       };



//       await addInventoryStock(data);



//       alert(
//         "Stock added successfully"
//       );



//       setShowModal(false);


//       setQuantity("");



//       loadInventory();



//     }
//     catch (error) {


//       console.log(
//         "Add stock error:",
//         error
//       );


//     }
//     finally {


//       setLoading(false);


//     }


//   };


//   return (
//     <div className="inventory-page">
//       <Breadcrumb
//         items={[
//           {
//             label: "Seller",
//             path: "/seller"
//           },

//           {
//             label: "Inventory",
//             path: "/seller/inventory"
//           },

//           {
//             label: "Manage Inventory"
//           }
//         ]}

//       />
      
//   <div className="product-toolbar">
//   <button
//     className="add-product-btn"
//     onClick={() => navigate("/seller/inventory/add")}
//   >
//     + Add Inventory
//   </button>
// </div>
//       <div className="inventory-card">
//         <table className="inventory-table">
//           <thead>
//             <tr>
//               <th>ID</th>
//               <th>Product</th>
//               <th>Initial Stock</th>
//               <th>Current Stock</th>
//               {/* <th>Sold</th> */}
//               <th>Status</th>
//               <th>Action</th>
//             </tr>
//           </thead>

//           <tbody>

//             {
//               inventory.length === 0 ? (
//                 <tr>
//                   <td
//                     colSpan="7"

//                     style={{
//                       textAlign: "center",
//                       padding: "30px",
//                       color: "#64748b",
//                       fontWeight: "600"
//                     }}

//                   >
//                     No inventory data available

//                   </td>
//                 </tr>
//               )

//                 :

//                 (
//                   inventory.map((item) => (

//                     <tr key={item.productId}>


//                       <td>
//                         #{item.productId}
//                       </td>
//                       <td>
//                         <div className="product-cell">
//                           <div className="product-avatar">

//                             {
//                               item.productName
//                                 .charAt(0)
//                             }

//                           </div>

//                           {item.productName}

//                         </div>

//                       </td>

//                       <td>
//                         {item.initialStock}
//                       </td>

//                       <td>
//                         {item.availableStock}
//                       </td>

//                       {/* <td>
//                         {item.soldStock}
//                       </td> */}
//                       <td>
//                         <span
//                           className={
//                             `stock-badge ${item.status
//                               .toLowerCase()
//                               .replace(/\s/g, "-")
//                             }`
//                           }

//                         >

//                           {item.status}

//                         </span>
//                       </td>
//                       <td>
//                         <button

//                           className="stock-btn"

//                           onClick={() =>
//                             updateStock(item)
//                           }


//                         >


//                           Update Stock


//                         </button>



//                       </td>



//                     </tr>



//                   ))


//                 )

//             }


//           </tbody>





//         </table>





//       </div>












//       {
//         showModal && (


//           <div className="modal-overlay">



//             <div className="stock-modal">



//               <h3>
//                 Update Stock
//               </h3>





//               <p>

//                 Product :

//                 <b>
//                   {" "}
//                   {selectedProduct.productName}
//                 </b>


//               </p>





//               <p>

//                 Current Stock :

//                 <b>
//                   {" "}
//                   {selectedProduct.availableStock}
//                 </b>


//               </p>







//               <input


//                 type="number"


//                 placeholder="Enter quantity"


//                 value={quantity}


//                 onChange={(e) =>
//                   setQuantity(e.target.value)
//                 }


//               />







//               <div className="modal-buttons">



//                 <button className="stock-btn"


//                   onClick={() =>
//                     setShowModal(false)
//                   }


//                 >

//                   Cancel

//                 </button>
//                 <button

//                   className="stock-btn"

//                   onClick={handleAddStock}

//                   disabled={loading}

//                 >

//                   {
//                     loading
//                       ? "Adding..."
//                       : "Add Stock"
//                   }

//                 </button>
//               </div>





//             </div>



//           </div>


//         )

//       }





//     </div>

//   );

// }



import { useEffect, useState } from "react";
import { useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";

import Breadcrumb from "./Breadcrumb";
import "./ManageInventory.css";

import {
    getSellerInventory,
    addInventoryStock
} from "../services/inventoryService";

export default function ManageInventory() {

    // ==========================================
    // NAVIGATION
    // ==========================================

    const navigate = useNavigate();


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

    const [inventory, setInventory] = useState([]);

    const [showModal, setShowModal] = useState(false);

    const [selectedProduct, setSelectedProduct] = useState(null);

    const [quantity, setQuantity] = useState("");

    const [loading, setLoading] = useState(false);

    const [pageLoading, setPageLoading] = useState(true);

    const [error, setError] = useState("");


    // ==========================================
    // LOAD INVENTORY
    // ==========================================

    useEffect(() => {

        if (!sellerId) {

            setPageLoading(false);

            setError("Seller ID not found.");

            return;
        }

        loadInventory();

    }, [sellerId]);


    // ==========================================
    // GET SELLER INVENTORY
    // ==========================================

    const loadInventory = async () => {

        try {

            setPageLoading(true);

            setError("");

            const data =
                await getSellerInventory(sellerId);

            console.log(
                "Seller Inventory:",
                data
            );

            setInventory(data);

        } catch (error) {

            console.error(
                "Inventory fetch error:",
                error
            );

            setError(
                "Unable to load inventory."
            );

        } finally {

            setPageLoading(false);

        }

    };


    // ==========================================
    // OPEN UPDATE STOCK MODAL
    // ==========================================

    const updateStock = (item) => {

        setSelectedProduct(item);

        setQuantity("");

        setShowModal(true);

    };


    // ==========================================
    // CLOSE MODAL
    // ==========================================

    const closeModal = () => {

        setShowModal(false);

        setSelectedProduct(null);

        setQuantity("");

    };


    // ==========================================
    // ADD STOCK
    // ==========================================

    const handleAddStock = async () => {

        if (!quantity || Number(quantity) <= 0) {

            alert(
                "Please enter a valid quantity."
            );

            return;
        }


        if (!selectedProduct) {

            return;
        }


        try {

            setLoading(true);


            const data = {

                productId:
                    selectedProduct.productId,

                initialStock:
                    Number(quantity)

            };


            console.log(
                "Adding Inventory:",
                data
            );


            const response =
                await addInventoryStock(data);


            console.log(
                "Inventory Added:",
                response
            );


            alert(
                "Stock added successfully!"
            );


            closeModal();


            // Reload latest inventory

            await loadInventory();


        } catch (error) {

            console.error(
                "Add stock error:",
                error
            );


            alert(
                error?.response?.data ||
                "Unable to add stock."
            );

        } finally {

            setLoading(false);

        }

    };


    // ==========================================
    // PAGE LOADING
    // ==========================================

    if (pageLoading) {

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
                            label: "Manage Inventory"
                        }
                    ]}
                />


                <div className="inventory-loading">

                    Loading inventory...

                </div>

            </>

        );

    }


    // ==========================================
    // ERROR
    // ==========================================

    if (error) {

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
                            label: "Manage Inventory"
                        }
                    ]}
                />


                <div className="inventory-error">

                    {error}

                </div>

            </>

        );

    }


    // ==========================================
    // PAGE
    // ==========================================

    return (

        <>

         <div className="inventory-page">
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
            label: "Manage Inventory"
          }
        ]}

      />
      
  <div className="product-toolbar">
  <button
    className="add-product-btn"
    onClick={() => navigate("/seller/inventory/add")}
  >
    + Add Inventory
  </button>
</div>


                {/* ==================================
                    INVENTORY TABLE
                ================================== */}

                <div className="inventory-card">

                    <table className="inventory-table">

                        <thead>

                            <tr>

                                <th>
                                    Product ID
                                </th>

                                <th>
                                    Product
                                </th>

                                <th>
                                    Total Stock
                                </th>

                                <th>
                                    Available Stock
                                </th>

                                <th>
                                    Status
                                </th>

                                <th>
                                    Action
                                </th>

                            </tr>

                        </thead>


                        <tbody>

                            {inventory.length === 0 ? (

                                <tr>

                                    <td
                                        colSpan="6"
                                        style={{
                                            textAlign: "center",
                                            padding: "30px",
                                            color: "#64748b",
                                            fontWeight: "600"
                                        }}
                                    >

                                        No inventory data available

                                    </td>

                                </tr>

                            ) : (

                                inventory.map((item) => (

                                    <tr
                                        key={
                                            item.productId
                                        }
                                    >

                                        {/* PRODUCT ID */}

                                        <td>

                                            #
                                            {item.productId}

                                        </td>


                                        {/* PRODUCT */}

                                        <td>

                                            <div className="product-cell">

                                                <div className="product-avatar">

                                                    {item.productName
                                                        ?.charAt(0)
                                                        ?.toUpperCase()}

                                                </div>


                                                <span>

                                                    {item.productName}

                                                </span>

                                            </div>

                                        </td>


                                        {/* TOTAL STOCK */}

                                        <td>

                                            {item.initialStock}

                                        </td>


                                        {/* AVAILABLE STOCK */}

                                        <td>

                                            {item.availableStock}

                                        </td>


                                        {/* STATUS */}

                                        <td>

                                            <span
                                                className={`stock-badge ${
                                                    item.status
                                                        ?.toLowerCase()
                                                        .replace(
                                                            /\s/g,
                                                            "-"
                                                        )
                                                }`}
                                            >

                                                {item.status}

                                            </span>

                                        </td>


                                        {/* ACTION */}

                                        <td>

                                            <button
                                                className="stock-btn"
                                                onClick={() =>
                                                    updateStock(
                                                        item
                                                    )
                                                }
                                            >

                                                Update Stock

                                            </button>

                                        </td>

                                    </tr>

                                ))

                            )}

                        </tbody>

                    </table>

                </div>


                {/* ==================================
                    UPDATE STOCK MODAL
                ================================== */}

                {showModal &&
                    selectedProduct && (

                        <div className="modal-overlay">


                            <div className="stock-modal">


                                {/* MODAL HEADER */}

                                <h3>
                                    Update Stock
                                </h3>


                                {/* PRODUCT */}

                                <p>

                                    Product :

                                    <b>

                                        {" "}

                                        {
                                            selectedProduct.productName
                                        }

                                    </b>

                                </p>


                                {/* CURRENT STOCK */}

                                <p>

                                    Current Available Stock :

                                    <b>

                                        {" "}

                                        {
                                            selectedProduct.availableStock
                                        }

                                    </b>

                                </p>


                                {/* QUANTITY */}

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


                                {/* BUTTONS */}

                                <div className="modal-buttons">


                                    <button
                                        type="button"
                                        className="cancel-btn"
                                        onClick={
                                            closeModal
                                        }
                                        disabled={loading}
                                    >

                                        Cancel

                                    </button>


                                    <button
                                        type="button"
                                        className="stock-btn"
                                        onClick={
                                            handleAddStock
                                        }
                                        disabled={loading}
                                    >

                                        {loading
                                            ? "Adding..."
                                            : "Add Stock"}

                                    </button>


                                </div>


                            </div>

                        </div>

                    )}

            </div>

        </>

    );

}