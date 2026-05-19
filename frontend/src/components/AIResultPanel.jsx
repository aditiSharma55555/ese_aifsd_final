function AIResultPanel({ analysis, loading }) {
  return (
    <section className="panel">
      <h2>AI Analysis Result Display</h2>
      {loading ? (
        <p>Generating AI result...</p>
      ) : analysis ? (
        <div className="analysis-box">
          <pre>{analysis}</pre>
        </div>
      ) : (
        <p className="empty-text">Select a complaint and click Analyze to view AI urgency, department, response, and summary.</p>
      )}
    </section>
  );
}

export default AIResultPanel;

