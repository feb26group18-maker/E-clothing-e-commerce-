// import { useEffect, useState } from "react";
// import { useNavigate, useParams } from "react-router-dom";
// import axios from "axios";
// import Breadcrumb from "./Breadcrumb";
// import "./SellerProductView.css";

// export default function ViewProduct() {

//   const { id } = useParams();
//   const navigate = useNavigate();

//   const [product, setProduct] = useState(null);
//   const [selectedImage, setSelectedImage] = useState(0);

//   useEffect(() => {
//     fetchProduct();
//   }, []);

//   const fetchProduct = async () => {

//     try {

//       const response = await axios.get(
//         `http://localhost:8080/products/${id}`
//       );

//       setProduct(response.data);

//     } catch (err) {

//       console.log(err);

//     }

//   };

//   if (!product) {

//     return <h2 className="loading">Loading Product...</h2>;

//   }

//   return (

//     <div className="view-page">

//       <Breadcrumb
//         items={[
//           { label: "Seller", path: "/seller" },
//           { label: "Products", path: "/seller/sellerproducts" },
//           { label: "View Product" }
//         ]}
//       />

//       <div className="product-container">

//         {/* LEFT */}

//         <div className="image-side">

//           <div className="main-image-box">

//             <img
//               src={product.imageUrls[selectedImage]}
//               alt={product.productName}
//               className="main-image"
//             />

//           </div>

//           <div className="thumb-list">

//             {product.imageUrls
//     ?.filter(img => img && img.trim() !== "")
//     .map((img, index) => (

//         <img
//             key={index}
//             src={`http://localhost:8080/uploads/${img}`}
//             alt="Product"
//             className={selectedImage === index ? "thumb active" : "thumb"}
//             onClick={() => setSelectedImage(index)}
//             onError={(e) => {
//                 e.target.style.display = "none";
//             }}
//         />

// ))}

//           </div>

          

//         </div>

//         {/* RIGHT */}

//         <div className="details-side">

//           <h1>{product.productName}</h1>

//           <div className="rating">

//             ★★★★★

//             <span>(4.8)</span>

//           </div>

//           <div className="price">

//             ₹ {product.price}

//           </div>

//           <div className="status-row">

//             <span
//               className={
//                 "status-badge " +
//                 product.approvalStatus.toLowerCase()
//               }
//             >

//               {product.approvalStatus}

//             </span>

//           </div>

//           <div className="info-box">

//             <div className="info">

//               <label>Category</label>

//               <p>{product.categoryName}</p>

//             </div>

//             <div className="info">

//               <label>Sub Category</label>

//               <p>{product.subCategoryName}</p>

//             </div>

//             <div className="info">

//               <label>Size</label>

//               <p>{product.size}</p>

//             </div>

//             {/* <div className="info">

//               <label>Seller</label>

//               <p>{product.sellerName}</p>

//             </div> */}

//           </div>

//         </div>

//       </div>

//       <div className="description-card">

//         <h2>Description</h2>

//         <p>{product.description}</p>

//       </div>

//       <div className="button-row">

//         <button
//           className="back-btn"
//           onClick={() => navigate("/seller/sellerproducts")}
//         >

//           ← Back

//         </button>
//       </div>
//     </div>
//   );
// }


import { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import axios from "axios";
import Breadcrumb from "./Breadcrumb";
import "./SellerProductView.css";

export default function ViewProduct() {
  const { id } = useParams();
  const navigate = useNavigate();

  const [product, setProduct] = useState(null);
  const [selectedImage, setSelectedImage] = useState(0);

  useEffect(() => {
    fetchProduct();
    // eslint-disable-next-line
  }, []);

  const fetchProduct = async () => {
    try {
      const response = await axios.get(
        `http://localhost:8080/products/${id}`
      );

      setProduct(response.data);
    } catch (err) {
      console.log(err);
    }
  };

  if (!product) {
    return <h2 className="loading">Loading Product...</h2>;
  }

  const images =
    product.imageUrls?.filter(
      (img) => img && img.trim() !== ""
    ) || [];

  return (
    <div className="view-page">
      <Breadcrumb
        items={[
          { label: "Seller", path: "/seller" },
          { label: "Products", path: "/seller/sellerproducts" },
          { label: "View Product" },
        ]}
      />

      <div className="product-container">
        {/* ================= LEFT SIDE ================= */}

        <div className="image-side">
          <div className="main-image-box">
            {images.length > 0 ? (
              <img
                src={images[selectedImage]}
                alt={product.productName}
                className="main-image"
              />
            ) : (
              <div className="no-image">
                <span>No Image Available</span>
              </div>
            )}
          </div>

          {images.length > 1 && (
            <div className="thumb-list">
              {images.map((img, index) => (
                <img
                  key={index}
                  src={img}
                  alt={`Product ${index + 1}`}
                  className={
                    selectedImage === index ? "thumb active" : "thumb"
                  }
                  onClick={() => setSelectedImage(index)}
                />
              ))}
            </div>
          )}
        </div>

        {/* ================= RIGHT SIDE ================= */}

        <div className="details-side">
          <div className="product-header">
            <h1>{product.productName}</h1>

            {/* <div className="status-row">
              <span
                className={
                  "status-badge " +
                  product.approvalStatus.toLowerCase()
                }
              >
                {product.approvalStatus}
              </span>
            </div> */}
          </div>

          {/* <div className="rating">
            <span className="stars">★★★★★</span>
            <span className="rating-text">(4.8 Rating)</span>
          </div> */}

          <div className="price">
            ₹ {Number(product.price).toLocaleString("en-IN")}
          </div>

          <div className="info-box">
            <div className="info">
              <label>Category</label>
              <p>{product.categoryName}</p>
            </div>

            <div className="info">
              <label>Sub Category</label>
              <p>{product.subCategoryName}</p>
            </div>

            <div className="info">
              <label>Size</label>
              <p>{product.size}</p>
            </div>

            {/* <div className="info">
              <label>Product ID</label>
              <p>#{product.productId}</p>
            </div> */}

            {/* Uncomment if seller name exists */}

            {/* 
            <div className="info">
              <label>Seller</label>
              <p>{product.sellerName}</p>
            </div>
            */}
          </div>
        </div>
      </div>

      {/* ================= DESCRIPTION ================= */}

      <div className="description-card">
        <h2>Description</h2>

        <p>
          {product.description
            ? product.description
            : "No description available."}
        </p>
      </div>

      {/* ================= BUTTONS ================= */}

      <div className="button-row">
        <button
          className="back-btn"
          onClick={() => navigate("/seller/sellerproducts")}
        >
          ← Back to Products
        </button>
      </div>
    </div>
  );
}