import { useEffect, useState } from "react";
import api from "../api/axios";

const Dashboard = () => {
  const [priorityStats, setPriorityStats] = useState([]);
  const [completionStats, setCompletionStats] = useState([]);
  const [upcoming, setUpcoming] = useState([]);

  useEffect(() => {
    loadDashboard();
  }, []);

  // fetch dashboard data
  const loadDashboard = async () => {
    const res = await api.get("/dashboard/stats");
    setPriorityStats(res.data.priorityDistribution);
    setCompletionStats(res.data.completionProgress);
    setUpcoming(res.data.upcomingDeadlines);
  };

  // helper to get count by key
  const getCount = (arr, key) => {
    const item = arr.find((i) => i._id === key);
    return item ? item.count : 0;
  };

  return (
    <div>
      <h2 className="mb-4">Analytics Dashboard</h2>

      <div className="row g-3 mb-4">
        <div className="col-12 col-md-4">
          <div className="card text-white bg-primary text-center">
            <div className="card-body">
              <h5>High Priority</h5>
              <h2>{getCount(priorityStats, "high")}</h2>
            </div>
          </div>
        </div>

        <div className="col-12 col-md-4">
          <div className="card text-dark bg-warning text-center">
            <div className="card-body">
              <h5>Medium Priority</h5>
              <h2>{getCount(priorityStats, "medium")}</h2>
            </div>
          </div>
        </div>

        <div className="col-12 col-md-4">
          <div className="card text-white bg-success text-center">
            <div className="card-body">
              <h5>Low Priority</h5>
              <h2>{getCount(priorityStats, "low")}</h2>
            </div>
          </div>
        </div>
      </div>

      <div className="row g-3 mb-4">
        <div className="col-12 col-md-6">
          <div className="card border-success text-center">
            <div className="card-body">
              <h5>Completed Tasks</h5>
              <h2 className="text-success">
                {getCount(completionStats, "completed")}
              </h2>
            </div>
          </div>
        </div>

        <div className="col-12 col-md-6">
          <div className="card border-danger text-center">
            <div className="card-body">
              <h5>Pending Tasks</h5>
              <h2 className="text-danger">
                {getCount(completionStats, "pending")}
              </h2>
            </div>
          </div>
        </div>
      </div>

      <h4>Upcoming Deadlines (Next 7 Days)</h4>

      <div className="table-responsive">
        <table className="table table-bordered mt-2">
          <thead className="table-dark">
            <tr>
              <th>Title</th>
              <th>Priority</th>
              <th>Due Date</th>
              <th>Status</th>
            </tr>
          </thead>
          <tbody>
            {upcoming.map((task) => (
              <tr key={task._id}>
                <td>{task.title}</td>
                <td>{task.priority}</td>
                <td>{new Date(task.dueDate).toLocaleDateString()}</td>
                <td>{task.status}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default Dashboard;
