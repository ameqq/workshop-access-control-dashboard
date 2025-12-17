import { useEffect, useState } from "react";

export default function Logs() {
  const [logs, setLogs] = useState([]);

  useEffect(() => {
    fetch("https://script.google.com/macros/s/AKfycbxDichOfL61qYxvLSRAbyJjLaqyL3eoRSnUYwuwKD0VgJj-0Gxp8ebgFZqD05sKVM34Iw/exec?type=logs")
      .then((res) => res.json())
      .then((data) => setLogs(data))
      .catch((err) => console.error(err));
  }, []);

  return (
    <div className="p-6">
      <h1 className="text-2xl font-bold mb-6">
        Access Logs
      </h1>

      <div className="bg-white shadow rounded p-4 overflow-x-auto">
        <table className="w-full border">
          <thead className="bg-gray-100">
            <tr>
              <th className="border p-2">Timestamp</th>
              <th className="border p-2">Student ID</th>
              <th className="border p-2">Name</th>
              <th className="border p-2">Status</th>
            </tr>
          </thead>

          <tbody>
            {logs.length === 0 && (
              <tr>
                <td colSpan="4" className="text-center p-4 text-gray-500">
                  No access records found
                </td>
              </tr>
            )}

            {logs.map((row, index) => (
              <tr key={index}>
                <td className="border p-2">{row.timestamp}</td>
                <td className="border p-2">{row.student_id}</td>
                <td className="border p-2">{row.name}</td>
                <td className="border p-2 font-bold">
                  {row.status}
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}
