import { useEffect } from "react";
import { useNavigate } from "react-router-dom";
import axios from "../axiosConfig";

export default function AuthSuccess({ setUser }) {
  const navigate = useNavigate();

  useEffect(() => {
    const fetchUser = async () => {
      try {
        const res = await axios.get("/auth/user", { withCredentials: true });
        setUser(res.data);
        navigate("/courses");
      } catch (err) {
        console.error("Auth failed", err);
        navigate("/");
      }
    };
    fetchUser();
  }, [setUser, navigate]);

  return <p>Logging you in...</p>;
}
