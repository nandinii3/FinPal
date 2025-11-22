"use client"

import { useEffect, useState } from "react"
import { useRouter } from "next/navigation"
import DashboardLayout from "@/components/dashboard-layout"
import type { Transaction, Budget } from "@/lib/types"

export default function Page() {
  const [user, setUser] = useState<any>(null)
  const [loading, setLoading] = useState(true)
  const [budgets, setBudgets] = useState<Budget[]>([])
  const [transactions, setTransactions] = useState<Transaction[]>([])
  const router = useRouter()

  useEffect(() => {
    const checkAuth = async () => {
      const email = localStorage.getItem("user_email")
      const userId = localStorage.getItem("user_id")

      if (!email || !userId) {
        router.push("/auth/login")
        return
      }

      setUser({ email, id: userId })
      await loadData(userId)
      setLoading(false)
    }

    checkAuth()
  }, [router])

  const loadData = async (userId: string) => {
    const storedBudgets = localStorage.getItem(`budgets_${userId}`)
    const storedTransactions = localStorage.getItem(`transactions_${userId}`)

    if (storedBudgets) {
      try {
        setBudgets(JSON.parse(storedBudgets))
      } catch (e) {
        setBudgets([])
      }
    }

    if (storedTransactions) {
      try {
        const txns = JSON.parse(storedTransactions)
        setTransactions(txns)

        // Update spent amounts in budgets
        const parsedBudgets = storedBudgets ? JSON.parse(storedBudgets) : []
        const updatedBudgets = parsedBudgets.map((budget: Budget) => {
          const spent = txns
            .filter((t: Transaction) => t.category === budget.category)
            .reduce((sum: number, t: Transaction) => sum + Number(t.amount), 0)
          return { ...budget, spent_amount: spent }
        })
        setBudgets(updatedBudgets)
      } catch (e) {
        setTransactions([])
      }
    }
  }

  const handleDataUpdate = async () => {
    const userId = localStorage.getItem("user_id")
    if (userId) {
      await loadData(userId)
    }
  }

  if (loading) {
    return (
      <div className="flex h-screen items-center justify-center">
        <p className="text-foreground">Loading...</p>
      </div>
    )
  }

  return (
    <DashboardLayout
      user={user}
      budgets={budgets}
      transactions={transactions}
      onDataUpdate={handleDataUpdate}
      userId={localStorage.getItem("user_id") || ""}
    />
  )
}
