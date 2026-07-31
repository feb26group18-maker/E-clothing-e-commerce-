import { useState } from "react";
import Breadcrumb from "./Breadcrumb";
import "./SellerList.css";

export default function SellerList() {
  const [sellers, setSellers] = useState([
    {
      id: 1,
      name: "Rahul Sharma",
      email: "rahul@gmail.com",
      store: "Fashion Hub",
      status: "Pending",
    },
    {
      id: 2,
      name: "Priya Patel",
      email: "priya@gmail.com",
      store: "Style World",
      status: "Active",
    },
    {
      id: 3,
      name: "Amit Shah",
      email: "amit@gmail.com",
      store: "Trend Store",
      status: "Blocked",
    },
  ]);

  const updateStatus = (id, status) => {
    setSellers(
      sellers.map((seller) =>
        seller.id === id ? { ...seller, status } : seller
      )
    );
  };

  const deleteSeller = (id) => {
    setSellers(sellers.filter((seller) => seller.id !== id));
  };

  return (
    <>
      <Breadcrumb
        items={[
          { label: "Admin", path: "/admin" },
          { label: "Sellers", path: "/admin/sellers" },
          { label: "Seller List" },
        ]}
      />

      {/* <div className="seller-header">
        <h2>Seller Management</h2>
      </div> */}

      <div className="seller-table-card">
        <table className="seller-table">
          <thead>
            <tr>
              <th>ID</th>
              <th>Seller Name</th>
              <th>Email</th>
              <th>Store</th>
              <th>Status</th>
              <th>Actions</th>
            </tr>
          </thead>

          <tbody>
            {sellers.map((seller) => (
              <tr key={seller.id}>
                <td>{seller.id}</td>
                <td>{seller.name}</td>
                <td>{seller.email}</td>
                <td>{seller.store}</td>

                <td>
                  <span className={`status ${seller.status.toLowerCase()}`}>
                    {seller.status}
                  </span>
                </td>

                <td>
                  <div className="action-buttons">

                    {seller.status === "Pending" && (
                      <>
                        <button
                          className="approve-btn"
                          onClick={() => updateStatus(seller.id, "Active")}
                        >
                          Approve
                        </button>

                        <button
                          className="reject-btn"
                          onClick={() => updateStatus(seller.id, "Rejected")}
                        >
                          Reject
                        </button>
                      </>
                    )}

                    {seller.status === "Active" && (
                      <button
                        className="block-btn"
                        onClick={() => updateStatus(seller.id, "Blocked")}
                      >
                        Block
                      </button>
                    )}

                    {seller.status === "Blocked" && (
                      <button
                        className="approve-btn"
                        onClick={() => updateStatus(seller.id, "Active")}
                      >
                        Unblock
                      </button>
                    )}

                    <button
                      className="delete-btn"
                      onClick={() => deleteSeller(seller.id)}
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
    </>
  );
}