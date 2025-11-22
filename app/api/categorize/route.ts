import { NextResponse } from "next/server"

const categoryKeywords: Record<string, string[]> = {
  Food: [
    "cafe",
    "restaurant",
    "food",
    "pizza",
    "burger",
    "coffee",
    "doordash",
    "ubereats",
    "grocery",
    "supermarket",
    "grocery store",
  ],
  Transportation: ["uber", "lyft", "taxi", "gas", "parking", "bus", "metro", "train", "transit"],
  Entertainment: ["movie", "cinema", "netflix", "spotify", "gaming", "concert", "theater", "ticket"],
  Shopping: ["amazon", "mall", "store", "clothing", "fashion", "department", "target", "walmart"],
  Utilities: ["electric", "water", "gas", "internet", "phone", "bill", "utility"],
  Healthcare: ["doctor", "hospital", "pharmacy", "medicine", "dental", "clinic"],
  Education: ["school", "course", "tuition", "book", "university", "college"],
  Other: [],
}

export async function POST(req: Request) {
  try {
    const { description, amount } = await req.json()

    if (!description) {
      return NextResponse.json({ category: "Other" })
    }

    const lowerDesc = description.toLowerCase()

    // Find matching category based on keywords
    for (const [category, keywords] of Object.entries(categoryKeywords)) {
      if (category === "Other") continue
      if (keywords.some((keyword) => lowerDesc.includes(keyword))) {
        return NextResponse.json({ category })
      }
    }

    // Default to Other if no match found
    return NextResponse.json({ category: "Other" })
  } catch (error) {
    console.error("Categorization error:", error)
    return NextResponse.json({ category: "Other" })
  }
}
