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

  useEffect(() => {
    const fetchAdminProfile = async () => {
      const token = localStorage.getItem("userToken");
      if (!token) return;

      try {
        const res = await fetch("http://localhost:5000/api/applications/get-user", {
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

          {adminData ? (
            <Card className="shadow-lg bg-white border p-6">
              <CardContent className="space-y-4">
                <p className="text-xl font-semibold text-gray-800">
                  {adminData.name}
                </p>
                <p className="text-gray-600">Email: {adminData.email}</p>
                <p className="text-gray-600">Role: {adminData.role}</p>
              </CardContent>
            </Card>
          ) : (
            <p className="text-gray-500">Loading profile...</p>
          )}
        </div>
      </div>
    </AdminProtectedRoute>
  );
}
