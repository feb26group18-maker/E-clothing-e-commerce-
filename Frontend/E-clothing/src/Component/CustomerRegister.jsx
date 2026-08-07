// import { useState } from "react";
// import { useNavigate } from "react-router-dom";
// import "./Register.css";

// function Register() {
//   const navigate = useNavigate();
//   const [role, setRole] = useState("");

//   const init = {
//     name: "",
//     email: "",
//     password: "",
//     confirmPassword: "",
//     mobile: "",
//     address: "",
//     city: "",
//     state: "",
//     pincode: "",

//     // Seller
//     shopName: "",
//     gstNumber: "",
//     businessAddress: ""
//   }
//   const [user, setUser] = useState(init);
//   // const [msg, setMsg] = useState("");
//   const [customerMsg, setCustomerMsg] = useState("");
//   const [sellerMsg, setSellerMsg] = useState("");

//   const handleSubmit = (e) => {
//     e.preventDefault();

//     if (
//       user.name.trim() === "" ||
//       user.email.trim() === "" ||
//       user.password.trim() === "" ||
//       user.confirmPassword.trim() === "" ||
//       user.mobile.trim() === "" ||
//       user.address.trim() === "" ||
//       user.city.trim() === "" ||
//       user.state.trim() === "" ||
//       user.pincode.trim() === ""
//     ) {
//       setMsg("Please fill all fields");
//       return;
//     }


//     // Check password and confirm password
//     if (user.password !== user.confirmPassword) {
//       setMsg("Password and Confirm Password do not match");
//       return;
//     }

//     if (!/^[0-9]{10}$/.test(user.mobile)) {
//       setCustomerMsg("Mobile number must be exactly 10 digits");
//       return;
//     }

//     const reqoptions = {
//       method: "POST",
//       headers: {
//         "Content-Type": "application/json"
//       },
//       body: JSON.stringify({
//         name: user.name,
//         email: user.email,
//         password: user.password,
//         mobile: user.mobile,
//         address: user.address,
//         city: user.city,
//         state: user.state,
//         pincode: user.pincode
//       })
//     };

//     fetch("http://localhost:8080/auth/register/customer", reqoptions)
//       .then((resp) => {
//         if (resp.ok) {
//           return resp.text();
//         } else {
//           return resp.text().then((text) => {
//             throw new Error(text || "Registration Failed");
//           });
//         }
//       })
//       .then((data) => {
//         setCustomerMsg(data);

//         // Clear form after successful registration
//         setUser(init);

//         // Redirect to Login page after successful registration
//         setTimeout(() => {
//           navigate("/login");
//         }, 1500);
//       })
//       .catch((err) => {
//         setCustomerMsg(err.message);
//         console.log(err);
//       });
//   };

//   const handleSellerSubmit = (e) => {
//     e.preventDefault();

//     if (
//       !user.name ||
//       !user.email ||
//       !user.password ||
//       !user.confirmPassword.trim() ||
//       !user.mobile ||
//       !user.shopName ||
//       !user.gstNumber ||
//       !user.businessAddress
//     ) {
//       setMsg("All fields are required");
//       return;
//     }

//     // Check password and confirm password
//     if (user.password !== user.confirmPassword) {
//       setMsg("Password and Confirm Password do not match");
//       return;
//     }

//     if (!/^[0-9]{10}$/.test(user.mobile)) {
//       setSellerMsg("Mobile number must be exactly 10 digits");
//       return;
//     }

//     const reqoptions = {
//       method: "POST",
//       headers: {
//         "Content-Type": "application/json"
//       },
//       body: JSON.stringify({
//         name: user.name,
//         email: user.email,
//         password: user.password,
//         mobile: user.mobile,
//         shopName: user.shopName,
//         gstNumber: user.gstNumber,
//         businessAddress: user.businessAddress
//       })
//     };

//     fetch("http://localhost:8080/auth/register/seller", reqoptions)
//       .then((resp) => {
//         if (resp.ok) {
//           return resp.text();
//         } else {
//           return resp.text().then((text) => {
//             throw new Error(text || "Registration Failed");
//           });
//         }
//       })
//       .then((data) => {
//         setSellerMsg(data);
//         setUser(init);

//         // Redirect to Login page after successful registration
//         setTimeout(() => {
//           navigate("/login");
//         }, 1500);
//       })
//       .catch((err) => {
//         setSellerMsg(err.message);
//         console.log(err);
//       });
//   };


