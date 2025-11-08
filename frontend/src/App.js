import React, { useEffect, useState } from "react";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import axios from "./axiosConfig";

import Home from "./pages/home";
import Courses from "./pages/courses";
import AuthSuccess from "./pages/AuthSuccess";
import Profile from "./pages/profile";

function AppContent() {
  const [user, setUser] = useState(null);

  useEffect(() => {
    const fetchUser = async () => {
      try {
        const res = await axios.get("/auth/user", { withCredentials: true });
        setUser(res.data);
      } catch {
        setUser(null);
      }
    };
    fetchUser();
  }, []);

  return (
    <Routes>
      <Route path="/" element={<Home />} />
      <Route path="/auth-success" element={<AuthSuccess setUser={setUser} />} />
      <Route path="/courses" element={<Courses />} />
      <Route path="/profile" element={<Profile user={user} />} />
    </Routes>
  );
}

export default function App() {
  return (
    <BrowserRouter>
      <AppContent />
    </BrowserRouter>
  );
}
