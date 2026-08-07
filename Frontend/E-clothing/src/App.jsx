import { useState } from 'react'
import reactLogo from './assets/react.svg'
import viteLogo from './assets/vite.svg'
import heroImg from './assets/hero.png'
import './App.css'
import LoginComp from './Component/Login'
import { BrowserRouter, Route, Routes } from 'react-router-dom'
import Home from './Component/Home'
import UserDashboard from './Component/UserDashboard'
import AdminDashboard from './Component/AdminDashboard'
import ProtectedRoute from './Component/ProtectedRoute'
import Logout from './Component/Logout'
import CustomerRegister from './Component/CustomerRegister'
import WishlistLogin from './Component/WishlistLogin'
import Wishlist from './Component/Wishlist'
import CartEmpty from './Component/CartEmpty'
import AccountEmpty from './Component/AccountEmpty'
import UserLayout from './Component/UserLayout'
import Account from './Component/Account'
import Cart from './Component/Cart'
import DashboardHome from './Component/DashboardHome'
import SellerList from './Component/SellerList'
import CustomerList from './Component/CustomerList'
import CustomerView from './Component/CustomerView'
import ProductList from './Component/ProductList'
import Men from './Component/Men'
import Women from './Component/Women'
import Kids from './Component/Kids'
import SellerDashboard from "./Component/SellerDashboard";
import SellerHome from "./Component/SellerHome";
import SellerProfile from './Component/SellerProfile'
import SellerProductList from './Component/SellerProductList'
import SellerProductView from './Component/SellerProductView'
import ManageInventory from './Component/ManageInventory'
import SellerOrders from './Component/SellerOrders'
import OrderDetails from './Component/Orderdetails'
import SalesReport from './Component/SalesReport'
import EditSellerProfile from './Component/EditSellerProfile'
import AddProduct from './Component/AddProduct'
import EditProduct from './Component/EditProduct'
import Address from './Component/Address'
import Payment from './Component/Payment'
import MyOrder from './Component/MyOrder'
import CustomerOrderDetails from './Component/CustomerOrderDetails'
import OrderList from './Component/OrderList'
import CategoryList from './Component/CategoryList'
import AddCategory from './Component/AddCategory'
import EditCategory from './Component/EditCategory'
import SubCategoryList from './Component/SubCategoryList'
import AddSubCategory from './Component/AddSubCategory'
import EditSubCategory from './Component/EditSubCategory'
import AddInventory from './Component/AddInventory'



