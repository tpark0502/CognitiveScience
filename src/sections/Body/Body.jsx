import { useState } from "react";
import styles from "./BodyStyles.module.css";
// import MindMap from "../MindMap/MindMap";
import Space from "../Space/Space";
import { ref, set } from "firebase/database";
import { db, auth } from "../../firebase";

function Card({ question, onChange, value }) {
  return (
    <div className={styles.card}>
      <h3 className={styles.question}>{question}</h3>
      <label>
        <textarea
          placeholder="Type here..."
          className={styles.textarea}
          value={value}
          onChange={onChange}
        />
      </label>
    </div>
  );
}

const questions = [
  "What is the core function or purpose?",
  "What problem will it solve?",
  "Where will it be used?",
  "How does it change current usage?",
  "Who are the primary users?",
  "Who are the other stakeholders?",
  "List all design criteria and constraints.",
  "What metaphors or domains relate?",
  "Where else in nature, society, or other fields do similar needs or challenges arise?",
  "What are the key principles or constraints in this other field?",
  "Can I borrow a structure, pattern, or behavior and adapt it?",
  "What kind of interactions, behaviors, or systems are involved?",
  "Other notes",
];

function Body() {
  const [answers, setAnswers] = useState(Array(questions.length).fill(""));
  const [submitted, setSubmitted] = useState(false);

  const handleChange = (index) => (e) => {
    const newAnswers = [...answers];
    newAnswers[index] = e.target.value;
    setAnswers(newAnswers);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    const user = auth.currentUser;

    if (!user) {
      alert("You must be logged in to submit answers.");
      return;
    }

    try {
      setSubmitted(true);
    } catch (error) {
      console.error("Failed to save answers:", error);
    }
  };

  const handlePrevious = async (e) => {
    e.preventDefault();

    try {
      setSubmitted(false);
    } catch (error) {
      console.error("Failed to save answers:", error);
    }
  };

  return (
    <section className={styles.section}>
      {!submitted ? (
        <>
          <h2 className={styles.heading}>Design Prompts</h2>
          <form onSubmit={handleSubmit} className={styles.form}>
            {questions.map((q, i) => (
              <div key={i}>
                {(i === 0 || i === 4 || i === 6 || i === 7 || i === 12) && (
                  <div className={styles.sectionHeader}>
                    {i === 0 && "🛠️ Usage Analysis"}
                    {i === 4 && "👥 Stakeholder Analysis"}
                    {i === 6 && "📐 Design Criteria"}
                    {i === 7 && "🧐 Market Research"}
                    {i === 12 && "📓 Other Notes"}
                  </div>
                )}
                <Card
                  question={q}
                  onChange={handleChange(i)}
                  value={answers[i]}
                />
              </div>
            ))}
            <button type="submit" className={styles.submitButton}>
              Next
            </button>
          </form>
        </>
      ) : (
        <>
          <h2 className={styles.heading}>Mind Map</h2>
          <Space answers={answers} />
        </>
      )}
    </section>
  );
}

export default Body;
