import { NextRequest, NextResponse } from "next/server"
import jwt from "jsonwebtoken"

const SECRET = process.env.JWT_SECRET || "virasat_secret"

export async function GET(req: NextRequest) {
  try {
    const token = req.cookies.get("token")?.value

    if (!token) {
      return NextResponse.json({ user: null })
    }

    const decoded: any = jwt.verify(token, SECRET)

    return NextResponse.json({
      user: {
        id: decoded.userId,
        mobile: decoded.mobile,
      },
    })
  } catch {
    return NextResponse.json({ user: null })
  }
}
