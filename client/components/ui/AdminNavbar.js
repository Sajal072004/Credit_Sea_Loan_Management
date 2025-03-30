"use client";
import { useState } from "react";
import { Bell, MessageCircle, User, Menu, ChevronDown } from "lucide-react";
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
        <Bell className="cursor-pointer hover:text-green-700 relative">
          <span className="absolute top-0 right-0 text-xs bg-red-600 text-white px-1.5 py-0.5 rounded-full">
            4
          </span>
        </Bell>
        <MessageCircle className="cursor-pointer hover:text-green-700" />
        
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
                  router.push("/profile");
                  setDropdownOpen(false);
                }}
              >
                Profile
              </button>
              <button
                className="block px-4 py-2 text-sm text-gray-700 hover:bg-gray-100 w-full text-left"
                onClick={() => {
                  router.push("/manage-users");
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
