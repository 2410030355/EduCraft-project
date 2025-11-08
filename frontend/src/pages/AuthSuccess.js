import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import axios from "../axiosConfig";

export default function AuthSuccess({ setUser }) {
  const navigate = useNavigate();
  const [status, setStatus] = useState("Logging you in...");

  useEffect(() => {
    const fetchUser = async () => {
      try {
        const res = await axios.get("/auth/user", { withCredentials: true });
        setUser(res.data);
        setStatus("Redirecting to Courses...");
        setTimeout(() => {
          navigate("/courses");
        }, 800);
      } catch (err) {
        console.error("Auth failed", err);
        setStatus("Login failed. Redirecting to Home...");
        setTimeout(() => {
          navigate("/");
        }, 1000);
      }
    };
    fetchUser();
  }, [setUser, navigate]);

  return (
    <div className="page-content">
      <h2>{status}</h2>
    </div>
  );
}
