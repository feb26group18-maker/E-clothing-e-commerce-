import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import Breadcrumb from "./Breadcrumb";
import "./ProductList.css";

export default function ProductList() {
  const navigate = useNavigate();

  const [products, setProducts] = useState([]);

  // Load all products
  useEffect(() => {
    loadProducts();
  }, []);

  const loadProducts = () => {
    fetch("http://localhost:8080/products")
      .then((res) => res.json())
      .then((data) => {
        setProducts(data);
      })
      .catch((err) => console.error("Error loading products:", err));
  };

  // Approve Product
  const approveProduct = async (id) => {
    try {
      const response = await fetch(
        `http://localhost:8080/products/${id}/approve`,
        {
          method: "PUT",
        }
      );

      if (response.ok) {
        loadProducts();
      } else {
        alert("Failed to approve product");
      }
    } catch (error) {
      console.error(error);
    }
  };

  // Reject Product
  const rejectProduct = async (id) => {
    try {
      const response = await fetch(
        `http://localhost:8080/products/${id}/reject`,
        {
          method: "PUT",
        }
      );

      if (response.ok) {
        loadProducts();
      } else {
        alert("Failed to reject product");
      }
    } catch (error) {
      console.error(error);
    }
  };

  // Delete Product
  const deleteProduct = async (id) => {
    if (!window.confirm("Delete this product?")) return;

    try {
      const response = await fetch(
        `http://localhost:8080/products/${id}`,
        {
          method: "DELETE",
        }
      );

      if (response.ok) {
        loadProducts();
      } else {
        alert("Failed to delete product");
      }
    } catch (error) {
      console.error(error);
    }
  };

  return (
    <div className="product-page">
      <Breadcrumb
        items={[
          { label: "Admin", path: "/admin" },
          { label: "Products", path: "/admin/products" },
          { label: "Product List" },
        ]}
      />

      <div className="product-card">
        <table className="product-table">
          <thead>
            <tr>
              <th>ID</th>
              <th>Product</th>
              <th>Seller</th>
              <th>Category</th>
              <th>Sub Category</th>
              <th>Size</th>
              <th>Price</th>
              {/* <th>Status</th> */}
              <th>Actions</th>
            </tr>
          </thead>

          <tbody>
            {products.map((product) => (
              <tr key={product.productId}>
                <td>#{product.productId}</td>

                <td>
                  <div className="name-cell">
                    <div className="avatar">
                      {product.productName?.charAt(0)}
                    </div>

                    {product.productName}
                  </div>
                </td>

                <td>{product.sellerName}</td>

                <td>{product.categoryName}</td>

                <td>{product.subCategoryName}</td>

                <td>{product.size}</td>

                <td>₹{product.price}</td>

                {/* <td>
                  <span
                    className={`status-badge ${product.approvalStatus.toLowerCase()}`}
                  >
                    {product.approvalStatus}
                  </span>
                </td> */}

                <td>
                  <div className="action-buttons">
                    {/* <button
                      className="view-btn"
                      onClick={() =>
                        navigate(`/admin/products/${product.productId}`)
                      }
                    >
                      View
                    </button> */}
{/* 
                    {product.approvalStatus !== "Approved" && (
                      <button
                        className="approve-btn"
                        onClick={() => approveProduct(product.productId)}
                      >
                        Approve
                      </button>
                    )} */}

                    {/* {product.approvalStatus !== "Rejected" && (
                      <button
                        className="reject-btn"
                        onClick={() => rejectProduct(product.productId)}
                      >
                        Reject
                      </button>
                    )} */}

                    <button
                      className="delete-btn"
                      onClick={() => deleteProduct(product.productId)}
                    >
                      Delete
                    </button>
                  </div>
                </td>
              </tr>
            ))}

            {products.length === 0 && (
              <tr>
                <td colSpan="9" style={{ textAlign: "center" }}>
                  No Products Found
                </td>
              </tr>
            )}
          </tbody>
        </table>
      </div>
    </div>
  );
}