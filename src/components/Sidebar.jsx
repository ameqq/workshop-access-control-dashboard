import { Link } from "react-router-dom";

export default function Sidebar() {
  return (
    <div className="w-64 h-screen bg-slate-900 text-white fixed left-0 top-0 p-6">
      	<h1 className="text-xl font-bold mb-8">
	Workshop Access - UNIKL MSI
	</h1>

      <ul className="space-y-4 text-lg">
        <li>
          <Link to="/" className="hover:text-blue-400">Dashboard</Link>
        </li>
        <li>
          <Link to="/logs" className="hover:text-blue-400">Access Logs</Link>
        </li>
        <li>
          <Link to="/users" className="hover:text-blue-400">User Management</Link>
        </li>
      </ul>
    </div>
  );
}
