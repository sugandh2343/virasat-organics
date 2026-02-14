import pool from "@/lib/db"
import bcrypt from "bcryptjs"
import jwt from "jsonwebtoken"
import { NextResponse } from "next/server"

const SECRET = process.env.JWT_SECRET || "virasat_secret"

export async function POST(req: Request) {
  try {
    const { mobile, password } = await req.json()

    const userRes = await pool.query(
      "SELECT * FROM users WHERE mobile=$1",
      [mobile]
    )

    if (userRes.rows.length === 0) {
      return NextResponse.json({ error: "User not found" }, { status: 400 })
    }

    const user = userRes.rows[0]

    const valid = await bcrypt.compare(password, user.password_hash)

    if (!valid) {
      return NextResponse.json({ error: "Invalid password" }, { status: 400 })
    }

    const token = jwt.sign(
      { userId: user.id, mobile: user.mobile },
      SECRET,
      { expiresIn: "7d" }
    )

    // Create response
    const response = NextResponse.json({
      id: user.id,
      name: user.name,
      mobile: user.mobile,
    })

    // Set cookie (correct way)
    response.cookies.set("token", token, {
      httpOnly: true,
      path: "/",
      maxAge: 60 * 60 * 24 * 7, // 7 days
    })

    return response
  } catch (error) {
    console.error(error)
    return NextResponse.json({ error: "Login failed" }, { status: 500 })
  }
}
