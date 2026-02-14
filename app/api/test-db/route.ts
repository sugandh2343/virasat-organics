import pool from "@/lib/db"

export async function GET() {
  try {
    const result = await pool.query("SELECT NOW()")
    return Response.json({
      success: true,
      time: result.rows[0],
    })
  } catch (error) {
    return Response.json({
      success: false,
      error: String(error),
    })
  }
}
