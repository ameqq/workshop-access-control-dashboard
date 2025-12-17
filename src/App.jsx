import "./index.css";

import Sidebar from "./components/Sidebar";
import { Routes, Route } from "react-router-dom";

import Dashboard from "./pages/Dashboard";
import Logs from "./pages/Logs";
import Users from "./pages/Users";

function App() {
  return (
    <div className="flex">
      <Sidebar />

      <div className="ml-64 p-10 w-full">
        <Routes>
          <Route path="/" element={<Dashboard />} />
          <Route path="/logs" element={<Logs />} />
          <Route path="/users" element={<Users />} />
        </Routes>
      </div>
    </div>
  );
}

export default App;
