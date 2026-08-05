import { useState } from "react";
import "./Register.css";

function Register() {
  const [role, setRole] = useState("");

  const init = {
    name: "",
    email: "",
    password: "",
    mobile: "",
    address: "",
    city: "",
    state: "",
    pincode: "",

    // Seller
    shopName: "",
    gstNumber: "",
    businessAddress: ""
  }
  const [user, setUser] = useState(init);
  const [msg, setMsg] = useState("");

  const handleSubmit = (e) => {
    e.preventDefault();

    if (
      user.name.trim() === "" ||
      user.email.trim() === "" ||
      user.password.trim() === "" ||
      user.mobile.trim() === "" ||
      user.address.trim() === "" ||
      user.city.trim() === "" ||
      user.state.trim() === "" ||
      user.pincode.trim() === ""
    ) {
      setMsg("Please fill all fields");
      return;
    }

    const reqoptions = {
      method: "POST",
      headers: {
        "Content-Type": "application/json"
      },
      body: JSON.stringify({
        name: user.name,
        email: user.email,
        password: user.password,
        mobile: user.mobile,
        address: user.address,
        city: user.city,
        state: user.state,
        pincode: user.pincode
      })
    };

    fetch("http://localhost:8080/auth/register/customer", reqoptions)
      .then((resp) => {
        if (resp.ok) {
          return resp.text();
        } else {
          return resp.text().then((text) => {
            throw new Error(text || "Registration Failed");
          });
        }
      })
      .then((data) => {
        setMsg(data);

        // Clear form after successful registration
        setUser(init);
      })
      .catch((err) => {
        setMsg(err.message);
        console.log(err);
      });
  };

  const handleSellerSubmit = (e) => {
    e.preventDefault();

    if (
      !user.name ||
      !user.email ||
      !user.password ||
      !user.mobile ||
      !user.shopName ||
      !user.gstNumber ||
      !user.businessAddress
    ) {
      setMsg("All fields are required");
      return;
    }

    const reqoptions = {
      method: "POST",
      headers: {
        "Content-Type": "application/json"
      },
      body: JSON.stringify({
        name: user.name,
        email: user.email,
        password: user.password,
        mobile: user.mobile,
        shopName: user.shopName,
        gstNumber: user.gstNumber,
        businessAddress: user.businessAddress
      })
    };

    fetch("http://localhost:8080/auth/register/seller", reqoptions)
      .then((resp) => {
        if (resp.ok) {
          return resp.text();
        } else {
          return resp.text().then((text) => {
            throw new Error(text || "Registration Failed");
          });
        }
      })
      .then((data) => {
        setMsg(data);
        setUser(init);
      })
      .catch((err) => {
        setMsg(err.message);
        console.log(err);
      });
  };


  return (
    <div className="register-page">
      <div className="container">

        <h2 className="text-center mb-4 fw-bold">
          Create Your Account
        </h2>

        {/* Role Selection */}

        {!role && (
          <div className="row justify-content-center">

            <div className="col-md-4 mb-3">
              <div
                className="role-card"
                onClick={() => setRole("CUSTOMER")}
              >
                <div className="display-5 mb-3">🛍️</div>
                <h4>Customer</h4>
                <p className="text-muted">
                  Shop from the latest fashion collections.
                </p>
              </div>
            </div>

            <div className="col-md-4 mb-3">
              <div
                className="role-card"
                onClick={() => setRole("SELLER")}
              >
                <div className="display-5 mb-3">🏪</div>
                <h4>Seller</h4>
                <p className="text-muted">
                  Start selling your clothing products.
                </p>
              </div>
            </div>

          </div>
        )}

        {/* Customer Registration */}

        {role === "CUSTOMER" && (
          <div className="register-card">

            <span
              className="back-btn"
              onClick={() => setRole("")}
            >
              ← Back
            </span>

            <h3 className="form-title">
              🛍 Customer Registration
            </h3>
            <form onSubmit={handleSubmit}>
              <div className="row">

                <div className="col-md-6 mb-3">
                  <input
                    type="text"
                    className="form-control"
                    placeholder="First Name" value={user.name} onChange={(e) => { setUser({ ...user, ["name"]: e.target.value }) }}
                  />
                </div>

                <div className="col-md-6 mb-3">
                  <input
                    type="email"
                    className="form-control"
                    placeholder="Email Address" value={user.email} onChange={(e) => { setUser({ ...user, ["email"]: e.target.value }) }}
                  />
                </div>

                <div className="col-md-6 mb-3">
                  <input
                    type="password"
                    className="form-control"
                    placeholder="Password" value={user.password} onChange={(e) => { setUser({ ...user, ["password"]: e.target.value }) }}
                  />
                </div>

                <div className="col-md-6 mb-3">
                  <input
                    type="password"
                    className="form-control"
                    placeholder="Confirm Password" value={user.password} onChange={(e) => { setUser({ ...user, ["password"]: e.target.value }) }}
                  />
                </div>

                <div className="col-6 mb-4">
                  <input
                    type="text"
                    className="form-control"
                    placeholder="Mobile Number" value={user.mobile} onChange={(e) => { setUser({ ...user, ["mobile"]: e.target.value }) }}
                  />
                </div>

                <div className="col-6 mb-4">
                  <textarea
                    className="form-control"
                    rows="3"
                    placeholder="Address" value={user.address} onChange={(e) => { setUser({ ...user, ["address"]: e.target.value }) }}
                  ></textarea>
                </div>

                <div className="col-6 mb-4">
                  <input
                    type="text"
                    className="form-control"
                    placeholder="City" value={user.city} onChange={(e) => { setUser({ ...user, ["city"]: e.target.value }) }}
                  />
                </div>

                <div className="col-6 mb-4">
                  <input
                    type="text"
                    className="form-control"
                    placeholder="State" value={user.state} onChange={(e) => { setUser({ ...user, ["state"]: e.target.value }) }}
                  />
                </div>

                <div className="col-6 mb-4">
                  <input
                    type="text"
                    className="form-control"
                    placeholder="Pincode" value={user.pincode} onChange={(e) => { setUser({ ...user, ["pincode"]: e.target.value }) }}
                  />
                </div>

              </div>
              <button type="submit" className="custom-btn">
                Register Customer
              </button>
              {msg && (
                <p className="text-center mt-3 text-success">
                  {msg}
                </p>
              )}
            </form>
          </div>
        )}

        {/* Seller Registration */}

        {role === "SELLER" && (
          <div className="register-card">

            <span
              className="back-btn"
              onClick={() => setRole("")}
            >
              ← Back
            </span>

            <h3 className="form-title">
              🏪 Seller Registration
            </h3>
            <form onSubmit={handleSellerSubmit}>
              <div className="row">

                <div className="col-md-6 mb-3">
                  <input type="text" className="form-control" placeholder="Full Name" value={user.name} onChange={(e) => setUser({ ...user, name: e.target.value })} />
                </div>

                <div className="col-md-6 mb-3">
                  <input type="email" className="form-control" placeholder="Email address" value={user.email} onChange={(e) => setUser({ ...user, email: e.target.value })} />
                </div>

                <div className="col-md-6 mb-3">
                  <input
                    type="password"
                    className="form-control"
                    placeholder="Password" value={user.password} onChange={(e) => setUser({ ...user, password: e.target.value })} />
                </div>

                <div className="col-md-6 mb-3">
                  <input
                    type="password"
                    className="form-control"
                    placeholder="Confirm Password" value={user.password} onChange={(e) => setUser({ ...user, password: e.target.value })} />
                </div>

                <div className="col-md-6 mb-3">
                  <input
                    type="text"
                    className="form-control"
                    placeholder="Phone Number" value={user.mobile} onChange={(e) => setUser({ ...user, mobile: e.target.value })} />
                </div>

                <div className="col-md-6 mb-3">
                  <input
                    type="text"
                    className="form-control"
                    placeholder="Shop Name" value={user.shopName} onChange={(e) => setUser({ ...user, shopName: e.target.value })} />
                </div>

                <div className="col-md-6 mb-3">
                  <input
                    type="text"
                    className="form-control"
                    placeholder="GST Number" value={user.gstNumber} onChange={(e) => setUser({ ...user, gstNumber: e.target.value })} />
                </div>

                <div className="col-12 mb-4">
                  <textarea
                    className="form-control"
                    rows="3"
                    placeholder="Shop Address" value={user.businessAddress} onChange={(e) => setUser({ ...user, businessAddress: e.target.value })}
                  ></textarea>
                </div>

              </div>

              <button type="submit" className="custom-btn">
                Register Seller
              </button>
              {msg && (
                <p className="text-center mt-3 text-success">
                  {msg}
                </p>
              )}
            </form>

          </div>
        )}

      </div>
    </div>
  );
}

export default Register;