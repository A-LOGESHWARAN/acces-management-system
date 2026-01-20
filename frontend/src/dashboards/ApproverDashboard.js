import { useEffect, useState } from "react";
import { api } from "../api";

const ApproverDashboard = () => {
  const [requests, setRequests] = useState([]);

  const load = async () => {
    const res = await api.get("/requests");
    setRequests(res.data);
  };

  const update = async (id, status) => {
    await api.put(`/requests/${id}`, { status });
    load();
  };

  useEffect(() => { load(); }, []);

  return (
    <div className="dashboard">
      <h2>Approver Dashboard</h2>

      {requests.map(r => (
        <div className="card" key={r._id}>
          <span>{r.userId.email} — {r.resource}</span>

          <div>
            <span className={`status ${r.status}`}>{r.status}</span>

            {r.status === "PENDING" && (
              <>
                <button className="action-btn" onClick={() => update(r._id, "APPROVED")}>Approve</button>
                <button className="action-btn" onClick={() => update(r._id, "REJECTED")}>Reject</button>
              </>
            )}
          </div>
        </div>
      ))}
    </div>
  );
};

export default ApproverDashboard;
