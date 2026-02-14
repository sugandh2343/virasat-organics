import pool from "@/lib/db"

export async function DELETE(
  req: Request,
  { params }: { params: { id: string } }
) {
  await pool.query("DELETE FROM categories WHERE id=$1", [params.id])
  return Response.json({ success: true })
}
