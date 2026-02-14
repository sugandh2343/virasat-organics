import OpenAI from "openai"

const openai = new OpenAI({
  apiKey: process.env.OPENAI_API_KEY,
})

export async function POST(req: Request) {
  try {
    const { title } = await req.json()

    // Generate description + keywords
    const text = await openai.chat.completions.create({
      model: "gpt-4.1-mini",
      messages: [
        {
          role: "system",
          content: `
You are an expert organic product copywriter for an Indian organic store.
Generate:
1. Short product description (2-3 lines)
2. SEO search keywords (comma separated)

Keep it natural, organic, health-focused.
          `,
        },
        {
          role: "user",
          content: `Product: ${title}`,
        },
      ],
    })

    const content = text.choices[0].message.content || ""

    // Generate product image
    const image = await openai.images.generate({
      model: "gpt-image-1",
      prompt: `Realistic product packaging photo of organic ${title}, eco-friendly pack, white background, ecommerce style`,
      size: "1024x1024",
    })

    return Response.json({
      content,
      image_url: image.data[0].url,
    })
  } catch (error) {
    console.error(error)
    return Response.json({ error: "AI generation failed" }, { status: 500 })
  }
}
