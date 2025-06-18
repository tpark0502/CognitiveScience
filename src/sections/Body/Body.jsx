import { useState } from "react";
import styles from "./BodyStyles.module.css";
import MindMap from "../MindMap/MindMap";
import { ref, set } from "firebase/database";
import { db, auth } from "../../firebase";

function Card({ question, onChange }) {
  return (
    <div className={styles}>
      <h2>{question}</h2>
      <label>
        <textarea
          // rows={6}
          placeholder="Type here..."
          className={styles.textarea}
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
];

function Body() {
  const [answers, setAnswers] = useState(Array(questions.length).fill("a"));
  const [submitted, setSubmitted] = useState(false);

  const handleChange = (index) => (e) => {
    const newAnswers = [...answers];
    newAnswers[index] = e.target.value;
    setAnswers(newAnswers);
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    const user = auth.currentUser;

    if (!user) {
      alert("You must be logged in to submit answers.");
    }

    const userAnswersRef = ref(db, `answers/${user.uid}`);

    try {
      set(userAnswersRef, {
        timestamp: Date.now(),
        answers: answers,
      });
      console.log("worked");
      setSubmitted(true);
    } catch (error) {
      console.error("Failed to save answers:", error);
    }
  };

  return (
    <section>
      {!submitted && (
        <>
          <h2>Design Prompts</h2>
          <form onSubmit={handleSubmit}>
            {questions.map((q, i) => (
              <Card key={i} question={q} onChange={handleChange(i)} />
            ))}
            <button type="submit" className={styles.submitButton}>
              Submit
            </button>
          </form>
        </>
      )}

      {submitted && (
        <>
          <h2>Mind Map</h2>
          <MindMap answers={answers} rootTitle="My Product Idea" />
        </>
      )}
    </section>
  );
}

export default Body;
