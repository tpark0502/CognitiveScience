import { useEffect, useState } from "react";
import styles from "./ReadOnlySpaceStyles.module.css";
import { ref, push, set, onValue } from "firebase/database";
import { db, auth } from "../../firebase";

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

function ReadOnlySpace({ answers, solutions, url, responseId }) {
  const otherNotes = answers.slice(12, 13);
  const imageURL = url;

  const [comments, setComments] = useState([]);
  const [newComment, setNewComment] = useState("");

  useEffect(() => {
    const commentsRef = ref(db, `comments/${responseId}`);
    const unsubscribe = onValue(commentsRef, (snapshot) => {
      const data = snapshot.val();
      if (data) {
        const entries = Object.entries(data).map(([id, comment]) => ({
          id,
          ...comment,
        }));
        setComments(entries);
      } else {
        setComments([]);
      }
    });

    return () => unsubscribe();
  }, [responseId]);

  const handleCommentSubmit = async () => {
    const user = auth.currentUser;
    if (!newComment.trim()) return;
    if (!user) {
      alert("You must be logged in to comment.");
      return;
    }

    const commentRef = ref(db, `comments/${responseId}`);
    await push(commentRef, {
      text: newComment.trim(),
      author: user.email || "Anonymous",
      timestamp: Date.now(),
    });

    setNewComment("");
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
              {answers.slice(0, 8).map((ans, i) => (
                <li key={i} className={styles.qaItem}>
                  <strong className={styles.question}>{questions[i]}</strong>
                  <p className={styles.answerText}>{ans}</p>
                </li>
              ))}
            </ul>
          </div>

          <div className={styles.subsection}>
            <h3 className={styles.subsectionTitle}>📊 Market Research</h3>
            <ul className={styles.qaList}>
              {answers.slice(8, 12).map((ans, i) => (
                <li key={i + 8} className={styles.qaItem}>
                  <strong className={styles.question}>
                    {questions[i + 8]}
                  </strong>
                  <p className={styles.answerText}>{ans}</p>
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
                  <p className={styles.answerText}>{ans}</p>
                </li>
              ))}
            </ul>
          </div>
        </div>

        {/* Solution Space */}
        <div className={styles.column}>
          <h2 className={styles.sectionTitle}>💡 Solution Space</h2>
          <p className={styles.answerText}>{solutions}</p>

          {imageURL && (
            <div className={styles.imageContainer}>
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

      {/* Comments Section */}
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

        <textarea
          className={styles.commentInput}
          placeholder="Leave a comment..."
          value={newComment}
          onChange={(e) => setNewComment(e.target.value)}
        />
        <button className={styles.submitButton} onClick={handleCommentSubmit}>
          Post Comment
        </button>
      </div>
    </div>
  );
}

export default ReadOnlySpace;
