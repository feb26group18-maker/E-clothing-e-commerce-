import "./EditSellerProfile.css"; import { useEffect, useState } from "react"; import { useNavigate, useParams } from "react-router-dom"; export default function SellerEditProfile() {
  const { id } = useParams(); const navigate = useNavigate(); const [seller, setSeller] = useState({ name: "", email: "", mobile: "", shopName: "", gstNumber: "", businessAddress: "" }); const [msg, setMsg] = useState(""); useEffect(() => { const token = localStorage.getItem("token"); console.log("TOKEN:", token); console.log("SELLER ID:", id); fetch(`http://localhost:8080/users/seller/profile/${id}`, { method: "GET", headers: { "Authorization": `Bearer ${token}`, "Content-Type": "application/json" } }).then((res) => { console.log("STATUS:", res.status); if (!res.ok) { throw new Error("Failed to fetch seller"); } return res.json(); }).then((data) => { console.log("SELLER DATA:", data); setSeller(data); }).catch((err) => { console.log(err); }); }, [id]); const handleChange = (e) => { setSeller({ ...seller, [e.target.name]: e.target.value }); }; const handleUpdate = () => { const token = localStorage.getItem("token"); fetch(`http://localhost:8080/users/seller/${id}`, { method: "PUT", headers: { "Authorization": `Bearer ${token}`, "Content-Type": "application/json" }, body: JSON.stringify({ name: seller.name, mobile: seller.mobile, shopName: seller.shopName, gstNumber: seller.gstNumber, businessAddress: seller.businessAddress }) }).then((res) => { if (!res.ok) { throw new Error("Profile update failed"); } return res.text(); }).then((data) => { console.log("Update Response:", data); setMsg("Profile updated successfully ✅"); setTimeout(() => { navigate(`/seller/profile`); }, 1500); }).catch((err) => { console.log(err); setMsg(err.message); }); }; return (<div className="edit-profile-container">
    <div className="edit-card">
      <h2>Edit Seller Profile</h2> {msg && <p className="success-msg"> {msg} </p>} <div className="form-grid">
        <div>
          <label>Name</label>
          <input name="name" value={seller.name} onChange={handleChange} />
        </div>
        <div>
          <label>Email</label>
          <input name="email" value={seller.email} disabled />
        </div>
        <div>
          <label>Mobile</label>
          <input name="mobile" value={seller.mobile} onChange={handleChange} />
        </div>
        <div>
          <label>Shop Name</label>
          <input name="shopName" value={seller.shopName} onChange={handleChange} />
        </div>
        <div>
          <label>GST Number</label>
          <input name="gstNumber" value={seller.gstNumber} onChange={handleChange} />
        </div>
        <div className="full">
          <label> Business Address </label>
          <textarea name="businessAddress" value={seller.businessAddress} onChange={handleChange} />
        </div>
      </div>
      <div className="actions">
        <button className="cancel-btn" onClick={() => navigate(-1)} > Cancel </button>
        <button className="update-btn" onClick={handleUpdate}> Update Profile </button>
      </div>
    </div>
  </div>)
}