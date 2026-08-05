// import "./SellerProfile.css";
// import { FaUserCircle } from "react-icons/fa";
// import Breadcrumb from "./Breadcrumb";
// import { useNavigate } from "react-router-dom";
// import { useEffect, useState } from "react";


// export default function SellerProfile() {

//   const navigate = useNavigate();

//   const [seller, setSeller] = useState(null);
//   const [msg, setMsg] = useState("");


//   useEffect(() => {

//     const id = localStorage.getItem("userId");
//     const token = localStorage.getItem("token");


//     console.log("Logged Seller Id:", id);
//     console.log("JWT Token:", token);


//     if (!id) {
//       setMsg("User Id not found");
//       return;
//     }


//     if (!token) {
//       setMsg("Token not found. Please login again.");
//       return;
//     }



//     fetch(`http://localhost:8080/users/seller/profile/${id}`, {

//       method: "GET",

//       headers: {

//         "Authorization": `Bearer ${token}`,

//         "Content-Type": "application/json"

//       }

//     })

//       .then((res) => {


//         if (!res.ok) {

//           throw new Error(
//             "Unable to fetch seller profile"
//           );

//         }


//         return res.json();


//       })

//       .then((data) => {


//         console.log("Seller Profile:", data);


//         setSeller(data);


//       })

//       .catch((err) => {


//         console.log(err);

//         setMsg(err.message);


//       });



//   }, []);




//   return (

//     <div className="seller-profile">


//       <Breadcrumb
//         items={[
//           { label: "Seller", path: "/seller" },
//           { label: "Profile" }
//         ]}
//       />



//       <div className="profile-card">



//         <div className="profile-header">


//           <FaUserCircle className="profile-avatar" />


//           <div>


//             <h2>
//               {seller?.name || "Loading..."}
//             </h2>


//             <p>
//               Seller Account
//             </p>


//           </div>


//         </div>





//         {
//           msg &&
//           <p className="error-msg">
//             {msg}
//           </p>
//         }





//         <div className="profile-details">



//           <div className="detail-box">

//             <label>Name</label>

//             <span>
//               {seller?.name || "Loading..."}
//             </span>

//           </div>





//           <div className="detail-box">

//             <label>Email</label>

//             <span>
//               {seller?.email || "Loading..."}
//             </span>

//           </div>





//           <div className="detail-box">

//             <label>Mobile</label>

//             <span>
//               {seller?.mobile || "Loading..."}
//             </span>

//           </div>





//           <div className="detail-box">

//             <label>Shop Name</label>

//             <span>
//               {seller?.shopName || "Loading..."}
//             </span>

//           </div>





//           <div className="detail-box">

//             <label>GST Number</label>

//             <span>
//               {seller?.gstNumber || "Loading..."}
//             </span>

//           </div>





//           <div className="detail-box full">

//             <label>
//               Business Address
//             </label>

//             <span>
//               {seller?.businessAddress || "Loading..."}
//             </span>

//           </div>



//         </div>






//         <div className="profile-action">


//           <button
//             className="edit-btn"
//             onClick={() => navigate(`/seller/edit-profile/${localStorage.getItem("userId")}`)}
//           >
//             Edit Profile
//           </button>


//         </div>



//       </div>


//     </div>

//   );

// }


import "./SellerProfile.css"; import { FaUserCircle } from "react-icons/fa"; import Breadcrumb from "./Breadcrumb"; import { useNavigate } from "react-router-dom"; import { useEffect, useState } from "react"; export default function SellerProfile() { const navigate = useNavigate(); const [seller, setSeller] = useState(null); const [msg, setMsg] = useState(""); useEffect(() => { const id = localStorage.getItem("userId"); const token = localStorage.getItem("token"); console.log("Logged Seller Id:", id); console.log("JWT Token:", token); if (!id) { setMsg("User Id not found"); return; } if (!token) { setMsg("Token not found. Please login again."); return; } fetch(`http://localhost:8080/users/seller/profile/${id}`, { method: "GET", headers: { "Authorization": `Bearer ${token}`, "Content-Type": "application/json" } }) .then((res) => { if (!res.ok) { throw new Error( "Unable to fetch seller profile" ); } return res.json(); }) .then((data) => { console.log("Seller Profile:", data); setSeller(data); }) .catch((err) => { console.log(err); setMsg(err.message); }); }, []); return ( <div className="seller-profile">
  <Breadcrumb items={[ { label: "Seller" , path: "/seller" }, { label: "Profile" } ]} />
  <div className="profile-card">
    <div className="profile-header">
      <FaUserCircle className="profile-avatar" />
      <div>
        <h2> {seller?.name || "Loading..."} </h2>
        <p> Seller Account </p>
      </div>
    </div> { msg && <p className="error-msg"> {msg} </p> } <div className="profile-details">
      <div className="detail-box">
        <label>Name</label>
        <span> {seller?.name || "Loading..."} </span>
      </div>
      <div className="detail-box">
        <label>Email</label>
        <span> {seller?.email || "Loading..."} </span>
      </div>
      <div className="detail-box">
        <label>Mobile</label>
        <span> {seller?.mobile || "Loading..."} </span>
      </div>
      <div className="detail-box">
        <label>Shop Name</label>
        <span> {seller?.shopName || "Loading..."} </span>
      </div>
      <div className="detail-box">
        <label>GST Number</label>
        <span> {seller?.gstNumber || "Loading..."} </span>
      </div>
      <div className="detail-box full">
        <label> Business Address </label>
        <span> {seller?.businessAddress || "Loading..."} </span>
      </div>
    </div>
    <div className="profile-action">
      <button className="edit-btn" onClick={()=> navigate(`/seller/edit-profile/${localStorage.getItem("userId")}`)} > Edit Profile </button>
    </div>
  </div>
</div> ); }