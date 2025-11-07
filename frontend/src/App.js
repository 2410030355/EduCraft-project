import React, { useEffect, useState } from "react";
import { BrowserRouter, Routes, Route, useNavigate } from "react-router-dom";
import axios from "./axiosConfig";

import Home from "./pages/home";
import Courses from "./pages/courses";
import Contribute from "./pages/contribute";
import Profile from "./pages/profile";
import Header from "./components/Header";
import MindmapBot from "./components/mindmapbot/mindmapbot";
import "./App.css";

function AppContent() {
  const [user, setUser] = useState(null);
  const navigate = useNavigate();
useEffect(() => {
  const fetchUser = async () => {
    try {
      const res = await axios.get("/auth/user", { withCredentials: true });
      setUser(res.data);

      // Redirect to /courses only if not already there
      if (
        window.location.pathname === "/" ||
        window.location.pathname === "/profile"
      ) {
        navigate("/courses");
      }
    } catch (err) {
      setUser(null);
    }
  };

  // Wait a tiny bit to ensure cookie from Google login is set
  const timer = setTimeout(fetchUser, 500);

  return () => clearTimeout(timer);
}, [navigate]);



  return (
    <>
      <Header user={user} setUser={setUser} />
      <main style={{ paddingTop: 20 }}>
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/courses" element={<Courses />} />
          <Route path="/contribute" element={<Contribute user={user} />} />
          <Route path="/profile" element={<Profile user={user} />} />
        </Routes>
      </main>
      <MindmapBot />
      <footer style={{ textAlign: "center", padding: 12 }}>
        © 2025 EDUCRAFT
      </footer>
    </>
  );
}

export default function App() {
  return (
    <BrowserRouter>
      <AppContent />
    </BrowserRouter>
  );
}
