import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import axios from "../axiosConfig";

export default function AuthSuccess({ setUser }) {
  const navigate = useNavigate();
  const [userName, setUserName] = useState("");

  useEffect(() => {
    const fetchUser = async () => {
      try {
        const res = await axios.get("/auth/user", { withCredentials: true });
        setUser(res.data);
        setUserName(res.data.name || "Learner");
      } catch (err) {
        console.error("Auth failed", err);
        navigate("/");
      }
    };
    fetchUser();
  }, [setUser, navigate]);

  return (
    <div className="page-content" style={{ textAlign: "center", color: "#fff" }}>
      <h1>Welcome to EduCraft, {userName}!</h1>
      <p style={{ fontSize: "1.2rem", maxWidth: 600, margin: "20px auto" }}>
        EduCraft is your personalized learning space where you can explore curated courses,
        contribute your knowledge, and grow your skills. Let’s get started!
      </p>
      <button
        onClick={() => navigate("/courses")}
        style={{
          padding: "12px 24px",
          fontSize: "1rem",
          backgroundColor: "#007bff",
          color: "#fff",
          border: "none",
          borderRadius: "6px",
          cursor: "pointer",
          marginTop: "20px"
        }}
      >
        Go to Courses
      </button>
    </div>
  );
}
