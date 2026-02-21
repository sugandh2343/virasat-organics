import {pool} from "@/lib/db"

export async function GET(
  req: Request,
  context: { params: Promise<{ id: string }> }
) {
  try {
    const { id } = await context.params

    const result = await pool.query(
      `SELECT * FROM products WHERE id = $1`,
      [id]
    )

    if (result.rows.length === 0) {
      return Response.json(
        { error: "Product not found" },
        { status: 404 }
      )
    }

    return Response.json(result.rows[0])
  } catch (error) {
    console.error("Product API error:", error)

    return Response.json(
      { error: "Failed to fetch product" },
      { status: 500 }
    )
  }
}
