import { useState } from "react";

const API_URL = "https://script.google.com/macros/s/AKfycbxAMR_XgAS4cqfejEHR4WyRW4WX0HBqX8Xqw50zb9LHMxEOlsFGmH1QNcEh2K11Oyqrbw/exec";

export default function Users() {
  const [password, setPassword] = useState("");
  const [unlocked, setUnlocked] = useState(false);
  const [error, setError] = useState("");

  const unlock = async () => {
    setError("");

    try {
      const res = await fetch(API_URL, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          type: "admin_login",
          password: password
        })
      });

      const data = await res.json();

      if (data.success) {
        setUnlocked(true);
      } else {
        setError("Wrong admin password");
      }
    } catch (err) {
      setError("Server error");
    }
  };

  if (!unlocked) {
    return (
      <div className="flex items-center justify-center h-full">
        <div className="bg-white shadow p-6 rounded w-80">
          <h2 className="text-xl font-bold mb-4">Admin Access Required</h2>

          <input
            type="password"
            className="border w-full p-2 mb-3"
            placeholder="Enter admin password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
          />

          {error && <p className="text-red-600 mb-2">{error}</p>}

          <button
            onClick={unlock}
            className="bg-red-600 text-white px-4 py-2 w-full rounded"
          >
            Unlock User Management
          </button>
        </div>
      </div>
    );
  }

  // ===== USER MANAGEMENT CONTENT =====
  return (
    <div>
      <h1 className="text-2xl font-bold mb-4">User Management</h1>
      <p>Admin unlocked. User management panel here.</p>
    </div>
  );
}
