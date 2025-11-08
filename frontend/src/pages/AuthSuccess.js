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
        navigate("/");
      }
    };
    fetchUser();
  }, [navigate, setUser]);

  return <div>Loading...</div>;
}
