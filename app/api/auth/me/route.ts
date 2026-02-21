import { NextRequest, NextResponse } from "next/server"
import jwt from "jsonwebtoken"
import { pool } from "@/lib/db"

const SECRET = process.env.JWT_SECRET || "virasat_secret"

export async function GET(req: NextRequest) {
  try {
    const token = req.cookies.get("token")?.value

    if (!token) {
      return NextResponse.json({ user: null })
    }

    const decoded: any = jwt.verify(token, SECRET)

    const userRes = await pool.query(
      "SELECT id, name, email, mobile FROM users WHERE id=$1",
      [decoded.userId]
    )

    if (userRes.rows.length === 0) {
      return NextResponse.json({ user: null })
    }

    return NextResponse.json({
      user: userRes.rows[0]
    })

  } catch (error) {
    return NextResponse.json({ user: null })
  }
}