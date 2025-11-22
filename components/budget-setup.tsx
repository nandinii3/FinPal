"use client"

import { useState } from "react"
import { Card } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { formatINR } from "@/lib/currency"
import type { Budget } from "@/lib/types"

const CATEGORIES = [
  "Food",
  "Transportation",
  "Entertainment",
  "Shopping",
  "Utilities",
  "Healthcare",
  "Education",
  "Other",
]

interface BudgetSetupProps {
  budgets: Budget[]
  onUpdate: () => void
  userId: string
}

export default function BudgetSetup({ budgets, onUpdate, userId }: BudgetSetupProps) {
  const [category, setCategory] = useState("")
  const [limit, setLimit] = useState("")
  const [saving, setSaving] = useState(false)

  const handleSetBudget = async () => {
    if (!category || !limit) return

    setSaving(true)
    try {
      const now = new Date()
      const month = now.getMonth() + 1
      const year = now.getFullYear()

      const newBudget: Budget = {
        id: `budget_${Date.now()}`,
        user_id: userId,
        category,
        limit_amount: Number.parseFloat(limit),
        spent_amount: 0,
        month,
        year,
        created_at: new Date().toISOString(),
        updated_at: new Date().toISOString(),
      }

      const existingBudgets = budgets.filter((b) => b.category !== category)
      const updatedBudgets = [...existingBudgets, newBudget]

      localStorage.setItem(`budgets_${userId}`, JSON.stringify(updatedBudgets))

      setCategory("")
      setLimit("")
      onUpdate()
    } catch (error) {
      console.error("Error setting budget:", error)
    } finally {
      setSaving(false)
    }
  }

  return (
    <Card className="p-6">
      <h2 className="mb-6 text-xl font-bold text-foreground">Set Monthly Budgets</h2>
      <div className="space-y-4">
        <div>
          <label className="mb-2 block text-sm font-medium text-foreground">Category</label>
          <select
            value={category}
            onChange={(e) => setCategory(e.target.value)}
            className="w-full rounded-md border border-input bg-background px-3 py-2 text-foreground"
          >
            <option value="">Select a category</option>
            {CATEGORIES.map((cat) => (
              <option key={cat} value={cat}>
                {cat}
              </option>
            ))}
          </select>
        </div>

        <div>
          <label className="mb-2 block text-sm font-medium text-foreground">Budget Limit (₹)</label>
          <input
            type="number"
            value={limit}
            onChange={(e) => setLimit(e.target.value)}
            placeholder="0"
            step="1"
            className="w-full rounded-md border border-input bg-background px-3 py-2 text-foreground"
          />
        </div>

        <Button onClick={handleSetBudget} disabled={saving || !category || !limit} className="w-full">
          {saving ? "Setting Budget..." : "Set Budget"}
        </Button>

        {budgets.length > 0 && (
          <div className="mt-6 space-y-2">
            <h3 className="text-sm font-semibold text-foreground">Current Budgets</h3>
            {budgets.map((budget) => (
              <div key={budget.id} className="flex items-center justify-between rounded-md bg-muted p-3">
                <span className="text-sm font-medium text-foreground">{budget.category}</span>
                <span className="text-sm text-muted-foreground">{formatINR(budget.limit_amount)}</span>
              </div>
            ))}
          </div>
        )}
      </div>
    </Card>
  )
}
