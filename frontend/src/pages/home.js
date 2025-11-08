import React, { useState } from "react";
import axios from "../axiosConfig";
import "./home.css";

export default function Home() {
  const [form, setForm] = useState({ email: "", password: "", name: "" });
  const [msg, setMsg] = useState("");

  const signup = async (e) => {
    e.preventDefault();
    try {
      const res = await axios.post("/auth/signup", {
        name: form.name,
        email: form.email,
        password: form.password,
      });
      setMsg(res.data.message || "Registered");
    } catch (err) {
      setMsg(err.response?.data?.message || err.message);
    }
  };

  const login = async (e) => {
    e.preventDefault();
    try {
      const res = await axios.post("/auth/login", {
        email: form.email,
        password: form.password,
      });
      setMsg(res.data.message || "Logged in");
      window.location.href = "/auth-success";
    } catch (err) {
      setMsg(err.response?.data?.message || err.message);
    }
  };

  return (
    <div className="page-container">
      <div className="content-box">
        <h1>Welcome to EduCraft</h1>
        <p>Learn. Contribute. Grow.</p>

        <input
          placeholder="Full name (for signup)"
          value={form.name}
          onChange={(e) => setForm({ ...form, name: e.target.value })}
        />
        <input
          placeholder="Email"
          value={form.email}
          onChange={(e) => setForm({ ...form, email: e.target.value })}
        />
        <input
          placeholder="Password"
          type="password"
          value={form.password}
          onChange={(e) => setForm({ ...form, password: e.target.value })}
        />
        <button onClick={login} className="start-btn">Login</button>
        <button onClick={signup} className="start-btn">Sign up</button>
        <a
          href={`${process.env.REACT_APP_BACKEND_URL}/auth/google`}
          className="start-btn"
          style={{ background: "#db4437" }}
        >
          Sign in with Google
        </a>

        {msg && <div style={{ marginTop: 10, color: "green" }}>{msg}</div>}
      </div>
    </div>
  );
}
