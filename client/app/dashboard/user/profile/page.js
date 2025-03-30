"use client";

import { useState, useEffect } from "react";
import { motion } from "framer-motion";
import { Card, CardContent } from "@/components/ui/card";
import { useRouter } from "next/navigation";
import UserProtectedRoute from "@/components/ui/UserProtectedRoute";

export default function UserProfile() {
  const [userData, setUserData] = useState(null);
  const [loading, setLoading] = useState(true);
  const router = useRouter();

  useEffect(() => {
    const fetchUserData = async () => {
      const userToken = localStorage.getItem("userToken");
      if (!userToken) {
        router.push("/login");
        return;
      }
      
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
      } finally {
        setLoading(false);
      }
    };

    fetchUserData();
  }, []);

  return (
    <UserProtectedRoute>
      <div className="min-h-screen bg-gray-100 flex items-center justify-center p-6">
        <Card className="shadow-lg bg-white border p-6 w-full max-w-md rounded-lg">
          <CardContent className="space-y-6 text-center">
            <h2 className="text-2xl font-bold text-gray-800">User Profile</h2>
            {loading ? (
              <p className="text-gray-500">Loading profile...</p>
            ) : userData ? (
              <motion.div
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.3 }}
                className="space-y-4"
              >
                <div className="flex justify-center">
                  <div className="bg-blue-500 text-white p-4 rounded-full text-xl font-bold">
                    {userData.name.charAt(0)}
                  </div>
                </div>
                <p className="text-lg font-semibold text-gray-700">{userData.name}</p>
                <p className="text-gray-600">{userData.email}</p>
                <div className="bg-gray-100 p-3 rounded-lg">
                  <p className="text-gray-500">Role:</p>
                  <p className="text-lg font-medium text-gray-800">{userData.role}</p>
                </div>
              </motion.div>
            ) : (
              <p className="text-gray-500">User not found.</p>
            )}
          </CardContent>
        </Card>
      </div>
    </UserProtectedRoute>
  );
}
