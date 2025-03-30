"use client";
import { useState, useEffect } from "react";
import { motion } from "framer-motion";
import Sidebar from "@/components/ui/Sidebar.js";
import Navbar from "@/components/ui/AdminNavbar.js";
import AdminProtectedRoute from "@/components/ui/AdminProtectedRoute.js";
import {toast} from 'react-toastify';

export default function ManageUsers() {
  const [isSidebarOpen, setSidebarOpen] = useState(false);
  const [users, setUsers] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchUsers = async () => {
      console.log("Fetching users...");
      try {
        const response = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/admin/users`, {
          method: "GET",
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${localStorage.getItem("userToken")}`,
          },
        });
        if (!response.ok) {
          throw new Error("Failed to fetch users");
        }
        const data = await response.json();
        console.log("Users fetched successfully:", data);
        setUsers(data.users);
      } catch (err) {
        console.error("Error fetching users:", err);
        setError(err.message);
      } finally {
        setLoading(false);
      }
    };
    fetchUsers();
  }, []);

  const updateUserRole = async (userId, newRole) => {
    console.log(`Updating role for user ${userId} to ${newRole}...`);
    let endpoint = "";
    if (newRole === "ADMIN") {
      endpoint = `${process.env.NEXT_PUBLIC_API_URL}/admin/make-admin/${userId}`;
    } else if (newRole === "VERIFIER") {
      endpoint = `${process.env.NEXT_PUBLIC_API_URL}/admin/make-verifier/${userId}`;
    } else {
      endpoint = `${process.env.NEXT_PUBLIC_API_URL}/admin/make-user/${userId}`;
    }

    try {
      const response = await fetch(endpoint, {
        method: "PUT",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${localStorage.getItem("userToken")}`,
        },
      });
      if (!response.ok) {
        throw new Error("Failed to update role");
      }
      console.log(`Role updated successfully for user ${userId}`);
      setUsers((prevUsers) =>
        prevUsers.map((user) =>
          user.id === userId ? { ...user, role: newRole } : user
        )
      );
    } catch (err) {
      console.error("Error updating role:", err);
      toast.error("You need to be a SUPER_ADMIN to perform this action.")
    }
  };

  return (
    <AdminProtectedRoute>
      <div className="flex h-screen bg-gray-100">
        <Sidebar isSidebarOpen={isSidebarOpen} setSidebarOpen={setSidebarOpen} />

        <div className="flex-1 flex flex-col h-screen overflow-y-auto p-8">
          <Navbar setSidebarOpen={setSidebarOpen} />

          <h2 className="text-gray-600 font-semibold mb-4">Manage Users</h2>

          {loading ? (
            <p>Loading users...</p>
          ) : error ? (
            <p className="text-red-500">Error: {error}</p>
          ) : (
            <div className="bg-white shadow-md rounded-lg overflow-auto max-h-[70vh]">
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
                        {user.role !== "SUPER_ADMIN" ? (
                          <select
                            className="border px-2 py-1 rounded bg-gray-100"
                            value={user.role}
                            onChange={(e) => updateUserRole(user.id, e.target.value)}
                          >
                            <option value="USER">User</option>
                            <option value="ADMIN">Admin</option>
                            <option value="VERIFIER">Verifier</option>
                          </select>
                        ) : null}
                      </td>
                    </motion.tr>
                  ))}
                </tbody>
              </table>
            </div>
          )}
        </div>
      </div>
    </AdminProtectedRoute>
  );
}
