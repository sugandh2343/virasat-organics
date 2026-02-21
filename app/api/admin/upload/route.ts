import { NextRequest } from "next/server"
import fs from "fs"
import path from "path"

export async function POST(req: NextRequest) {
  try {
    const formData = await req.formData()
    const type = formData.get("type") as string // "product" or "category"

    const uploadDir = path.join(process.cwd(), "public/uploads")

    if (!fs.existsSync(uploadDir)) {
      fs.mkdirSync(uploadDir, { recursive: true })
    }

    // ===============================
    // 🟢 PRODUCT MULTIPLE IMAGES
    // ===============================
    if (type === "product") {
      const files = formData.getAll("files") as File[]

      if (!files || files.length === 0) {
        return Response.json({ error: "No files uploaded" }, { status: 400 })
      }

      const uploadedUrls: string[] = []

      for (const file of files) {
        const bytes = await file.arrayBuffer()
        const buffer = Buffer.from(bytes)

        const fileName = `${Date.now()}-${file.name}`
        const filePath = path.join(uploadDir, fileName)

        fs.writeFileSync(filePath, buffer)

        uploadedUrls.push(`/uploads/${fileName}`)
      }

      return Response.json({ urls: uploadedUrls })
    }

    // ===============================
    // 🟢 CATEGORY SINGLE IMAGE
    // ===============================
    if (type === "category") {
      const file = formData.get("file") as File
      const oldImage = formData.get("oldImage") as string | null

      if (!file) {
        return Response.json({ error: "No file uploaded" }, { status: 400 })
      }

      // Delete old image if exists
      if (oldImage) {
        const oldPath = path.join(process.cwd(), "public", oldImage)
        if (fs.existsSync(oldPath)) {
          fs.unlinkSync(oldPath)
        }
      }

      const bytes = await file.arrayBuffer()
      const buffer = Buffer.from(bytes)

      const fileName = `${Date.now()}-${file.name}`
      const filePath = path.join(uploadDir, fileName)

      fs.writeFileSync(filePath, buffer)

      return Response.json({
  url: `/uploads/${fileName}`,
})
    }

    return Response.json({ error: "Invalid upload type" }, { status: 400 })

  } catch (error) {
    console.error(error)
    return Response.json({ error: "Upload failed" }, { status: 500 })
  }
}