import { pool } from "@/lib/db"
import { NextRequest, NextResponse } from "next/server"

export async function DELETE(
  req: NextRequest,
  context: { params: Promise<{ id: string }> }
) {
  const { id } = await context.params

  await pool.query(
    "DELETE FROM categories WHERE id=$1",
    [id]
  )

  return NextResponse.json({ success: true })
}




export async function PUT(
  req: NextRequest,
  context: { params: Promise<{ id: string }> }
) {
  const { id } = await context.params
  const { name, image_url } = await req.json()

  if (!name) {
    return NextResponse.json({ error: "Name required" }, { status: 400 })
  }

  if (image_url) {
    // Update name + image
    await pool.query(
      "UPDATE categories SET name=$1, image_url=$2 WHERE id=$3",
      [name, image_url, id]
    )
  } else {
    // Update only name
    await pool.query(
      "UPDATE categories SET name=$1 WHERE id=$2",
      [name, id]
    )
  }

  return NextResponse.json({ success: true })
}