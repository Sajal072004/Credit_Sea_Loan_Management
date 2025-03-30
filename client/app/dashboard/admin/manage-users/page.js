"use client";
import { useState } from "react";
import { motion } from "framer-motion";
import Sidebar from "@/components/ui/Sidebar.js";
import Navbar from "@/components/ui/AdminNavbar.js";
import AdminProtectedRoute from "@/components/ui/AdminProtectedRoute.js";

const dummyUsers = [
  { id: "1", name: "Admin", email: "admin@gmail.com", role: "ADMIN" },
  { id: "2", name: "Sajal Namdeo", email: "sajalnamdeo@gmail.com", role: "USER" },
  { id: "3", name: "User", email: "user@gmail.com", role: "USER" },
  { id: "4", name: "Verifier", email: "verifier@gmail.com", role: "VERIFIER" },
  { id: "5", name: "Super Admin", email: "superadmin@gmail.com", role: "SUPER_ADMIN" },
];

export default function ManageUsers() {
  const [isSidebarOpen, setSidebarOpen] = useState(false);
  const [users, setUsers] = useState(dummyUsers);

  const handleRoleChange = (userId, newRole) => {
    setUsers((prevUsers) =>
      prevUsers.map((user) =>
        user.id === userId ? { ...user, role: newRole } : user
      )
    );
  };

  return (
    <AdminProtectedRoute>
      <div className="flex h-screen bg-gray-100">
        {/* Sidebar */}
        <Sidebar isSidebarOpen={isSidebarOpen} setSidebarOpen={setSidebarOpen} />

        {/* Main Content */}
        <div className="flex-1 flex flex-col h-screen overflow-y-auto p-8">
          <Navbar setSidebarOpen={setSidebarOpen} />

          <h2 className="text-gray-600 font-semibold mb-4">Manage Users</h2>

          {/* Users Table */}
          <div className="bg-white shadow-md rounded-lg overflow-hidden">
            <table className="w-full border-collapse">
              <thead>
                <tr className="bg-gray-200 text-gray-700">
                  <th className="py-2 px-4 text-left">Name</th>
                  <th className="py-2 px-4 text-left">Email</th>
                  <th className="py-2 px-4 text-left">Role</th>
                  <th className="py-2 px-4 text-left">Action</th>
                </tr>
              </thead>
              <tbody>
                {users.map((user) => (
                  <motion.tr
                    key={user.id}
                    initial={{ opacity: 0, y: 10 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.3 }}
                    className="border-b"
                  >
                    <td className="py-2 px-4">{user.name}</td>
                    <td className="py-2 px-4">{user.email}</td>
                    <td className="py-2 px-4">{user.role}</td>
                    <td className="py-2 px-4">
                      {user.role !== "SUPER_ADMIN" && (
                        <select
                          className="border px-2 py-1 rounded bg-gray-100"
                          value={user.role}
                          onChange={(e) => handleRoleChange(user.id, e.target.value)}
                        >
                          <option value="USER">User</option>
                          <option value="ADMIN">Admin</option>
                        </select>
                      )}
                    </td>
                  </motion.tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      </div>
    </AdminProtectedRoute>
  );
}
