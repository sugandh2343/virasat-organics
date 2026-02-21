import {pool} from "@/lib/db"

export async function DELETE(
  req: Request,
  context: { params: Promise<{ id: string }> }
) {
  const { id } = await context.params

  await pool.query("DELETE FROM products WHERE id=$1", [id])

  return Response.json({ success: true })
}




export async function PUT(
  req: Request,
  context: { params: Promise<{ id: string }> }
) {
  const { id } = await context.params

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
    `UPDATE products SET
      title=$1,
      description=$2,
      price=$3,
      discount_price=$4,
      quantity=$5,
      unit=$6,
      image_url=$7,
      category_id=$8,
      search_keywords=$9
     WHERE id=$10
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
      id,
    ]
  )

  // Fix serialization issue
  const product = result.rows[0]

  return Response.json({
    ...product,
    price: Number(product.price),
    discount_price: product.discount_price
      ? Number(product.discount_price)
      : null,
    quantity: Number(product.quantity),
  })
}
