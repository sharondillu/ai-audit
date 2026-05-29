import { useState } from "react";
import { sendPricingUpdateEmail } from "../utils/sendEmail";
import { supabase } from "../utils/supabaseClient";
import { detectPricingChanges } from "../utils/detectPricingChanges";

export default function AdminPage() {
  const [results, setResults] = useState([]);
  const [checked, setChecked] = useState(false);
  const [sending, setSending] = useState(false);

  const checkAudits = async () => {
    setSending(true);

    const { data, error } = await supabase
      .from("audits")
      .select("*");

    if (error) {
      console.error(error);
      setSending(false);
      return;
    }

    console.log("Total audits fetched:", data.length);

    const affectedAudits = [];

    for (const audit of data) {
      const changes = detectPricingChanges(
        audit.pricing_snapshot,
        audit.input_stack
      );

      if (changes.length > 0) {
        affectedAudits.push({
          email: audit.email,
          reportId: audit.report_id,
          changes,
        });

        await sendPricingUpdateEmail({
          email: audit.email,
          reportId: audit.report_id,
          changes,
        });
      }
    } // ✅ correct closing brace for for...of

    setResults(affectedAudits);
    setChecked(true);
    setSending(false);
    console.log("Affected audits:", affectedAudits);
  };

  return (
    <div style={{ padding: "20px", maxWidth: "800px", margin: "0 auto" }}>
      <h1>Pricing Change Detection</h1>

      <button
        onClick={checkAudits}
        disabled={sending}
        style={{
          padding: "12px 24px",
          background: sending ? "#475569" : "#6366f1",
          color: "white",
          border: "none",
          borderRadius: "8px",
          cursor: sending ? "not-allowed" : "pointer",
          fontWeight: "600",
          fontSize: "1rem",
        }}
      >
        {sending ? "Checking & Sending..." : "Check Audits"}
      </button>

      {checked && results.length === 0 && (
        <p style={{ color: "orange", marginTop: "16px" }}>
          ⚠️ No pricing changes detected. Either prices haven't changed,
          or input_stack is null in Supabase rows.
        </p>
      )}

      {results.length > 0 && (
        <div style={{ marginTop: "20px" }}>
          <h3>🔴 {results.length} audit(s) affected — emails sent:</h3>
          {results.map((r, i) => (
            <div key={i} style={{
              padding: "16px",
              marginBottom: "12px",
              background: "#1e1e2e",
              borderRadius: "8px",
              border: "1px solid #334155",
            }}>
              <p><strong>Email:</strong> {r.email}</p>
              <p><strong>Report ID:</strong> {r.reportId}</p>
              <strong>Changes:</strong>
              {r.changes.map((c, j) => (
                <p key={j} style={{ color: "#f87171", margin: "4px 0" }}>
                  {c.tool} {c.plan}: ${c.oldPrice} → ${c.newPrice}
                </p>
              ))}
            </div>
          ))}
        </div>
      )}
    </div>
  );
}