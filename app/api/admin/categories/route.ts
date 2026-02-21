import {pool} from "@/lib/db"

export async function GET() {
  const result = await pool.query(
    "SELECT * FROM categories ORDER BY id DESC"
  )
  return Response.json(result.rows)
}

export async function POST(req: Request) {
  try {
    const { name, image_url } = await req.json()

    if (!name) {
      return Response.json({ error: "Name required" }, { status: 400 })
    }

    const result = await pool.query(
      "INSERT INTO categories (name, image_url) VALUES ($1, $2) RETURNING *",
      [name, image_url || null]
    )

    console.log("Category Added:", result.rows[0])

    return Response.json(result.rows[0])

  } catch (error) {
    console.error(error)
    return Response.json({ error: "Failed to add category" }, { status: 500 })
  }
}
