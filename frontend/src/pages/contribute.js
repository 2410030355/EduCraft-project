import React from "react";
import "./contribute.css";

export default function Contribute() {
  return (
    <div className="contribute-page">
      <h2>Contribute to EduCraft</h2>
      <p>Share your knowledge and help others learn!</p>
      <form className="contribute-form">
        <label htmlFor="title">Title</label>
        <input type="text" id="title" placeholder="Enter topic title" />

        <label htmlFor="description">Description</label>
        <textarea id="description" rows="4" placeholder="Write your content here..." />

        <label htmlFor="upload">Upload File</label>
        <input type="file" id="upload" />

        <button type="submit">Submit Contribution</button>
      </form>
    </div>
  );
}
