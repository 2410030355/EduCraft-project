import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import axios from "../axiosConfig";
import "./authsuccess.css"; // Make sure this matches your filename

export default function AuthSuccess({ setUser }) {
  const navigate = useNavigate();
  const [userName, setUserName] = useState("");
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchUser = async () => {
      try {
        const res = await axios.get("/auth/user", { withCredentials: true });
        setUser(res.data);
        setUserName(res.data.name || "Learner");
        setLoading(false);
      } catch (err) {
        console.error("Auth failed", err);
        navigate("/");
      }
    };
    fetchUser();
  }, [setUser, navigate]);

  return (
    <div className="auth-success-container">
      <div className="auth-success-box">
        {loading ? (
          <h2>Logging you in...</h2>
        ) : (
          <>
            <h1>Welcome to EduCraft, {userName}!</h1>
            <p style={{ maxWidth: 600, fontSize: "1.1rem", margin: "20px auto" }}>
              EduCraft is your personalized learning space where you can explore curated courses,
              contribute your knowledge, and grow your skills. Let’s get started!
            </p>
            <button onClick={() => navigate("/courses")}>Go to Courses</button>
          </>
        )}
      </div>
    </div>
  );
}
