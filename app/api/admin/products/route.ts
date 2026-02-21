import {pool} from "@/lib/db"

export async function GET() {
  const result = await pool.query(`
    SELECT p.*, c.name as category_name
    FROM products p
    LEFT JOIN categories c ON p.category_id = c.id
    ORDER BY p.id DESC
  `)

  return Response.json(result.rows)
}

export async function POST(req: Request) {
  const {
    title,
    description,
    price,
    discount_price,
    quantity,
    unit,
    image_url,
    category_id,
    search_keywords,
  } = await req.json()

  const result = await pool.query(
    `INSERT INTO products 
    (title, description, price, discount_price, quantity, unit, image_url, category_id, search_keywords)
    VALUES ($1,$2,$3,$4,$5,$6,$7,$8,$9)
    RETURNING *`,
    [
      title,
      description,
      price,
      discount_price,
      quantity,
      unit,
      image_url,
      category_id,
      search_keywords,
    ]
  )

  return Response.json(result.rows[0])
}
