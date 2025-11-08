import React from "react";
import MindmapBot from "../components/mindmapbot/mindmapbot";
import "./profile.css";

export default function Profile({ user }) {
  if (!user) {
    return <div className="page-container"><div className="content-box">Please login to view your profile.</div></div>;
  }

  return (
    <div className="page-container">
      <div className="content-box">
        <h2>Profile</h2>
        <img src={user.picture} alt="Profile" style={{ width: 100, borderRadius: 12, marginBottom: 12 }} />
        <h3>{user.name}</h3>
        <p>{user.email}</p>
      </div>
      <MindmapBot />
    </div>
  );
}
