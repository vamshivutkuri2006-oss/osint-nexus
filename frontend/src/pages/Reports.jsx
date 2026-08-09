import { useState } from "react";

function Reports() {
  const [report, setReport] = useState(null);

  const createDemoReport = () => {
    const newReport = {
      project: "OSINT Nexus",
      report_type: "Investigation Report",
      created_at: new Date().toISOString(),
      status: "Demo",
      message:
        "Run an investigation from the Username, Email, Domain, or IP modules to generate real report data.",
    };

    setReport(newReport);
  };

  const downloadReport = () => {
    if (!report) return;

    const blob = new Blob(
      [JSON.stringify(report, null, 2)],
      { type: "application/json" }
    );

    const url = URL.createObjectURL(blob);

    const link = document.createElement("a");
    link.href = url;
    link.download = "osint-nexus-report.json";
    link.click();

    URL.revokeObjectURL(url);
  };

  return (
    <div className="username-page">
      <h1>Investigation Reports 📄</h1>

      <p className="subtitle">
        Create and export OSINT investigation reports.
      </p>

      <div className="welcome-card">
        <h2>Report Generator</h2>

        <p>
          Generate a structured report from your OSINT investigation.
        </p>

        <button onClick={createDemoReport}>
          📄 Create Report
        </button>
      </div>

      {report && (
        <div className="search-results">
          <div className="results-header">
            <div>
              <h2>Report Ready</h2>
              <p>
                Your report has been generated successfully.
              </p>
            </div>

            <button
              className="copy-button"
              onClick={downloadReport}
            >
              ⬇️ Download JSON
            </button>
          </div>

          <pre
            style={{
              marginTop: "20px",
              padding: "20px",
              background: "#0b1220",
              border: "1px solid #263858",
              borderRadius: "10px",
              overflowX: "auto",
              color: "#cbd5e1",
            }}
          >
            {JSON.stringify(report, null, 2)}
          </pre>
        </div>
      )}
    </div>
  );
}

export default Reports;