import { useState } from "react";

const ADMIN_API =
  "https://script.google.com/macros/s/AKfycbxAMR_XgAS4cqfejEHR4WyRW4WX0HBqX8Xqw50zb9LHMxE0IsFGmH1ONcEh2K11Oyqrbw/exec";

export default function Users() {
  const [password, setPassword] = useState("");
  const [unlocked, setUnlocked] = useState(false);
  const [error, setError] = useState("");

  const unlockAdmin = async () => {
    setError("");

    try {
      const res = await fetch(
        `${ADMIN_API}?type=admin_login&password=${encodeURIComponent(password)}`
      );

      const data = await res.json();

      if (data.success === true) {
        setUnlocked(true);
      } else {
        setError("Invalid password");
      }
    } catch (err) {
      setError("Server error");
    }
  };

  if (!unlocked) {
    return (
      <div className="flex items-center justify-center h-full">
        <div className="bg-white p-6 rounded shadow w-96 text-center">
          <h2 className="text-xl font-bold mb-4">Admin Access Required</h2>

          <input
            type="password"
            className="border p-2 w-full mb-2"
            placeholder="Enter admin password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
          />

          {error && <p className="text-red-500 text-sm mb-2">{error}</p>}

          <button
            onClick={unlockAdmin}
            className="bg-red-600 text-white px-4 py-2 rounded w-full"
          >
            Unlock User Management
          </button>
        </div>
      </div>
    );
  }

  // ================= AFTER UNLOCK =================
  return (
    <div className="p-6">
      <h1 className="text-2xl font-bold mb-4">User Management</h1>
      <p className="text-green-600 font-semibold">
        Admin access granted ✅
      </p>

      {/* USER TABLE NANTI KITA SAMBUNG */}
    </div>
  );
}
