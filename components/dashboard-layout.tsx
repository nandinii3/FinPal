"use client"

import { useState } from "react"
import { useRouter } from "next/navigation"
import { Button } from "@/components/ui/button"
import BudgetSetup from "./budget-setup"
import TransactionInput from "./transaction-input"
import AICoach from "./ai-coach"
import BudgetAtAGlance from "./budget-at-a-glance"
import TransactionHistory from "./transaction-history"
import type { Budget, Transaction } from "@/lib/types"

interface DashboardLayoutProps {
  user: any
  budgets: Budget[]
  transactions: Transaction[]
  onDataUpdate: () => void
  userId: string
}

export default function DashboardLayout({ user, budgets, transactions, onDataUpdate, userId }: DashboardLayoutProps) {
  const [activeTab, setActiveTab] = useState<"overview" | "manage">("overview")
  const router = useRouter()

  const handleLogout = () => {
    localStorage.removeItem("user_email")
    localStorage.removeItem("user_id")
    localStorage.removeItem(`budgets_${userId}`)
    localStorage.removeItem(`transactions_${userId}`)
    router.push("/auth/login")
  }

  return (
    <div className="min-h-screen bg-background">
      {/* Header */}
      <header className="border-b border-border bg-card">
        <div className="mx-auto flex max-w-7xl items-center justify-between px-4 py-6 sm:px-6 lg:px-8">
          <div>
            <h1 className="text-3xl font-bold text-foreground">Financial Assistant</h1>
            <p className="text-sm text-muted-foreground">Manage your budget with AI insights</p>
          </div>
          <div className="flex items-center gap-4">
            <span className="text-sm text-muted-foreground">{user?.email}</span>
            <Button onClick={handleLogout} variant="outline" size="sm">
              Logout
            </Button>
          </div>
        </div>
      </header>

      {/* Navigation */}
      <div className="border-b border-border bg-card">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <div className="flex gap-4 py-4">
            <Button variant={activeTab === "overview" ? "default" : "ghost"} onClick={() => setActiveTab("overview")}>
              Overview
            </Button>
            <Button variant={activeTab === "manage" ? "default" : "ghost"} onClick={() => setActiveTab("manage")}>
              Manage
            </Button>
          </div>
        </div>
      </div>

      {/* Main Content */}
      <main className="mx-auto max-w-7xl px-4 py-8 sm:px-6 lg:px-8">
        {activeTab === "overview" && (
          <div className="space-y-8">
            <BudgetAtAGlance budgets={budgets} />
            <div className="grid gap-8 lg:grid-cols-3">
              <AICoach budgets={budgets} transactions={transactions} />
              <div className="lg:col-span-2">
                <TransactionHistory transactions={transactions} />
              </div>
            </div>
          </div>
        )}

        {activeTab === "manage" && (
          <div className="grid gap-8 lg:grid-cols-2">
            <BudgetSetup budgets={budgets} onUpdate={onDataUpdate} userId={userId} />
            <TransactionInput onSubmit={onDataUpdate} userId={userId} />
          </div>
        )}
      </main>
    </div>
  )
}
