"use client";

import { useState, useEffect } from "react";
import { Card, CardContent } from "@/components/ui/card";
import { Home, User, List, Menu, X } from "lucide-react";
import VerifierProtectedRoute from "@/components/ui/VerifierProtectedRoute.js";
import { useRouter } from "next/navigation";

export default function VerifierProfile() {
  const [isSidebarOpen, setSidebarOpen] = useState(false);
  const [userData, setUserData] = useState(null);
  const router = useRouter();

  useEffect(() => {
    const fetchUserData = async () => {
      const userToken = localStorage.getItem("userToken");
      if (!userToken) return;

      try {
        const response = await fetch("http://localhost:5000/api/applications/get-user", {
          headers: { Authorization: `Bearer ${userToken}` },
        });
        const data = await response.json();
        if (response.ok) {
          setUserData(data);
        } else {
          console.error("Error fetching user data:", data.message);
        }
      } catch (error) {
        console.error("Fetch error:", error);
      }
    };

    fetchUserData();
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
            <p className="text-lg font-semibold">{userData?.name || "User"}</p>
          </div>

          <nav className="space-y-4">
            {["Dashboard", "Profile", "Settings"].map((item) => (
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
              <Home onClick={() => router.push("/dashboard/verifier")} className="cursor-pointer hover:text-green-700" />
              <User onClick={() => router.push("/dashboard/verifier/profile")} className="cursor-pointer hover:text-green-700" />
            </div>
          </nav>

          {/* Profile Details */}
          <Card className="shadow-lg bg-white border p-6">
            <CardContent className="space-y-4">
              <h2 className="text-xl font-semibold text-gray-800">Verifier Profile</h2>
              {userData ? (
                <>
                  <p className="text-gray-600">Name: {userData.name}</p>
                  <p className="text-gray-600">Email: {userData.email}</p>
                  <p className="text-gray-600">Role: {userData.role}</p>
                </>
              ) : (
                <p className="text-gray-500">Loading profile...</p>
              )}
            </CardContent>
          </Card>
        </div>
      </div>
    </VerifierProtectedRoute>
  );
}
