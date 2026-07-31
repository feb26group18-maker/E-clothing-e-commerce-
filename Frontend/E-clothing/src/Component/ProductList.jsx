import { useState } from "react";
import { useNavigate } from "react-router-dom";
import Breadcrumb from "./Breadcrumb";
import "./ProductList.css";

export default function ProductList() {
  const navigate = useNavigate();

  const [products, setProducts] = useState([
    { id: 1, name: "Nike Air Max", category: "Shoes", price: "₹4999", status: "Pending" },
    { id: 2, name: "Puma T-Shirt", category: "Clothing", price: "₹1299", status: "Approved" },
    { id: 3, name: "Adidas Jacket", category: "Clothing", price: "₹2999", status: "Rejected" },
  ]);

  const updateStatus = (id, status) => {
    setProducts(products.map((p) => (p.id === id ? { ...p, status } : p)));
  };

  const deleteProduct = (id) => {
    setProducts(products.filter((p) => p.id !== id));
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
              <th>Category</th>
              <th>Price</th>
              <th>Status</th>
              <th>Actions</th>
            </tr>
          </thead>

          <tbody>
            {products.map((product) => (
              <tr key={product.id}>

                <td>#{product.id}</td>

                <td>
                  <div className="name-cell">
                    <div className="avatar">
                      {product.name.charAt(0)}
                    </div>
                    {product.name}
                  </div>
                </td>

                <td>{product.category}</td>
                <td>{product.price}</td>

                <td>
                  <span className={`status-badge ${product.status.toLowerCase()}`}>
                    {product.status}
                  </span>
                </td>

                <td>
                  <div className="action-buttons">

                    <button
                      className="view-btn"
                      onClick={() => navigate(`/admin/products/${product.id}`)}
                    >
                      View
                    </button>

                    {product.status !== "Approved" && (
                      <button
                        className="approve-btn"
                        onClick={() => updateStatus(product.id, "Approved")}
                      >
                        Approve
                      </button>
                    )}

                    {product.status !== "Rejected" && (
                      <button
                        className="reject-btn"
                        onClick={() => updateStatus(product.id, "Rejected")}
                      >
                        Reject
                      </button>
                    )}

                    <button
                      className="delete-btn"
                      onClick={() => deleteProduct(product.id)}
                    >
                      Delete
                    </button>

                  </div>
                </td>

              </tr>
            ))}
          </tbody>

        </table>

      </div>

    </div>
  );
}