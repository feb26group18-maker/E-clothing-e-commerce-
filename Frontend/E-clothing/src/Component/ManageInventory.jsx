import { useState, useEffect } from "react";
import Breadcrumb from "./Breadcrumb";
import "./ManageInventory.css";

import {
  getSellerInventory,
  addInventoryStock
} from "../services/inventoryService";

export default function ManageInventory() {

  const [inventory, setInventory] = useState([]);
  const [showModal, setShowModal] = useState(false);
  const [selectedProduct, setSelectedProduct] = useState(null);
  const [quantity, setQuantity] = useState("");
  const [loading, setLoading] = useState(false);

  useEffect(() => {

    loadInventory();

  }, []);

  const loadInventory = async () => {

    try {
      const sellerId =
        localStorage.getItem("sellerId");
      const data =
        await getSellerInventory(sellerId);
      setInventory(data);
    }
    catch (error) {
      console.log(
        "Inventory fetch error:",
        error
      );
    }

  };

  const updateStock = (item) => {
    setSelectedProduct(item);
    setQuantity("");
    setShowModal(true);
  };

  const handleAddStock = async () => {


    try {


      if (!quantity || Number(quantity) <= 0) {

        alert("Enter valid quantity");

        return;

      }



      setLoading(true);



      const data = {

        productId: selectedProduct.productId,

        initialStock: Number(quantity)

      };



      await addInventoryStock(data);



      alert(
        "Stock added successfully"
      );



      setShowModal(false);


      setQuantity("");



      loadInventory();



    }
    catch (error) {


      console.log(
        "Add stock error:",
        error
      );


    }
    finally {


      setLoading(false);


    }


  };

  return (
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
      <div className="inventory-card">
        <table className="inventory-table">
          <thead>
            <tr>
              <th>ID</th>
              <th>Product</th>
              <th>Initial Stock</th>
              <th>Current Stock</th>
              {/* <th>Sold</th> */}
              <th>Status</th>
              <th>Action</th>
            </tr>
          </thead>

          <tbody>

            {
              inventory.length === 0 ? (
                <tr>
                  <td
                    colSpan="7"

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
              )

                :

                (
                  inventory.map((item) => (

                    <tr key={item.productId}>


                      <td>
                        #{item.productId}
                      </td>
                      <td>
                        <div className="product-cell">
                          <div className="product-avatar">

                            {
                              item.productName
                                .charAt(0)
                            }

                          </div>

                          {item.productName}

                        </div>

                      </td>

                      <td>
                        {item.initialStock}
                      </td>

                      <td>
                        {item.availableStock}
                      </td>

                      {/* <td>
                        {item.soldStock}
                      </td> */}
                      <td>
                        <span
                          className={
                            `stock-badge ${item.status
                              .toLowerCase()
                              .replace(/\s/g, "-")
                            }`
                          }

                        >

                          {item.status}

                        </span>
                      </td>
                      <td>
                        <button

                          className="stock-btn"

                          onClick={() =>
                            updateStock(item)
                          }


                        >


                          Update Stock


                        </button>



                      </td>



                    </tr>



                  ))


                )

            }


          </tbody>





        </table>





      </div>












      {
        showModal && (


          <div className="modal-overlay">



            <div className="stock-modal">



              <h3>
                Update Stock
              </h3>





              <p>

                Product :

                <b>
                  {" "}
                  {selectedProduct.productName}
                </b>


              </p>





              <p>

                Current Stock :

                <b>
                  {" "}
                  {selectedProduct.availableStock}
                </b>


              </p>







              <input


                type="number"


                placeholder="Enter quantity"


                value={quantity}


                onChange={(e) =>
                  setQuantity(e.target.value)
                }


              />







              <div className="modal-buttons">



                <button className="stock-btn"


                  onClick={() =>
                    setShowModal(false)
                  }


                >

                  Cancel

                </button>
                <button

                  className="stock-btn"

                  onClick={handleAddStock}

                  disabled={loading}

                >

                  {
                    loading
                      ? "Adding..."
                      : "Add Stock"
                  }

                </button>
              </div>





            </div>



          </div>


        )

      }





    </div>

  );

}