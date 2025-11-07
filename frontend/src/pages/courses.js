
import React, { useState, useEffect } from "react";
import axios from "../axiosConfig";
import "./courses.css";
export default function Courses() {
  const [selectedClass, setSelectedClass] = useState("");
  const [selectedSubject, setSelectedSubject] = useState("");
  const [videoExpanded, setVideoExpanded] = useState(false);

  const [answers, setAnswers] = useState({});
  const [feedback, setFeedback] = useState({});
  const [score, setScore] = useState(null);
  const [savedMsg, setSavedMsg] = useState("");

  const [showContribute, setShowContribute] = useState(false);
  const [contribForm, setContribForm] = useState({ name: "", email: "", idea: "" });
  const [contribFile, setContribFile] = useState(null);
  const [contribMsg, setContribMsg] = useState("");
  const classSubjects = {
    "6": ["Mathematics", "Science", "English", "Social"],
    "7": ["Mathematics", "Science", "English", "Social"],
    "8": ["Mathematics", "Science", "English", "Social"],
    "9": ["Mathematics", "Science", "English", "Social"],
    "10": ["Mathematics", "Science", "English", "Social"],
  };
  const videoLinks = {
    Mathematics: "https://www.youtube.com/embed/SjSHVDfXHQ4",
    Science: "https://www.youtube.com/embed/lzXzYz_3v6I",
    English: "https://www.youtube.com/embed/oq0yJ6gP4GA",
    Social: "https://www.youtube.com/embed/nv1ZxT9Q8bI",
  };
  const quizzes = {
    Mathematics: [
      { q: "What is 6 × 7?", a: "42" },
      { q: "Solve: 5x + 3x = ?", a: "8x" }
    ],
    Science: [
      { q: "What is H2O commonly called?", a: "water" },
      { q: "Which planet is known as the Red Planet?", a: "mars" }
    ],
    English: [
      { q: "Identify the noun in: 'The cat sleeps.'", a: "cat" },
      { q: "What is the antonym of 'happy'?", a: "sad" }
    ],
    Social: [
      { q: "Who was the first Prime Minister of India?", a: "jawaharlal nehru" },
      { q: "When did India gain independence (year)?", a: "1947" }
    ]
  };
  useEffect(() => {
    setAnswers({});
    setFeedback({});
    setScore(null);
    setSavedMsg("");
  }, [selectedSubject, selectedClass]);
  const handleAnswerChange = (index, val) => {
    setAnswers(prev => ({ ...prev, [index]: val }));
    setFeedback(prev => ({ ...prev, [index]: null }));
  };
  const handleSubmitQuiz = async () => {
    if (!selectedSubject) return;
    const quiz = quizzes[selectedSubject] || [];
    let correctCount = 0;
    const newFeedback = {};

    quiz.forEach((item, idx) => {
      const correct = (item.a || "").toString().trim().toLowerCase();
      const given = (answers[idx] || "").toString().trim().toLowerCase();
      if (correct && correct !== "answer varies" && given === correct) {
        newFeedback[idx] = { ok: true, correct: item.a };
        correctCount++;
      } else {
        newFeedback[idx] = { ok: false, correct: item.a };
      }
    });
    setFeedback(newFeedback);
    setScore({ got: correctCount, total: quiz.length });
    try {
      await axios.post("/quiz/save", {
        classNo: selectedClass,
        subject: selectedSubject,
        score: correctCount,
        total: quiz.length,
        answers
      });
      setSavedMsg("Score saved to your account.");
    } catch (err) {
      console.warn("Could not save quiz:", err?.message || err);
      setSavedMsg("Could not save score (offline).");
    }
  };
  const openContribute = () => {
    if (!selectedClass || !selectedSubject) {
      setContribMsg("Please select class and subject first.");
      return;
    }
    setShowContribute(true);
    setContribMsg("");
  };
  const submitContribution = async (e) => {
    e.preventDefault();
    if (!contribForm.name || !contribForm.email) {
      setContribMsg("Please fill name & email.");
      return;
    }
    const fd = new FormData();
    fd.append("name", contribForm.name);
    fd.append("email", contribForm.email);
    fd.append("idea", contribForm.idea || "");
    fd.append("classNo", selectedClass);
    fd.append("subject", selectedSubject);
    if (contribFile) fd.append("file", contribFile);

    try {
      await axios.post("/contribute/create", fd, {
        headers: { "Content-Type": "multipart/form-data" }
      });
      setContribMsg("Contribution submitted.");
      setContribForm({ name: "", email: "", idea: "" });
      setContribFile(null);
    } catch (err) {
      console.error("Contribution error:", err);
      setContribMsg("Submission failed. Try again.");
    }
  };
  return (
    <div className="courses-page">
      <h2>Explore Your Courses</h2>
      <p>Select class and subject to watch video, attempt quiz, or contribute.</p>
      <div className="controls">
        <div className="control-item">
          <label>Select Class</label>
          <select
            value={selectedClass}
            onChange={(e) => {
              setSelectedClass(e.target.value);
              setSelectedSubject("");
            }}
          >
            <option value="">-- Choose Class --</option>
            {Object.keys(classSubjects).map(cl => (
              <option key={cl} value={cl}>{cl}th</option>
            ))}
          </select>
        </div>
        <div className="control-item">
          <label>Select Subject</label>
          <select
            value={selectedSubject}
            onChange={(e) => setSelectedSubject(e.target.value)}
            disabled={!selectedClass}
          >
            <option value="">-- Choose Subject --</option>
            {selectedClass && classSubjects[selectedClass].map(s => (
              <option key={s} value={s}>{s}</option>
            ))}
          </select>
        </div>
      </div>
      {selectedSubject && (
        <div className="video-section">
          <h3>{selectedClass} - {selectedSubject}</h3>

          <div className={`video-container ${videoExpanded ? "expanded" : ""}`}>
            <iframe
              width={videoExpanded ? "800" : "560"}
              height={videoExpanded ? "450" : "315"}
              src={videoLinks[selectedSubject] || ""}
              title={`${selectedSubject} video`}
              allowFullScreen
            />
          </div>
          <div style={{ marginTop: 10 }}>
            <button className="enlarge-btn" onClick={() => setVideoExpanded(!videoExpanded)}>
              {videoExpanded ? "Shrink Video" : "Enlarge Video"}
            </button>
            <button className="contribute-btn" onClick={openContribute}>Contribute to this subject</button>
          </div>
          <div className="quiz-section">
            <h4>Quick Quiz</h4>
            {(quizzes[selectedSubject] || []).map((item, idx) => (
              <div key={idx} className="quiz-item">
                <p><strong>Q{idx+1}:</strong> {item.q}</p>
                <input
                  type="text"
                  placeholder="Your answer..."
                  value={answers[idx] || ""}
                  onChange={(e) => handleAnswerChange(idx, e.target.value)}
                />
                {feedback[idx] && (
                  <div className={`quiz-feedback ${feedback[idx].ok ? "ok" : "nok"}`}>
                    {feedback[idx].ok ? "Correct" : `Wrong — answer: ${feedback[idx].correct}`}
                  </div>
                )}
              </div>
            ))}

            <div style={{ marginTop: 10 }}>
              <button className="submit-btn" onClick={handleSubmitQuiz}>Submit Quiz</button>
              {score && (
                <div style={{ marginTop: 10, fontWeight: 700 }}>
                  Score: {score.got} / {score.total} {savedMsg && <span style={{ fontWeight: 500, marginLeft: 10 }}>({savedMsg})</span>}
                </div>
              )}
            </div>
          </div>
        </div>
      )}
      {showContribute && (
        <div className="modal-backdrop" onClick={() => setShowContribute(false)}>
          <div className="modal" onClick={(e) => e.stopPropagation()}>
            <h3>Contribute — {selectedSubject} (Class {selectedClass})</h3>

            <form onSubmit={submitContribution} className="contribute-modal-form">
              <label>Your name</label>
              <input type="text" value={contribForm.name} onChange={(e) => setContribForm({ ...contribForm, name: e.target.value })} required />

              <label>Email</label>
              <input type="email" value={contribForm.email} onChange={(e) => setContribForm({ ...contribForm, email: e.target.value })} required />

              <label>Notes / Idea</label>
              <textarea rows="4" value={contribForm.idea} onChange={(e) => setContribForm({ ...contribForm, idea: e.target.value })} />

              <label>Upload file (pdf / image / doc)</label>
              <input type="file" accept=".pdf,.png,.jpg,.jpeg,.doc,.docx" onChange={(e) => setContribFile(e.target.files[0])} />

              <div style={{ display: "flex", gap: 8, marginTop: 12 }}>
                <button type="submit" className="submit-btn">Submit Contribution</button>
                <button type="button" className="close-btn" onClick={() => setShowContribute(false)}>Cancel</button>
              </div>
            </form>

            {contribMsg && <div style={{ marginTop: 10, color: contribMsg.startsWith ? "green" : "red" }}>{contribMsg}</div>}
          </div>
        </div>
      )}

    </div>
  );
}
