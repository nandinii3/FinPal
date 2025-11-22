export interface Budget {
  id: string
  user_id: string
  category: string
  limit_amount: number
  spent_amount: number
  month: number
  year: number
  created_at: string
  updated_at: string
}

export interface Transaction {
  id: string
  user_id: string
  amount: number
  category: string
  description?: string
  date: string
  created_at: string
  updated_at: string
}

export interface FinancialInsight {
  category: string
  amount: number
  percentage: number
  status: "on-track" | "warning" | "over-budget"
}
