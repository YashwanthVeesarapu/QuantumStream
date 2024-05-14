import { useState } from "react";
import { useAuth } from "../../AuthProvider";

import "./styles.scss";
import Button from "../Button";

type Auth = {
  loginAction: (data: any) => void;
};

const Login = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const auth = useAuth() as Auth;

  const handleLogin = () => {
    if (email.trim() === "" || password.trim() === "") {
      alert("Please fill all the fields");
      return;
    }
    auth.loginAction({ username: email, password });
  };

  const handleKeyPress = (e: any) => {
    if (e.key === "Enter") {
      handleLogin();
    }
  };
  document.addEventListener("keypress", handleKeyPress);

  return (
    <div className="login">
      <div className="login-form">
        <input
          name="email"
          type="text"
          placeholder="Email"
          onChange={(e) => setEmail(e.target.value)}
        />
        <input
          name="password"
          type="password"
          placeholder="Password"
          onChange={(e) => setPassword(e.target.value)}
        />
        <Button onClick={handleLogin}>Login</Button>
      </div>
    </div>
  );
};

export default Login;