//   return (
//     <div className="register-page">
//       <div className="container">

//         <h2 className="text-center mb-4 fw-bold">
//           Create Your Account
//         </h2>

//         {/* Role Selection */}

//         {!role && (
//           <div className="row justify-content-center">

//             <div className="col-md-4 mb-3">
//               <div
//                 className="role-card"
//                 // onClick={() => setRole("CUSTOMER")}
//                 onClick={() => {
//                   setRole("CUSTOMER");
//                   setCustomerMsg("");
//                   setSellerMsg("");
//                 }}
//               >
//                 <div className="display-5 mb-3">🛍️</div>
//                 <h4>Customer</h4>
//                 <p className="text-muted">
//                   Shop from the latest fashion collections.
//                 </p>
//               </div>
//             </div>

//             <div className="col-md-4 mb-3">
//               <div
//                 className="role-card"
//                 // onClick={() => setRole("SELLER")}
//                 onClick={() => {
//                   setRole("SELLER");
//                   setCustomerMsg("");
//                   setSellerMsg("");
//                 }}
//               >
//                 <div className="display-5 mb-3">🏪</div>
//                 <h4>Seller</h4>
//                 <p className="text-muted">
//                   Start selling your clothing products.
//                 </p>
//               </div>
//             </div>

//           </div>
//         )}

//         {/* Customer Registration */}

//         {role === "CUSTOMER" && (
//           <div className="register-card">
//             {/* 
//             <span
//               className="back-btn"
//               onClick={() => setRole("")}
//             >
//               ← Back
//             </span> */}

//             <h3 className="form-title">
//               🛍 Customer Registration
//             </h3>
//             <form onSubmit={handleSubmit}>
//               <div className="row">

//                 <div className="col-md-6 mb-3">
//                   <input
//                     type="text"
//                     className="form-control"
//                     placeholder="First Name" value={user.name} onChange={(e) => { setUser({ ...user, ["name"]: e.target.value }) }}
//                   />
//                 </div>

//                 <div className="col-md-6 mb-3">
//                   <input
//                     type="email"
//                     className="form-control"
//                     placeholder="Email Address" value={user.email} onChange={(e) => { setUser({ ...user, ["email"]: e.target.value }) }}
//                   />
//                 </div>

//                 <div className="col-md-6 mb-3">
//                   <input
//                     type="password"
//                     className="form-control"
//                     placeholder="Password" value={user.password} onChange={(e) => { setUser({ ...user, ["password"]: e.target.value }) }}
//                   />
//                 </div>

//                 <div className="col-md-6 mb-3">
//                   <input
//                     type="password"
//                     className="form-control"
//                     placeholder="Confirm Password" value={user.confirmPassword} onChange={(e) => { setUser({ ...user, ["confirmPassword"]: e.target.value }) }}
//                   />
//                 </div>

//                 <div className="col-6 mb-4">
//                   {/* <input
//                     type="text"
//                     className="form-control"
//                     placeholder="Mobile Number" value={user.mobile} onChange={(e) => { setUser({ ...user, ["mobile"]: e.target.value }) }}
//                   /> */}
//                   <input
//                     type="tel"
//                     className="form-control"
//                     placeholder="Mobile Number"
//                     maxLength="10"
//                     value={user.mobile}
//                     onChange={(e) => {
//                       const value = e.target.value.replace(/\D/g, "");
//                       setUser({ ...user, mobile: value });
//                     }}
//                   />
//                 </div>

//                 <div className="col-6 mb-4">
//                   <textarea
//                     className="form-control"
//                     rows="3"
//                     placeholder="Address" value={user.address} onChange={(e) => { setUser({ ...user, ["address"]: e.target.value }) }}
//                   ></textarea>
//                 </div>

//                 <div className="col-6 mb-4">
//                   <input
//                     type="text"
//                     className="form-control"
//                     placeholder="City" value={user.city} onChange={(e) => { setUser({ ...user, ["city"]: e.target.value }) }}
//                   />
//                 </div>

//                 <div className="col-6 mb-4">
//                   <input
//                     type="text"
//                     className="form-control"
//                     placeholder="State" value={user.state} onChange={(e) => { setUser({ ...user, ["state"]: e.target.value }) }}
//                   />
//                 </div>

