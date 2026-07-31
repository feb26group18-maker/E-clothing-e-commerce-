import { useNavigate } from "react-router-dom";
import Breadcrumb from "./Breadcrumb";
import "./SellerProductList.css";
import { useEffect, useState } from "react";
import { getSellerProducts, deleteProduct } from "../services/productService";

export default function SellerProductList() {

  const navigate = useNavigate();
  // const sellerId = 8; // Later replace with logged-in seller id
  const user = JSON.parse(localStorage.getItem("user"));
const sellerId = user.sellerId;

  const [products, setProducts] = useState([]);

  useEffect(() => {
    fetchProducts();
}, []);

const fetchProducts = async () => {
    try {

        const response = await getSellerProducts(sellerId);
        setProducts(response.data);

    } catch (error) {

        console.log(error);

    }
};

  const handleDelete = async (productId) => {


    const confirmDelete = window.confirm(
        "Are you sure you want to delete this product?"
    );


    if(!confirmDelete){
        return;
    }


    try {

        await deleteProduct(productId);

        alert("Product deleted successfully");

        fetchProducts();


    } catch(error){

        console.log(error);

        alert("Failed to delete product");

    }

};

  return(

<div className="product-page">

<Breadcrumb
items={[
{label:"Seller",path:"/seller"},
{label:"Products",path:"/seller/products"},
{label:"Manage Products"}
]}
/>

<div className="product-toolbar">
  <button
    className="add-product-btn"
    onClick={() => navigate("/seller/add-product")}
  >
    + Add Product
  </button>
</div>


<div className="product-card">

<table className="product-table">

<thead>

<tr>

<th>Product Id</th>
<th>Product</th>
<th>Category</th>
<th>Price</th>
{/* <th>Status</th> */}
<th>Actions</th>

</tr>

</thead>

<tbody>

{products.map(product=>(

<tr key={product.productId}>

<td>#{product.productId}</td>

<td>

<div className="name-cell">

<div className="avatar">
{product.productName.charAt(0)}

 
</div>

{product.productName}

</div>

</td>

<td>{product.categoryName}</td>

<td>₹{product.price}</td>


{/* <td>

<span className={`status-badge ${product.approvalStatus.toLowerCase()}`}>
{product.approvalStatus}
</span>

</td> */}

<td>

<div className="action-buttons">

<button
 className="view-btn"
 onClick={() => navigate(`/seller/products/${product.productId}`)}
>
 View
</button>


<button
className="edit-btn"
onClick={() => navigate(`/seller/edit-product/${product.productId}`)}
>
Edit
</button>

<button
className="delete-btn"
onClick={() => handleDelete(product.productId)}
>
Delete
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
