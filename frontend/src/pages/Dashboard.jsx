import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import API from "../api";
import AIResultPanel from "../components/AIResultPanel";
import ComplaintFilters from "../components/ComplaintFilters";
import ComplaintForm from "../components/ComplaintForm";
import ComplaintList from "../components/ComplaintList";

function Dashboard({ token, logout }) {
  const navigate = useNavigate();
  const [complaints, setComplaints] = useState([]);
  const [analysis, setAnalysis] = useState("");
  const [loadingAnalysis, setLoadingAnalysis] = useState(false);
  const [message, setMessage] = useState("");
  const [filters, setFilters] = useState({
    location: "",
    category: ""
  });
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    title: "",
    description: "",
    category: "",
    location: "",
    status: "Pending"
  });

  const authConfig = {
    headers: {
      Authorization: `Bearer ${token}`
    }
  };

  const handleUnauthorized = () => {
    logout();
    navigate("/login");
  };

  const fetchComplaints = async () => {
    try {
      const response = await API.get("/complaints", authConfig);
      setComplaints(response.data);
    } catch (error) {
      handleUnauthorized();
    }
  };

  useEffect(() => {
    fetchComplaints();
  }, []);

  const handleChange = (event) => {
    setFormData({ ...formData, [event.target.name]: event.target.value });
  };

  const handleSubmit = async (event) => {
    event.preventDefault();
    setMessage("");

    try {
      const response = await API.post("/complaints", formData, authConfig);
      setMessage(response.data.message);
      setFormData({
        name: "",
        email: "",
        title: "",
        description: "",
        category: "",
        location: "",
        status: "Pending"
      });
      fetchComplaints();
    } catch (error) {
      setMessage(error.response?.data?.message || "Failed to submit complaint");
    }
  };

  const handleSearch = async () => {
  try {
    const response = await API.get("/complaints/search", {
      ...authConfig,
      params: {
        location: filters.location.trim(),
        category: filters.category.trim()
      }
    });
    setComplaints(response.data);
  } catch (error) {
    setMessage(error.response?.data?.message || "Search failed");
  }
  };

  const handleReset = async () => {
    setFilters({ location: "", category: "" });
    await fetchComplaints();
  };

  const handleStatusChange = async (id, status) => {
    try {
      const response = await API.put(`/complaints/${id}`, { status }, authConfig);
      setMessage(response.data.message);
      fetchComplaints();
    } catch (error) {
      setMessage(error.response?.data?.message || "Status update failed");
    }
  };

  const handleDelete = async (id) => {
    try {
      const response = await API.delete(`/complaints/${id}`, authConfig);
      setMessage(response.data.message);
      fetchComplaints();
    } catch (error) {
      setMessage(error.response?.data?.message || "Delete failed");
    }
  };

  const handleAnalyze = async (complaint) => {
    try {
      setLoadingAnalysis(true);
      setAnalysis("");
      const response = await API.post("/ai/analyze", { complaintId: complaint._id }, authConfig);
      setAnalysis(response.data.analysis);
    } catch (error) {
      setAnalysis(
        error.response?.data?.error ||
        error.response?.data?.message ||
        "AI analysis failed"
      );
    } finally {
      setLoadingAnalysis(false);
    }
  };

  return (
    <div className="dashboard-grid">
      {message && <p className="message">{message}</p>}

      <ComplaintForm
        formData={formData}
        handleChange={handleChange}
        handleSubmit={handleSubmit}
      />

      <ComplaintFilters
        filters={filters}
        setFilters={setFilters}
        handleSearch={handleSearch}
        handleReset={handleReset}
      />

      <ComplaintList
        complaints={complaints}
        onStatusChange={handleStatusChange}
        onDelete={handleDelete}
        onAnalyze={handleAnalyze}
      />

      <AIResultPanel
        analysis={analysis}
        loading={loadingAnalysis}
      />
    </div>
  );
}

export default Dashboard;