//                 <div className="col-6 mb-4">
//                   <input
//                     type="text"
//                     className="form-control"
//                     placeholder="Pincode" value={user.pincode} onChange={(e) => { setUser({ ...user, ["pincode"]: e.target.value }) }}
//                   />
//                 </div>

//               </div>
//               <button type="submit" className="custom-btn">
//                 Register Customer
//               </button>
//               {/* {msg && (
//                 <p className="text-center mt-3 text-success">
//                   {msg}
//                 </p>
//               )} */}
//               {customerMsg && (
//                 <p className="text-center mt-3 text-success">
//                   {customerMsg}
//                 </p>
//               )}
//             </form>
//           </div>
//         )}

//         {/* Seller Registration */}

//         {role === "SELLER" && (
//           <div className="register-card">

//             {/* <span
//               className="back-btn"
//               onClick={() => setRole("")}
//             >
//               ← Back
//             </span> */}

//             <h3 className="form-title">
//               🏪 Seller Registration
//             </h3>
//             <form onSubmit={handleSellerSubmit}>
//               <div className="row">

//                 <div className="col-md-6 mb-3">
//                   <input type="text" className="form-control" placeholder="Full Name" value={user.name} onChange={(e) => setUser({ ...user, name: e.target.value })} />
//                 </div>

//                 <div className="col-md-6 mb-3">
//                   <input type="email" className="form-control" placeholder="Email address" value={user.email} onChange={(e) => setUser({ ...user, email: e.target.value })} />
//                 </div>

//                 <div className="col-md-6 mb-3">
//                   <input
//                     type="password"
//                     className="form-control"
//                     placeholder="Password" value={user.password} onChange={(e) => setUser({ ...user, password: e.target.value })} />
//                 </div>

//                 <div className="col-md-6 mb-3">
//                   <input
//                     type="password"
//                     className="form-control"
//                     placeholder="Confirm Password" value={user.confirmPassword} onChange={(e) => setUser({ ...user, confirmPassword: e.target.value })} />
//                 </div>

//                 <div className="col-md-6 mb-3">
//                   {/* <input
//                     type="text"
//                     className="form-control"
//                     placeholder="Phone Number" value={user.mobile} onChange={(e) => setUser({ ...user, mobile: e.target.value })} /> */}
//                   <input
//                     type="tel"
//                     className="form-control"
//                     placeholder="Phone Number"
//                     maxLength="10"
//                     value={user.mobile}
//                     onChange={(e) => {
//                       const value = e.target.value.replace(/\D/g, "");
//                       setUser({ ...user, mobile: value });
//                     }}
//                   />
//                 </div>

//                 <div className="col-md-6 mb-3">
//                   <input
//                     type="text"
//                     className="form-control"
//                     placeholder="Shop Name" value={user.shopName} onChange={(e) => setUser({ ...user, shopName: e.target.value })} />
//                 </div>

//                 <div className="col-md-6 mb-3">
//                   <input
//                     type="text"
//                     className="form-control"
//                     placeholder="GST Number" value={user.gstNumber} onChange={(e) => setUser({ ...user, gstNumber: e.target.value })} />
//                 </div>

//                 <div className="col-12 mb-4">
//                   <textarea
//                     className="form-control"
//                     rows="3"
//                     placeholder="Shop Address" value={user.businessAddress} onChange={(e) => setUser({ ...user, businessAddress: e.target.value })}
//                   ></textarea>
//                 </div>

//               </div>

//               <button type="submit" className="custom-btn">
//                 Register Seller
//               </button>
//               {/* {msg && (
//                 <p className="text-center mt-3 text-success">
//                   {msg}
//                 </p>
//               )} */}
//               {sellerMsg && (
//                 <p className="text-center mt-3 text-success">
//                   {sellerMsg}
//                 </p>
//               )}
//             </form>

//           </div>
//         )}

//       </div>
//     </div>
//   );
// }

// export default Register;


import { useState } from "react";
import { useNavigate } from "react-router-dom";
import "./Register.css";

