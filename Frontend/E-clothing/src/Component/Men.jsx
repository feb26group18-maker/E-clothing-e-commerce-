// import "./Men.css";

// export default function Men() {
//   const products = [
//     {
//       id: 1,
//       brand: "Roadster",
//       name: "Slim Fit Shirt",
//       price: 799,
//       oldPrice: 1599,
//       discount: "50% OFF",
//       image:
//         "https://images.pexels.com/photos/428340/pexels-photo-428340.jpeg",
//     },
//     {
//       id: 2,
//       brand: "H&M",
//       name: "Casual Jacket",
//       price: 1499,
//       oldPrice: 2499,
//       discount: "40% OFF",
//       image:
//         "https://images.pexels.com/photos/1043474/pexels-photo-1043474.jpeg",
//     },
//     {
//       id: 3,
//       brand: "Levis",
//       name: "Blue Jeans",
//       price: 1199,
//       oldPrice: 1999,
//       discount: "40% OFF",
//       image:
//         "https://images.pexels.com/photos/1598505/pexels-photo-1598505.jpeg",
//     },
//     {
//       id: 4,
//       brand: "Nike",
//       name: "Sports T-Shirt",
//       price: 999,
//       oldPrice: 1499,
//       discount: "33% OFF",
//       image:
//         "https://images.pexels.com/photos/6311392/pexels-photo-6311392.jpeg",
//     },
//   ];

//   return (
//     <div className="men-page">
//       {/* Hero Banner */}
//       <div className="men-banner">
//         <div className="banner-content">
//           <h1>Men's Collection</h1>
//           <p>Discover the latest fashion trends.</p>
//           <button>Shop Now</button>
//         </div>
//       </div>

//       {/* Filters */}
//       <div className="filter-bar">
//         <button>Shirts</button>
//         <button>T-Shirts</button>
//         <button>Jeans</button>
//         <button>Jackets</button>
//         <button>Shoes</button>
//       </div>

//       {/* Products */}
//       <div className="product-grid">
//         {products.map((item) => (
//           <div className="product-card" key={item.id}>
//             <div className="image-box">
//               <img src={item.image} alt={item.name} />
//               <span className="wishlist">♡</span>
//             </div>

//             <div className="details">
//               <h4>{item.brand}</h4>
//               <p>{item.name}</p>

//               <div className="price">
//                 <span className="new">₹{item.price}</span>
//                 <span className="old">₹{item.oldPrice}</span>
//                 <span className="discount">{item.discount}</span>
//               </div>

//               <button>Add to Cart</button>
//             </div>
//           </div>
//         ))}
//       </div>
//     </div>
//   );
// }

import { useEffect, useState } from "react";

import CategoryProduct from "./CategoryProduct";


export default function Men() {
    return (
        <CategoryProduct
            categoryId={1}
            title="Men's Collection"
        />
    );
}