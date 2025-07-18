import { useState } from "react";
import styles from "./SpaceStyles.module.css";
import { ref, push, set } from "firebase/database";
import { db, auth } from "../../firebase";
import { useNavigate } from "react-router-dom";

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

function Space({ answers, solutions, responseId, url, comments = [] }) {
  const otherNotes = answers.slice(12, 13);

  const [solutionText, setSolutionText] = useState(solutions);
  const [editableAnswers, setEditableAnswers] = useState([...answers]);
  const navigate = useNavigate();

  const [imageURL, setImageURL] = useState(url);
  const [inputURL, setInputURL] = useState("");

  const handleURLChange = (e) => {
    setInputURL(e.target.value);
  };

  const handleUseURL = () => {
    if (!inputURL.trim()) {
      alert("Please enter a valid URL.");
      return;
    }
    setImageURL(inputURL.trim());
  };

  const handleAnswerChange = (index, value) => {
    const newAnswers = [...editableAnswers];
    newAnswers[index] = value;
    setEditableAnswers(newAnswers);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    const user = auth.currentUser;

    if (!user) {
      alert("You must be logged in to submit answers");
      return;
    }

    try {
      if (responseId) {
        const userSolutionsRef = ref(db, `answers/${user.uid}/${responseId}`);

        await set(userSolutionsRef, {
          answers: editableAnswers,
          solutionText: solutionText ? solutionText : "",
          imageURL: imageURL ? imageURL : "",
        });
      } else {
        const userSolutionsRef = ref(db, `answers/${user.uid}`);
        await push(userSolutionsRef, {
          answers: editableAnswers,
          solutionText: solutionText ? solutionText : "",
          imageURL: imageURL ? imageURL : "",
        });
      }
      navigate(`/home`);
    } catch (error) {
      console.error("Failed to save answers:", error);
    }
  };

  return (
    <div className={styles.contain}>
      <div className={styles.container}>
        {/* Problem Space */}
        <div className={styles.column}>
          <h2 className={styles.sectionTitle}>🧩 Problem Space</h2>
          <div className={styles.subsection}>
            <h3 className={styles.subsectionTitle}>📌 Project Scope</h3>
            <ul className={styles.qaList}>
              {editableAnswers.slice(0, 8).map((ans, i) => (
                <li key={i} className={styles.qaItem}>
                  <strong className={styles.question}>{questions[i]}</strong>
                  <textarea
                    className={styles.answerTextarea}
                    value={ans}
                    onChange={(e) => handleAnswerChange(i, e.target.value)}
                  />
                </li>
              ))}
            </ul>
          </div>

          <div className={styles.subsection}>
            <h3 className={styles.subsectionTitle}>📊 Market Research</h3>
            <ul className={styles.qaList}>
              {editableAnswers.slice(8, 12).map((ans, i) => (
                <li key={i + 8} className={styles.qaItem}>
                  <strong className={styles.question}>
                    {questions[i + 8]}
                  </strong>
                  <textarea
                    className={styles.answerTextarea}
                    value={ans}
                    onChange={(e) => handleAnswerChange(i + 8, e.target.value)}
                  />
                </li>
              ))}
            </ul>
          </div>

          <div className={styles.subsection}>
            <h3 className={styles.subsectionTitle}>📓 Other Notes</h3>
            <ul className={styles.qaList}>
              {otherNotes.map((ans, i) => (
                <li key={i + 12} className={styles.qaItem}>
                  <strong className={styles.question}>
                    {questions[i + 12]}
                  </strong>
                  <textarea
                    className={styles.answerTextarea}
                    value={ans}
                    onChange={(e) => handleAnswerChange(i, e.target.value)}
                  />
                </li>
              ))}
            </ul>
          </div>
        </div>

        {/* Solution Space */}
        <div className={styles.column}>
          <h2 className={styles.sectionTitle}>💡 Solution Space</h2>
          <textarea
            className={styles.textarea}
            placeholder="Describe your proposed solution here..."
            value={solutionText}
            onChange={(e) => setSolutionText(e.target.value)}
          />
          <div className={styles.imageContainer}>
            <input
              type="text"
              placeholder="Enter image URL"
              value={inputURL}
              onChange={handleURLChange}
              className={styles.input}
            />
            <button className={styles.imageButton} onClick={handleUseURL}>
              Show Image
            </button>

            {imageURL && (
              <div>
                <p>Displayed Image:</p>
                <img
                  src={imageURL}
                  alt="From URL"
                  style={{ maxWidth: "300px" }}
                />
              </div>
            )}
          </div>
        </div>
      </div>

      {/* Comments Section */}
      {comments.length > 0 && (
        <div className={styles.commentSection}>
          <h3 className={styles.subsectionTitle}>💬 Comments</h3>
          <ul className={styles.commentList}>
            {comments.map((comment) => (
              <li key={comment.id} className={styles.commentItem}>
                <p className={styles.commentText}>{comment.text}</p>
                <span className={styles.commentAuthor}>– {comment.author}</span>
              </li>
            ))}
          </ul>
        </div>
      )}

      {/* Save Button Row */}
      <div className={styles.buttonRow}>
        <button
          type="submit"
          className={styles.submitButton}
          onClick={handleSubmit}
        >
          Save
        </button>
      </div>
    </div>
  );
}

export default Space;
