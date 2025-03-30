"use client";

import { useState, useEffect } from "react";
import { motion } from "framer-motion";
import { Card, CardContent } from "@/components/ui/card";
import { Bell, MessageCircle, User, List, Menu, X, Home, IndianRupee } from "lucide-react";
import VerifierProtectedRoute from "@/components/ui/VerifierProtectedRoute.js";
import StatsCard from "@/components/ui/StatsCard.js";
import { useRouter } from "next/navigation";

export default function VerifierDashboard() {
  const [isSidebarOpen, setSidebarOpen] = useState(false);
  const [applications, setApplications] = useState([]);
  const [stats, setStats] = useState({});
  const router = useRouter();

  // Fetch applications from API
  useEffect(() => {
    const fetchApplications = async () => {
      const userToken = localStorage.getItem("userToken");
      if (!userToken) return;

      try {
        const response = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/verifier`, {
          headers: { Authorization: `Bearer ${userToken}` },
        });
        const data = await response.json();
        if (response.ok) {
          setApplications(data.applications);
        } else {
          console.error("Error fetching applications:", data.message);
        }
      } catch (error) {
        console.error("Fetch error:", error);
      }
    };

    fetchApplications();
  }, []);

  // Handle Verify & Reject actions
  const handleStatusUpdate = async (id, action) => {
    const userToken = localStorage.getItem("userToken");
    if (!userToken) return;

    const url = `${process.env.NEXT_PUBLIC_API_URL}/verifier/${action}/${id}`;

    try {
      const response = await fetch(url, {
        method: "PUT",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${userToken}`,
        },
      });

      if (response.ok) {
        setApplications((prevApplications) =>
          prevApplications.map((app) =>
            app.id === id
              ? {
                  ...app,
                  status: action === "verify" ? "VERIFIED" : "REJECTED",
                }
              : app
          )
        );
      } else {
        console.error("Failed to update status");
      }
    } catch (error) {
      console.error("Error updating application:", error);
    }
  };

  useEffect(() => {
    const fetchStats = async () => {
      try {
        const response = await fetch(
          `${process.env.NEXT_PUBLIC_API_URL}/loan/get-stats`
        );
        const data = await response.json();
        if (response.ok) {
          setStats({
            totalLoans: data.totalLoans,
            totalUsers: data.totalUsers,
            totalDisbursedCash: data.totalDisbursedCash,
            totalSavings: data.totalSavings,
            repaidLoansCount: data.repaidLoansCount,
            totalCashReceived: data.totalCashReceived,
          });
        } else {
          console.error("Error fetching stats:", data.message);
        }
      } catch (error) {
        console.error("Error fetching loan stats:", error);
      }
    };

    fetchStats();
  }, []);

  return (
    <VerifierProtectedRoute>
      <div className="flex h-screen bg-gray-100">
        {/* Sidebar */}
        <aside
          className={`fixed md:static top-0 left-0 h-screen w-64 bg-green-900 text-white p-5 transition-transform ${
            isSidebarOpen ? "translate-x-0" : "-translate-x-full"
          } md:translate-x-0 md:block z-50`}
        >
          <button
            className="md:hidden absolute top-4 right-4 text-white"
            onClick={() => setSidebarOpen(false)}
          >
            <X size={24} />
          </button>

          <div className="flex items-center space-x-3 mb-8">
            <div className="bg-gray-200 w-12 h-12 rounded-full"></div>
            <p className="text-lg font-semibold">John Okoh</p>
          </div>

          <nav className="space-y-4">
            {[
              "Dashboard(Dummy)",
              "Borrowers(Dummy)",
              "Loans(Dummy)",
              "Repayments(Dummy)",
              "Reports(Dummy)",
              "Settings(Dummy)",
            ].map((item) => (
              <div
                key={item}
                className="flex items-center space-x-3 cursor-pointer hover:bg-green-700 px-3 py-2 rounded-md"
              >
                <List />
                <span>{item}</span>
              </div>
            ))}
            <button
              className="mt-4 w-full flex items-center space-x-3 cursor-pointer hover:bg-red-700 px-3 py-2 rounded-md"
              onClick={() => {
                localStorage.removeItem("userToken");
                localStorage.removeItem("userRole");
                router.push("/");
              }}
            >
              🚪 <span>Sign Out</span>
            </button>
          </nav>
        </aside>

        {/* Main Content */}
        <div className="flex-1 flex flex-col h-screen overflow-y-auto p-8">
          {/* Navbar */}
          <nav className="flex justify-between items-center bg-white p-4 shadow mb-6">
            <button className="md:hidden" onClick={() => setSidebarOpen(true)}>
              <Menu size={24} className="text-green-700" />
            </button>
            <div className="text-lg font-bold text-green-700">CREDIT APP</div>
            <div className="flex space-x-6 text-gray-600">
              <Home
                onClick={() => router.push("/dashboard/verifier")}
                className="cursor-pointer hover:text-green-700"
              />
              <User
                onClick={() => router.push("/dashboard/verifier/profile")}
                className="cursor-pointer hover:text-green-700"
              />
            </div>
          </nav>

          {/* Dashboard Overview */}
          <h2 className="text-gray-600 font-semibold mb-4">
            Dashboard &gt; Loans
          </h2>
          <div className="grid grid-cols-2 md:grid-cols-3 gap-6">
            <StatsCard
              icon={List}
              value={stats.totalLoans}
              label="Total Loans"
            />
            <StatsCard
              icon={User}
              value={stats.totalUsers}
              label="Total Users"
            />
            <StatsCard
              icon={IndianRupee}
              value={stats.totalDisbursedCash}
              label="Total Disbursed Cash"
            />
            <StatsCard
              icon={IndianRupee}
              value={Math.abs(stats.totalSavings)}
              label="Total Savings"
            />
            <StatsCard
              icon={Bell}
              value={stats.repaidLoansCount}
              label="Repaid Loans"
            />
            <StatsCard
              icon={IndianRupee}
              value={stats.totalCashReceived}
              label="Total Cash Received"
            />
          </div>

          {/* Loan Applications Table */}
          <Card className="mt-8 shadow-lg">
            <CardContent>
              <h2 className="text-lg font-semibold text-gray-700 mb-4">
                Loan Applications
              </h2>

              {/* Table Header */}
              <div className="grid grid-cols-5 text-gray-500 text-sm font-semibold border-b pb-2 text-center">
                <p>Name</p>
                <p>Amount</p>
                <p>Tenure</p>
                <p>Status</p>
                <p>Action</p>
              </div>

              {/* Applications List */}
              {applications.length > 0 ? (
                applications.map((application) => (
                  <motion.div
                    key={application.id}
                    initial={{ opacity: 0, y: 10 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.3 }}
                    className="grid grid-cols-5 items-center py-4 border-b text-center"
                  >
                    <p className="font-medium truncate">
                      {application.user.name}
                    </p>
                    <p className="text-gray-700">₹{application.amount}</p>
                    <p className="text-gray-700">{application.tenure} months</p>
                    <span
                      className={`px-3 py-1 rounded-full text-white text-sm ${
                        application.status === "PENDING"
                          ? "bg-yellow-400"
                          : application.status === "REJECTED"
                          ? "bg-red-500"
                          : "bg-green-500"
                      }`}
                    >
                      {application.status}
                    </span>
                    <div className="flex justify-center space-x-2">
                      {application.status === "PENDING" && (
                        <>
                          <button
                            className="bg-green-600 text-white px-3 py-1 rounded text-sm hover:bg-green-700"
                            onClick={() =>
                              handleStatusUpdate(application.id, "verify")
                            }
                          >
                            ✅ Verify
                          </button>
                          <button
                            className="bg-red-600 text-white px-3 py-1 rounded text-sm hover:bg-red-700"
                            onClick={() =>
                              handleStatusUpdate(application.id, "reject")
                            }
                          >
                            ❌ Reject
                          </button>
                        </>
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
    </VerifierProtectedRoute>
  );
}
