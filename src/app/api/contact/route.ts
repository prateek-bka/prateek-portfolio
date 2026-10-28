import nodemailer from "nodemailer";

// Emails contact-form messages via Gmail SMTP. Env (tara .env only):
// GMAIL_USER, GMAIL_APP_PASSWORD, CONTACT_TO (defaults to GMAIL_USER).

const hits = new Map<string, number[]>();
const WINDOW_MS = 60 * 60 * 1000;
const MAX_PER_WINDOW = 5;

const esc = (s: string) => s.replace(/[&<>"']/g, (c) => `&#${c.charCodeAt(0)};`);

export async function POST(req: Request) {
  const ip = req.headers.get("x-forwarded-for")?.split(",")[0].trim() ?? "unknown";
  const now = Date.now();
  const recent = (hits.get(ip) ?? []).filter((t) => now - t < WINDOW_MS);
  if (recent.length >= MAX_PER_WINDOW) {
    return Response.json({ error: "Too many messages — please try again later." }, { status: 429 });
  }

  const body = await req.json().catch(() => null);
  const name = String(body?.name ?? "").trim().slice(0, 100);
  const email = String(body?.email ?? "").trim().slice(0, 200);
  const message = String(body?.message ?? "").trim().slice(0, 5000);
  if (body?.company) return Response.json({ ok: true });
  if (!name || !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email) || message.length < 10) {
    return Response.json({ error: "Please fill in your name, a valid email and a message." }, { status: 400 });
  }

  const { GMAIL_USER, GMAIL_APP_PASSWORD, CONTACT_TO } = process.env;
  if (!GMAIL_USER || !GMAIL_APP_PASSWORD) {
    return Response.json({ error: "The form isn't set up yet — please email me directly." }, { status: 503 });
  }

  recent.push(now);
  hits.set(ip, recent);

  const mail = nodemailer.createTransport({
    host: "smtp.gmail.com",
    port: 465,
    secure: true,
    auth: { user: GMAIL_USER, pass: GMAIL_APP_PASSWORD.replace(/\s/g, "") },
  });
  try {
    await mail.sendMail({
      from: `"prateekagrawal.com" <${GMAIL_USER}>`,
      to: CONTACT_TO || GMAIL_USER,
      replyTo: `"${name.replace(/"/g, "")}" <${email}>`,
      subject: `Portfolio message from ${name}`,
      text: `${name} <${email}>\n\n${message}`,
      html: `<p><b>${esc(name)}</b> &lt;${esc(email)}&gt;</p><p style="white-space:pre-wrap">${esc(message)}</p>`,
    });
  } catch {
    return Response.json({ error: "Couldn't send right now — please email me directly." }, { status: 502 });
  }
  return Response.json({ ok: true });
}