function Register() {
  const navigate = useNavigate();

  const [role, setRole] = useState("");

  const init = {
    name: "",
    email: "",
    password: "",
    confirmPassword: "",
    mobile: "",
    address: "",
    city: "",
    state: "",
    pincode: "",

    // Seller
    shopName: "",
    gstNumber: "",
    businessAddress: ""
  };

  const [user, setUser] = useState(init);

  // Separate messages for Customer and Seller
  const [customerMsg, setCustomerMsg] = useState("");
  const [sellerMsg, setSellerMsg] = useState("");

  // Separate message type
  const [customerMsgType, setCustomerMsgType] = useState("");
  const [sellerMsgType, setSellerMsgType] = useState("");

  // =========================================================
  // CUSTOMER REGISTRATION
  // =========================================================

  const handleSubmit = (e) => {
    e.preventDefault();

    // Clear previous message
    setCustomerMsg("");
    setCustomerMsgType("");

    // ---------------- NAME ----------------

    if (!user.name.trim()) {
      setCustomerMsg("Name is required");
      setCustomerMsgType("error");
      return;
    }

    if (!/^[A-Za-z ]+$/.test(user.name.trim())) {
      setCustomerMsg("Name should contain only letters");
      setCustomerMsgType("error");
      return;
    }

    // ---------------- EMAIL ----------------

    if (!user.email.trim()) {
      setCustomerMsg("Email is required");
      setCustomerMsgType("error");
      return;
    }

    if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(user.email.trim())) {
      setCustomerMsg("Please enter a valid email address");
      setCustomerMsgType("error");
      return;
    }

    // ---------------- PASSWORD ----------------

    if (!user.password) {
      setCustomerMsg("Password is required");
      setCustomerMsgType("error");
      return;
    }

    if (user.password.length < 6) {
      setCustomerMsg("Password must be at least 6 characters");
      setCustomerMsgType("error");
      return;
    }

    // ---------------- CONFIRM PASSWORD ----------------

    if (!user.confirmPassword) {
      setCustomerMsg("Confirm Password is required");
      setCustomerMsgType("error");
      return;
    }

    if (user.password !== user.confirmPassword) {
      setCustomerMsg("Password and Confirm Password do not match");
      setCustomerMsgType("error");
      return;
    }

    // ---------------- MOBILE ----------------

    if (!user.mobile.trim()) {
      setCustomerMsg("Mobile number is required");
      setCustomerMsgType("error");
      return;
    }

    if (!/^[0-9]{10}$/.test(user.mobile)) {
      setCustomerMsg("Mobile number must be exactly 10 digits");
      setCustomerMsgType("error");
      return;
    }

    // ---------------- ADDRESS ----------------

    if (!user.address.trim()) {
      setCustomerMsg("Address is required");
      setCustomerMsgType("error");
      return;
    }

    // ---------------- CITY ----------------

    if (!user.city.trim()) {
      setCustomerMsg("City is required");
      setCustomerMsgType("error");
      return;
    }

    if (!/^[A-Za-z ]+$/.test(user.city.trim())) {
      setCustomerMsg("City should contain only letters");
      setCustomerMsgType("error");
      return;
    }

    // ---------------- STATE ----------------

    if (!user.state.trim()) {
      setCustomerMsg("State is required");
      setCustomerMsgType("error");
      return;
    }

    if (!/^[A-Za-z ]+$/.test(user.state.trim())) {
      setCustomerMsg("State should contain only letters");
      setCustomerMsgType("error");
      return;
    }

    // ---------------- PINCODE ----------------

    if (!user.pincode.trim()) {
      setCustomerMsg("Pincode is required");
      setCustomerMsgType("error");
      return;
    }

    if (!/^[0-9]{6}$/.test(user.pincode)) {
      setCustomerMsg("Pincode must be exactly 6 digits");
      setCustomerMsgType("error");
      return;
    }

    // =========================================================
    // CUSTOMER API CALL
    // =========================================================

    const reqoptions = {
      method: "POST",
      headers: {
        "Content-Type": "application/json"
      },

      body: JSON.stringify({
        name: user.name.trim(),
        email: user.email.trim(),
        password: user.password,
        mobile: user.mobile,
        address: user.address.trim(),
        city: user.city.trim(),
        state: user.state.trim(),
        pincode: user.pincode
      })
    };

    fetch("http://localhost:8080/auth/register/customer", reqoptions)
      .then((resp) => {
        if (resp.ok) {
          return resp.text();
        } else {
          return resp.text().then((text) => {
            throw new Error(text || "Customer Registration Failed");
          });
        }
      })

      .then((data) => {
        setCustomerMsg(data || "Customer Registration Successful!");
        setCustomerMsgType("success");

        // Clear form
        setUser(init);

        // Redirect to Login
        setTimeout(() => {
          navigate("/login");
        }, 1500);
      })

      .catch((err) => {
        setCustomerMsg(err.message);
        setCustomerMsgType("error");
        console.log(err);
      });
  };

  // =========================================================
  // SELLER REGISTRATION
  // =========================================================

  const handleSellerSubmit = (e) => {
    e.preventDefault();

    // Clear previous message
    setSellerMsg("");
    setSellerMsgType("");

    // ---------------- NAME ----------------

    if (!user.name.trim()) {
      setSellerMsg("Name is required");
      setSellerMsgType("error");
      return;
    }

    if (!/^[A-Za-z ]+$/.test(user.name.trim())) {
      setSellerMsg("Name should contain only letters");
      setSellerMsgType("error");
      return;
    }

    // ---------------- EMAIL ----------------

    if (!user.email.trim()) {
      setSellerMsg("Email is required");
      setSellerMsgType("error");
      return;
    }

    if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(user.email.trim())) {
      setSellerMsg("Please enter a valid email address");
      setSellerMsgType("error");
      return;
    }

    // ---------------- PASSWORD ----------------

    if (!user.password) {
      setSellerMsg("Password is required");
      setSellerMsgType("error");
      return;
    }

    if (user.password.length < 6) {
      setSellerMsg("Password must be at least 6 characters");
      setSellerMsgType("error");
      return;
    }

    // ---------------- CONFIRM PASSWORD ----------------

    if (!user.confirmPassword) {
      setSellerMsg("Confirm Password is required");
      setSellerMsgType("error");
      return;
    }

    if (user.password !== user.confirmPassword) {
      setSellerMsg("Password and Confirm Password do not match");
      setSellerMsgType("error");
      return;
    }

    // ---------------- MOBILE ----------------

    if (!user.mobile.trim()) {
      setSellerMsg("Mobile number is required");
      setSellerMsgType("error");
      return;
    }

    if (!/^[0-9]{10}$/.test(user.mobile)) {
      setSellerMsg("Mobile number must be exactly 10 digits");
      setSellerMsgType("error");
      return;
    }

    // ---------------- SHOP NAME ----------------

    if (!user.shopName.trim()) {
      setSellerMsg("Shop Name is required");
      setSellerMsgType("error");
      return;
    }

    // ---------------- GST NUMBER ----------------

    if (!user.gstNumber.trim()) {
      setSellerMsg("GST Number is required");
      setSellerMsgType("error");
      return;
    }

    if (!/^[0-9A-Z]{15}$/.test(user.gstNumber.trim().toUpperCase())) {
      setSellerMsg("Please enter a valid 15-character GST Number");
      setSellerMsgType("error");
      return;
    }

    // ---------------- BUSINESS ADDRESS ----------------

    if (!user.businessAddress.trim()) {
      setSellerMsg("Shop Address is required");
      setSellerMsgType("error");
      return;
    }

    // =========================================================
    // SELLER API CALL
    // =========================================================

    const reqoptions = {
      method: "POST",
      headers: {
        "Content-Type": "application/json"
      },

      body: JSON.stringify({
        name: user.name.trim(),
        email: user.email.trim(),
        password: user.password,
        mobile: user.mobile,
        shopName: user.shopName.trim(),
        gstNumber: user.gstNumber.trim().toUpperCase(),
        businessAddress: user.businessAddress.trim()
      })
    };

    fetch("http://localhost:8080/auth/register/seller", reqoptions)
      .then((resp) => {
        if (resp.ok) {
          return resp.text();
        } else {
          return resp.text().then((text) => {
            throw new Error(text || "Seller Registration Failed");
          });
        }
      })

      .then((data) => {
        setSellerMsg(data || "Seller Registration Successful!");
        setSellerMsgType("success");

        // Clear form
        setUser(init);

        // Redirect to Login
        setTimeout(() => {
          navigate("/login");
        }, 1500);
      })

      .catch((err) => {
        setSellerMsg(err.message);
        setSellerMsgType("error");
        console.log(err);
      });
  };

  // =========================================================
  // RETURN UI
  // =========================================================

  return (
    <div className="container py-5">

      <h2 className="text-center mb-4 fw-bold">
        Create Your Account
      </h2>

      {/* =====================================================
          ROLE SELECTION
      ====================================================== */}

      {!role && (
        <div className="row justify-content-center">

          {/* CUSTOMER CARD */}

          <div className="col-md-4 mb-3">
            <div
              className="role-card"
              onClick={() => {
                setRole("CUSTOMER");
                setCustomerMsg("");
                setSellerMsg("");
              }}
            >
              <div className="display-5 mb-3">
                🛍️
              </div>

              <h4>Customer</h4>

              <p className="text-muted">
                Shop from the latest fashion collections.
              </p>
            </div>
          </div>

          {/* SELLER CARD */}

          <div className="col-md-4 mb-3">
            <div
              className="role-card"
              onClick={() => {
                setRole("SELLER");
                setCustomerMsg("");
                setSellerMsg("");
              }}
            >
              <div className="display-5 mb-3">
                🏪
              </div>

              <h4>Seller</h4>

              <p className="text-muted">
                Start selling your clothing products.
              </p>
            </div>
          </div>

        </div>
      )}

      {/* =====================================================
          CUSTOMER REGISTRATION
      ====================================================== */}

      {role === "CUSTOMER" && (
        <div className="register-card">

          <h3 className="form-title">
            🛍 Customer Registration
          </h3>

          <form onSubmit={handleSubmit}>

            <div className="row">

              {/* NAME */}

              <div className="col-md-6 mb-3">
                <input
                  type="text"
                  className="form-control"
                  placeholder="First Name"
                  value={user.name}
                  onChange={(e) => {
                    const value = e.target.value.replace(
                      /[^A-Za-z ]/g,
                      ""
                    );

                    setUser({
                      ...user,
                      name: value
                    });
                  }}
                />
              </div>

              {/* EMAIL */}

              <div className="col-md-6 mb-3">
                <input
                  type="email"
                  className="form-control"
                  placeholder="Email Address"
                  value={user.email}
                  onChange={(e) =>
                    setUser({
                      ...user,
                      email: e.target.value
                    })
                  }
                />
              </div>

              {/* PASSWORD */}

              <div className="col-md-6 mb-3">
                <input
                  type="password"
                  className="form-control"
                  placeholder="Password"
                  value={user.password}
                  onChange={(e) =>
                    setUser({
                      ...user,
                      password: e.target.value
                    })
                  }
                />
              </div>

              {/* CONFIRM PASSWORD */}

              <div className="col-md-6 mb-3">
                <input
                  type="password"
                  className="form-control"
                  placeholder="Confirm Password"
                  value={user.confirmPassword}
                  onChange={(e) =>
                    setUser({
                      ...user,
                      confirmPassword: e.target.value
                    })
                  }
                />
              </div>

              {/* MOBILE */}

              <div className="col-6 mb-4">
                <input
                  type="tel"
                  className="form-control"
                  placeholder="Mobile Number"
                  maxLength="10"
                  value={user.mobile}
                  onChange={(e) => {
                    const value = e.target.value.replace(
                      /\D/g,
                      ""
                    );

                    setUser({
                      ...user,
                      mobile: value
                    });
                  }}
                />
              </div>

              {/* ADDRESS */}

              <div className="col-6 mb-4">
                <textarea
                  className="form-control"
                  rows="3"
                  placeholder="Address"
                  value={user.address}
                  onChange={(e) =>
                    setUser({
                      ...user,
                      address: e.target.value
                    })
                  }
                ></textarea>
              </div>

              {/* CITY */}

              <div className="col-6 mb-4">
                <input
                  type="text"
                  className="form-control"
                  placeholder="City"
                  value={user.city}
                  onChange={(e) => {
                    const value = e.target.value.replace(
                      /[^A-Za-z ]/g,
                      ""
                    );

                    setUser({
                      ...user,
                      city: value
                    });
                  }}
                />
              </div>

              {/* STATE */}

              <div className="col-6 mb-4">
                <input
                  type="text"
                  className="form-control"
                  placeholder="State"
                  value={user.state}
                  onChange={(e) => {
                    const value = e.target.value.replace(
                      /[^A-Za-z ]/g,
                      ""
                    );

                    setUser({
                      ...user,
                      state: value
                    });
                  }}
                />
              </div>

              {/* PINCODE */}

              <div className="col-6 mb-4">
                <input
                  type="tel"
                  className="form-control"
                  placeholder="Pincode"
                  maxLength="6"
                  value={user.pincode}
                  onChange={(e) => {
                    const value = e.target.value.replace(
                      /\D/g,
                      ""
                    );

                    setUser({
                      ...user,
                      pincode: value
                    });
                  }}
                />
              </div>

            </div>

            <button
              type="submit"
              className="custom-btn"
            >
              Register Customer
            </button>

            {/* CUSTOMER MESSAGE */}

            {customerMsg && (
              <p
                className={`text-center mt-3 ${
                  customerMsgType === "success"
                    ? "text-success"
                    : "text-danger"
                }`}
              >
                {customerMsg}
              </p>
            )}

          </form>
        </div>
      )}

      {/* =====================================================
          SELLER REGISTRATION
      ====================================================== */}

      {role === "SELLER" && (
        <div className="register-card">

          <h3 className="form-title">
            🏪 Seller Registration
          </h3>

          <form onSubmit={handleSellerSubmit}>

            <div className="row">

              {/* NAME */}

              <div className="col-md-6 mb-3">
                <input
                  type="text"
                  className="form-control"
                  placeholder="Full Name"
                  value={user.name}
                  onChange={(e) => {
                    const value = e.target.value.replace(
                      /[^A-Za-z ]/g,
                      ""
                    );

                    setUser({
                      ...user,
                      name: value
                    });
                  }}
                />
              </div>

              {/* EMAIL */}

              <div className="col-md-6 mb-3">
                <input
                  type="email"
                  className="form-control"
                  placeholder="Email address"
                  value={user.email}
                  onChange={(e) =>
                    setUser({
                      ...user,
                      email: e.target.value
                    })
                  }
                />
              </div>

              {/* PASSWORD */}

              <div className="col-md-6 mb-3">
                <input
                  type="password"
                  className="form-control"
                  placeholder="Password"
                  value={user.password}
                  onChange={(e) =>
                    setUser({
                      ...user,
                      password: e.target.value
                    })
                  }
                />
              </div>

              {/* CONFIRM PASSWORD */}

              <div className="col-md-6 mb-3">
                <input
                  type="password"
                  className="form-control"
                  placeholder="Confirm Password"
                  value={user.confirmPassword}
                  onChange={(e) =>
                    setUser({
                      ...user,
                      confirmPassword: e.target.value
                    })
                  }
                />
              </div>

              {/* MOBILE */}

              <div className="col-md-6 mb-3">
                <input
                  type="tel"
                  className="form-control"
                  placeholder="Phone Number"
                  maxLength="10"
                  value={user.mobile}
                  onChange={(e) => {
                    const value = e.target.value.replace(
                      /\D/g,
                      ""
                    );

                    setUser({
                      ...user,
                      mobile: value
                    });
                  }}
                />
              </div>

              {/* SHOP NAME */}

              <div className="col-md-6 mb-3">
                <input
                  type="text"
                  className="form-control"
                  placeholder="Shop Name"
                  value={user.shopName}
                  onChange={(e) =>
                    setUser({
                      ...user,
                      shopName: e.target.value
                    })
                  }
                />
              </div>

              {/* GST NUMBER */}

              <div className="col-md-6 mb-3">
                <input
                  type="text"
                  className="form-control"
                  placeholder="GST Number"
                  maxLength="15"
                  value={user.gstNumber}
                  onChange={(e) => {
                    const value =
                      e.target.value
                        .toUpperCase()
                        .replace(/[^A-Z0-9]/g, "");

                    setUser({
                      ...user,
                      gstNumber: value
                    });
                  }}
                />
              </div>

              {/* BUSINESS ADDRESS */}

              <div className="col-12 mb-4">
                <textarea
                  className="form-control"
                  rows="3"
                  placeholder="Shop Address"
                  value={user.businessAddress}
                  onChange={(e) =>
                    setUser({
                      ...user,
                      businessAddress: e.target.value
                    })
                  }
                ></textarea>
              </div>

            </div>

            <button
              type="submit"
              className="custom-btn"
            >
              Register Seller
            </button>

            {/* SELLER MESSAGE */}

            {sellerMsg && (
              <p
                className={`text-center mt-3 ${
                  sellerMsgType === "success"
                    ? "text-success"
                    : "text-danger"
                }`}
              >
                {sellerMsg}
              </p>
            )}

          </form>
        </div>
      )}

    </div>
  );
}

export default Register;