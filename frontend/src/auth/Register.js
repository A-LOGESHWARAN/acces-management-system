import { useState } from "react";
import { api } from "../api";
import { useNavigate } from "react-router-dom";

const Register = () => {
  const [form, setForm] = useState({});
  const navigate = useNavigate();

  const submit = async () => {
    await api.post("/auth/register", form);
    alert("Registered successfully");
    navigate("/");
  };

  return (
    <div className="container">
      <h2>Register</h2>

      <input placeholder="Name" onChange={e => setForm({ ...form, name: e.target.value })} />
      <input placeholder="Email" onChange={e => setForm({ ...form, email: e.target.value })} />
      <input type="password" placeholder="Password" onChange={e => setForm({ ...form, password: e.target.value })} />

      <select onChange={e => setForm({ ...form, role: e.target.value })}>
        <option>Select Role</option>
        <option value="REQUESTER">Requester</option>
        <option value="APPROVER">Approver</option>
      </select>

      <button onClick={submit}>Register</button>
    </div>
  );
};

export default Register;
