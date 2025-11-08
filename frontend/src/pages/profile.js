import React from "react";
import "./profile.css";

export default function Profile({ user }) {
  return (
    <div className="profile-page">
      <h2>Your Profile</h2>
      {user ? (
        <div className="profile-card">
          <img
            src={user.picture || "https://cdn-icons-png.flaticon.com/512/3135/3135755.png"}
            alt={user.name}
          />
          <h3>{user.name}</h3>
          <p>Email: {user.email}</p>
        </div>
      ) : (
        <p style={{ color: "#fff" }}>Please log in to view your profile.</p>
      )}
    </div>
  );
}
