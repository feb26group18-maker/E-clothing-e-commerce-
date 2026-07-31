import { useNavigate } from "react-router-dom";
import Breadcrumb from "./Breadcrumb";
import "./OrderDetails.css";

export default function OrderDetails() {

  const navigate = useNavigate();

  const order = {
    id: 101,
    orderDate: "09 Jul 2026",
    orderStatus: "Pending",
    paymentStatus: "Paid",

    customer: {
      name: "Amit Verma",
      email: "amit@gmail.com",
      mobile: "9000000004",
      address: "Near Bus Stand",
      city: "Nagpur",
      state: "Maharashtra",
      pincode: "440001"
    },

    payment: {
      method: "UPI",
      transactionId: "TXN100001",
      status: "Successful"
    },

    products: [
      {
        id: 1,
        image: "https://via.placeholder.com/60",
        name: "White Shirt",
        size: "L",
        quantity: 2,
        price: 1499
      },
      {
        id: 2,
        image: "https://via.placeholder.com/60",
        name: "Printed T-Shirt",
        size: "M",
        quantity: 1,
        price: 799
      }
    ]
  };

  const grandTotal = order.products.reduce(
    (sum, item) => sum + item.quantity * item.price,
    0
  );

  return (

    <div className="order-details-page">

      <Breadcrumb
        items={[
          { label: "Seller", path: "/seller" },
          { label: "Orders", path: "/seller/orders" },
          { label: "Order Details" }
        ]}
      />

      {/* Header */}

      <div className="order-header">

        <div>

          <h2>Order Details</h2>

          <p>View complete order information.</p>

        </div>

        <span className="status pending">
          {order.orderStatus}
        </span>

      </div>

      {/* Customer */}

      <div className="detail-card">

        <h3>Customer Details</h3>

        <div className="detail-grid">

          <div>

            <label>Name</label>

            <span>{order.customer.name}</span>

          </div>

          <div>

            <label>Email</label>

            <span>{order.customer.email}</span>

          </div>

          <div>

            <label>Mobile</label>

            <span>{order.customer.mobile}</span>

          </div>

        </div>

      </div>

      {/* Shipping */}

      <div className="detail-card">

        <h3>Shipping Address</h3>

        <p>{order.customer.address}</p>

        <p>
          {order.customer.city},
          {" "}
          {order.customer.state}
        </p>

        <p>{order.customer.pincode}</p>

      </div>

      {/* Product Table */}

      <div className="detail-card">

        <h3>Products</h3>

        <table className="product-table">

          <thead>

            <tr>

              <th>Image</th>

              <th>Product</th>

              <th>Size</th>

              <th>Qty</th>

              <th>Price</th>

              <th>Total</th>

            </tr>

          </thead>

          <tbody>

            {order.products.map((product) => (

              <tr key={product.id}>

                <td>

                  <img
                    src={product.image}
                    alt={product.name}
                    className="product-image"
                  />

                </td>

                <td>{product.name}</td>

                <td>{product.size}</td>

                <td>{product.quantity}</td>

                <td>₹{product.price}</td>

                <td>
                  ₹{product.quantity * product.price}
                </td>

              </tr>

            ))}

          </tbody>

        </table>

        <div className="grand-total">

          Grand Total :

          <span>
            ₹{grandTotal}
          </span>

        </div>

      </div>

      {/* Payment */}

      <div className="detail-card">

        <h3>Payment Details</h3>

        <div className="detail-grid">

          <div>

            <label>Method</label>

            <span>{order.payment.method}</span>

          </div>

          <div>

            <label>Transaction ID</label>

            <span>{order.payment.transactionId}</span>

          </div>

          <div>

            <label>Status</label>

            <span className="paid-status">
              {order.payment.status}
            </span>

          </div>

        </div>

      </div>

      {/* Order Summary */}

      <div className="detail-card">

        <h3>Order Summary</h3>

        <div className="detail-grid">

          <div>

            <label>Order ID</label>

            <span>#{order.id}</span>

          </div>

          <div>

            <label>Order Date</label>

            <span>{order.orderDate}</span>

          </div>

          <div>

            <label>Order Status</label>

            <span>{order.orderStatus}</span>

          </div>

          <div>

            <label>Payment Status</label>

            <span>{order.paymentStatus}</span>

          </div>

        </div>

      </div>

      {/* Buttons */}

      <div className="button-group">

        <button
          className="back-btn"
          onClick={() => navigate("/seller/orders")}
        >
          ← Back
        </button>

        <button className="update-btn">

          Update Status

        </button>

      </div>

    </div>

  );

}