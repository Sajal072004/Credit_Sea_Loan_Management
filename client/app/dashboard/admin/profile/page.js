"use client";
import { useState, useEffect } from "react";
import { motion } from "framer-motion";
import { Card, CardContent } from "@/components/ui/card";
import AdminProtectedRoute from "@/components/ui/AdminProtectedRoute.js";
import Sidebar from "@/components/ui/Sidebar.js";
import Navbar from "@/components/ui/AdminNavbar.js";

export default function AdminProfile() {
  const [isSidebarOpen, setSidebarOpen] = useState(false);
  const [adminData, setAdminData] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchAdminProfile = async () => {
      const token = localStorage.getItem("userToken");
      if (!token) return;

      try {
        const res = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/applications/get-user`, {
          headers: { Authorization: `Bearer ${token}` },
        });

        if (res.ok) {
          const data = await res.json();
          setAdminData(data);
        } else {
          console.error("Failed to fetch admin profile.");
        }
      } catch (error) {
        console.error("Error fetching admin profile:", error);
      } finally {
        setLoading(false);
      }
    };

    fetchAdminProfile();
  }, []);

  return (
    <AdminProtectedRoute>
      <div className="flex h-screen bg-gray-100">
        <Sidebar isSidebarOpen={isSidebarOpen} setSidebarOpen={setSidebarOpen} />
        <div className="flex-1 flex flex-col h-screen overflow-y-auto p-8">
          <Navbar setSidebarOpen={setSidebarOpen} />

          <h2 className="text-gray-600 font-semibold mb-4">Admin Profile</h2>

          {loading ? (
            <p className="text-gray-500">Loading profile...</p>
          ) : adminData ? (
            <div className="max-w-3xl mx-auto mt-8 p-6 bg-white rounded-lg shadow-md">
              <h2 className="text-2xl font-bold text-gray-800">User Profile</h2>
              <motion.div
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.3 }}
                className="mt-4 space-y-4"
              >
                <div className="flex items-center space-x-4">
                  <div className="bg-blue-500 text-white p-3 rounded-full text-lg font-bold h-16 w-16 flex justify-center items-center">
                    {adminData.name.charAt(0)}
                  </div>
                  <div>
                    <p className="text-xl font-semibold">{adminData.name}</p>
                    <p className="text-gray-600">{adminData.email}</p>
                  </div>
                </div>
                <div className="bg-gray-100 p-3 rounded-lg">
                  <p className="text-gray-500">Role:</p>
                  <p className="text-lg font-medium text-gray-800">{adminData.role}</p>
                </div>
              </motion.div>
            </div>
          ) : (
            <p className="text-center text-gray-500 mt-4">User not found.</p>
          )}
        </div>
      </div>
    </AdminProtectedRoute>
  );
}
