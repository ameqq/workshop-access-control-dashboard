import { useEffect, useState } from "react";

export default function Logs() {
  const [logs, setLogs] = useState([]);

  useEffect(() => {
    fetch("https://script.google.com/macros/s/XXXXX/exec?type=logs")
      .then(res => res.json())
      .then(data => setLogs(data))
      .catch(err => console.error(err));
  }, []);

  return (
    <div className="p-6">
      <h1 className="text-2xl font-bold mb-4">Access Logs</h1>

      <table className="w-full border">
        <thead className="bg-gray-200">
          <tr>
            <th className="p-2">Time</th>
            <th className="p-2">Student ID</th>
            <th className="p-2">Name</th>
            <th className="p-2">Status</th>
          </tr>
        </thead>
        <tbody>
          {logs.map((log, i) => (
            <tr key={i} className="border-t">
              <td className="p-2">{log.timestamp}</td>
              <td className="p-2">{log.student_id}</td>
              <td className="p-2">{log.name}</td>
              <td className="p-2 font-bold">{log.status}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}
