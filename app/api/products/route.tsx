import {pool} from "@/lib/db"

export async function GET() {
  try {
    const result = await pool.query(`
      SELECT p.*, c.name as category_name
      FROM products p
      LEFT JOIN categories c ON c.id = p.category_id
      ORDER BY c.name, p.id
    `)

    return Response.json(result.rows)
  } catch (error) {
    console.error("Products API error:", error)

    return Response.json(
      { error: "Failed to load products" },
      { status: 500 }
    )
  }
}
