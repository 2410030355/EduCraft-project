
import React, { useState } from "react";
import axios from "../axiosConfig";
import "./contribute.css";
export default function Contribute({ user }) {
  const [form, setForm] = useState({ name: "", email: "", idea: "" });
  const [file, setFile] = useState(null);
  const [msg, setMsg] = useState("");
  const submit = async (e) => {
    e.preventDefault();
    try {
      const formData = new FormData();
      formData.append("name", form.name);
      formData.append("email", form.email);
      formData.append("idea", form.idea);
      if (file) formData.append("file", file);

      await axios.post("/contribute/create", formData, {
        headers: { "Content-Type": "multipart/form-data" },
      });

      setMsg("Submitted successfully — thank you for contributing!");
      setForm({ name: "", email: "", idea: "" });
      setFile(null);
    } catch (err) {
      console.error("Submit error:", err);
      setMsg(err.response?.data?.message || "Submission failed.");
    }
  };
  return (
    <div className="contribute-page">
      <h2>Contribute Your Ideas</h2>
      <p>Share your notes, tips, or short PDFs with the EduCraft community.</p>
      <form className="contribute-form" onSubmit={submit}>
        <label>Name:</label>
        <input
          name="name"
          value={form.name}
          onChange={(e) => setForm({ ...form, name: e.target.value })}
          required
        />
        <label>Email:</label>
        <input
          name="email"
          type="email"
          value={form.email}
          onChange={(e) => setForm({ ...form, email: e.target.value })}
          required
        />
        <label>Share your idea:</label>
        <textarea
          name="idea"
          value={form.idea}
          onChange={(e) => setForm({ ...form, idea: e.target.value })}
          rows={5}
        />
        <label>Upload file (PDF, image, or document):</label>
        <input
          type="file"
          accept=".pdf,.png,.jpg,.jpeg,.doc,.docx"
          onChange={(e) => setFile(e.target.files[0])}
        />
        <button type="submit">Submit</button>
      </form>
      {msg && <div style={{ marginTop: 12, color: msg.includes ? "green" : "red" }}>{msg}</div>}
    </div>
  );
}
