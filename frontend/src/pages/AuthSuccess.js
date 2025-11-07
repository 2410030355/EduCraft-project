import React, { useEffect } from "react";
import axios from "../axiosConfig";

export default function AuthSuccess({ setUser }) {
  useEffect(() => {
    const fetchUser = async () => {
      try {
        const res = await axios.get("/auth/user", { withCredentials: true });
        setUser(res.data);
        window.location.href = "/courses";
      } catch (err) {
        console.error("Failed to fetch user after auth", err);
        window.location.href = "/";
      }
    };
    fetchUser();
  }, [setUser]);

  return <div>Loading...</div>;
}