import { pool } from "@/lib/db"


import { transporter } from "@/lib/mailer"

export async function POST(req: Request) {
  const { name, business_name, mobile, email, city, message } = await req.json()

  const result = await pool.query(
    `INSERT INTO distributor_enquiries 
     (name, business_name, mobile, email, city, message)
     VALUES ($1,$2,$3,$4,$5,$6)
     RETURNING *`,
    [name, business_name, mobile, email, city, message]
  )

 // 1️⃣ Admin Notification Email
await transporter.sendMail({
  from: `"Virasat Organics" <${process.env.SMTP_EMAIL}>`,
  to: process.env.SMTP_EMAIL,
  subject: "New Distributor Enquiry Received",
  html: `
    <h2>New Distributor Lead</h2>
    <p><b>Name:</b> ${name}</p>
    <p><b>Business:</b> ${business_name}</p>
    <p><b>Mobile:</b> ${mobile}</p>
    <p><b>Email:</b> ${email}</p>
    <p><b>City:</b> ${city}</p>
    <p><b>Message:</b> ${message}</p>
  `,
})


// 2️⃣ Thank You Email To Distributor
await transporter.sendMail({
  from: `"Virasat Organics" <${process.env.SMTP_EMAIL}>`,
  to: email,
  subject: "Thank You for Your Interest in Virasat Organics",
  html: `
    <div style="font-family: Arial, sans-serif; line-height: 1.6;">
      
      <h2 style="color:#15803d;">Thank You, ${name}!</h2>
      
      <p>
        We appreciate your interest in becoming a distributor for 
        <strong>Virasat Organics</strong>.
      </p>

      <p>
        We have received your enquiry and our team will contact you shortly.
      </p>

      <hr />

      <h3>Your Submitted Details:</h3>
      <p><b>Name:</b> ${name}</p>
      <p><b>Business Name:</b> ${business_name}</p>
      <p><b>Mobile:</b> ${mobile}</p>
      <p><b>Email:</b> ${email}</p>
      <p><b>City:</b> ${city}</p>

      <hr />

      <h3>Contact Us</h3>
      <p>
        <strong>Virasat India Organics</strong><br/>
        📞 Mobile: 9236399160<br/>
        🌐 Website: www.virasatorganics.com<br/>
        📍 Address: Plot No-3, Chandiyamau, Uttar Pradesh 226010
      </p>

      <p style="margin-top:20px;">
        We look forward to building a successful partnership with you.
      </p>

      <p style="color:#15803d; font-weight: bold;">
        Team Virasat Organics
      </p>

    </div>
  `,
})

  return Response.json({ success: true })
}



export async function GET() {
  const result = await pool.query(
    "SELECT * FROM distributor_enquiries ORDER BY created_at DESC"
  )

  return Response.json(result.rows)
}


export async function PATCH(req: Request) {
  const { id, status } = await req.json()

  await pool.query(
    "UPDATE distributor_enquiries SET status=$1 WHERE id=$2",
    [status, id]
  )

  return Response.json({ success: true })
}