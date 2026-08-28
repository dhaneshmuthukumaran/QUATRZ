export default function AIAnalysisCard({ incident }) {
  if (!incident) return null;

  return (
    <div className="ai-analysis-card">
      <h3>🤖 AI Analysis</h3>

      <div className="ai-grid">
        <div>
          <span>Category</span>
          <strong>{incident.category}</strong>
        </div>

        <div>
          <span>Severity</span>
          <strong>{incident.severity}</strong>
        </div>

        <div>
          <span>Priority</span>
          <strong>{incident.priority}</strong>
        </div>

        <div>
          <span>AI Confidence</span>
          <strong>{incident.confidence}%</strong>
        </div>
      </div>

      <div className="ai-summary">
        <span>AI Summary</span>

        <p>{incident.aiSummary}</p>
      </div>
    </div>
  );
}