import React, { useState } from "react";
import { Link } from "react-router-dom"; // Use react-router-dom for routing in React
import { Card, CardContent } from "./components/ui/card"; // Adjust paths according to your project structure
import { Label } from "./components/ui/label";
import { Select, SelectTrigger, SelectValue, SelectContent, SelectItem } from "./components/ui/select";
import { Input } from "./components/ui/input";
import { Textarea } from "./components/ui/textarea";

const TransactionPage = () => {
  const [selectedOption, setSelectedOption] = useState("income");
  const [amount, setAmount] = useState("");
  const [description, setDescription] = useState("");

  const handleSubmit = (e) => {
    e.preventDefault();
    console.log("Selected option:", selectedOption);
    console.log("Amount:", amount);
    console.log("Description:", description);
    setSelectedOption("income");
    setAmount("");
    setDescription("");
  };

  return (
    <div className="relative min-h-screen w-full bg-background">
      <div className="fixed top-0 left-0 right-0 z-10 flex items-center justify-center bg-background py-2 shadow">
        <div className="flex gap-4">
          <Link
            to="#"
            className="inline-flex items-center gap-2 rounded-md px-4 py-2 text-sm font-medium transition-colors hover:bg-accent hover:text-accent-foreground focus:outline-none focus:ring-1 focus:ring-ring disabled:pointer-events-none disabled:opacity-50"
          >
            <ArrowLeftIcon className="h-4 w-4" />
            Back to Dashboard
          </Link>
        </div>
      </div>
      <div className="grid min-h-screen w-full grid-cols-1 gap-8 p-6 pt-20 md:grid-cols-2 lg:grid-cols-3">
        <div className="col-span-1 grid gap-6 lg:col-span-2">
          <div className="flex items-center justify-between">
            <h1 className="text-2xl font-bold">Add a Transaction</h1>
          </div>
          <Card>
            <CardContent>
              <form onSubmit={handleSubmit} className="space-y-4">
                <div className="flex justify-center gap-4">
                  <button className="btn btn-neutral"
                    variant={selectedOption === "income" ? "primary" : "outline"}
                    onClick={() => setSelectedOption("income")}
                  >
                    Add Income
                  </button>
                  <button className="btn btn-neutral"
                    variant={selectedOption === "expense" ? "primary" : "outline"}
                    onClick={() => setSelectedOption("expense")}
                  >
                    Add Expense
                  </button>
                  <button className="btn btn-neutral"
                    variant={selectedOption === "investment" ? "primary" : "outline"}
                    onClick={() => setSelectedOption("investment")}
                  >
                    Transfer into Investment
                  </button>
                </div>
                {selectedOption === "income" && (
                  <div className="space-y-2">
                    <Label htmlFor="income-type">Income Type</Label>
                    <Select id="income-type">
                      <SelectTrigger>
                        <SelectValue placeholder="Select income type" />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="income">Income</SelectItem>
                        <SelectItem value="refund">Refund</SelectItem>
                        <SelectItem value="other">Other</SelectItem>
                      </SelectContent>
                    </Select>
                  </div>
                )}
                {selectedOption === "expense" && (
                  <div className="space-y-2">
                    <Label htmlFor="expense-type">Expense Type</Label>
                    <Select id="expense-type">
                      <SelectTrigger>
                        <SelectValue placeholder="Select expense type" />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="shopping">Shopping</SelectItem>
                        <SelectItem value="house-expense">House Expense</SelectItem>
                        <SelectItem value="bill-payment">Bill Payment</SelectItem>
                        <SelectItem value="other">Other</SelectItem>
                      </SelectContent>
                    </Select>
                  </div>
                )}
                <div className="space-y-2">
                  <Label htmlFor="amount">Amount</Label>
                  <Input
                    id="amount"
                    type="number"
                    placeholder="Enter amount"
                    value={amount}
                    onChange={(e) => setAmount(e.target.value)}
                  />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="description">Description</Label>
                  <Textarea
                    id="description"
                    placeholder="Enter description"
                    value={description}
                    onChange={(e) => setDescription(e.target.value)}
                  />
                </div>
                <div className="flex justify-end gap-2">
                  <button className="btn btn-primary" type="submit">Add Transaction</button>
                  <button className="btn btn-neutral">
                    Discard
                  </button>
                </div>
              </form>
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  );
}

function ArrowLeftIcon(props) {
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
      <path d="m12 19-7-7 7-7" />
      <path d="M19 12H5" />
    </svg>
  );
}

export default TransactionPage;