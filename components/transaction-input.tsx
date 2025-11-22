"use client"

import { useState } from "react"
import { Card } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import type { Transaction } from "@/lib/types"

interface TransactionInputProps {
  onSubmit: () => void
  userId: string
}

export default function TransactionInput({ onSubmit, userId }: TransactionInputProps) {
  const [amount, setAmount] = useState("")
  const [description, setDescription] = useState("")
  const [category, setCategory] = useState("")
  const [saving, setSaving] = useState(false)
  const [autoCategory, setAutoCategory] = useState(false)

  const handleAutoCategerize = async () => {
    if (!description || !amount) return

    setAutoCategory(true)
    try {
      const res = await fetch("/api/categorize", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ description, amount }),
      })

      const { category: autocat } = await res.json()
      setCategory(autocat)
    } catch (error) {
      console.error("Error categorizing:", error)
      setCategory("Other")
    } finally {
      setAutoCategory(false)
    }
  }

  const handleSubmit = async () => {
    if (!amount || !category || !description) return

    setSaving(true)
    try {
      const today = new Date().toISOString().split("T")[0]

      const newTransaction: Transaction = {
        id: `txn_${Date.now()}`,
        user_id: userId,
        amount: Number.parseFloat(amount),
        category,
        description,
        date: today,
        created_at: new Date().toISOString(),
        updated_at: new Date().toISOString(),
      }

      const existingTransactions = JSON.parse(localStorage.getItem(`transactions_${userId}`) || "[]")
      const updatedTransactions = [...existingTransactions, newTransaction]

      localStorage.setItem(`transactions_${userId}`, JSON.stringify(updatedTransactions))

      setAmount("")
      setDescription("")
      setCategory("")
      onSubmit()
    } catch (error) {
      console.error("Error adding transaction:", error)
    } finally {
      setSaving(false)
    }
  }

  return (
    <Card className="p-6">
      <h2 className="mb-6 text-xl font-bold text-foreground">Add Transaction</h2>
      <div className="space-y-4">
        <div>
          <label className="mb-2 block text-sm font-medium text-foreground">Amount ($)</label>
          <input
            type="number"
            value={amount}
            onChange={(e) => setAmount(e.target.value)}
            placeholder="0.00"
            step="0.01"
            className="w-full rounded-md border border-input bg-background px-3 py-2 text-foreground"
          />
        </div>

        <div>
          <label className="mb-2 block text-sm font-medium text-foreground">Description</label>
          <input
            type="text"
            value={description}
            onChange={(e) => setDescription(e.target.value)}
            placeholder="e.g., Coffee at Starbucks"
            className="w-full rounded-md border border-input bg-background px-3 py-2 text-foreground"
          />
        </div>

        <div>
          <label className="mb-2 block text-sm font-medium text-foreground">Category</label>
          <div className="flex gap-2">
            <input
              type="text"
              value={category}
              onChange={(e) => setCategory(e.target.value)}
              placeholder="e.g., Food"
              className="flex-1 rounded-md border border-input bg-background px-3 py-2 text-foreground"
            />
            <Button onClick={handleAutoCategerize} disabled={autoCategory || !description || !amount} variant="outline">
              {autoCategory ? "Categorizing..." : "Auto-Categorize"}
            </Button>
          </div>
        </div>

        <Button onClick={handleSubmit} disabled={saving || !amount || !category || !description} className="w-full">
          {saving ? "Adding..." : "Add Transaction"}
        </Button>
      </div>
    </Card>
  )
}
