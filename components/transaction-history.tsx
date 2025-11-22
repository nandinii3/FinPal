"use client"

import { Card } from "@/components/ui/card"
import { formatINR } from "@/lib/currency"
import type { Transaction } from "@/lib/types"

interface TransactionHistoryProps {
  transactions: Transaction[]
}

export default function TransactionHistory({ transactions }: TransactionHistoryProps) {
  const getCategoryColor = (category: string) => {
    const colors: Record<string, string> = {
      Food: "bg-orange-100 text-orange-800",
      Transportation: "bg-blue-100 text-blue-800",
      Entertainment: "bg-purple-100 text-purple-800",
      Shopping: "bg-pink-100 text-pink-800",
      Utilities: "bg-green-100 text-green-800",
      Healthcare: "bg-red-100 text-red-800",
      Education: "bg-indigo-100 text-indigo-800",
      Other: "bg-gray-100 text-gray-800",
    }
    return colors[category] || "bg-gray-100 text-gray-800"
  }

  return (
    <Card className="p-6">
      <h2 className="mb-6 text-xl font-bold text-foreground">Transaction History</h2>
      {transactions.length === 0 ? (
        <p className="text-center text-sm text-muted-foreground">No transactions yet</p>
      ) : (
        <div className="space-y-3">
          {transactions.map((transaction) => (
            <div key={transaction.id} className="flex items-center justify-between rounded-lg border border-border p-4">
              <div className="flex-1">
                <p className="text-sm font-medium text-foreground">{transaction.description}</p>
                <div className="mt-1 flex items-center gap-2">
                  <span
                    className={`inline-block rounded-full px-2 py-1 text-xs font-semibold ${getCategoryColor(transaction.category)}`}
                  >
                    {transaction.category}
                  </span>
                  <span className="text-xs text-muted-foreground">{transaction.date}</span>
                </div>
              </div>
              <p className="text-lg font-bold text-foreground">-{formatINR(transaction.amount)}</p>
            </div>
          ))}
        </div>
      )}
    </Card>
  )
}
