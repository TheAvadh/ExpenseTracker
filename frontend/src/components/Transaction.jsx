"use client"

import { useState } from "react";

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
    <div className="flex min-h-screen w-full items-center justify-center p-6">
      <div className="col-span-1 grid gap-6 lg:col-span-2 w-full max-w-3xl">
        <div className="flex items-center justify-between">
          <h1 className="text-2xl font-bold">Add a Transaction</h1>
          <div className="flex justify-center gap-4">
            <button
              type="button"
              className={`rounded-md px-4 py-2 text-sm font-medium transition-colors ${
                selectedOption === "income"
                  ? "bg-[#495057] text-white hover:bg-[#343a40]"
                  : "bg-[#f8f9fa] text-[#495057] hover:bg-[#e9ecef]"
              }`}
              onClick={() => setSelectedOption("income")}
            >
              Add Income
            </button>
            <button
              type="button"
              className={`rounded-md px-4 py-2 text-sm font-medium transition-colors ${
                selectedOption === "expense"
                  ? "bg-[#495057] text-white hover:bg-[#343a40]"
                  : "bg-[#f8f9fa] text-[#495057] hover:bg-[#e9ecef]"
              }`}
              onClick={() => setSelectedOption("expense")}
            >
              Add Expense
            </button>
            <button
              type="button"
              className={`rounded-md px-4 py-2 text-sm font-medium transition-colors ${
                selectedOption === "investment"
                  ? "bg-[#495057] text-white hover:bg-[#343a40]"
                  : "bg-[#f8f9fa] text-[#495057] hover:bg-[#e9ecef]"
              }`}
              onClick={() => setSelectedOption("investment")}
            >
              Transfer into Investment
            </button>
          </div>
        </div>
        <div className="rounded-lg border border-[#dee2e6] bg-white p-6 shadow">
          <form onSubmit={handleSubmit} className="space-y-4">
            {selectedOption === "income" && (
              <div className="space-y-2">
                <label htmlFor="income-type" className="block font-medium">
                  Income Type
                </label>
                <select
                  id="income-type"
                  className="block w-full rounded-md border border-[#ced4da] bg-[#f8f9fa] px-3 py-2 text-[#495057] focus:border-[#80bdff] focus:outline-none focus:ring-[#80bdff]"
                >
                  <option value="income">Income</option>
                  <option value="refund">Refund</option>
                  <option value="other">Other</option>
                </select>
              </div>
            )}
            {selectedOption === "expense" && (
              <div className="space-y-2">
                <label htmlFor="expense-type" className="block font-medium">
                  Expense Type
                </label>
                <select
                  id="expense-type"
                  className="block w-full rounded-md border border-[#ced4da] bg-[#f8f9fa] px-3 py-2 text-[#495057] focus:border-[#80bdff] focus:outline-none focus:ring-[#80bdff]"
                >
                  <option value="shopping">Shopping</option>
                  <option value="house-expense">House Expense</option>
                  <option value="bill-payment">Bill Payment</option>
                  <option value="other">Other</option>
                </select>
              </div>
            )}
            <div className="space-y-2">
              <label htmlFor="amount" className="block font-medium">
                Amount
              </label>
              <input
                id="amount"
                type="number"
                placeholder="Enter amount"
                value={amount}
                onChange={(e) => setAmount(e.target.value)}
                className="block w-full rounded-md border border-[#ced4da] bg-[#f8f9fa] px-3 py-2 text-[#495057] focus:border-[#80bdff] focus:outline-none focus:ring-[#80bdff]"
              />
            </div>
            <div className="space-y-2">
              <label htmlFor="description" className="block font-medium">
                Description
              </label>
              <textarea
                id="description"
                placeholder="Enter description"
                value={description}
                onChange={(e) => setDescription(e.target.value)}
                className="block w-full rounded-md border border-[#ced4da] bg-[#f8f9fa] px-3 py-2 text-[#495057] focus:border-[#80bdff] focus:outline-none focus:ring-[#80bdff] resize-none"
              />
            </div>
            <div className="flex justify-center gap-2">
              <button
                type="submit"
                className="rounded-md bg-black px-4 py-2 text-sm font-medium text-white transition-colors hover:bg-[#0056b3] focus:outline-none focus:ring-1 focus:ring-[#80bdff]"
              >
                Add Transaction
              </button>
              <button
                type="button"
                className="rounded-md bg-[#f8f9fa] px-4 py-2 text-sm font-medium text-[#495057] transition-colors hover:bg-[#e9ecef] focus:outline-none focus:ring-1 focus:ring-[#ced4da]"
              >
                Discard
              </button>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
}


export default TransactionPage;
