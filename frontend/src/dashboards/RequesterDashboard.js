import { useEffect, useState } from "react";
import { api } from "../api";

const RequesterDashboard = () => {
  const [requests, setRequests] = useState([]);
  const [resource, setResource] = useState("");
  const [reason, setReason] = useState("");

  const load = async () => {
    const res = await api.get("/requests/my");
    setRequests(res.data);
  };

  const submit = async () => {
    try {
      await api.post("/requests", { resource, reason });
      setResource("");
      setReason("");
      load();
    } catch {
      alert("You already have a pending request");
    }
  };

  useEffect(() => { load(); }, []);

  return (
    <div className="dashboard">
      <h2>Requester Dashboard</h2>

      <div className="card">
        <input placeholder="Resource" value={resource} onChange={e => setResource(e.target.value)} />
        <input placeholder="Reason" value={reason} onChange={e => setReason(e.target.value)} />
        <button className="action-btn" onClick={submit}>Submit</button>
      </div>

      {requests.map(r => (
        <div className="card" key={r._id}>
          <span>{r.resource}</span>
          <span className={`status ${r.status}`}>{r.status}</span>
        </div>
      ))}
    </div>
  );
};

export default RequesterDashboard;
