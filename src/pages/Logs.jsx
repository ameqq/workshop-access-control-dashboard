import { useEffect, useState } from "react";

const API_URL =
  "https://script.google.com/macros/s/AKfycbznqkrJ1R3AX3lr77Xs18JxqTQPysQHvQsZhUKwsseLpTRWMoSibUm-wid1-1VLNdIIQA/exec?type=logs";

export default function Logs() {
  const [logs, setLogs] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchLogs = () => {
      fetch(API_URL)
        .then((res) => res.json())
        .then((data) => {
          setLogs(Array.isArray(data) ? data : []);
          setLoading(false);
        })
        .catch((err) => {
          console.error("Fetch logs error:", err);
          setLoading(false);
        });
    };

    fetchLogs();
    const interval = setInterval(fetchLogs, 5000);
    return () => clearInterval(interval);
  }, []);

  return (
    <div className="p-6">
      <h1 className="text-2xl font-bold mb-6">Access Logs</h1>

      {loading ? (
        <p className="text-gray-500">Loading access logs...</p>
      ) : (
        <div className="overflow-x-auto bg-white shadow rounded">
          <table className="min-w-full border-collapse">
            <thead className="bg-gray-100">
              <tr>
                <th className="px-4 py-3 text-left">Time</th>
                <th className="px-4 py-3 text-left">Student ID</th>
                <th className="px-4 py-3 text-left">Name</th>
                <th className="px-4 py-3 text-left">Status</th>
              </tr>
            </thead>
            <tbody>
              {logs.length === 0 ? (
                <tr>
                  <td colSpan="4" className="px-4 py-6 text-center text-gray-500">
                    No access logs found
                  </td>
                </tr>
              ) : (
                logs.map((log, index) => (
                  <tr key={index} className="border-t hover:bg-gray-50">
                    <td className="px-4 py-2 text-sm">
                      {log.timestamp
                        ? new Date(log.timestamp).toLocaleString()
                        : "-"}
                    </td>
                    <td className="px-4 py-2 text-sm">
                      {log.student_id}
                    </td>
                    <td className="px-4 py-2 text-sm">
                      {log.name}
                    </td>
                    <td className="px-4 py-2 text-sm font-semibold">
                      <span
                        className={
                          log.status === "AUTHORIZED"
                            ? "text-green-600"
                            : log.status === "DENIED"
                            ? "text-red-600"
                            : "text-orange-600"
                        }
                      >
                        {log.status}
                      </span>
                    </td>
                  </tr>
                ))
              )}
            </tbody>
          </table>
        </div>
      )}
    </div>
  );
}
