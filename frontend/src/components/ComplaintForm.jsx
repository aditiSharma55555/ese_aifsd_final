function ComplaintForm({ formData, handleChange, handleSubmit }) {
  return (
    <section className="panel">
      <h2>Complaint Registration Form</h2>
      <form className="form-grid" onSubmit={handleSubmit}>
        <div>
          <label>Name</label>
          <input type="text" name="name" value={formData.name} onChange={handleChange} />
        </div>

        <div>
          <label>Email</label>
          <input type="email" name="email" value={formData.email} onChange={handleChange} />
        </div>

        <div>
          <label>Complaint Title</label>
          <input type="text" name="title" value={formData.title} onChange={handleChange} />
        </div>

        <div>
          <label>Complaint Category</label>
          <select name="category" value={formData.category} onChange={handleChange}>
            <option value="">Select Category</option>
            <option value="Water Supply">Water Supply</option>
            <option value="Electricity">Electricity</option>
            <option value="Garbage">Garbage</option>
            <option value="Sanitation">Sanitation</option>
            <option value="Road Damage">Road Damage</option>
            <option value="Drainage">Drainage</option>
            <option value="Street Light">Street Light</option>
            <option value="Other">Other</option>
          </select>
        </div>

        <div className="span-full">
          <label>Complaint Description</label>
          <textarea name="description" value={formData.description} onChange={handleChange} />
        </div>

        <div>
          <label>Location</label>
          <input type="text" name="location" value={formData.location} onChange={handleChange} />
        </div>

        <div>
          <label>Complaint Status</label>
          <select name="status" value={formData.status} onChange={handleChange}>
            <option value="Pending">Pending</option>
            <option value="In Progress">In Progress</option>
            <option value="Resolved">Resolved</option>
          </select>
        </div>

        <div className="button-row span-full">
          <button type="submit">Submit Complaint</button>
        </div>
      </form>
    </section>
  );
}

export default ComplaintForm;

