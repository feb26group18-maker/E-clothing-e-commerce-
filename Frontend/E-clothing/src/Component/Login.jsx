import { useState } from "react";
import { useDispatch } from "react-redux";
import { login } from "../redux/authSlice";
import { useNavigate, Link } from "react-router-dom";
import "./Login.css";

export default function LoginComp() {

  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [msg, setMsg] = useState("");

  const dispatch = useDispatch();
  const navigate = useNavigate();

  const handleSubmit = (e) => {
    e.preventDefault();

    const reqoptions = {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        email,
        password,
      }),
    };

    fetch("http://localhost:8081/auth/login", reqoptions)
      .then((resp) => resp.json())
      .then((data) => {

        console.log(data);

        if (data.token) {

          // Redux
          dispatch(
            login({
              user: {
                userId: data.userId,
                sellerId: data.sellerId,
                name: data.name,
                email: data.email,
                role: data.role,
              },
              token: data.token,
            })
          );

          // Local Storage
          localStorage.setItem(
            "user",
            JSON.stringify({
              userId: data.userId,
              sellerId: data.sellerId,
              name: data.name,
              email: data.email,
              role: data.role,
            })
          );

          localStorage.setItem("userId", data.userId);
          localStorage.setItem("sellerId", data.sellerId);
          localStorage.setItem("token", data.token);

          // Redirect according to role
          if (data.role === "Admin") {
            navigate("/admin");
          }
          else if (data.role === "Seller") {
            navigate("/seller");
          }
          else if (data.role === "Customer") {
            navigate("/user");
          }
          else {
            setMsg("Invalid Role");
          }

        } else {

          // Login Failed
          setMsg(data.message);

        }

      })
      .catch((err) => {
        console.log(err);
        setMsg("Something went wrong");
      });

  };

  return (
    <div className="login-page">
      <div className="login-card">

        <h2 className="login-title">
          👕 Welcome Back
        </h2>

        <p className="login-subtitle">
          Login to continue shopping
        </p>

        <form onSubmit={handleSubmit}>

          {/* Email */}
          <div className="form-group">
            <label>
              Email <span>*</span>
            </label>

            <input
              type="email"
              placeholder="Enter your email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              required
            />
          </div>

          {/* Password */}
          <div className="form-group">
            <label>
              Password <span>*</span>
            </label>

            <input
              type="password"
              placeholder="Enter your password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              required
            />
          </div>

          {/* Forgot Password */}
          <div className="forgot-password">
            <a href="#">Forgot Password?</a>
          </div>

          {/* Error Message */}
          {msg && (
            <div className="error-box">
              {msg}
            </div>
          )}

          <button
            type="submit"
            className="login-btn"
          >
            LOGIN
          </button>

        </form>

        <div className="register-text">
          <span>Don't have an account?</span>

          <Link to="/register">
            Register
          </Link>
        </div>

      </div>
    </div>
  );
}