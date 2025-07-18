import React, { useEffect, useState } from "react";
import styles from "./CommunityStyles.module.css";
import { ref, onValue } from "firebase/database";
import { db } from "../../firebase";
import ReadOnlySpace from "../Space/ReadOnlySpace";

function Community() {
  const [isCommunity, setIsCommunity] = useState(false);
  const [communityWorks, setCommunityWorks] = useState([]);
  const [answers, setAnswers] = useState([]);
  const [solutions, setSolutions] = useState([]);
  const [responseId, setResponseId] = useState("");
  const [imageURL, setImageURL] = useState("");

  useEffect(() => {
    const answersRef = ref(db, "answers");

    onValue(answersRef, (snapshot) => {
      const data = snapshot.val();
      if (data) {
        const allProjects = [];

        Object.entries(data).forEach(([uid, responses]) => {
          Object.entries(responses).forEach(([responseId, responseData]) => {
            allProjects.push({
              uid,
              responseId,
              ...responseData,
            });
          });
        });

        setCommunityWorks(allProjects);
      }
    });
  }, []);

  const handleClick = (i) => {
    const selected = communityWorks[i];

    if (selected) {
      setAnswers(selected.answers);
      setSolutions(selected.solutionText);
      setResponseId(selected.responseId);
      setImageURL(selected.imageURL);
      setIsCommunity(true);
    }
  };

  return (
    <section className={styles.section}>
      {!isCommunity && (
        <>
          <h2 className={styles.heading}>Community Works</h2>
          <div className={styles.grid}>
            {communityWorks.map((ans, i) => (
              <div
                key={i}
                className={styles.box}
                onClick={() => handleClick(i)}
              >
                <strong>Project {i + 1}</strong>
              </div>
            ))}
          </div>
        </>
      )}

      {isCommunity && (
        <>
          <h2 className={styles.heading}>Community Works</h2>
          <ReadOnlySpace
            answers={answers}
            solutions={solutions}
            responseId={responseId}
            url={imageURL}
          />
        </>
      )}
    </section>
  );
}

export default Community;
