import React, { useState } from "react";
import axios from "axios";
import "./mindmap.css";
import { FaProjectDiagram } from "react-icons/fa";

const MindmapBot = () => {
  const [open, setOpen] = useState(false);
  const [topic, setTopic] = useState("");
  const [result, setResult] = useState("");
  const [loading, setLoading] = useState(false);

  const generateMindmap = async () => {
    if (!topic.trim()) return;
    setLoading(true);
    try {
      const res = await axios.post(
  `${process.env.REACT_APP_BACKEND_URL}/mindmap/generate`,
  { topic }
);
      setResult(res.data.mindmap);
    } catch (err) {
      setResult("Error generating mindmap. Please try again later.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <>
      <div className="mindmap-fab" onClick={() => setOpen(!open)}>
        <FaProjectDiagram size={25} color="white" />
      </div>

      {open && (
        <div className="mindmap-popup">
          <h3>Mindmap Generator</h3>
          <input
            type="text"
            placeholder="Enter a topic..."
            value={topic}
            onChange={(e) => setTopic(e.target.value)}
          />
          <button onClick={generateMindmap}>
            {loading ? "Generating..." : "Generate"}
          </button>
          <div className="mindmap-result">
            {result && <pre>{result}</pre>}
          </div>
        </div>
      )}
    </>
  );
};

export default MindmapBot;
