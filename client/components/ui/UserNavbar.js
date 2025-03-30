"use client";

import { useRouter } from "next/navigation";
import { Home, Wallet, CreditCard, Bell, MessageCircle, User, LogOut } from "lucide-react";

export default function Navbar() {
  const router = useRouter();

  const handleLogout = () => {
    localStorage.removeItem("userToken");
    localStorage.removeItem("userRole");
    router.push("/"); // Redirect to home
  };

  return (
    <nav className="flex justify-between items-center bg-white p-4 shadow">
      <div
        onClick={() => router.push("/dashboard/user")}
        className="text-lg font-bold text-green-700 hover:cursor-pointer"
      >
        CREDIT APP
      </div>
      <div className="flex space-x-6 text-gray-600 items-center">
        <Home onClick={() => router.push("/dashboard/user")} className="cursor-pointer hover:text-green-700" />
        
        <User onClick={() => router.push("/dashboard/user/profile")} className="cursor-pointer hover:text-green-700" />

        {/* Logout Button */}
        <LogOut
          onClick={handleLogout}
          className="cursor-pointer hover:text-red-600 transition duration-200"
        />
      </div>
    </nav>
  );
}
