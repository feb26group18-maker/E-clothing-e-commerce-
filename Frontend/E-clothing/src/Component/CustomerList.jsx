import { useState } from "react";
import { useNavigate } from "react-router-dom";
import Breadcrumb from "./Breadcrumb";
import "./CustomerList.css";

export default function CustomerList() {
  const navigate = useNavigate();

  const [customers, setCustomers] = useState([
    { id: 1, name: "John Doe", email: "john@gmail.com", phone: "9876543210", status: "Active" },
    { id: 2, name: "Sara Khan", email: "sara@gmail.com", phone: "9876512345", status: "Active" },
    { id: 3, name: "Amit Verma", email: "amit@gmail.com", phone: "9876509876", status: "Inactive" },
    { id: 4, name: "Neha Singh", email: "neha@gmail.com", phone: "9123456780", status: "Active" },
  ]);

  const deleteCustomer = (id) => {
    setCustomers(customers.filter((c) => c.id !== id));
  };

  return (
    
    <div className="customer-page">

        {/* BREADCRUMB */}
    <Breadcrumb
      items={[
        { label: "Admin", path: "/admin" },
        { label: "Customers", path: "/admin/customers" },
        { label: "Customer List" },
      ]}
    />
      {/* HEADER */}
      {/* <div className="customer-header">
        <div>
          <h2>Customer Management</h2>
          <p>Manage all registered customers in your system</p>
        </div>
      </div> */}

      {/* TABLE CARD */}
      <div className="customer-card">

        <table className="customer-table">
          <thead>
            <tr>
              <th>ID</th>
              <th>Customer</th>
              <th>Email</th>
              <th>Phone</th>
              <th>Status</th>
              <th>Actions</th>
            </tr>
          </thead>

          <tbody>
            {customers.map((customer) => (
              <tr key={customer.id}>

                <td className="id-cell">#{customer.id}</td>

                <td className="name-cell">
                  <div className="avatar">
                    {customer.name.charAt(0)}
                  </div>
                  {customer.name}
                </td>

                <td>{customer.email}</td>
                <td>{customer.phone}</td>

                <td>
                  <span className={`status ${customer.status.toLowerCase()}`}>
                    {customer.status}
                  </span>
                </td>

                <td>
                  <div className="action-buttons">

                    <button
                      className="view-btn"
                      onClick={() =>
                        navigate(`/admin/customers/${customer.id}`)
                      }
                    >
                      View
                    </button>

                    <button
                      className="delete-btn"
                      onClick={() => deleteCustomer(customer.id)}
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