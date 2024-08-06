import React, { useState } from "react";
import { PieChart, Pie } from "recharts";
import { Link } from "react-router-dom"; // Assuming you're using react-router-dom for navigation

export default function Dashboard() {
  const [selectedTimeframe, setSelectedTimeframe] = useState("month");
  const [dropdownOpen, setDropdownOpen] = useState(false); // State for managing dropdown visibility
  const incomeData = {
    month: 5000,
    year: 60000,
  };
  const expensesData = {
    month: 3000,
    year: 36000,
  };
  const investmentsData = {
    month: 1000,
    year: 12000,
  };
  const savingsGoal = 10000;
  const currentSavings = 7500;

  const handleDropdownClick = (timeframe) => {
    setSelectedTimeframe(timeframe);
    setDropdownOpen(false);
  };

  return (
    <div className="relative min-h-screen w-full bg-background flex items-center justify-center">
      <div className="w-full max-w-6xl px-6 pt-20 mx-auto">
        <div className="grid grid-cols-1 gap-8 md:grid-cols-2 lg:grid-cols-3">
          <div className="col-span-1 grid gap-6 lg:col-span-2">
            <div className="flex items-center justify-between ml-40">
              <h1 className="text-2xl font-bold">Dashboard</h1>
              <div className="relative">
                <button
                  onClick={() => setDropdownOpen(!dropdownOpen)}
                  className="flex items-center gap-2 p-2 border border-gray-300 rounded"
                >
                  <span>
                    {selectedTimeframe === "month"
                      ? "This Month"
                      : selectedTimeframe === "year"
                      ? "This Year"
                      : "All Time"}
                  </span>
                  <ChevronDownIcon className="h-4 w-4" />
                </button>
                {dropdownOpen && (
                  <div className="absolute right-0 mt-2 w-48 bg-white border border-gray-300 rounded shadow-lg z-20">
                    <div
                      className="px-4 py-2 hover:bg-gray-100 cursor-pointer"
                      onClick={() => handleDropdownClick("month")}
                    >
                      This Month
                    </div>
                    <div
                      className="px-4 py-2 hover:bg-gray-100 cursor-pointer"
                      onClick={() => handleDropdownClick("year")}
                    >
                      This Year
                    </div>
                    <div
                      className="px-4 py-2 hover:bg-gray-100 cursor-pointer"
                      onClick={() => handleDropdownClick("all")}
                    >
                      All Time
                    </div>
                  </div>
                )}
              </div>
            </div>
            <div className="grid grid-cols-1 gap-6 md:grid-cols-3 ml-40">
              <Card title="Income" value={incomeData[selectedTimeframe]} />
              <Card title="Expenses" value={expensesData[selectedTimeframe]} />
              <Card title="Investments" value={investmentsData[selectedTimeframe]} />
            </div>
            <Card title="Wealth Breakdown ml-40">
              <PiechartcustomChart className="aspect-[4/3]" />
            </Card>
          </div>
        </div>
      </div>
    </div>
  );
}

function Card({ title, value, children }) {
  return (
    <div className="bg-white shadow-md rounded-md p-4">
      <div className="mb-2">
        <div className="text-sm font-medium text-muted-foreground">{title}</div>
        <div className="text-2xl font-bold">${value ? value.toLocaleString() : ""}</div>
      </div>
      {children}
    </div>
  );
}

function ChevronDownIcon(props) {
  return (
    <svg
      {...props}
      xmlns="http://www.w3.org/2000/svg"
      width="24"
      height="24"
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="2"
      strokeLinecap="round"
      strokeLinejoin="round"
    >
      <path d="m6 9 6 6 6-6" />
    </svg>
  );
}

function PiechartcustomChart(props) {
  return (
    <div {...props}>
      <PieChart>
        <Pie
          data={[
            { browser: "chrome", visitors: 275, fill: "#ff6384" },
            { browser: "safari", visitors: 200, fill: "#36a2eb" },
            { browser: "firefox", visitors: 187, fill: "#ffce56" },
            { browser: "edge", visitors: 173, fill: "#e7e9ed" },
            { browser: "other", visitors: 90, fill: "#4bc0c0" },
          ]}
          dataKey="visitors"
          nameKey="browser"
          cx="50%"
          cy="50%"
          outerRadius={100}
          label={({ browser, visitors }) => `${browser}: ${visitors}`}
        />
      </PieChart>
    </div>
  );
}
