"use client";
import { useState } from "react";
import { X, List } from "lucide-react";
import { useRouter } from "next/navigation";

const Sidebar = ({ isSidebarOpen, setSidebarOpen }) => {
  const router = useRouter();
  return (
    <aside
      className={`fixed md:static top-0 left-0 w-64 bg-green-900 text-white p-5 transition-transform ${
        isSidebarOpen ? "translate-x-0" : "-translate-x-full"
      } md:translate-x-0 md:block z-50`}
    >
      {/* Close Button (Visible on small screens) */}
      <button
        className="md:hidden absolute top-4 right-4 text-white"
        onClick={() => setSidebarOpen(false)}
      >
        <X size={24} />
      </button>

      {/* Admin Profile */}
      <div className="flex items-center space-x-3 mb-6">
        <div className="bg-gray-300 w-12 h-12 rounded-full"></div>
        <p className="text-lg font-semibold">John Doe</p>
      </div>

      {/* Sidebar Navigation */}
      <nav className="space-y-3">
        {[
          "Dashboard(Dummy)",
          "Borrowers(Dummy)",
          "Loans(Dummy)",
          "Repayments(Dummy)",
          "Loan (Dummy)",
          "Accounting(Dummy)",
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
  );
};

export default Sidebar;
