"use client";

import { useState } from "react";
import { motion } from "framer-motion";
import { Card, CardContent } from "@/components/ui/card";
import { Bell, MessageCircle, User, List, Menu, X, ChevronDown } from "lucide-react";

const stats = [
  { label: "ACTIVE USERS", value: "200", icon: "👥" },
  { label: "BORROWERS", value: "100", icon: "🤝" },
  { label: "CASH DISBURSED", value: "550,000", icon: "💵" },
  { label: "CASH RECEIVED", value: "1,000,000", icon: "💲" },
  { label: "SAVINGS", value: "450,000", icon: "🏦" },
  { label: "REPAID LOANS", value: "30", icon: "✅" },
  { label: "OTHER ACCOUNTS", value: "10", icon: "🏛" },
  { label: "LOANS", value: "50", icon: "💰" },
];

const loans = [
  { id: 1, activity: "Contact Email not Linked", customer: "Tom Cruise", date: "June 09, 2021", status: "PENDING" },
  { id: 2, activity: "Adding Images to Featured Posts", customer: "Matt Damon", date: "June 09, 2021", status: "PENDING" },
  { id: 3, activity: "When will I be charged this month?", customer: "Robert Downey", date: "June 08, 2021", status: "PENDING" },
  { id: 4, activity: "Payment not going through", customer: "Christian Bale", date: "June 08, 2021", status: "PENDING" },
  { id: 5, activity: "Unable to add replies", customer: "Henry Cavil", date: "June 08, 2021", status: "APPROVED" },
];

const statusColors = {
  PENDING: "bg-yellow-500",
  APPROVED: "bg-green-600",
};

export default function AdminDashboard() {
  const [isSidebarOpen, setSidebarOpen] = useState(false);

  return (
    <div className="flex h-screen bg-gray-100">
      {/* Sidebar */}
      <aside
        className={`fixed md:static top-0 left-0  w-64 bg-green-900 text-white p-5 transition-transform ${
          isSidebarOpen ? "translate-x-0" : "-translate-x-full"
        } md:translate-x-0 md:block z-50`}
      >
        <button className="md:hidden absolute top-4 right-4 text-white" onClick={() => setSidebarOpen(false)}>
          <X size={24} />
        </button>

        <div className="flex items-center space-x-3 mb-6">
          <div className="bg-gray-300 w-12 h-12 rounded-full"></div>
          <p className="text-lg font-semibold">John Doe</p>
        </div>

        <nav className="space-y-3">
          {[
            "Dashboard", "Borrowers", "Loans", "Repayments", "Loan Parameters", "Accounting",
          ].map((item) => (
            <div key={item} className="flex items-center space-x-3 cursor-pointer hover:bg-green-700 px-3 py-2 rounded-md">
              <List />
              <span>{item}</span>
            </div>
          ))}
          <button className="mt-4 w-full flex items-center space-x-3 cursor-pointer hover:bg-red-700 px-3 py-2 rounded-md">
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
          <div className="flex space-x-6 text-gray-600 items-center">
            <Bell className="cursor-pointer hover:text-green-700 relative">
              <span className="absolute top-0 right-0 text-xs bg-red-600 text-white px-1.5 py-0.5 rounded-full">4</span>
            </Bell>
            <MessageCircle className="cursor-pointer hover:text-green-700" />
            <div className="flex items-center space-x-1 cursor-pointer">
              <User className="hover:text-green-700" />
              <span>Admin</span>
              <ChevronDown size={16} />
            </div>
          </div>
        </nav>

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
              <h2 className="text-lg font-semibold text-gray-700">Recent Loans</h2>
              <div className="flex space-x-4 text-gray-500">
                <span className="cursor-pointer hover:text-green-700">Sort</span>
                <span className="cursor-pointer hover:text-green-700">Filter</span>
              </div>
            </div>

            <div className="flex justify-between text-gray-500 text-sm border-b pb-2">
              <p>User Details</p>
              <p>Customer Name</p>
              <p>Date</p>
              <p>Action</p>
            </div>

            {loans.map((loan) => (
              <motion.div
                key={loan.id}
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.3 }}
                className="flex justify-between items-center py-4 border-b"
              >
                <div className="flex items-center space-x-3">
                  <img src="https://via.placeholder.com/40" alt="User" className="w-10 h-10 rounded-full" />
                  <div>
                    <p className="font-semibold">{loan.activity}</p>
                    <p className="text-xs text-gray-500">Updated 1 day ago</p>
                  </div>
                </div>
                <p className="text-gray-700 font-medium">{loan.customer}</p>
                <p className="text-gray-600">{loan.date}</p>
                <span className={`px-3 py-1 rounded-full text-white text-sm ${statusColors[loan.status]}`}>
                  {loan.status}
                </span>
              </motion.div>
            ))}
          </CardContent>
        </Card>
      </div>
    </div>
  );
}
