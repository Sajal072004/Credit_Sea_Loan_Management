"use client";
import { useState, useEffect } from "react";
import { motion } from "framer-motion";
import { Card, CardContent } from "@/components/ui/card";
import AdminProtectedRoute from "@/components/ui/AdminProtectedRoute.js";
import stats from "@/const/adminStats.js";
import Sidebar from "@/components/ui/Sidebar.js";
import Navbar from "@/components/ui/AdminNavbar.js";

const statusColors = {
  PENDING: "bg-yellow-500",
  APPROVED: "bg-green-600",
  VERIFIED: "bg-blue-500",
  REJECTED: "bg-red-600",
};

export default function AdminDashboard() {
  const [isSidebarOpen, setSidebarOpen] = useState(false);
  const [applications, setApplications] = useState([]);

  // Fetch applications on mount
  useEffect(() => {
    const fetchApplications = async () => {
      const token = localStorage.getItem("userToken");
      if (!token) return;

      try {
        const res = await fetch("http://localhost:5000/api/admin", {
          headers: { Authorization: `Bearer ${token}` },
        });

        if (res.ok) {
          const data = await res.json();
          setApplications(data.applications);
        } else {
          console.error("Failed to fetch applications.");
        }
      } catch (error) {
        console.error("Error fetching applications:", error);
      }
    };

    fetchApplications();
  }, []);

  // Handle Approve & Reject Actions
  const handleApplicationAction = async (applicationId, status) => {
    const token = localStorage.getItem("userToken");
    if (!token) return;

    try {
      // First request to update application status
      const res = await fetch(
        `http://localhost:5000/api/admin/approve/${applicationId}`,
        {
          method: "PUT",
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${token}`,
          },
          body: JSON.stringify({ status }),
        }
      );

      if (res.ok) {
        setApplications((prevApps) =>
          prevApps.map((app) =>
            app.id === applicationId ? { ...app, status } : app
          )
        );

        // If approved, make the second request
        if (status === "APPROVED") {
          const loanRes = await fetch(
            `http://localhost:5000/api/loan/approve/${applicationId}`,
            {
              method: "POST",
              headers: {
                "Content-Type": "application/json",
                Authorization: `Bearer ${token}`,
              },
            }
          );

          if (!loanRes.ok) {
            console.error("Failed to approve loan.");
          }
        }
      } else {
        console.error(`Failed to ${status.toLowerCase()} application.`);
      }
    } catch (error) {
      console.error("Error:", error);
    }
  };

  return (
    <AdminProtectedRoute>
      <div className="flex h-screen bg-gray-100">
        {/* Sidebar */}
        <Sidebar
          isSidebarOpen={isSidebarOpen}
          setSidebarOpen={setSidebarOpen}
        />

        {/* Main Content */}
        <div className="flex-1 flex flex-col h-screen overflow-y-auto p-8">
          <Navbar setSidebarOpen={setSidebarOpen} />

          {/* Dashboard Cards */}
          <h2 className="text-gray-600 font-semibold mb-4">Dashboard</h2>
          <div className="grid grid-cols-2 md:grid-cols-4 gap-6">
            {stats.map((stat, index) => (
              <Card key={index} className="shadow-md bg-white border">
                <CardContent className="flex justify-between items-center p-4">
                  <div className="text-3xl">{stat.icon}</div>
                  <div>
                    <p className="text-xl font-bold">{stat.value}</p>
                    <p className="text-gray-500 text-sm">{stat.label}</p>
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>

          {/* Recent Loans Table */}
          <Card className="mt-8 shadow-lg">
            <CardContent>
              <div className="flex justify-between items-center mb-4">
                <h2 className="text-lg font-semibold text-gray-700">
                  Recent Applications
                </h2>
                <div className="flex space-x-4 text-gray-500">
                  <span className="cursor-pointer hover:text-green-700">
                    Sort
                  </span>
                  <span className="cursor-pointer hover:text-green-700">
                    Filter
                  </span>
                </div>
              </div>

              {/* Table Header */}
              <div className="grid grid-cols-5 text-gray-500 text-sm font-medium border-b pb-2">
                <p className="text-center">Reason</p>
                <p className="text-center">Tenure</p>
                <p className="text-center">Amount</p>
                <p className="text-center">Status</p>
                <p className="text-center">Actions</p>
              </div>

              {/* Applications List */}
              {applications.length > 0 ? (
                applications.map((app) => (
                  <motion.div
                    key={app.id}
                    initial={{ opacity: 0, y: 10 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.3 }}
                    className="grid grid-cols-5 items-center py-4 border-b text-center"
                  >
                    <div className="text-gray-700 truncate">{app.reason}</div>
                    <p className="text-gray-700 font-medium truncate">
                      {app.tenure} Months
                    </p>
                    <p className="text-gray-600">₹{app.amount}</p>
                    <span
                      className={`px-3 py-1 rounded-full text-white text-sm ${
                        statusColors[app.status]
                      }`}
                    >
                      {app.status}
                    </span>
                    <div className="flex justify-center space-x-2">
                      {/* Show "Approve" button for PENDING and VERIFIED applications */}
                      {(app.status === "PENDING" ||
                        app.status === "VERIFIED") && (
                        <button
                          onClick={() =>
                            handleApplicationAction(app.id, "APPROVED")
                          }
                          className="bg-green-600 text-white px-3 py-1 rounded"
                        >
                          Approve
                        </button>
                      )}

                      {/* Show "Reject" button only for PENDING applications */}
                      {app.status === "PENDING" && (
                        <button
                          onClick={() =>
                            handleApplicationAction(app.id, "REJECTED")
                          }
                          className="bg-red-600 text-white px-3 py-1 rounded"
                        >
                          Reject
                        </button>
                      )}
                    </div>
                  </motion.div>
                ))
              ) : (
                <p className="text-gray-500 text-center py-4">
                  No applications found.
                </p>
              )}
            </CardContent>
          </Card>
        </div>
      </div>
    </AdminProtectedRoute>
  );
}
