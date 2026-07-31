import "./Footer.css";

// export default function Footer() {
//   return (
//     <footer className="admin-footer">
//       <p>© {new Date().getFullYear()} E-Clothing Admin Panel. All rights reserved.</p>
//     </footer>
//   );
// }

export default function Footer() {
  return (
    <footer className="footer">
      <div className="footer-container">

        <div className="footer-column">
          <h2 className="footer-logo">
            <i className="bi bi-bag-heart-fill"></i> E-Clothing
          </h2>

          <p className="footer-desc">
            Discover the latest fashion trends for Men, Women and Kids.
            Shop premium quality clothing at affordable prices with fast
            and reliable delivery across India.
          </p>

          <div className="social-icons">
            <a href="#">
              <i className="bi bi-facebook"></i>
            </a>

            <a href="#">
              <i className="bi bi-instagram"></i>
            </a>

            <a href="#">
              <i className="bi bi-twitter-x"></i>
            </a>

            <a href="#">
              <i className="bi bi-youtube"></i>
            </a>
          </div>
        </div>

        <div className="footer-column">
          <h4>Customer Support</h4>

          <ul>
            <li>Contact Us</li>
            <li>Return Policy</li>
            <li>FAQ</li>
          </ul>
        </div>

        <div className="contact-info">
          <div>
            <i className="bi bi-geo-alt-fill"></i>
            <span>Pune, Maharashtra, India</span>
          </div>

          <div>
            <i className="bi bi-telephone-fill"></i>
            <span>+91 9876543210</span>
          </div>

          <div>
            <i className="bi bi-envelope-fill"></i>
            <span>support@eclothing.com</span>
          </div>
        </div>

      </div>

      <div className="footer-bottom">
        <p>© 2026 E-Clothing. All Rights Reserved.</p>

        <div className="footer-links">
          <span>Privacy Policy</span>
          <span>Terms & Conditions</span>
        </div>
      </div>
    </footer>
  );
}