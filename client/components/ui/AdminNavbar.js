"use client";
import { useState } from "react";
import {  User, Menu, ChevronDown, Home } from "lucide-react";
import { useRouter } from "next/navigation";

export default function Navbar({ setSidebarOpen }) {
  const [dropdownOpen, setDropdownOpen] = useState(false);
  const router = useRouter();

  return (
    <nav className="flex justify-between items-center bg-white p-4 shadow mb-6 relative">
      <button className="md:hidden" onClick={() => setSidebarOpen(true)}>
        <Menu size={24} className="text-green-700" />
      </button>
      <div className="text-lg font-bold text-green-700">CREDIT APP</div>
      <div className="flex space-x-6 text-gray-600 items-center relative">
        {/* Home Button */}
        <Home
          className="cursor-pointer hover:text-green-700"
          size={24}
          onClick={() => router.push("/dashboard/admin")}
        />
        
        
        {/* User Dropdown */}
        <div className="relative">
          <div
            className="flex items-center space-x-1 cursor-pointer"
            onClick={() => setDropdownOpen(!dropdownOpen)}
          >
            <User className="hover:text-green-700" />
            <span>Admin</span>
            <ChevronDown size={16} />
          </div>

          {/* Dropdown Menu */}
          {dropdownOpen && (
            <div className="absolute right-0 mt-2 w-40 bg-white shadow-lg rounded-md border py-2 z-50">
              <button
                className="block px-4 py-2 text-sm text-gray-700 hover:bg-gray-100 w-full text-left"
                onClick={() => {
                  router.push("/dashboard/admin/profile");
                  setDropdownOpen(false);
                }}
              >
                Profile
              </button>
              <button
                className="block px-4 py-2 text-sm text-gray-700 hover:bg-gray-100 w-full text-left"
                onClick={() => {
                  router.push("/dashboard/admin/manage-users");
                  setDropdownOpen(false);
                }}
              >
                Manage Users
              </button>
            </div>
          )}
        </div>
      </div>
    </nav>
  );
}
