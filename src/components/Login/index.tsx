import { useState } from "react";
import { useAuth } from "../../AuthProvider";

import "./styles.scss";

type Auth = {
  loginAction: (data: any) => void;
};

const Login = () => {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");

  const auth = useAuth() as Auth;

  const handleLogin = () => {
    if (username.trim() === "" || password.trim() === "") {
      alert("Please fill all the fields");
      return;
    }
    auth.loginAction({ username, password });
  };

  return (
    <div className="login">
      <h1>Login</h1>
      <div className="login-form">
        <input
          type="text"
          placeholder="Username"
          onChange={(e) => setUsername(e.target.value)}
        />
        <input
          type="password"
          placeholder="Password"
          onChange={(e) => setPassword(e.target.value)}
        />
        <button onClick={handleLogin}>Login</button>
      </div>
    </div>
  );
};

export default Login;
