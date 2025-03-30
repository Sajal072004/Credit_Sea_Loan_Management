"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { motion } from "framer-motion";
import { toast } from "react-toastify";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import Header from "@/components/ui/Header";

export default function Login() {
  const router = useRouter();
  const [formData, setFormData] = useState({
    email: "",
    password: "",
  });
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    setError(null);

    try {
      const res = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/auth/login`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(formData),
      });

      if (!res.ok) {
        throw new Error("Invalid email or password");
      }

      const data = await res.json();

      // Show success toast
      toast.success("Login successful!");

      // Store token and role in localStorage
      localStorage.setItem("userToken", data.token);
      localStorage.setItem("userRole", data.user.role);

      console.log("the role is ", data.user.role);

      if (data.user.role === "USER") {
        router.push("/dashboard/user");
      } else if (
        data.user.role === "ADMIN" ||
        data.user.role === "SUPER_ADMIN"
      ) {
        router.push("/dashboard/admin");
      } else if (data.user.role === "VERIFIER") {
        router.push("/dashboard/verifier");
      }
    } catch (err) {
      setError(err.message);
      toast.error("Invalid email or password. Please try again.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-r from-green-400 to-green-700">
      <Header />
      <div className="flex justify-center items-center min-h-[calc(100vh-4rem)]">
        <motion.div
          initial={{ opacity: 0, y: 50 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
          className="w-full max-w-md"
        >
          <Card className="shadow-xl bg-white/90 backdrop-blur-lg border border-white/50 rounded-xl">
            <CardHeader>
              <CardTitle className="text-center text-3xl font-bold text-green-700">
                Login
              </CardTitle>
            </CardHeader>
            <CardContent>
              <form onSubmit={handleSubmit} className="space-y-6">
                {/* Email Input */}
                <motion.div
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: 0.2, duration: 0.4 }}
                >
                  <Input
                    type="email"
                    placeholder="Email"
                    name="email"
                    value={formData.email}
                    onChange={handleChange}
                    required
                    className="bg-white border border-gray-300 shadow-md px-4 py-2 rounded-md focus:ring-2 focus:ring-green-500 focus:outline-none transition-all"
                  />
                </motion.div>

                {/* Password Input */}
                <motion.div
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: 0.3, duration: 0.4 }}
                >
                  <Input
                    type="password"
                    placeholder="Password"
                    name="password"
                    value={formData.password}
                    onChange={handleChange}
                    required
                    className="bg-white border border-gray-300 shadow-md px-4 py-2 rounded-md focus:ring-2 focus:ring-green-500 focus:outline-none transition-all"
                  />
                </motion.div>

                {/* Error Message */}
                {error && (
                  <motion.p
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    className="text-red-500 text-sm"
                  >
                    {error}
                  </motion.p>
                )}

                {/* Login Button */}
                <motion.div
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.95 }}
                >
                  <Button
                    type="submit"
                    className="w-full bg-green-700 text-white hover:bg-green-600 transition-all"
                    disabled={loading}
                  >
                    {loading ? "Logging in..." : "Login"}
                  </Button>
                </motion.div>
              </form>

              {/* Signup Redirect */}
              <p className="text-center text-sm text-gray-600 mt-4">
                Don't have an account?{" "}
                <motion.span
                  className="text-green-700 cursor-pointer hover:underline"
                  whileHover={{ scale: 1.1 }}
                  onClick={() => router.push("/signup")}
                >
                  Sign up
                </motion.span>
              </p>
            </CardContent>
          </Card>

          <div className="bg-gray-50 px-2 rounded-lg mt-2 shadow-md border border-gray-200">
            <h3 className="text-xl font-semibold text-gray-800 mb-3">
              For Testing
            </h3>
            <div className="text-gray-700 space-y-2">
              <div>
                <span className="font-medium text-green-600">
                  SuperAdmin Email:
                </span>{" "}
                sajalsuperadmin@gmail.com
              </div>
              <div>
                <span className="font-medium text-blue-600">Admin Email:</span>{" "}
                sajaladmin@gmail.com
              </div>
              <div>
                <span className="font-medium text-purple-600">
                  Verifier Email:
                </span>{" "}
                sajalverifier@gmail.com
              </div>
              <div>
                <span className="font-medium text-red-600">Password:</span>{" "}
                sajal
              </div>
            </div>
          </div>
        </motion.div>
      </div>
    </div>
  );
}
