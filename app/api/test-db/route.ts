import { pool } from "@/lib/db"

export async function GET() {
  try {
    const { rows } = await pool.query("SELECT 1 as ok")
    return Response.json(rows)
  } catch (e) {
    console.error(e)
    return Response.json({ error: String(e) }, { status: 500 })
  }
}
