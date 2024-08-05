import React, { useState } from "react";
import { PieChart, Pie, CartesianGrid, XAxis, Line, LineChart } from "recharts";
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
    <div className="relative min-h-screen w-full bg-background">
      <div className="grid min-h-screen w-full grid-cols-1 gap-8 p-6 pt-20 md:grid-cols-2 lg:grid-cols-3">
        <div className="col-span-1 grid gap-6 lg:col-span-2">
          <div className="flex items-center justify-between">
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
          <div className="grid grid-cols-1 gap-6 md:grid-cols-3">
            <Card title="Income" value={incomeData[selectedTimeframe]} />
            <Card title="Expenses" value={expensesData[selectedTimeframe]} />
            <Card title="Investments" value={investmentsData[selectedTimeframe]} />
          </div>
          <Card title="Wealth Breakdown">
            <PiechartcustomChart className="aspect-[4/3]" />
          </Card>
        </div>
        <div className="col-span-1 grid gap-6">
          <Card title="Savings Goal">
            <div className="grid gap-4">
              <div className="flex items-center justify-between">
                <div>
                  <div className="text-sm font-medium text-muted-foreground">Savings Goal</div>
                  <div className="text-2xl font-bold">${savingsGoal.toLocaleString()}</div>
                </div>
                <div>
                  <div className="text-sm font-medium text-muted-foreground">Current Savings</div>
                  <div className="text-2xl font-bold">${currentSavings.toLocaleString()}</div>
                </div>
              </div>
              <div className="h-4 bg-gray-200">
                <div
                  className="h-full bg-blue-600"
                  style={{ width: `${(currentSavings / savingsGoal) * 100}%` }}
                />
              </div>
              <div className="flex items-center justify-between text-sm font-medium">
                <div>{Math.round((currentSavings / savingsGoal) * 100)}%</div>
                <div>${(savingsGoal - currentSavings).toLocaleString()} left to goal</div>
              </div>
            </div>
          </Card>
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

function ClockIcon(props) {
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
      <circle cx="12" cy="12" r="10" />
      <polyline points="12 6 12 12 16 14" />
    </svg>
  );
}

function InfoIcon(props) {
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
      <circle cx="12" cy="12" r="10" />
      <path d="M12 16v-4" />
      <path d="M12 8h.01" />
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

function PlusIcon(props) {
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
      <line x1="12" y1="5" x2="12" y2="19" />
      <line x1="5" y1="12" x2="19" y2="12" />
    </svg>
  );
}

function SettingsIcon(props) {
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
      <path d="M12 8.5a3.5 3.5 0 1 1 0 7 3.5 3.5 0 0 1 0-7zM19.4 12a7.4 7.4 0 0 1-.4 1.9l1.7 1.7a1 1 0 0 1 .3 1.1l-2 3.4a1 1 0 0 1-1.1.6l-3.4-1.7a7.4 7.4 0 0 1-1.9.4 7.4 7.4 0 0 1-1.9-.4l-3.4 1.7a1 1 0 0 1-1.1-.6l-2-3.4a1 1 0 0 1 .3-1.1l1.7-1.7a7.4 7.4 0 0 1-.4-1.9 7.4 7.4 0 0 1 .4-1.9L3.1 7.3a1 1 0 0 1-.3-1.1l2-3.4a1 1 0 0 1 1.1-.6l3.4 1.7a7.4 7.4 0 0 1 1.9-.4 7.4 7.4 0 0 1 1.9.4l3.4-1.7a1 1 0 0 1 1.1.6l2 3.4a1 1 0 0 1-.3 1.1l-1.7 1.7a7.4 7.4 0 0 1 .4 1.9z" />
    </svg>
  );
}
