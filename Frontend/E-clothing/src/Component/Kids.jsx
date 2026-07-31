// import "./Kids.css";

// export default function Kids() {
//   const products = [
//     {
//       id: 1,
//       brand: "H&M Kids",
//       name: "Printed Cotton T-Shirt",
//       price: 499,
//       oldPrice: 999,
//       discount: "50% OFF",
//       image:
//         "https://images.pexels.com/photos/1620760/pexels-photo-1620760.jpeg",
//     },
//     {
//       id: 2,
//       brand: "Max Kids",
//       name: "Denim Dungaree Set",
//       price: 899,
//       oldPrice: 1499,
//       discount: "40% OFF",
//       image:
//         "https://images.pexels.com/photos/3662667/pexels-photo-3662667.jpeg",
//     },
//     {
//       id: 3,
//       brand: "Babyhug",
//       name: "Kids Casual Outfit",
//       price: 799,
//       oldPrice: 1399,
//       discount: "43% OFF",
//       image:
//         "https://images.pexels.com/photos/346796/pexels-photo-346796.jpeg",
//     },
//     {
//       id: 4,
//       brand: "Puma Kids",
//       name: "Sportswear Set",
//       price: 999,
//       oldPrice: 1799,
//       discount: "44% OFF",
//       image:
//         "https://images.pexels.com/photos/8613311/pexels-photo-8613311.jpeg",
//     },
//   ];

//   return (
//     <div className="kids-page">
//       {/* Hero Banner */}
//       <div className="kids-banner">
//         <div className="banner-content">
//           <h1>Kids Collection</h1>
//           <p>Fun, colorful & comfortable fashion for kids.</p>
//           <button>Shop Now</button>
//         </div>
//       </div>

//       {/* Filters */}
//       <div className="filter-bar">
//         <button>T-Shirts</button>
//         <button>Dresses</button>
//         <button>Shorts</button>
//         <button>Footwear</button>
//         <button>Toys</button>
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

export default function Kids() {
    return (
        <CategoryProduct
            categoryId={3}
            title="Kids Collection"
        />
    );
}