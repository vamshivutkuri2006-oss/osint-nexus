function Dashboard() {
  const tools = [
    {
      icon: "🔎",
      title: "Username Intelligence",
      description: "Find public profiles associated with usernames.",
      path: "/username",
    },
    {
      icon: "📧",
      title: "Email Intelligence",
      description: "Analyze email format, domain and provider.",
      path: "/email",
    },
    {
      icon: "🌐",
      title: "Domain Intelligence",
      description: "Resolve domains and inspect basic network information.",
      path: "/domain",
    },
    {
      icon: "🌍",
      title: "IP Intelligence",
      description: "Analyze IP address properties and classification.",
      path: "/ip",
    },
  ];

  return (
    <div>
      <h1>OSINT Nexus</h1>

      <p className="subtitle">
        Open Source Intelligence Investigation Platform
      </p>

      <div className="dashboard-grid">
        {tools.map((tool) => (
          <a
            href={tool.path}
            className="tool-card"
            key={tool.path}
          >
            <div className="tool-icon">
              {tool.icon}
            </div>

            <h2>{tool.title}</h2>

            <p>{tool.description}</p>

            <span>
              Open Tool →
            </span>
          </a>
        ))}
      </div>

      <div className="welcome-card dashboard-info">
        <h2>Investigation Workflow 🔍</h2>

        <p>
          Start with a username, email, domain or IP address.
          Use the available intelligence modules to investigate
          publicly available information.
        </p>

        <div className="workflow">
          <div>
            <strong>01</strong>
            <span>Choose a tool</span>
          </div>

          <div>
            <strong>02</strong>
            <span>Run investigation</span>
          </div>

          <div>
            <strong>03</strong>
            <span>Review results</span>
          </div>

          <div>
            <strong>04</strong>
            <span>Generate report</span>
          </div>
        </div>
      </div>
    </div>
  );
}

export default Dashboard;