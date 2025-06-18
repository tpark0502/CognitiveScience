import { useState } from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import "./App.css";
import Login from "./sections/Login/Login";
import Previous from "./sections/Previous/Previous";
import Home from "./sections/Home/Home";
import Body from "./sections/Body/Body";

function App() {
  const [count, setCount] = useState(0);

  return (
    <Router>
      <Routes>
        <Route path="/" element={<Login />} />
        <Route path="/home" element={<Home />} />
        <Route path="/new-design" element={<Body />} />
        <Route path="/previous" element={<Previous />} />
      </Routes>
    </Router>
  );
}

export default App;
