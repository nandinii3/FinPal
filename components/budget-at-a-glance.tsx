"use client"

import { Card } from "@/components/ui/card"
import { formatINR } from "@/lib/currency"
import type { Budget } from "@/lib/types"

interface BudgetAtAGlanceProps {
  budgets: Budget[]
}

export default function BudgetAtAGlance({ budgets }: BudgetAtAGlanceProps) {
  const totalBudget = budgets.reduce((sum, b) => sum + b.limit_amount, 0)
  const totalSpent = budgets.reduce((sum, b) => sum + b.spent_amount, 0)
  const percentageUsed = totalBudget > 0 ? (totalSpent / totalBudget) * 100 : 0

  const getStatusColor = (spent: number, limit: number) => {
    const percentage = (spent / limit) * 100
    if (percentage >= 100) return "text-red-500"
    if (percentage >= 80) return "text-yellow-500"
    return "text-green-500"
  }

  return (
    <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-4">
      <Card className="p-6">
        <p className="text-sm font-medium text-muted-foreground">Total Budget</p>
        <p className="mt-2 text-3xl font-bold text-foreground">{formatINR(totalBudget)}</p>
      </Card>

      <Card className="p-6">
        <p className="text-sm font-medium text-muted-foreground">Total Spent</p>
        <p className="mt-2 text-3xl font-bold text-foreground">{formatINR(totalSpent)}</p>
      </Card>

      <Card className="p-6">
        <p className="text-sm font-medium text-muted-foreground">Remaining</p>
        <p className={`mt-2 text-3xl font-bold ${getStatusColor(totalSpent, totalBudget)}`}>
          {formatINR(Math.max(0, totalBudget - totalSpent))}
        </p>
      </Card>

      <Card className="p-6">
        <p className="text-sm font-medium text-muted-foreground">Budget Used</p>
        <p className={`mt-2 text-3xl font-bold ${getStatusColor(totalSpent, totalBudget)}`}>
          {percentageUsed.toFixed(1)}%
        </p>
      </Card>

      {budgets.length > 0 && (
        <div className="md:col-span-2 lg:col-span-4">
          <Card className="p-6">
            <h3 className="mb-4 text-lg font-semibold text-foreground">Budget Breakdown</h3>
            <div className="space-y-3">
              {budgets.map((budget) => {
                const percentage = (budget.spent_amount / budget.limit_amount) * 100
                return (
                  <div key={budget.id}>
                    <div className="mb-2 flex items-center justify-between">
                      <span className="text-sm font-medium text-foreground">{budget.category}</span>
                      <span
                        className={`text-sm font-semibold ${getStatusColor(budget.spent_amount, budget.limit_amount)}`}
                      >
                        {percentage.toFixed(0)}%
                      </span>
                    </div>
                    <div className="h-2 overflow-hidden rounded-full bg-muted">
                      <div
                        className={`h-full transition-all ${
                          percentage >= 100 ? "bg-red-500" : percentage >= 80 ? "bg-yellow-500" : "bg-green-500"
                        }`}
                        style={{ width: `${Math.min(percentage, 100)}%` }}
                      />
                    </div>
                    <p className="mt-1 text-xs text-muted-foreground">
                      {formatINR(budget.spent_amount)} of {formatINR(budget.limit_amount)}
                    </p>
                  </div>
                )
              })}
            </div>
          </Card>
        </div>
      )}
    </div>
  )
}
