import { useEffect } from "react";
import { useNavigate } from "react-router-dom";
import axios from "../axiosConfig";

export default function AuthSuccess({ setUser }) {
  const navigate = useNavigate();

  useEffect(() => {
    axios
      .get("/auth/user", { withCredentials: true })
      .then((res) => {
        setUser(res.data);
        navigate("/courses");
      })
      .catch(() => {
        navigate("/"); 
      });
  }, [navigate, setUser]);
  return <div>Logging you in...</div>;
}
