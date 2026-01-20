import { useState } from "react";
import { api, setAuthToken } from "../api";
import { useNavigate } from "react-router-dom";

const Login = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const navigate = useNavigate();

  const submit = async () => {
    try {
      const res = await api.post("/auth/login", { email, password });
      localStorage.setItem("token", res.data.token);
      localStorage.setItem("role", res.data.role);
      setAuthToken(res.data.token);

      navigate(res.data.role === "REQUESTER" ? "/requester" : "/approver");
    } catch {
      alert("Invalid credentials");
    }
  };

  return (
    <div className="container">
      <h2>Login</h2>

      <input placeholder="Email" onChange={e => setEmail(e.target.value)} />
      <input type="password" placeholder="Password" onChange={e => setPassword(e.target.value)} />

      <button onClick={submit}>Login</button>

      <div className="link" onClick={() => navigate("/register")}>
        Don’t have an account? Register
      </div>
    </div>
  );
};

export default Login;
