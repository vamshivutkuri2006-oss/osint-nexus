import { useState } from "react";

function Settings() {
  const [notifications, setNotifications] = useState(true);
  const [autoCopy, setAutoCopy] = useState(false);

  return (
    <div className="username-page">
      <h1>Settings ⚙️</h1>

      <p className="subtitle">
        Configure your OSINT Nexus preferences.
      </p>

      <div className="settings-panel">

        <div className="setting-item">
          <div>
            <h3>Investigation Notifications</h3>
            <p>
              Show notifications when an investigation completes.
            </p>
          </div>

          <label className="switch">
            <input
              type="checkbox"
              checked={notifications}
              onChange={() =>
                setNotifications(!notifications)
              }
            />
            <span className="slider"></span>
          </label>
        </div>

        <div className="setting-item">
          <div>
            <h3>Auto Copy Results</h3>
            <p>
              Automatically copy discovered profile URLs.
            </p>
          </div>

          <label className="switch">
            <input
              type="checkbox"
              checked={autoCopy}
              onChange={() =>
                setAutoCopy(!autoCopy)
              }
            />
            <span className="slider"></span>
          </label>
        </div>

        <div className="setting-item">
          <div>
            <h3>Backend Status</h3>
            <p>
              FastAPI backend configuration.
            </p>
          </div>

          <span className="status-badge">
            ● Local
          </span>
        </div>

      </div>
    </div>
  );
}

export default Settings;