import React, { useState, useEffect } from "react";
import { fetchAuthSession } from 'aws-amplify/auth';
import { getCurrentUser } from 'aws-amplify/auth';
import { fetchUserAttributes } from 'aws-amplify/auth';

export default function TransactionPage() {
    const [selectedOption, setSelectedOption] = useState("income");
    const [amount, setAmount] = useState("");
    const [description, setDescription] = useState("");
    const [transactionType, setTransactionType] = useState("salary");
    const [userEmail, setUserEmail] = useState("");
    const [token, setToken] = useState(""); 

    useEffect(() => {
        const fetchUserDetails = async () => {
            try {
                const userAttributes = await fetchUserAttributes();
                setUserEmail(userAttributes.email);

                const session = await fetchAuthSession();
                setToken(session.tokens.accessToken);
                console.log (session.tokens.accessToken);

            } catch (error) {
                console.error("Error fetching user details:", error);
            }
        };

        fetchUserDetails();
    }, []);

    useEffect(() => {
        switch(selectedOption) {
            case 'income':
                setTransactionType("salary");
                break;
            case 'expense':
                setTransactionType("shopping");
                break;
            case 'investment':
                setTransactionType("stocks");
                break;
            default:
                setTransactionType("");
        }
    }, [selectedOption]);

    const handleSubmit = async (e) => {
      e.preventDefault();
  
      const transactionData = {
          input: JSON.stringify({
              email: userEmail,
              type: selectedOption,
              amount: parseFloat(amount),
              description,
              transactionType,
          }),
          stateMachineArn: "arn:aws:states:us-east-2:767398055811:stateMachine:TransactionStateMachine",
      };
  
      try {
          const response = await fetch("https://zwp9khmh8e.execute-api.us-east-2.amazonaws.com/devlopment/transaction", {
              method: "POST",
              body: JSON.stringify(transactionData), // Convert the object to a JSON string
          });
  
          console.log("This is the response:", response);
  
          if (!response.ok) {
              const errorText = await response.text();
              console.error("Error adding transaction:", errorText);
              throw new Error(`HTTP error! status: ${response.status}`);
          }
  
          console.log("Transaction added successfully");
          setSelectedOption("income");
          setAmount("");
          setDescription("");
          setTransactionType("salary");
      } catch (error) {
          console.error("Error in fetch operation:", error);
      }
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
                  value={transactionType}
                  onChange={(e) => {
                    setTransactionType(e.target.value);
                }}
                >
                  <option value="salary">Salary</option>
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
                  value={transactionType}
                  onChange={(e) => {
                    setTransactionType(e.target.value);
                }}
                >
                  <option value="shopping">Shopping</option>
                  <option value="house-expense">House Expense</option>
                  <option value="bill-payment">Bill Payment</option>
                  <option value="other">Other</option>
                </select>
              </div>
            )}
            {selectedOption === "investment" && (
              <div className="space-y-2">
                <label htmlFor="investment-type" className="block font-medium">
                  Investment Type
                </label>
                <select
                  id="investment-type"
                  className="block w-full rounded-md border border-[#ced4da] bg-[#f8f9fa] px-3 py-2 text-[#495057] focus:border-[#80bdff] focus:outline-none focus:ring-[#80bdff]"
                  value={transactionType}
                  onChange={(e) => {
                    setTransactionType(e.target.value);
                }}
                >
                  <option value="stocks">Stocks</option>
                  <option value="savings">Savings</option>
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
                onClick={() => {
                  setSelectedOption("income");
                  setAmount("");
                  setDescription("");
                  setTransactionType("salary");
                }}
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
