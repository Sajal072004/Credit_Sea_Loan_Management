"use client";

import { useState, useEffect } from "react";
import { motion } from "framer-motion";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { Search } from "lucide-react";
import { useRouter } from "next/navigation";
import UserNavbar from "@/components/ui/UserNavbar";
import UserProtectedRoute from "@/components/ui/UserProtectedRoute";

export default function UserDashboard() {
  const [search, setSearch] = useState("");
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true);
  const router = useRouter();

  useEffect(() => {
    const fetchUserDetails = async () => {
      try {
        const token = localStorage.getItem("userToken");
        if (!token) {
          console.error("No token found, redirecting to login...");
          router.push("/login");
          return;
        }

        const response = await fetch(
          `${process.env.NEXT_PUBLIC_API_URL}/applications/get-user`,
          {
            method: "GET",
            headers: {
              Authorization: `Bearer ${token}`,
              "Content-Type": "application/json",
            },
          }
        );

        if (!response.ok) {
          throw new Error("Failed to fetch user details");
        }

        const data = await response.json();
        setUser(data);
      } catch (error) {
        console.error("Error fetching user details:", error);
      } finally {
        setLoading(false);
      }
    };

    fetchUserDetails();
  }, []);

  return (
    <UserProtectedRoute>
      <div className="min-h-screen bg-gray-100">
        <UserNavbar />
        <div className="max-w-3xl mx-auto mt-8 p-6 bg-white rounded-lg shadow-md">
          <h2 className="text-2xl font-bold text-gray-800">User Profile</h2>
          {loading ? (
            <p className="text-center text-gray-500 mt-4">Loading user details...</p>
          ) : user ? (
            <motion.div
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.3 }}
              className="mt-4 space-y-4"
            >
              <div className="flex items-center space-x-4">
                <div className="bg-blue-500 text-white p-3 rounded-full text-lg font-bold h-16 w-16 flex justify-center items-center">
                  {user.name.charAt(0)}
                </div>
                <div>
                  <p className="text-xl font-semibold">{user.name}</p>
                  <p className="text-gray-600">{user.email}</p>
                </div>
              </div>
              <div className="bg-gray-100 p-3 rounded-lg">
                <p className="text-gray-500">Role:</p>
                <p className="text-lg font-medium text-gray-800">{user.role}</p>
              </div>
            </motion.div>
          ) : (
            <p className="text-center text-gray-500 mt-4">User not found.</p>
          )}
        </div>
      </div>
    </UserProtectedRoute>
  );
}
