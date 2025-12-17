import { useEffect, useState } from "react";

export default function Dashboard() {
  const [stats, setStats] = useState({
    total: 0,
    authorized: 0,
    denied: 0,
    emergency: 0,
  });

  const API_URL =
    "https://script.google.com/macros/s/AKfycbxDichOfL61qYxvLSRAbyJjLaqyL3eoRSnUYwuwKD0VgJj-0Gxp8ebgFZqD05sKVM34Iw/exec";

  useEffect(() => {
    const fetchData = () => {
      fetch(API_URL)
        .then((res) => res.json())
        .then((data) => {
          setStats({
            total: data.total || 0,
            authorized: data.authorized || 0,
            denied: data.denied || 0,
            emergency: data.emergency || 0,
          });
        })
        .catch((err) => console.error("Fetch error:", err));
    };

    // Fetch for the first
    fetchData();

    // Auto refresh every 5 seconds
    const interval = setInterval(fetchData, 5000);

    return () => clearInterval(interval);
  }, []);

  return (
    <div className="p-6">
      <h1 className="text-2xl font-bold mb-6">
        Workshop Access Control Dashboard - UNIKL MSI
      </h1>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        {/* TOTAL ACCESS */}
        <StatCard
          title="Total Access Today"
          value={stats.total}
          valueColor="text-black"
        />

        {/* AUTHORIZED */}
        <StatCard
          title="Authorized Access"
          value={stats.authorized}
          valueColor="text-green-600"
        />

        {/* DENIED */}
        <StatCard
          title="Denied Access"
          value={stats.denied}
          valueColor="text-red-600"
        />
      </div>

      {/* EMERGENCY */}
      <div className="mt-6">
        <StatCard
          title="Emergency Opens"
          value={stats.emergency}
          valueColor="text-orange-600"
        />
      </div>
    </div>
  );
}

function StatCard({ title, value, valueColor }) {
  return (
    <div className="bg-white shadow rounded p-6">
      <p className="text-gray-500">{title}</p>
      <p className={`text-3xl font-bold ${valueColor}`}>{value}</p>
    </div>
  );
}
