import React, { useState, useEffect } from "react";
// import MindMap from "../MindMap/MindMap";
import Space from "../Space/Space";
import styles from "./PreviousStyles.module.css";
import { ref, onValue, get } from "firebase/database";
import { onAuthStateChanged } from "firebase/auth";
import { db, auth } from "../../firebase";

function Previous() {
  const [previousWorks, setPreviousWorks] = useState([]);
  const [isProject, setIsProject] = useState(false);
  const [answers, setAnswers] = useState([]);
  const [solutions, setSolutions] = useState([]);
  const [responseId, setResponseId] = useState("");
  const [imageURL, setImageURL] = useState("");
  const [comments, setComments] = useState([]);

  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, (user) => {
      if (!user) {
        return;
      }

      const userAnswersRef = ref(db, `answers/${user.uid}`);

      onValue(userAnswersRef, (snapshot) => {
        const data = snapshot.val();
        if (data) {
          const entries = Object.entries(data);
          setPreviousWorks(entries);
        }
      });
    });
  }, []);

  const handleClick = async (i) => {
    const selected = previousWorks[i];
    if (selected && selected[1] && selected[1].answers) {
      const resId = selected[0];
      setAnswers(selected[1].answers);
      setSolutions(selected[1].solutionText);
      setResponseId(resId);
      setImageURL(selected[1].imageURL);
      setIsProject(true);

      // 🔽 Fetch comments for this response
      const commentsRef = ref(db, `comments/${resId}`);
      const snapshot = await get(commentsRef);
      if (snapshot.exists()) {
        const data = snapshot.val();
        const parsedComments = Object.entries(data).map(([id, comment]) => ({
          id,
          ...comment,
        }));
        setComments(parsedComments);
      } else {
        setComments([]);
      }
    }
  };

  return (
    <section className={styles.section}>
      {!isProject && (
        <>
          <h2 className={styles.heading}>Previous Work</h2>
          <div className={styles.grid}>
            {previousWorks.map((ans, i) => (
              <div
                key={i}
                className={styles.box}
                onClick={() => handleClick(i)}
              >
                <strong>Project {i + 1}</strong>
                {/* <p>{ans}</p> */}
              </div>
            ))}
          </div>
        </>
      )}

      {isProject && (
        <>
          <h2 className={styles.heading}>Previous Work</h2>
          <Space
            answers={answers}
            solutions={solutions}
            responseId={responseId}
            url={imageURL}
            comments={comments}
          />
        </>
      )}
    </section>
  );
}

export default Previous;
