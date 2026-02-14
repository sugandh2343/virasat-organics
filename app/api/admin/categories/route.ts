import pool from "@/lib/db"

export async function GET() {
  const result = await pool.query(
    "SELECT * FROM categories ORDER BY id DESC"
  )
  return Response.json(result.rows)
}

export async function POST(req: Request) {
  const { name, image_url } = await req.json()

  const result = await pool.query(
    "INSERT INTO categories (name, image_url) VALUES ($1, $2) RETURNING *",
    [name, image_url]
  )

  console.log("Adding Cattegory",Response.json(result));

  return Response.json(result.rows[0])
}
