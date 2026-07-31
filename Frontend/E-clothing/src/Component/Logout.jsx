import { useEffect } from "react";
import { useDispatch } from "react-redux";
import { useNavigate } from "react-router-dom";
import { logout } from "../redux/authSlice";

export default function Logout() {
  const dispatch = useDispatch();
  const navigate = useNavigate();

  useEffect(() => {
    dispatch(logout());

    localStorage.removeItem("user");
    localStorage.removeItem("token");

    navigate("/", { replace: true });
  }, [dispatch, navigate]);

  return null;
}