import {pool} from "@/lib/db"

export async function GET() {
  try {
    const orders = await pool.query("SELECT COUNT(*) FROM orders")
    const users = await pool.query("SELECT COUNT(*) FROM users")
    const products = await pool.query("SELECT COUNT(*) FROM products")
    const sales = await pool.query("SELECT COALESCE(SUM(total_amount),0) FROM orders")

    return Response.json({
      orders: parseInt(orders.rows[0].count),
      users: parseInt(users.rows[0].count),
      products: parseInt(products.rows[0].count),
      sales: parseFloat(sales.rows[0].coalesce),
    })
  } catch (error) {
    return Response.json({ error: String(error) })
  }
}
