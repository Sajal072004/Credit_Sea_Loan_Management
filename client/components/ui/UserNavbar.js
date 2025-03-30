"use client";

import { useRouter } from "next/navigation";
import { Home, Wallet, CreditCard, Bell, MessageCircle, User } from "lucide-react";

export default function Navbar() {
  const router = useRouter();

  return (
    <nav className="flex justify-between items-center bg-white p-4 shadow">
      <div onClick={() => router.push("/dashboard/user")} className="text-lg font-bold text-green-700 hover:cursor-pointer">CREDIT APP</div>
      <div className="flex space-x-6 text-gray-600">
        <Home onClick={() => router.push("/dashboard/user")} className="cursor-pointer hover:text-green-700" />
        <Wallet onClick={() => router.push("/dashboard/user")} className="cursor-pointer hover:text-green-700" />
        <CreditCard onClick={() => router.push("/dashboard/user")} className="cursor-pointer hover:text-green-700" />
        <Bell onClick={() => router.push("/dashboard/user")} className="cursor-pointer hover:text-green-700" />
        <MessageCircle onClick={() => router.push("/dashboard/user")} className="cursor-pointer hover:text-green-700" />
        <User onClick={() => router.push("/profile")} className="cursor-pointer hover:text-green-700" />
      </div>
    </nav>
  );
}
