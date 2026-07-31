import { useParams, useNavigate } from "react-router-dom";
import Breadcrumb from "./Breadcrumb";
import "./CustomerView.css";

export default function CustomerView() {
  const { id } = useParams();
  const navigate = useNavigate();

  const customers = [
    {
      id: 1,
      name: "John Doe",
      email: "john@gmail.com",
      phone: "9876543210",
      address: "Mumbai, India",
    },
    {
      id: 2,
      name: "Sara Khan",
      email: "sara@gmail.com",
      phone: "9876512345",
      address: "Delhi, India",
    },
    {
      id: 3,
      name: "Amit Verma",
      email: "amit@gmail.com",
      phone: "9876509876",
      address: "Pune, India",
    },
  ];

  const customer = customers.find((c) => c.id === parseInt(id));

  if (!customer) {
    return <h2 className="not-found">Customer not found</h2>;
  }

  return (
    <div className="customer-view">
      {/* BREADCRUMB */}
      <Breadcrumb
        items={[
          { label: "Admin", path: "/admin" },
          { label: "Customers", path: "/admin/customers" },
          { label: "Customer View" },
        ]}
      />

      {/* HEADER */}
      <div className="view-header">
        <div>
          {/* <h2>Customer Profile</h2> */}
          {/* <p></p> */}
        </div>

        <button onClick={() => navigate(-1)} className="back-btn">
          ← Back
        </button>
      </div>

      {/* PROFILE CARD */}
      <div className="profile-card">

        <div className="profile-top">

          <div className="avatar-large">
            {customer.name.charAt(0)}
          </div>

          <div>
            <h3>{customer.name}</h3>
            <p>Customer ID: #{customer.id}</p>
          </div>

        </div>

        <div className="info-grid">

          <div className="info-box">
            <label>Email</label>
            <span>{customer.email}</span>
          </div>

          <div className="info-box">
            <label>Phone</label>
            <span>{customer.phone}</span>
          </div>

          <div className="info-box full">
            <label>Address</label>
            <span>{customer.address}</span>
          </div>

        </div>

      </div>

    </div>
  );
}