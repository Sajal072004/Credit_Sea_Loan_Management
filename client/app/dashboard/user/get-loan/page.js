"use client";

import { useState } from "react";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Checkbox } from "@/components/ui/checkbox";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { Line } from "react-chartjs-2";
import { Chart, registerables } from "chart.js";
import { useRouter } from "next/navigation";
import UserNavbar from "@/components/ui/UserNavbar.js";

// Register Chart.js components
Chart.register(...registerables);

export default function GetLoan() {
  const [formData, setFormData] = useState({
    fullName: "",
    loanAmount: "",
    tenure: "",
    employmentStatus: "",
    reason: "",
    employmentAddress: "",
    agreeTerms: false,
    agreeCreditInfo: false,
  });

  const router = useRouter();

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const handleCheckboxChange = (name, checked) => {
    setFormData((prev) => ({ ...prev, [name]: checked }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!formData.agreeTerms) {
      alert("Please accept the terms and conditions before submitting.");
      return;
    }
    console.log("Submitted Data:", formData);
  };

  // Chart Data
  const chartData = {
    labels: [
      "Jan",
      "Feb",
      "Mar",
      "Apr",
      "May",
      "Jun",
      "Jul",
      "Aug",
      "Sep",
      "Oct",
    ],
    datasets: [
      {
        label: "Loan Trends",
        data: [200, 500, 700, 400, 800, 600, 900, 300, 750, 450],
        borderColor: "#22c55e",
        backgroundColor: "rgba(34, 197, 94, 0.2)",
        tension: 0.3,
      },
    ],
  };

  const iconRoutes = {
    Home: "/dashboard/user",
    DollarSign: "/dashboard/user",
    CreditCard: "/dashboard/user",
    User: "/profile",
  };

  return (
    <div className="flex flex-col min-h-screen bg-gray-50">
      {/* Navbar */}
      <UserNavbar/>

      {/* Main Content */}
      <div className="flex justify-center items-center flex-1 p-6 mt-16">
        <Card className="w-full max-w-3xl shadow-lg bg-white rounded-xl">
          <CardContent className="p-8">
            <h2 className="text-3xl font-bold text-center mb-6 text-gray-800">
              Apply for a Loan
            </h2>

            <form
              onSubmit={handleSubmit}
              className="grid grid-cols-1 md:grid-cols-2 gap-5"
            >
              <Input
                name="fullName"
                placeholder="Full Name"
                value={formData.fullName}
                onChange={handleChange}
                required
                className="border-gray-300 focus:border-green-500 focus:ring-green-500 transition"
              />
              <Input
                name="loanAmount"
                type="number"
                placeholder="Loan Amount ($)"
                value={formData.loanAmount}
                onChange={handleChange}
                required
                className="border-gray-300 focus:border-green-500 focus:ring-green-500 transition"
              />
              <Input
                name="tenure"
                type="number"
                placeholder="Tenure (Months)"
                value={formData.tenure}
                onChange={handleChange}
                required
                className="border-gray-300 focus:border-green-500 focus:ring-green-500 transition"
              />
              <Input
                name="employmentStatus"
                placeholder="Employment Status"
                value={formData.employmentStatus}
                onChange={handleChange}
                required
                className="border-gray-300 focus:border-green-500 focus:ring-green-500 transition"
              />
              <Textarea
                name="reason"
                placeholder="Reason for Loan"
                value={formData.reason}
                onChange={handleChange}
                className="col-span-2 border-gray-300 focus:border-green-500 focus:ring-green-500 transition"
                required
              />
              <Input
                name="employmentAddress"
                placeholder="Employment Address"
                value={formData.employmentAddress}
                onChange={handleChange}
                className="col-span-2 border-gray-300 focus:border-green-500 focus:ring-green-500 transition"
                required
              />

              {/* Terms & Conditions */}
              <div className="col-span-2 flex items-start space-x-2 text-sm text-gray-600">
                <Checkbox
                  checked={formData.agreeTerms}
                  onCheckedChange={(checked) =>
                    handleCheckboxChange("agreeTerms", checked)
                  }
                />

                <label htmlFor="agreeTerms" className="cursor-pointer">
                  I accept the{" "}
                  <span className="text-green-600 underline">
                    {" "}
                    terms and conditions
                  </span>
                </label>
              </div>

              <div className="col-span-2 flex items-start space-x-2 text-sm text-gray-600">
                <Checkbox
                  checked={formData.agreeCreditInfo}
                  onCheckedChange={(checked) =>
                    handleCheckboxChange("agreeCreditInfo", checked)
                  }
                />

                <label htmlFor="agreeCreditInfo" className="cursor-pointer">
                  I consent to my credit information being shared with financial
                  institutions.
                </label>
              </div>

              <Button
                type="submit"
                className="col-span-2 w-full bg-green-600 text-white hover:bg-green-700 text-lg py-2 rounded-lg transition"
              >
                Apply Now
              </Button>
            </form>

            {/* Chart Section */}
            <div className="mt-10">
              <h3 className="text-lg font-semibold text-gray-700 text-center">
                Loan Trends
              </h3>
              <div className="bg-gray-100 p-4 rounded-lg shadow-md">
                <Line
                  data={chartData}
                  options={{ responsive: true, maintainAspectRatio: false }}
                  height={200}
                />
              </div>
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  );
}
