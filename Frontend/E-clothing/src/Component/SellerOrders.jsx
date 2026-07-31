import { useState } from "react";
import { useNavigate } from "react-router-dom";
import Breadcrumb from "./Breadcrumb";
import "./SellerOrders.css";

export default function SellerOrders() {

  const navigate = useNavigate();

  const [orders] = useState([
    {
      id: 101,
      customer: "Amit Verma",
      product: "Formal White Shirt",
      quantity: 2,
      amount: "₹2998",
      date: "09 Jul 2026",
      status: "Pending",
      payment: "Paid"
    },
    {
      id: 102,
      customer: "Priya Singh",
      product: "Printed T-Shirt",
      quantity: 1,
      amount: "₹799",
      date: "10 Jul 2026",
      status: "Shipped",
      payment: "Paid"
    },
    {
      id: 103,
      customer: "Rohan Joshi",
      product: "Kids Hoodie",
      quantity: 1,
      amount: "₹1199",
      date: "11 Jul 2026",
      status: "Delivered",
      payment: "Pending"
    }
  ]);

  return (
    <div className="orders-page">

      <Breadcrumb
        items={[
          { label: "Seller", path: "/seller" },
          { label: "Orders", path: "/seller/orders" },
          { label: "Manage Orders" }
        ]}
      />

      <div className="orders-card">

        <table className="orders-table">

          <thead>
            <tr>
              <th>Order ID</th>
              <th>Customer</th>
              <th>Product</th>
              <th>Qty</th>
              <th>Amount</th>
              <th>Date</th>
              <th>Order Status</th>
              <th>Payment</th>
              <th>Action</th>
            </tr>
          </thead>

          <tbody>

            {orders.map((order) => (

              <tr key={order.id}>

                <td>#{order.id}</td>

                <td>{order.customer}</td>

                <td>{order.product}</td>

                <td>{order.quantity}</td>

                <td>{order.amount}</td>

                <td>{order.date}</td>

                <td>
                  <span className={`order-status ${order.status.toLowerCase()}`}>
                    {order.status}
                  </span>
                </td>

                <td>
                  <span className={`payment-status ${order.payment.toLowerCase()}`}>
                    {order.payment}
                  </span>
                </td>

                <td>

                  <div className="order-actions">

                    <button
                      className="view-btn"
                      onClick={() => navigate(`/seller/orders/${order.id}`)}
                    >
                      View
                    </button>

                    <button
                      className="update-btn"
                      onClick={() => navigate(`/seller/orders/update/${order.id}`)}
                    >
                      Update
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