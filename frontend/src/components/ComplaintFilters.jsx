function ComplaintFilters({ filters, setFilters, handleSearch, handleReset }) {
  return (
    <section className="panel">
      <h2>Complaint Tracking</h2>

      <form
        className="filter-grid"
        onSubmit={(event) => {
          event.preventDefault();
          handleSearch();
        }}
      >
        <input
          type="text"
          placeholder="Search by location"
          value={filters.location}
          onChange={(event) =>
            setFilters({ ...filters, location: event.target.value })
          }
        />

        <select
          value={filters.category}
          onChange={(event) =>
            setFilters({ ...filters, category: event.target.value })
          }
        >
          <option value="">Filter by Category</option>
          <option value="Water Supply">Water Supply</option>
          <option value="Electricity">Electricity</option>
          <option value="Garbage">Garbage</option>
          <option value="Sanitation">Sanitation</option>
          <option value="Road Damage">Road Damage</option>
          <option value="Drainage">Drainage</option>
          <option value="Street Light">Street Light</option>
          <option value="Other">Other</option>
        </select>

        <div className="button-row">
          <button type="submit">Search</button>
          <button type="button" className="secondary-button" onClick={handleReset}>
            Reset
          </button>
        </div>
      </form>
    </section>
  );
}

export default ComplaintFilters;