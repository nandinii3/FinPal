"use client"

import { useState } from "react"
import { Card } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import type { Budget, Transaction } from "@/lib/types"

interface AICoachProps {
  budgets: Budget[]
  transactions: Transaction[]
}

export default function AICoach({ budgets, transactions }: AICoachProps) {
  const [advice, setAdvice] = useState("")
  const [loading, setLoading] = useState(false)

  const handleGetAdvice = async () => {
    setLoading(true)
    try {
      const res = await fetch("/api/coach", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ budgets, transactions }),
      })

      const { advice: newAdvice } = await res.json()
      setAdvice(newAdvice)
    } catch (error) {
      console.error("Error getting advice:", error)
      setAdvice("Failed to get financial advice. Please try again.")
    } finally {
      setLoading(false)
    }
  }

  return (
    <Card className="p-6">
      <h2 className="mb-6 text-xl font-bold text-foreground">AI Financial Coach</h2>
      <div className="space-y-4">
        <p className="text-sm text-muted-foreground">
          Get personalized financial advice based on your spending patterns.
        </p>

        {advice && (
          <div className="rounded-lg border border-border bg-muted p-4">
            <p className="whitespace-pre-wrap text-sm text-foreground">{advice}</p>
          </div>
        )}

        <Button onClick={handleGetAdvice} disabled={loading} className="w-full">
          {loading ? "Getting Advice..." : "Get Financial Advice"}
        </Button>
      </div>
    </Card>
  )
}
