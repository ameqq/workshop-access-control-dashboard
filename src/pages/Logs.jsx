import { useEffect, useState } from "react";

export default function Logs() {
  const [logs, setLogs] = useState([]);
  const [selectedImage, setSelectedImage] = useState(null);

  useEffect(() => {
    fetch(
      "https://script.google.com/macros/s/AKfycbznqkrJ1R3AX3lr77Xs18JxqTQPysQHvQsZhUKwsseLpTRWMoSibUm-wid1-1VLNdIIQA/exec?type=logs"
    )
      .then((res) => res.json())
      .then((data) => setLogs(data))
      .catch((err) => console.error(err));
  }, []);

  return (
    <div className="p-6">
      <h1 className="text-2xl font-bold mb-6">Access Logs</h1>

      <div className="overflow-x-auto bg-white shadow rounded">
        <table className="w-full text-sm">
          <thead className="bg-gray-200">
            <tr>
              <th className="p-3 text-left">Time</th>
              <th className="p-3 text-left">Student ID</th>
              <th className="p-3 text-left">Name</th>
              <th className="p-3 text-left">Status</th>
              <th className="p-3 text-center">Image</th>
            </tr>
          </thead>
          <tbody>
            {logs.map((log, i) => (
              <tr key={i} className="border-t">
                <td className="p-3">{new Date(log.timestamp).toLocaleString()}</td>
                <td className="p-3">{log.student_id}</td>
                <td className="p-3">{log.name}</td>
                <td
                  className={`p-3 font-semibold ${
                    log.status === "AUTHORIZED"
                      ? "text-green-600"
                      : log.status === "DENIED"
                      ? "text-red-600"
                      : "text-orange-600"
                  }`}
                >
                  {log.status}
                </td>
                <td className="p-3 text-center">
                  {log.image ? (
                    <button
                      className="text-blue-600 underline"
                      onClick={() => setSelectedImage(log.image)}
                    >
                      View
                    </button>
                  ) : (
                    "-"
                  )}
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      {/* IMAGE MODAL */}
      {selectedImage && (
        <div className="fixed inset-0 bg-black bg-opacity-70 flex items-center justify-center z-50">
          <div className="bg-white p-4 rounded shadow-lg max-w-xl w-full">
            <img
              src={selectedImage}
              alt="Access Capture"
              className="w-full rounded"
            />
            <button
              className="mt-4 w-full bg-red-600 text-white py-2 rounded"
              onClick={() => setSelectedImage(null)}
            >
              Close
            </button>
          </div>
        </div>
      )}
    </div>
  );
}
