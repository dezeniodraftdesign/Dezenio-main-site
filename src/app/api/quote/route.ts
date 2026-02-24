import { NextResponse } from "next/server";
import { Resend } from "resend";

const resend = new Resend(process.env.RESEND_API_KEY);

export async function POST(req: Request) {
  try {
    const {
      name,
      email,
      phone,

      service,
      projectType,
      projectAddress,
      city,
      state,
      zip,

      desiredStart,
      budgetRange,
      heardFrom,

      message,
    } = await req.json();

    if (!name || !email) {
      return NextResponse.json(
        { ok: false, error: "Name and email are required." },
        { status: 400 },
      );
    }

    await resend.emails.send({
      from: "Dezenio Draft Design <info@dezeniodraftdesign.com>",
      to: ["info@dezeniodraftdesign.com"],
      subject: `New Quote Request — ${service || "General"} — ${name}`,
      html: `
        <h2>New Quote Request</h2>

        <h3>Contact</h3>
        <p><strong>Name:</strong> ${name}</p>
        <p><strong>Email:</strong> ${email}</p>
        <p><strong>Phone:</strong> ${phone || "N/A"}</p>

        <h3>Project</h3>
        <p><strong>Service:</strong> ${service || "N/A"}</p>
        <p><strong>Project Type:</strong> ${projectType || "N/A"}</p>
        <p><strong>Address:</strong> ${projectAddress || "N/A"}</p>
        <p><strong>City/State/ZIP:</strong> ${[city, state, zip].filter(Boolean).join(", ") || "N/A"}</p>

        <h3>Timeline & Budget</h3>
        <p><strong>Desired Start:</strong> ${desiredStart || "N/A"}</p>
        <p><strong>Budget Range:</strong> ${budgetRange || "N/A"}</p>
        <p><strong>Heard From:</strong> ${heardFrom || "N/A"}</p>

        <h3>Details</h3>
        <p>${(message || "").replace(/\n/g, "<br/>") || "N/A"}</p>
      `.trim(),
    });

    return NextResponse.json({ ok: true }, { status: 200 });
  } catch (error) {
    console.error("Quote API error:", error);
    return NextResponse.json(
      { ok: false, error: "Failed to send email." },
      { status: 500 },
    );
  }
}
