import { useNavigate } from "react-router-dom";
import styles from "./HomeStyles.module.css";

function Home() {
  const navigate = useNavigate();

  const handleClick = ({ route }) => {
    navigate(`/${route}`);
  };

  return (
    <div className={styles.container}>
      <div className={styles.topRow}>
        <h1 className={styles.heading}>MooMind</h1>
        <div className={styles.div}>
          <p className={styles.p}>Creative</p>
          <p className={styles.p}>& Collaborative</p>
        </div>
      </div>

      <div className={styles.bottomSection}>
        <div
          className={styles.box}
          onClick={() => handleClick({ route: "new-design" })}
        >
          New Design
        </div>
        <div
          className={styles.box}
          onClick={() => handleClick({ route: "previous" })}
        >
          Previous
        </div>
      </div>
    </div>
  );
}

export default Home;
