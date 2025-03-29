"use client";

import { useState } from "react";
import { motion } from "framer-motion";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { Search, Filter, List, Bell, MessageCircle, User, Home, CreditCard, Wallet } from "lucide-react";
import { useRouter } from "next/navigation";

const loans = [
  { id: 1, officer: "Johnn Okoh", amount: "50,000.00", date: "June 09, 2021", status: "PENDING" },
  { id: 2, officer: "John Okoh", amount: "100,000.00", date: "June 07, 2021", status: "VERIFIED" },
  { id: 3, officer: "John Okoh", amount: "100,000.00", date: "June 07, 2021", status: "REJECTED" },
  { id: 4, officer: "John Okoh", amount: "100,000.00", date: "May 27, 2021", status: "APPROVED" },
];

const statusColors = {
  PENDING: "bg-yellow-400",
  VERIFIED: "bg-green-500",
  REJECTED: "bg-red-500",
  APPROVED: "bg-blue-600",
};

export default function UserDashboard() {
  const [search, setSearch] = useState("");
  const router = useRouter();

  return (
    <div className="min-h-screen bg-gray-100">
      {/* Navbar */}
      <nav className="flex justify-between items-center bg-white p-4 shadow">
        <div className="text-lg font-bold text-green-700">CREDIT APP</div>
        <div className="flex space-x-6 text-gray-600">
          <Home  className="cursor-pointer hover:text-green-700" />
          <Wallet className="cursor-pointer hover:text-green-700" />
          <CreditCard className="cursor-pointer hover:text-green-700" />
          <Bell className="cursor-pointer hover:text-green-700" />
          <MessageCircle className="cursor-pointer hover:text-green-700" />
          <User className="cursor-pointer hover:text-green-700" />
        </div>
      </nav>

      {/* Dashboard Content */}
      <div className="max-w-5xl mx-auto mt-8">
        {/* Deficit Section */}
        <div className="flex justify-between items-center bg-green-100 p-4 rounded-lg shadow-md">
          <div className="flex items-center space-x-4">
            <div className="bg-green-500 text-white p-3 rounded-full">
              💰
            </div>
            <div>
              <p className="text-gray-500 text-sm">DEFICIT</p>
              <p className="text-2xl font-semibold">₦0.0</p>
            </div>
          </div>
          <Button onClick={()=>router.push("/dashboard/user/get-loan")} className="bg-green-600 text-white hover:cursor-pointer">Get A Loan</Button>
        </div>

        {/* Action Buttons */}
        <div className="flex justify-between mt-6">
          <Button className="flex-1 mx-2 bg-gray-600 hover:bg-gray-900">Borrow Cash</Button>
          <Button className="flex-1 mx-2 bg-gray-600 hover:bg-gray-900">Transact</Button>
          <Button className="flex-1 mx-2 bg-gray-600 hover:bg-gray-900">Deposit Cash</Button>
        </div>

        {/* Search Bar */}
        <div className="mt-6 relative">
          <Input
            type="text"
            placeholder="Search for loans"
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            className="w-full px-4 py-2 border border-gray-300 rounded-md shadow-sm"
          />
          <Search className="absolute top-2 right-4 text-gray-500" />
        </div>

        {/* Applied Loans Table */}
        <Card className="mt-8 shadow-lg">
          <CardContent>
            <h2 className="text-lg font-semibold text-gray-700 mb-4">Applied Loans</h2>

            <div className="flex justify-between text-gray-500 text-sm border-b pb-2">
              <p>Loan Officer</p>
              <p>Amount</p>
              <p>Date Applied</p>
              <p>Status</p>
            </div>

            {loans
              .filter((loan) =>
                loan.officer.toLowerCase().includes(search.toLowerCase())
              )
              .map((loan) => (
                <motion.div
                  key={loan.id}
                  initial={{ opacity: 0, y: 10 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.3 }}
                  className="flex justify-between items-center py-4 border-b"
                >
                  <div className="flex items-center space-x-3">
                    <img src="https://via.placeholder.com/40" alt="Loan Officer" className="w-10 h-10 rounded-full" />
                    <div>
                      <p className="font-semibold">{loan.officer}</p>
                      <p className="text-xs text-gray-500">Updated 1 day ago</p>
                    </div>
                  </div>
                  <p className="text-gray-700 font-medium">₦{loan.amount}</p>
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
