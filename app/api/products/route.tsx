import pool from "@/lib/db"

export async function GET() {
  const result = await pool.query(`
    SELECT 
      p.*,
      c.name as category_name
    FROM products p
    LEFT JOIN categories c ON c.id = p.category_id
    ORDER BY c.name, p.id
  `)

  return Response.json(result.rows)
}
