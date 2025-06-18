import React, { useState, useEffect } from "react";
import MindMap from "../MindMap/MindMap";
import styles from "./PreviousStyles.module.css";
import { ref, onValue } from "firebase/database";
import { onAuthStateChanged } from "firebase/auth";
import { db, auth } from "../../firebase";

function Previous() {
  const [answers, setAnswers] = useState(Array(8).fill(""));
  const [isPrevious, setIsPrevious] = useState(false);

  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, (user) => {
      if (!user) {
        return;
      }

      const userAnswersRef = ref(db, `answers/${user.uid}`);

      onValue(userAnswersRef, (snapshot) => {
        const dataItem = snapshot.val();
        if (
          dataItem &&
          Array.isArray(dataItem.answers) &&
          dataItem.answers.length > 0
        ) {
          setAnswers(dataItem.answers);
          setIsPrevious(true);
        } else {
          setIsPrevious(false);
        }
      });
    });
  }, []);

  return (
    <section>
      {!isPrevious && (
        <>
          <h1>No Previous Work</h1>
        </>
      )}
      {isPrevious && (
        <>
          <h2>Previous Work</h2>
          <MindMap answers={answers} rootTitle="My Product Idea" />
        </>
      )}
    </section>
  );
}

export default Previous;
