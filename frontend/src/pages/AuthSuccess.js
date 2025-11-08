import React, { useEffect } from "react";
import { useNavigate } from "react-router-dom";
import "./authsuccess.css";

export default function AuthSuccess({ setUser }) {
  const navigate = useNavigate();

  useEffect(() => {
    const fetchUser = async () => {
      try {
        const res = await fetch(`${process.env.REACT_APP_BACKEND_URL}/auth/user`, {
          credentials: "include",
        });
        const data = await res.json();
        if (res.ok && data) {
          setUser(data);
        }
      } catch (err) {
        console.error("Failed to fetch user:", err);
      }
    };
    fetchUser();
  }, [setUser]);

  const goToCourses = () => {
    navigate("/courses");
  };

  return (
    <div className="page-container">
      <div className="content-box">
        <h1>Welcome to EduCraft!</h1>
        <p>Learn, Contribute, and Grow with thousands of educational resources.</p>
        <button onClick={goToCourses} className="start-btn">Go to Courses</button>
      </div>
    </div>
  );
}
