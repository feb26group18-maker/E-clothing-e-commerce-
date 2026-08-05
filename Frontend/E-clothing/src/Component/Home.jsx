import "./Home.css"; import { NavLink, useNavigate } from "react-router-dom";
import Navbar from "./Navbar";
import Footer from "./Footer";
export default function Home() {
  const user = JSON.parse(localStorage.getItem("user"));

  const categories = [
    {
      name: "Men",
      image: "https://images.pexels.com/photos/1043474/pexels-photo-1043474.jpeg",
      path: "/men"
    },
    {
      name: "Women",
      image: "https://images.pexels.com/photos/994523/pexels-photo-994523.jpeg",
      path: "/women"
    },
    {
      name: "Kids",
      image: "https://images.pexels.com/photos/1620760/pexels-photo-1620760.jpeg",
      path: "/kids"
    }
  ];
  const products = [{ id: 1, name: "Men Jacket", price: "₹1499", image: "https://images.pexels.com/photos/1043474/pexels-photo-1043474.jpeg", },
  { id: 2, name: "Women Dress", price: "₹999", image: "https://images.pexels.com/photos/994523/pexels-photo-994523.jpeg", },
  { id: 3, name: "Kids Wear", price: "₹799", image: "https://images.pexels.com/photos/1620760/pexels-photo-1620760.jpeg", },
  { id: 4, name: "Casual Shirt", price: "₹699", image: "https://images.pexels.com/photos/428340/pexels-photo-428340.jpeg", },];

  const navigate = useNavigate();

  const handleWishlist = () => {
    if (user) {
      navigate("/wishlist");
    } else {
      navigate("/wishlist-login");
    }
  };

  const handleCart = () => {
    const user = localStorage.getItem("user");

    if (user) {
      navigate("/cart");
    } else {
      navigate("/cart-empty");
    }
  };

  const handleAccount = () => {
    const user = localStorage.getItem("user");

    if (user) {
      navigate("/account");
    } else {
      navigate("/account-empty");
    }
  };

  const logout = () => {
    localStorage.removeItem("user");
    window.location.href = "/";
  };
  return (
    <>
      <Navbar />
      <section className="banner-slider">
        <div id="fashionCarousel" className="carousel slide" data-bs-ride="carousel">
          <div className="carousel-indicators">
            <button type="button" data-bs-target="#fashionCarousel" data-bs-slide-to="0" className="active"></button>
            <button type="button" data-bs-target="#fashionCarousel" data-bs-slide-to="1"></button>
            <button type="button" data-bs-target="#fashionCarousel" data-bs-slide-to="2"></button>
          </div>
          <div className="carousel-inner"> {/* Banner 1 */} <div className="carousel-item active">
            <img src="https://images.pexels.com/photos/1884584/pexels-photo-1884584.jpeg" className="d-block w-100" alt="Fashion Banner" />
            <div className="carousel-caption">
              <h1>Summer Collection 2026</h1>
              <p>Discover Premium Fashion Trends</p>
            </div>
          </div> {/* Banner 2 */} <div className="carousel-item">
              <img src="https://images.pexels.com/photos/996329/pexels-photo-996329.jpeg" className="d-block w-100" alt="Fashion Banner" />
              <div className="carousel-caption">
                <h1>New Arrival For Women</h1>
                <p>Elegant Styles For Every Occasion</p>
              </div>
            </div> {/* Banner 3 */} <div className="carousel-item">
              <img src="https://images.pexels.com/photos/1043474/pexels-photo-1043474.jpeg" className="d-block w-100" alt="Fashion Banner" />
              <div className="carousel-caption">
                <h1>Men's Premium Collection</h1>
                <p>Look Stylish Every Day</p>
              </div>
            </div>
          </div>
          <button className="carousel-control-prev" type="button" data-bs-target="#fashionCarousel" data-bs-slide="prev">
            <span className="carousel-control-prev-icon"></span>
          </button>
          <button className="carousel-control-next" type="button" data-bs-target="#fashionCarousel" data-bs-slide="next">
            <span className="carousel-control-next-icon"></span>
          </button>
        </div>
      </section> {/* Hero Banner */}
      <section className="hero">

        <div>
          <h1>Discover Your Style</h1>

          <p>
            Explore the world of fashion with our premium collections
            designed for Men, Women, and Kids. Discover trendy outfits,
            stylish accessories, and comfortable everyday wear crafted
            with quality materials and modern designs.
          </p>

          <p>
            Whether you are looking for casual street style, elegant
            party wear, or the latest seasonal trends, we bring you
            a wide range of fashion choices that match your personality
            and lifestyle.
          </p>

          <p>
            Shop confidently with us and experience the perfect
            combination of style, comfort, and affordability.
            Upgrade your wardrobe with fashion that makes every moment special.
          </p>
        </div>

        <img
          src="https://images.pexels.com/photos/994523/pexels-photo-994523.jpeg"
          alt="fashion"
        />

      </section>
      <section className="why-section">

        <h2>Why Choose Us</h2>

        <div className="why-container">

          <div className="why-card">
            <h3>👗 Trendy Fashion</h3>
            <p>
              Latest styles and modern collections
              for every occasion.
            </p>
          </div>


          <div className="why-card">
            <h3>✨ Premium Quality</h3>
            <p>
              Carefully selected products with
              great comfort and design.
            </p>
          </div>


          <div className="why-card">
            <h3>💰 Affordable Price</h3>
            <p>
              Stylish outfits at prices
              everyone can enjoy.
            </p>
          </div>

        </div>

      </section>
      {/* Categories */}
      <section className="section">

        <h2>Shop By Category</h2>

        <div className="category-grid">

          {
            categories.map((item, index) => (

              <div
                className="category-card"
                key={index}
                onClick={() => navigate(item.path)}
              >

                <img
                  src={item.image}
                  alt={item.name}
                />

                <h4>{item.name}</h4>

              </div>

            ))
          }

        </div>

      </section>
      {/* Products */}
      <Footer />
    </>);
}