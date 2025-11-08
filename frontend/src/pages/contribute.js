import React from "react";
import "./contribute.css";

export default function Contribute() {
  return (
    <div className="contribute-page">
      <h2>Contribute</h2>
      <form className="contribute-form">
        <label htmlFor="name">Your Name</label>
        <input type="text" id="name" placeholder="Enter your name" />

        <label htmlFor="email">Email</label>
        <input type="email" id="email" placeholder="Enter your email" />

        <label htmlFor="notes">Notes / Idea</label>
        <textarea id="notes" rows="4" placeholder="Share your thoughts..." />

        <label htmlFor="upload">Upload File (PDF, Image, Doc)</label>
        <input type="file" id="upload" accept=".pdf,.doc,.docx,image/*" />

        <div className="button-group">
          <button type="submit" className="submit-btn">Submit Contribution</button>
          <button type="button" className="cancel-btn">Cancel</button>
        </div>
      </form>
    </div>
  );
}
