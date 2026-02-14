import pool from "@/lib/db"
import bcrypt from "bcryptjs"

export async function POST(req: Request) {
  try {
    const { name, mobile, password } = await req.json()

    if (!mobile || !password) {
      return Response.json({ error: "Missing fields" }, { status: 400 })
    }

    // Check if user exists
    const existing = await pool.query(
      "SELECT id FROM users WHERE mobile=$1",
      [mobile]
    )

    if (existing.rows.length > 0) {
      return Response.json({ error: "Mobile already registered" }, { status: 400 })
    }

    const hash = await bcrypt.hash(password, 10)

    const result = await pool.query(
      `INSERT INTO users (name, mobile, password_hash)
       VALUES ($1,$2,$3)
       RETURNING id, name, mobile`,
      [name, mobile, hash]
    )

    return Response.json(result.rows[0])
  } catch (error) {
    console.error(error)
    return Response.json({ error: "Signup failed" }, { status: 500 })
  }
}
