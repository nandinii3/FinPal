import { NextResponse } from "next/server"

interface CoachRequest {
  budgets: Array<{
    category: string
    limit_amount: number
    spent_amount: number
  }>
  transactions: Array<{
    category: string
    amount: number
    description?: string
  }>
}

export async function POST(req: Request) {
  try {
    const { budgets, transactions }: CoachRequest = await req.json()

    const advice: string[] = []

    if (!budgets || budgets.length === 0) {
      advice.push(
        "शुरुआत करें: विभिन्न खर्च श्रेणियों के लिए मासिक बजट सेट करें। यह आपके खर्च की आदतों को ट्रैक करने और नियंत्रित करने में मदद करता है।\n\nStart by setting up monthly budgets for different spending categories. This helps you track and control your spending habits.",
      )
      return NextResponse.json({ advice: advice.join("\n\n") })
    }

    // Analyze overspending categories
    const overspent = budgets.filter((b) => b.spent_amount > b.limit_amount)
    if (overspent.length > 0) {
      const categories = overspent
        .map((b) => `${b.category} (${((b.spent_amount / b.limit_amount - 1) * 100).toFixed(0)}% over)`)
        .join(", ")
      advice.push(
        `🚨 ओवरस्पेंडिंग अलर्ट: आपने ${categories} पर अपने बजट से अधिक खर्च किया है।\n\nOVERSPENDING ALERT: You've exceeded your budget for ${categories}. Consider reducing spending in these areas or increasing your budget limits if possible.`,
      )

      // Add category-specific tips for overspent categories
      overspent.forEach((category) => {
        const tips: Record<string, string> = {
          Food: "खाना-पीना कम करने के लिए: सप्ताह की शुरुआत में ही आवश्यक सामग्री की खरीदारी करें और बाहर खाना कम करें।\n\nTip: Plan your meals weekly, prepare lunch at home, and reduce dining out.",
          Transportation:
            "परिवहन खर्च कम करने के लिए: सार्वजनिक परिवहन का उपयोग करें या कार-शेयरिंग करें।\n\nTip: Use public transport or carpooling when possible.",
          Entertainment:
            "मनोरंजन खर्च पर नियंत्रण: फ्री इवेंट्स और होम-बेस्ड गतिविधियों को प्राथमिकता दें।\n\nTip: Look for free entertainment options and prioritize indoor activities.",
          Shopping:
            "खरीदारी पर नियंत्रण: 30-दिन का नियम लागू करें - किसी भी गैर-आवश्यक खरीदारी के लिए 30 दिन का इंतजार करें।\n\nTip: Apply the 30-day rule before making non-essential purchases.",
          Utilities:
            "यूटिलिटी खर्च कम करें: बिजली, पानी और इंटरनेट के उपयोग को अनुकूल करें।\n\nTip: Monitor utility usage and look for cost-saving options.",
          Healthcare:
            "स्वास्थ्य खर्च प्रबंधन: नियमित चेकअप लें और जेनेरिक दवाओं का उपयोग करें।\n\nTip: Get preventive care and use generic medicines when available.",
          Education:
            "शिक्षा लागत नियंत्रण: मुफ्त ऑनलाइन संसाधन और लाइब्रेरी सुविधाओं का लाभ उठाएं।\n\nTip: Utilize free online courses and library resources.",
        }
        if (tips[category.category]) {
          advice.push(tips[category.category])
        }
      })
    }

    // Analyze spending patterns
    if (transactions && transactions.length > 0) {
      const totalSpent = transactions.reduce((sum, t) => sum + t.amount, 0)
      const avgTransaction = totalSpent / transactions.length

      advice.push(
        `📊 आपकी खर्च प्रोफाइल:\nTotal Transactions: ${transactions.length} | Average per transaction: ₹${avgTransaction.toFixed(0)} | Total spent: ₹${totalSpent.toFixed(0)}`,
      )

      if (avgTransaction > 500) {
        advice.push(
          `⚠️ आपका औसत लेनदेन ₹${avgTransaction.toFixed(0)} है। बड़ी खरीदारी को छोटे, योजनाबद्ध लेनदेन में विभाजित करने का प्रयास करें।\n\nYour average transaction is ₹${avgTransaction.toFixed(0)}. Try breaking larger purchases into smaller, planned transactions to better control spending.`,
        )
      } else if (avgTransaction < 100) {
        advice.push(
          `✅ अच्छा संकेत: आपके लेनदेन आकार छोटे हैं, जो अच्छे खर्च नियंत्रण को दर्शाता है।\n\nGood sign: Your transactions are smaller, indicating better spending control.`,
        )
      }

      // Category analysis
      const categorySpending = transactions.reduce((acc: Record<string, number>, t) => {
        acc[t.category] = (acc[t.category] || 0) + t.amount
        return acc
      }, {})

      const sortedCategories = Object.entries(categorySpending).sort(([, a], [, b]) => b - a)

      if (sortedCategories.length > 0) {
        const topThreeCategories = sortedCategories.slice(0, 3)
        let categoryAnalysis = "🎯 शीर्ष खर्च श्रेणियां:\n\nTop 3 spending categories:\n"
        topThreeCategories.forEach(([category, amount], index) => {
          const percentage = ((amount / totalSpent) * 100).toFixed(1)
          categoryAnalysis += `${index + 1}. ${category}: ₹${amount.toFixed(0)} (${percentage}% of total)\n`
        })
        advice.push(categoryAnalysis)
      }

      // Savings opportunity
      const topCategory = sortedCategories[0]
      if (topCategory) {
        const savingsOpportunity = (topCategory[1] * 0.1).toFixed(0)
        advice.push(
          `💡 बचत का अवसर: यदि आप अपनी सबसे बड़ी श्रेणी (${topCategory[0]}) में सिर्फ 10% कम खर्च करें, तो आप ₹${savingsOpportunity} प्रति माह बचा सकते हैं।\n\nSavings opportunity: If you reduce spending on your top category (${topCategory[0]}) by just 10%, you could save ₹${savingsOpportunity} per month!`,
        )
      }
    }

    // Budget utilization advice
    const avgUtilization = budgets.reduce((sum, b) => sum + b.spent_amount / b.limit_amount, 0) / budgets.length

    if (avgUtilization < 0.3) {
      advice.push(
        `✅ उत्कृष्ट नियंत्रण: आपके बजट में बहुत अधिक जगह है। आप अपने खर्च पर बहुत अच्छा नियंत्रण रखे हुए हैं!\n\nExcellent! Your budgets have plenty of room. Keep up the great spending discipline!`,
      )
    } else if (avgUtilization >= 0.3 && avgUtilization < 0.7) {
      advice.push(
        `👍 संतुलित खर्च: आप एक अच्छे संतुलन पर हैं। अपनी वर्तमान खर्च पैटर्न को जारी रखें और अपने बजट को नियमित रूप से मॉनिटर करें।\n\nBalanced spending: You're maintaining a good balance. Continue this pattern and regularly monitor your budgets.`,
      )
    } else if (avgUtilization >= 0.7 && avgUtilization < 0.95) {
      advice.push(
        `⚠️ सावधानी: आप अपने अधिकांश बजट का उपयोग कर रहे हैं। महीने के शेष दिनों में अतिरिक्त खर्च से बचें।\n\nCaution: You're utilizing most of your budgets. Be cautious with additional spending for the rest of the month.`,
      )
    } else if (avgUtilization >= 0.95) {
      advice.push(
        `🚨 महत्वपूर्ण: आप अपने सभी बजट की सीमा के बहुत करीब हैं। आगामी खर्च को प्राथमिकता के आधार पर नियोजित करें।\n\nCritical: You're very close to your budget limits. Plan any remaining purchases carefully.`,
      )
    }

    // Monthly insights
    const daysInMonth = new Date(new Date().getFullYear(), new Date().getMonth() + 1, 0).getDate()
    const currentDay = new Date().getDate()
    const daysRemaining = daysInMonth - currentDay

    if (transactions.length > 0 && daysRemaining > 0) {
      const totalSpent = transactions.reduce((sum, t) => sum + t.amount, 0)
      const projectedMonthlySpend = (totalSpent / currentDay) * daysInMonth
      const totalBudget = budgets.reduce((sum, b) => sum + b.limit_amount, 0)

      let projection = ""
      if (projectedMonthlySpend > totalBudget) {
        const overage = projectedMonthlySpend - totalBudget
        projection = `📅 माह के अंत तक आप लगभग ₹${overage.toFixed(0)} से अधिक खर्च कर सकते हैं।\n\nProjection: At this rate, you may overspend by ₹${overage.toFixed(0)} by month-end.`
      } else {
        const savings = totalBudget - projectedMonthlySpend
        projection = `📅 माह के अंत तक आप लगभग ₹${savings.toFixed(0)} बचा सकते हैं।\n\nProjection: At this rate, you could save ₹${savings.toFixed(0)} by month-end!`
      }
      advice.push(projection)
    }

    // Final motivation
    advice.push(
      `💪 याद रखें: छोटे, सुसंगत वित्तीय निर्णय बड़े परिणाम लाते हैं। अपनी प्रगति पर गर्व करें!\n\nRemember: Small, consistent financial decisions lead to big results. Keep up the great work!`,
    )

    if (advice.length === 0) {
      advice.push(
        "आपका खर्च स्वस्थ दिख रहा है! अपने बजट की निगरानी जारी रखें और स्मार्ट वित्तीय निर्णय लेते रहें।\n\nYour spending looks healthy! Keep monitoring your budgets and continue making smart financial decisions.",
      )
    }

    return NextResponse.json({ advice: advice.join("\n\n") })
  } catch (error) {
    console.error("Coach error:", error)
    return NextResponse.json({
      advice:
        "अपने खर्च को ट्रैक करना जारी रखें और नियमित रूप से अपने बजट की समीक्षा करें। छोटे, सुसंगत परिवर्तन बड़े वित्तीय सुधार लाते हैं।\n\nKeep tracking your spending and reviewing your budgets regularly. Small, consistent changes lead to big financial improvements over time.",
    })
  }
}