function App() {
  const [count, setCount] = useState(0)

  return (
    <>
      {/* <BrowserRouter>
        <Routes>
          <Route path='/' element={<Home />}>
            <Route path="login" element={<LoginComp />} />
            <Route path="register" element={<CustomerRegister/>} />
          </Route>
          <Route path="/user" element={<ProtectedRoute role={2}> <UserDashboard /> </ProtectedRoute>}>
            <Route path="search" element={<h1> Search</h1>} />
            <Route path="booking" element={<h1> Booking</h1>} />
            <Route path="logout" element={<Logout />} />
          </Route>
          <Route path="/admin" element={<ProtectedRoute role={1}> <AdminDashboard /> </ProtectedRoute>}>
          <Route path="users" element={<h1> Users</h1>} />
          <Route path="report" element={<h1> Report</h1>} />
          <Route path="logout" element={<Logout />} />
          </Route>
        </Routes>
      </BrowserRouter> */}

      {/* <BrowserRouter>
        <Routes>

          <Route path='/' element={<Home />} />

          <Route path="/login" element={<LoginComp />} />
          <Route path="/register" element={<CustomerRegister />} />
          <Route path="/wishlist" element={<Wishlist />} />

          <Route path="/wishlist-login" element={<WishlistLogin />} />
          <Route path="/cart-empty" element={<CartEmpty />} />
          <Route path="/account-empty" element={<AccountEmpty />} />

          <Route
            path="/user"
            element={
              <ProtectedRoute role={2}>
                <UserLayout />
              </ProtectedRoute>
            }
          >
            <Route index element={<UserDashboard />} />
           
            <Route path="search" element={<h1>Search</h1>} />
            <Route path="booking" element={<h1>Booking</h1>} />
            <Route path="logout" element={<Logout />} />
          </Route>


          <Route path="/admin" element={
            <ProtectedRoute role={1}>
              <AdminDashboard />
            </ProtectedRoute>
          }>
            <Route path="users" element={<h1>Users</h1>} />
            <Route path="report" element={<h1>Report</h1>} />
            <Route path="logout" element={<Logout />} />
          </Route>

        </Routes>
      </BrowserRouter> */}
      <BrowserRouter>
        <Routes>

          {/* Public Routes */}
          <Route path="/" element={<Home />} />
          <Route path="/login" element={<LoginComp />} />
          <Route path="/register" element={<CustomerRegister />} />
          <Route path="/wishlist" element={<Wishlist />} />
          <Route path="/wishlist-login" element={<WishlistLogin />} />

          <Route path="/cart-empty" element={<CartEmpty />} />
          <Route path="/account" element={<Account />} />
          <Route path="/account-empty" element={<AccountEmpty />} />

          {/* Global Logout Route */}
          <Route path="/logout" element={<Logout />} />

          <Route path="men" element={<Men />} />
          <Route path="women" element={<Women />} />
          <Route path="kids" element={<Kids />} />
          <Route path="cart" element={<Cart />} />
          <Route
            path="/customer/address"
            element={<Address />}
          />
          <Route
            path="/customer/payment"
            element={<Payment />}
          />
          <Route
            path="/orders"
            element={<MyOrder />}
          />
          <Route
            path="/customer/order-details/:orderId"
            element={<CustomerOrderDetails />}
          />



          {/* User Routes */}
          <Route
            path="/user"
            element={
              <ProtectedRoute role="Customer">
                <UserLayout />
              </ProtectedRoute>
            }
          >
            <Route index element={<Home />} />
            <Route path="search" element={<h1>Search</h1>} />
            <Route path="booking" element={<h1>Booking</h1>} />
            {/* <Route path="cart" element={<Cart />} /> */}
            {/* <Route path="men" element={<Men />} />
            <Route path="women" element={<Women />} />
            <Route path="kids" element={<Kids />} /> */}

          </Route>

          {/* Seller Routes */}
          <Route
            path="/seller"
            element={
              <ProtectedRoute role="Seller">
                <SellerDashboard />
              </ProtectedRoute>
            }
          >
            <Route index element={<SellerHome />} />
            <Route path="profile" element={<SellerProfile />} />
            <Route path="sellerproducts" element={<SellerProductList />} />
            <Route
              path="products/:id"
              element={<SellerProductView />}
            />
            <Route path="/seller/add-product" element={<AddProduct />} />

            <Route
              path="/seller/edit-product/:productId"
              element={<EditProduct />}
            />

            <Route path="/seller/edit-profile/:id" element={<EditSellerProfile />} />

            <Route path="inventory" element={<ManageInventory />} />
            <Route path="orders" element={<SellerOrders />} />
            <Route path="orders/:id" element={<OrderDetails />} />
            <Route path="salesreport" element={<SalesReport />} />

<Route
    path="/seller/inventory/add"
    element={<AddInventory />}
/>
          </Route>


          {/* Admin Routes */}
          <Route
            path="/admin"
            element={
              <ProtectedRoute role="Admin">
                <AdminDashboard />
              </ProtectedRoute>
            }
          >
            <Route index element={<DashboardHome />} />
            <Route path="sellers" element={<SellerList />} />
            <Route path="customers" element={<CustomerList />} />
            <Route path="customers/:id" element={<CustomerView />} />
            <Route path="products" element={<ProductList />} />
            <Route path="orders" element={<OrderList />} />
            <Route path="category" element={<CategoryList />} />
            <Route path="category/add" element={<AddCategory />} />
            <Route path="category/edit/:id" element={<EditCategory />} />
            <Route path="subcategory" element={<SubCategoryList />} />

            <Route path="subcategory/add" element={<AddSubCategory />} />
            <Route path="subcategory/edit/:id" element={<EditSubCategory />} />






          </Route>
        </Routes>
      </BrowserRouter>
    </>
  )
}

export default App
