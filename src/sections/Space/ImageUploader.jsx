import { useState } from "react";
import styles from "./ImageUploaderStyles.module.css";
import { ref, push, set } from "firebase/database";

function ImageUploader() {
  const [imageURL, setImageURL] = useState("");
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

  return (
    <div className={styles.container}>
      <input
        type="text"
        placeholder="Enter image URL"
        value={inputURL}
        onChange={handleURLChange}
        className={styles.input}
      />
      <button onClick={handleUseURL}>Show Image</button>

      {imageURL && (
        <div>
          <p>Displayed Image:</p>
          <img src={imageURL} alt="From URL" style={{ maxWidth: "300px" }} />
        </div>
      )}
    </div>
  );
}

export default ImageUploader;
