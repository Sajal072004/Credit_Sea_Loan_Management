"use client";

import { useState } from "react";
import { Card, CardContent } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Home, DollarSign, CreditCard, User, Bell } from "lucide-react";
import { useRouter } from "next/navigation";

export default function Profile() {
  const router = useRouter();

  // Dummy user data
  const [user, setUser] = useState({
    fullName: "John Doe",
    email: "john.doe@example.com",
    phone: "+91 9876543210",
    address: "123 Main Street, City, Country",
    employmentStatus: "Software Engineer",
    accountNumber: "1234 5678 9101 1121",
    loansTaken: 3,
    totalLoanAmount: "$25,000",
  });

  return (
    <div className="flex flex-col min-h-screen bg-gray-50">
      {/* Navbar */}
      <nav className="bg-white shadow-md flex justify-between items-center px-6 py-4 fixed w-full top-0 z-10">
        <div
          onClick={() => router.push("/dashboard/user")}
          className="text-green-700 font-bold text-xl hover:cursor-pointer"
        >
          CREDIT APP
        </div>
        <div className="flex space-x-6 text-gray-600 items-center">
          <Home
            className="cursor-pointer hover:text-green-700 transition duration-200"
            onClick={() => router.push("/dashboard/user")}
          />
          <DollarSign
            className="cursor-pointer hover:text-green-700 transition duration-200"
            onClick={() => router.push("/loans")}
          />
          <CreditCard
            className="cursor-pointer hover:text-green-700 transition duration-200"
            onClick={() => router.push("/transactions")}
          />
          <User
            className="cursor-pointer text-green-700 transition duration-200"
            onClick={() => router.push("/profile")}
          />
          <div className="relative">
            <Bell className="cursor-pointer hover:text-green-700 transition duration-200" />
            <span className="absolute -top-1 -right-2 bg-red-600 text-white text-xs px-1.5 py-0.5 rounded-full">
              4
            </span>
          </div>
        </div>
      </nav>

      {/* Profile Section */}
      <div className="flex justify-center items-center flex-1 p-6 mt-16">
        <Card className="w-full max-w-2xl shadow-lg bg-white rounded-xl">
          <CardContent className="p-8">
            <h2 className="text-3xl font-bold text-center mb-6 text-gray-800">
              User Profile
            </h2>

            {/* Profile Info */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
              <div>
                <label className="text-gray-600 text-sm">Full Name</label>
                <Input value={user.fullName} disabled className="border-gray-300" />
              </div>
              <div>
                <label className="text-gray-600 text-sm">Email</label>
                <Input value={user.email} disabled className="border-gray-300" />
              </div>
              <div>
                <label className="text-gray-600 text-sm">Phone</label>
                <Input value={user.phone} disabled className="border-gray-300" />
              </div>
              <div>
                <label className="text-gray-600 text-sm">Employment Status</label>
                <Input value={user.employmentStatus} disabled className="border-gray-300" />
              </div>
              <div className="md:col-span-2">
                <label className="text-gray-600 text-sm">Address</label>
                <Input value={user.address} disabled className="border-gray-300" />
              </div>
              <div>
                <label className="text-gray-600 text-sm">Account Number</label>
                <Input value={user.accountNumber} disabled className="border-gray-300" />
              </div>
              <div>
                <label className="text-gray-600 text-sm">Loans Taken</label>
                <Input value={user.loansTaken} disabled className="border-gray-300" />
              </div>
              <div>
                <label className="text-gray-600 text-sm">Total Loan Amount</label>
                <Input value={user.totalLoanAmount} disabled className="border-gray-300" />
              </div>
            </div>

            {/* Edit Profile Button */}
            <div className="mt-6 flex justify-center">
              <Button
                className="bg-green-600 text-white hover:bg-green-700 text-lg py-2 px-6 rounded-lg transition"
                onClick={() => alert("Edit Profile feature coming soon!")}
              >
                Edit Profile
              </Button>
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  );
}
