import { NextResponse } from "next/server"
import admin from "@/lib/firebase-admin"
import { pool } from "@/lib/db"
import jwt from "jsonwebtoken"

const SECRET = process.env.JWT_SECRET || "virasat_secret"

export async function POST(req: Request) {
  try {
    const { token } = await req.json()

    const decoded = await admin.auth().verifyIdToken(token)

    const { uid, email, name } = decoded


    console.log("Email of google user",email);

    let userRes = await pool.query(
      "SELECT * FROM users WHERE firebase_uid=$1",
      [uid]
    )

    let user


    console.log("User row condition check",userRes )

    if (userRes.rows.length ===0) {
      const newUser = await pool.query(
        `INSERT INTO users (name, email, firebase_uid)
         VALUES ($1,$2,$3) RETURNING *`,
        [name || "User", email, uid]
      )
      user = newUser.rows[0]
    } else {
      user = userRes.rows[0]
    }

    const jwtToken = jwt.sign(
      { userId: user.id },
      SECRET,
      { expiresIn: "7d" }
    )

    const response = NextResponse.json({ success: true })

    response.cookies.set("token", jwtToken, {
      httpOnly: true,
      path: "/",
      maxAge: 60 * 60 * 24 * 7,
    })

    return response

  } catch (error) {
    console.error(error)
    return NextResponse.json(
      { error: "Google login failed" },
      { status: 500 }
    )
  }
}