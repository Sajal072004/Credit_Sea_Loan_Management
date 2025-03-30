"use client"
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { useRouter } from "next/navigation";

export default function Home() {
  const router = useRouter();

  return (
    <div className="min-h-screen bg-gray-100 dark:bg-gray-900 text-gray-900 dark:text-white">
      {/* Navbar */}
      <nav className="flex justify-between items-center px-8 py-4 bg-white shadow-lg">
        <h1 className="text-3xl font-extrabold text-green-700 tracking-wide">CREDIT APP</h1>
        <div className="space-x-4">
          <Button 
            variant="outline" 
            className="border-green-700 text-green-700 hover:bg-green-700 hover:text-white transition-all"
            onClick={() => router.push('/signup')}
          >
            SignUp
          </Button>
          <Button 
            variant="outline" 
            className="border-green-700 text-green-700 hover:bg-green-700 hover:text-white transition-all"
            onClick={() => router.push('/login')}
          >
            Login
          </Button>
        </div>
      </nav>

      {/* Hero Section */}
      <header className="relative text-center py-24 bg-gradient-to-r from-green-700 to-green-500 text-white">
        <h1 className="text-5xl font-bold mb-4 drop-shadow-lg">Manage Your Loans Efficiently</h1>
        <p className="text-lg max-w-3xl mx-auto mb-6 font-light">
          A modern solution for loan tracking, quick approvals, and secure transactions.
        </p>
        <Button onClick={() => router.push('/login')} size="lg" className="bg-white text-green-700 font-semibold px-6 py-3 rounded-lg shadow-lg hover:scale-105 hover:bg-gray-200 transition-transform">Get Started</Button>
      </header>

      {/* Features Section */}
      <section className="py-20 px-6 grid md:grid-cols-3 gap-12 max-w-6xl mx-auto">
        {["Fast Approvals", "Secure Transactions", "Easy Tracking"].map((title, index) => (
          <Card key={title} className="shadow-xl hover:shadow-2xl bg-opacity-90 backdrop-blur-md">
            <CardHeader>
              <CardTitle className="text-xl font-semibold text-green-700">{title}</CardTitle>
            </CardHeader>
            <CardContent className="text-gray-700 dark:text-gray-300">
              {title === "Fast Approvals" && "Get loans approved quickly with our streamlined process."}
              {title === "Secure Transactions" && "We ensure high-level security for all your financial transactions."}
              {title === "Easy Tracking" && "Monitor and manage your loans anytime, anywhere."}
            </CardContent>
          </Card>
        ))}
      </section>

      {/* Footer */}
      <footer className="bg-green-700 text-white text-center py-6 shadow-md">
        <p className="text-xl font-bold  ">Made By Sajal Namdeo</p>
      </footer>
    </div>
  );
}
