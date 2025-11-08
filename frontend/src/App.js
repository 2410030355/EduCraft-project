import React, { useEffect, useState } from "react";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import axios from "./axiosConfig";

import Home from "./pages/home";
import Courses from "./pages/courses";
import Contribute from "./pages/contribute";
import Profile from "./pages/profile";
import AuthSuccess from "./pages/AuthSuccess";
import Header from "./components/Header";
import MindmapBot from "./components/mindmapbot/mindmapbot";

import "./App.css";

function AppContent() {
  const [user, setUser] = useState(null);

  useEffect(() => {
    const fetchUser = async () => {
      try {
        const res = await axios.get("/auth/user", { withCredentials: true });
        setUser(res.data || null);
      } catch {
        setUser(null);
      }
    };
    fetchUser();
  }, []);

  return (
    <>
      <Header user={user} setUser={setUser} />
      <main style={{ paddingTop: 20, minHeight: "calc(100vh - 120px)" }}>
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/auth-success" element={<AuthSuccess setUser={setUser} />} />
          <Route path="/courses" element={<Courses />} />
          <Route path="/contribute" element={<Contribute />} />
          <Route path="/profile" element={<Profile user={user} />} />
        </Routes>
      </main>
      <MindmapBot />
      <footer style={{ textAlign: "center", padding: 12, background: "#f0f6ff" }}>
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
