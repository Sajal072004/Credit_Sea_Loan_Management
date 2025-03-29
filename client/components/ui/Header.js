"use client";
import { Button } from "@/components/ui/button";
import { useRouter } from "next/navigation";

export default function Header() {
  const router = useRouter();

  return (
    <nav className="flex justify-between items-center px-8 py-4 bg-white shadow-lg">
      <h1 onClick={() => router.push("/")} className="text-3xl font-extrabold text-green-700 tracking-wide hover:cursor-pointer">CREDIT APP</h1>
      <div className="space-x-4">
        <Button
          variant="outline"
          className="border-green-700 text-green-700 hover:bg-green-700 hover:text-white transition-all"
          onClick={() => router.push("/signup")}
        >
          SignUp
        </Button>
        <Button
          variant="outline"
          className="border-green-700 text-green-700 hover:bg-green-700 hover:text-white transition-all"
          onClick={() => router.push("/login")}
        >
          Login
        </Button>
      </div>
    </nav>
  );
}
