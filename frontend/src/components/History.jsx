import { useState } from "react"
import { Link } from "react-router-dom"

export default function HistoryPage() {
  const [selectedOption, setSelectedOption] = useState("income")
  const [amount, setAmount] = useState("")
  const [description, setDescription] = useState("")
  const [pdfFile, setPdfFile] = useState(null)
  const [transactions, setTransactions] = useState([
    {
      id: 1,
      type: "income",
      category: "Salary",
      amount: 5000,
      description: "Monthly salary",
      date: "2023-06-01",
      pdfUrl: "https://example.com/file1.pdf",
    },
    {
      id: 2,
      type: "expense",
      category: "Rent",
      amount: 1200,
      description: "Rent for June",
      date: "2023-06-05",
      pdfUrl: "https://example.com/file2.pdf",
    },
    {
      id: 3,
      type: "investment",
      category: "Stock Purchase",
      amount: 2500,
      description: "Invested in Apple Inc.",
      date: "2023-06-10",
      pdfUrl: "https://example.com/file3.pdf",
    },
    {
      id: 4,
      type: "income",
      category: "Freelance",
      amount: 1500,
      description: "Freelance project payment",
      date: "2023-06-15",
      pdfUrl: "https://example.com/file4.pdf",
    },
    {
      id: 5,
      type: "expense",
      category: "Groceries",
      amount: 350,
      description: "Monthly grocery shopping",
      date: "2023-06-20",
      pdfUrl: "https://example.com/file5.pdf",
    },
    {
        id: 5,
        type: "expense",
        category: "Groceries",
        amount: 350,
        description: "Monthly grocery shopping",
        date: "2023-06-20",
        pdfUrl: "https://example.com/file5.pdf",
    },

    {
        id: 5,
        type: "expense",
        category: "Groceries",
        amount: 350,
        description: "Monthly grocery shopping",
        date: "2023-06-20",
        pdfUrl: "https://example.com/file5.pdf",
    },
    {
        id: 5,
        type: "expense",
        category: "Groceries",
        amount: 350,
        description: "Monthly grocery shopping",
        date: "2023-06-20",
        pdfUrl: "https://example.com/file5.pdf",
      },

  ])

  const handleSubmit = (e) => {
    e.preventDefault()
    console.log("Selected option:", selectedOption)
    console.log("Amount:", amount)
    console.log("Description:", description)
    console.log("PDF File:", pdfFile)
    const newTransaction = {
      id: transactions.length + 1,
      type: selectedOption,
      category: selectedOption === "income" ? "Salary" : "Shopping",
      amount: parseFloat(amount),
      description: description,
      date: new Date().toISOString().slice(0, 10),
      pdfUrl: pdfFile ? URL.createObjectURL(pdfFile) : null,
    }
    setTransactions([...transactions, newTransaction])
    setSelectedOption("income")
    setAmount("")
    setDescription("")
    setPdfFile(null)
  }

  const handlePdfUpload = (e) => {
    setPdfFile(e.target.files[0])
  }

  return (
    <div className="flex min-h-screen w-full items-center justify-center p-6">
      <div className="col-span-1 grid gap-6 lg:col-span-2 w-full max-w-3xl">
        <div className="rounded-lg border border-[#dee2e6] bg-white p-6 shadow">
          <h2 className="text-xl font-bold mb-4">Transaction History</h2>
          <div className="overflow-x-auto max-h-[400px] overflow-y-auto">
            <table className="w-full table-auto">
              <thead>
                <tr className="bg-[#f8f9fa] text-[#495057]">
                  <th className="px-4 py-2 text-left">Date</th>
                  <th className="px-4 py-2 text-left">Type</th>
                  <th className="px-4 py-2 text-left">Category</th>
                  <th className="px-4 py-2 text-right">Amount</th>
                  <th className="px-4 py-2 text-left">Description</th>
                  <th className="px-4 py-2 text-left">Uploaded PDF</th>
                </tr>
              </thead>
              <tbody>
                {transactions.map((transaction) => (
                  <tr
                    key={transaction.id}
                    className={`border-b border-[#dee2e6] ${
                      transaction.type === "income" ? "bg-[#f1f3f5] text-[#495057]" : "bg-[#f8f9fa] text-[#495057]"
                    }`}
                  >
                    <td className="px-4 py-2">{transaction.date}</td>
                    <td className="px-4 py-2 capitalize">{transaction.type}</td>
                    <td className="px-4 py-2 capitalize">{transaction.category}</td>
                    <td
                      className={`px-4 py-2 text-right ${
                        transaction.type === "income" ? "text-[#28a745]" : "text-[#dc3545]"
                      }`}
                    >
                      {transaction.type === "income" ? "+" : "-"}${transaction.amount.toFixed(2)}
                    </td>
                    <td className="px-4 py-2">{transaction.description}</td>
                    <td className="px-4 py-2">
                      {transaction.pdfUrl && (
                        <Link to={transaction.pdfUrl} target="_blank" className="text-blue-500 hover:underline">
                          View PDF
                        </Link>
                      )}
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      </div>
    </div>
  )
}
