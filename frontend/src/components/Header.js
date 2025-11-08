import React from "react";
import { Link, useNavigate } from "react-router-dom";
import axios from "../axiosConfig";
import "./header.css";

export default function Header({ user, setUser }) {
  const navigate = useNavigate();

  const onLogout = async () => {
    try {
      await axios.get("/auth/logout", { withCredentials: true });
      setUser(null);
      navigate("/");
    } catch (err) {
      console.error("Logout failed", err);
    }
  };

  return (
    <header className="header">
      <div className="logo">
        <img
          src="https://cdn-icons-png.flaticon.com/512/3135/3135755.png"
          alt="EduCraft"
          style={{ width: 50, height: 50 }}
        />
        <div className="brand">
          <h1>EDUCRAFT</h1>
          <p>The place where learning begins</p>
        </div>
      </div>
      <nav>
        <Link to="/">Home</Link>
        <Link to="/courses">Courses</Link>
        <Link to="/contribute">Contribute</Link>
        <Link to="/profile">Profile</Link>
        {user ? (
          <>
            <span style={{ marginLeft: 12 }}>Hi, {user.name}</span>
            <button onClick={onLogout} className="small-btn">
              Logout
            </button>
          </>
        ) : (
          <a
            href={`${process.env.REACT_APP_BACKEND_URL}/auth/google`}
            className="small-btn"
            style={{ background: "#67d5f0ff" }}
          >
            Login with Google
          </a>
        )}
      </nav>
    </header>
  );
}
