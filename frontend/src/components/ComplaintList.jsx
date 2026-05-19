function ComplaintList({ complaints, onStatusChange, onDelete, onAnalyze }) {
  return (
    <section className="panel">
      <h2>Complaint List Page</h2>
      {complaints.length === 0 ? (
        <p className="empty-text">No complaints found.</p>
      ) : (
        <div className="card-grid">
          {complaints.map((complaint) => (
            <article className="complaint-card" key={complaint._id}>
              <h3>{complaint.title}</h3>
              <p><strong>Name:</strong> {complaint.name}</p>
              <p><strong>Email:</strong> {complaint.email}</p>
              <p><strong>Category:</strong> {complaint.category}</p>
              <p><strong>Location:</strong> {complaint.location}</p>
              <p><strong>Status:</strong> {complaint.status}</p>
              <p><strong>Description:</strong> {complaint.description}</p>
              <div className="status-row">
                <select value={complaint.status} onChange={(event) => onStatusChange(complaint._id, event.target.value)}>
                  <option value="Pending">Pending</option>
                  <option value="In Progress">In Progress</option>
                  <option value="Resolved">Resolved</option>
                </select>
              </div>
              <div className="button-row">
                <button onClick={() => onAnalyze(complaint)}>Analyze</button>
                <button className="secondary-button" onClick={() => onDelete(complaint._id)}>Delete</button>
              </div>
            </article>
          ))}
        </div>
      )}
    </section>
  );
}

export default ComplaintList;

