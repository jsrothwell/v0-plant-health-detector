import { type NextRequest, NextResponse } from "next/server"

export async function POST(request: NextRequest) {
  try {
    const { type, email, reason } = await request.json()

    // Validate required fields
    if (!type || !email) {
      return NextResponse.json({ error: "Type and email are required" }, { status: 400 })
    }

    if (type === "delete" && !reason) {
      return NextResponse.json({ error: "Reason is required for deletion requests" }, { status: 400 })
    }

    // Validate email format
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/
    if (!emailRegex.test(email)) {
      return NextResponse.json({ error: "Invalid email format" }, { status: 400 })
    }

    // Log the GDPR request
    console.log("GDPR Request:", {
      type,
      email,
      reason: reason || "N/A",
      timestamp: new Date().toISOString(),
      ip: request.headers.get("x-forwarded-for") || "unknown",
    })

    // In a real application, you would:
    // 1. Store the request in a database with proper tracking
    // 2. Send notification emails to your data protection team
    // 3. Set up automated workflows for data export/deletion
    // 4. Implement proper verification processes
    // 5. Track request status and completion

    // Simulate processing delay
    await new Promise((resolve) => setTimeout(resolve, 1000))

    const responseMessage =
      type === "export"
        ? "Your data export request has been received. We will send you a secure download link within 30 days."
        : "Your data deletion request has been received. We will contact you for verification and complete the process within 30 days."

    return NextResponse.json(
      {
        success: true,
        message: responseMessage,
        requestId: `GDPR-${Date.now()}-${Math.random().toString(36).substr(2, 9)}`,
      },
      { status: 200 },
    )
  } catch (error) {
    console.error("GDPR request error:", error)
    return NextResponse.json({ error: "Internal server error" }, { status: 500 })
  }
}
