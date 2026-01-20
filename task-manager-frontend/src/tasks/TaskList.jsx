import { useEffect, useState } from "react";
import api from "../api/axios";

const TaskList = () => {
  const [tasks, setTasks] = useState([]);

  // form fields
  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");
  const [dueDate, setDueDate] = useState("");
  const [priority, setPriority] = useState("medium");

  // search / filter
  const [search, setSearch] = useState("");
  const [statusFilter, setStatusFilter] = useState("");
  const [priorityFilter, setPriorityFilter] = useState("");
  const [sortBy, setSortBy] = useState("");

  useEffect(() => {
    loadTasks();
  }, []);

  // fetch tasks with params
  const loadTasks = async () => {
    const params = {};
    if (search) params.search = search;
    if (statusFilter) params.status = statusFilter;
    if (priorityFilter) params.priority = priorityFilter;
    if (sortBy) params.sortBy = sortBy;

    const res = await api.get("/tasks", { params });
    setTasks(res.data);
  };

  // create new task
  const handleCreate = async (e) => {
    e.preventDefault();
    await api.post("/tasks", { title, description, dueDate, priority });
    setTitle("");
    setDescription("");
    setDueDate("");
    setPriority("medium");
    loadTasks();
  };

  // mark as done
  const markComplete = async (id) => {
    await api.patch(`/tasks/${id}/complete`);
    loadTasks();
  };

  // delete task
  const deleteTask = async (id) => {
    await api.delete(`/tasks/${id}`);
    loadTasks();
  };

  // reset filters
  const clearFilters = () => {
    setSearch("");
    setStatusFilter("");
    setPriorityFilter("");
    setSortBy("");
    loadTasks();
  };

  return (
    <div className="container-fluid px-2">
      <h3 className="mb-3">Create Task</h3>

      <form className="row g-2 mb-4" onSubmit={handleCreate}>
        <div className="col-12 col-md-3">
          <input
            className="form-control"
            placeholder="Title"
            value={title}
            onChange={(e) => setTitle(e.target.value)}
            required
          />
        </div>

        <div className="col-12 col-md-3">
          <input
            className="form-control"
            placeholder="Description"
            value={description}
            onChange={(e) => setDescription(e.target.value)}
          />
        </div>

        <div className="col-12 col-md-2">
          <input
            type="date"
            className="form-control"
            value={dueDate}
            onChange={(e) => setDueDate(e.target.value)}
            required
          />
        </div>

        <div className="col-12 col-md-2">
          <select
            className="form-select"
            value={priority}
            onChange={(e) => setPriority(e.target.value)}
          >
            <option value="high">High</option>
            <option value="medium">Medium</option>
            <option value="low">Low</option>
          </select>
        </div>

        <div className="col-12 col-md-2">
          <button className="btn btn-primary w-100">Add</button>
        </div>
      </form>

      <h4>Search / Filter / Sort</h4>

      <div className="row g-2 mb-3">
        <div className="col-12 col-md-3">
          <input
            className="form-control"
            placeholder="Search by title or description"
            value={search}
            onChange={(e) => setSearch(e.target.value)}
          />
        </div>

        <div className="col-12 col-md-2">
          <select
            className="form-select"
            value={statusFilter}
            onChange={(e) => setStatusFilter(e.target.value)}
          >
            <option value="">All Status</option>
            <option value="completed">Completed</option>
            <option value="pending">Pending</option>
          </select>
        </div>

        <div className="col-12 col-md-2">
          <select
            className="form-select"
            value={priorityFilter}
            onChange={(e) => setPriorityFilter(e.target.value)}
          >
            <option value="">All Priority</option>
            <option value="high">High</option>
            <option value="medium">Medium</option>
            <option value="low">Low</option>
          </select>
        </div>

        <div className="col-12 col-md-2">
          <select
            className="form-select"
            value={sortBy}
            onChange={(e) => setSortBy(e.target.value)}
          >
            <option value="">No Sorting</option>
            <option value="dueDate">Due Date</option>
            <option value="priority">Priority</option>
          </select>
        </div>

        <div className="col-6 col-md-1">
          <button className="btn btn-secondary w-100" onClick={loadTasks}>
            Apply
          </button>
        </div>

        <div className="col-6 col-md-2">
          <button className="btn btn-outline-danger w-100" onClick={clearFilters}>
            Clear
          </button>
        </div>
      </div>

      <h3>Your Tasks</h3>

      <div className="table-responsive">
        <table className="table table-bordered align-middle text-center">
          <thead className="table-dark">
            <tr>
              <th>Title</th>
              <th className="d-none d-md-table-cell">Priority</th>
              <th className="d-none d-md-table-cell">Due Date</th>
              <th>Status</th>
              <th>Actions</th>
            </tr>
          </thead>
          <tbody>
            {tasks.map((task) => (
              <tr key={task._id}>
                <td style={{ wordBreak: "break-word", maxWidth: "220px" }}>
                  {task.title}
                </td>

                <td className="d-none d-md-table-cell">{task.priority}</td>
                <td className="d-none d-md-table-cell">
                  {new Date(task.dueDate).toLocaleDateString()}
                </td>
                <td>{task.status}</td>

                <td className="text-nowrap">
                  <button
                    className="btn btn-success btn-sm me-2 mb-1"
                    onClick={() => markComplete(task._id)}
                    title={task.status === "completed" ? "Already Completed" : "Mark as Done"}
                    disabled={task.status === "completed"}
                  >
                    <i className="bi bi-check-circle"></i>
                  </button>

                  <button
                    className="btn btn-danger btn-sm mb-1"
                    onClick={() => deleteTask(task._id)}
                    title="Delete Task"
                  >
                    <i className="bi bi-trash"></i>
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default TaskList;
