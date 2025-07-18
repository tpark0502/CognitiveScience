import React, { useEffect, useState } from "react";
import useAuth from "../Auth/useAuth";
import { login, logOut, signUp } from "../Auth/loginComponent";
import { useNavigate } from "react-router-dom";

function Login() {
  const user = useAuth();
  console.log(user);
  const navigate = useNavigate();

  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");

  useEffect(() => {
    if (user) {
      navigate("/home");
    }
  }, [user, navigate]);

  const handleLogin = async () => {
    try {
      await login(email, password);
    } catch (err) {
      setError(err.message);
    }
  };

  const handleSignUp = async () => {
    try {
      await signUp(email, password);
    } catch (err) {
      setError(err.message);
    }
  };

  return (
    <div>
      {user ? (
        <>
          <p>Welcome, {user.displayName}</p>
          <button onClick={logOut}>Logout</button>
        </>
      ) : (
        <>
          <input
            type="email"
            placeholder="Email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
          />
          <input
            type="password"
            placeholder="Password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
          />
          <button onClick={handleLogin}>Log In</button>
          <button onClick={handleSignUp}>Sign Up</button>
          {error && <p style={{ color: "red" }}>{error}</p>}
        </>
      )}
    </div>
  );
}

export default Login;
