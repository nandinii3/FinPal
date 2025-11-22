"use client"

import type React from "react"

import { useState } from "react"
import { useRouter } from "next/navigation"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Card } from "@/components/ui/card"

export default function LoginPage() {
  const [email, setEmail] = useState("")
  const [loading, setLoading] = useState(false)
  const router = useRouter()

  const handleLogin = async (e: React.FormEvent) => {
    e.preventDefault()
    setLoading(true)

    if (!email.trim()) {
      alert("Please enter an email")
      setLoading(false)
      return
    }

    localStorage.setItem("user_email", email)
    localStorage.setItem("user_id", `user_${Date.now()}`)

    router.push("/")
    setLoading(false)
  }

  return (
    <div className="flex min-h-screen items-center justify-center bg-background px-4">
      <Card className="w-full max-w-md space-y-6 p-8">
        <div className="text-center">
          <h1 className="text-3xl font-bold text-foreground">Financial Assistant</h1>
          <p className="mt-2 text-sm text-muted-foreground">Manage your budget with AI insights</p>
        </div>

        <form onSubmit={handleLogin} className="space-y-4">
          <div>
            <label htmlFor="email" className="block text-sm font-medium text-foreground">
              Email (Demo)
            </label>
            <Input
              id="email"
              type="email"
              placeholder="Enter any email to continue"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              className="mt-1"
            />
            <p className="mt-1 text-xs text-muted-foreground">This is a demo login. Enter any email to get started.</p>
          </div>

          <Button type="submit" className="w-full" disabled={loading}>
            {loading ? "Logging in..." : "Continue"}
          </Button>
        </form>

        <div className="rounded-lg bg-muted p-4">
          <p className="text-xs text-muted-foreground">
            <strong>Demo Mode:</strong> This app uses demo authentication. Your data is stored locally in your browser.
          </p>
        </div>
      </Card>
    </div>
  )
}
