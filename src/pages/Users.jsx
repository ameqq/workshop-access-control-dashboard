import { useState } from "react";

// ⚠️ GANTI DENGAN WEB APP URL ANDA
const API_URL =
  "https://script.google.com/macros/s/AKfycbxAMR_XgAS4cqfejEHR4WyRW4WX0HBqX8Xqw50zb9LHMxEOlsFGmH1QNcEh2K11Oyqrbw/exec";

export default function Users() {
  const [authorized, setAuthorized] = useState(
    localStorage.getItem("isAdmin") === "true"
  );
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");

  const unlockAdmin = () => {
    fetch(API_URL, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        action: "checkAdmin",
        password: password,
      }),
    })
      .then((res) => res.json())
      .then((data) => {
        if (data.success) {
          localStorage.setItem("isAdmin", "true");
          setAuthorized(true);
        } else {
          setError("Wrong admin password");
        }
      })
      .catch(() => {
        setError("Server error");
      });
  };

  // ================= LOCK SCREEN =================
  if (!authorized) {
    return (
      <div className="flex items-center justify-center h-96">
        <div className="bg-white p-6 rounded shadow w-80">
          <h2 className="text-lg font-bold mb-4">
            Admin Access Required
          </h2>

          <input
            type="password"
            className="border p-2 w-full mb-3"
            placeholder="Enter Admin Password"
            onChange={(e) => setPassword(e.target.value)}
          />

          {error && (
            <p className="text-red-600 text-sm mb-2">{error}</p>
          )}

          <button
            onClick={unlockAdmin}
            className="bg-red-600 text-white w-full py-2 rounded"
          >
            Unlock User Management
          </button>
        </div>
      </div>
    );
  }

  // ================= ADMIN CONTENT =================
  return (
    <div className="p-6">
      <div className="flex justify-between items-center mb-6">
        <h1 className="text-2xl font-bold">User Management</h1>

        <button
          onClick={() => {
            localStorage.removeItem("isAdmin");
            window.location.reload();
          }}
          className="text-sm text-red-600 underline"
        >
          Logout Admin
        </button>
      </div>

      <div className="bg-white p-6 rounded shadow">
        <p className="text-gray-600">
          Admin-only user management features will be placed here.
        </p>
      </div>
    </div>
  );
}
