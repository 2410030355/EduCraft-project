import React from "react";
import MindmapBot from "../components/mindmapbot/mindmapbot"
import "./profile.css";

export default function Profile({ user }) {
  if (!user) {
    return <div style={{ textAlign: "center", marginTop: 50 }}>Please login to view your profile.</div>;
  }

  return (
    <div className="profile-page">
      <h2>Profile</h2>
      <div className="profile-card">
        <img src={user.picture} alt="Profile" />
        <h3>{user.name}</h3>
        <p>{user.email}</p>
      </div>
      <MindmapBot />
    </div>
  );
}
