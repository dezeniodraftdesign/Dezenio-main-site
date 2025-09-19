// src/app/api/quote/route.ts
import { NextResponse } from "next/server";
import { Resend } from "resend";

const resend = new Resend(process.env.RESEND_API_KEY);

// (Optional: tighten this to POST-only by exporting GET=405 if you like)
export async function POST(req: Request) {
  try {
    const { name, email, phone, service, message } = await req.json();

    // Basic validation
    if (!name || !email) {
      return NextResponse.json(
        { ok: false, error: "Name and email are required." },
        { status: 400 }
      );
    }

    // Send the email
    await resend.emails.send({
      from: "Dezenio Draft Design <info@dezeniodraftdesign.com>",
      to: ["info@dezeniodraftdesign.com"],
      subject: `New Quote Request from ${name}`,
      html: `
        <h2>New Quote Request</h2>
        <p><strong>Name:</strong> ${name}</p>
        <p><strong>Email:</strong> ${email}</p>
        <p><strong>Phone:</strong> ${phone || "N/A"}</p>
        <p><strong>Service:</strong> ${service || "N/A"}</p>
        <p><strong>Message:</strong><br/>${(message || "").replace(
          /\n/g,
          "<br/>"
        )}</p>
      `.trim(),
    });

    return NextResponse.json({ ok: true }, { status: 200 });
  } catch (error) {
    console.error("Quote API error:", error);
    return NextResponse.json(
      { ok: false, error: "Failed to send email." },
      { status: 500 }
    );
  }
}
