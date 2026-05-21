import { serve } from "https://deno.land/std@0.168.0/http/server.ts";

const corsHeaders = {
  "Access-Control-Allow-Origin": "*",
  "Access-Control-Allow-Headers": "authorization, x-client-info, apikey, content-type",
};

serve(async (req) => {
  if (req.method === "OPTIONS") {
    return new Response("ok", { headers: corsHeaders });
  }

  try {
    const { email, reportId, changes } = await req.json();

    const changesHtml = changes.map((c) => `
      <tr>
        <td style="padding:10px 16px;border-bottom:1px solid #1e293b;color:#e2e8f0;">
          <strong>${c.tool}</strong> — ${c.plan}
        </td>
        <td style="padding:10px 16px;color:#f87171;text-decoration:line-through;">
          $${c.oldPrice}/mo
        </td>
        <td style="padding:10px 16px;color:#34d399;">
          $${c.newPrice}/mo
        </td>
      </tr>
    `).join("");

    const rerunUrl = `${Deno.env.get("APP_URL")}/rerun/${reportId}`;
    const unsubscribeUrl = `${Deno.env.get("APP_URL")}/unsubscribe/${reportId}`;

    const res = await fetch("https://api.resend.com/emails", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        "Authorization": `Bearer ${Deno.env.get("RESEND_API_KEY")}`,
      },
      body: JSON.stringify({
        from: "onboarding@resend.dev",
        to: email,
        subject: "⚡ Pricing changed on your AI stack audit",
        html: `
          <div style="max-width:600px;margin:40px auto;background:#1e293b;border-radius:16px;font-family:system-ui,sans-serif;">
            <div style="background:linear-gradient(135deg,#1e1b4b,#312e81);padding:36px 40px;text-align:center;">
              <h1 style="margin:0;color:#a78bfa;">AI Spend Audit</h1>
              <p style="color:#94a3b8;margin:8px 0 0;">Pricing changes detected</p>
            </div>
            <div style="padding:36px 40px;">
              <p style="color:#cbd5e1;">Hey 👋, pricing changed for tools in your audit. Your recommendations may be outdated.</p>
              <table style="width:100%;border-collapse:collapse;background:#0f172a;border-radius:12px;overflow:hidden;margin-bottom:32px;">
                <thead>
                  <tr style="background:#1e1b4b;">
                    <th style="padding:10px 16px;text-align:left;color:#94a3b8;font-size:0.8rem;">Tool / Plan</th>
                    <th style="padding:10px 16px;text-align:left;color:#94a3b8;font-size:0.8rem;">Old Price</th>
                    <th style="padding:10px 16px;text-align:left;color:#94a3b8;font-size:0.8rem;">New Price</th>
                  </tr>
                </thead>
                <tbody>${changesHtml}</tbody>
              </table>
              <div style="text-align:center;margin-bottom:32px;">
                <a href="${rerunUrl}" style="padding:14px 32px;background:linear-gradient(135deg,#6366f1,#8b5cf6);color:white;border-radius:10px;text-decoration:none;font-weight:600;">
                  View Updated Audit →
                </a>
              </div>
              <p style="color:#64748b;font-size:0.85rem;border-top:1px solid #334155;padding-top:24px;">
                <a href="${unsubscribeUrl}" style="color:#6366f1;">Unsubscribe</a>
              </p>
            </div>
          </div>
        `,
      }),
    });

    const data = await res.json();
    return new Response(JSON.stringify(data), {
      headers: { ...corsHeaders, "Content-Type": "application/json" },
    });

  } catch (err) {
    return new Response(JSON.stringify({ error: err.message }), {
      status: 500,
      headers: { ...corsHeaders, "Content-Type": "application/json" },
    });
  }
});