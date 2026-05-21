import { useState } from "react";
import { supabase } from "../utils/supabaseClient";
import { detectPricingChanges } from "../utils/detectPricingChanges";

export default function AdminPage() {
  const [results, setResults] = useState([]);
  const [checked, setChecked] = useState(false);

  const checkAudits = async () => {
    const { data, error } = await supabase
      .from("audits")
      .select("*");

    if (error) {
      console.error(error);
      return;
    }

    console.log("Total audits fetched:", data.length);

    const affectedAudits = [];

    data.forEach((audit) => {
      // ✅ log each row so you can see what's null
      console.log("Audit row:", {
        report_id: audit.report_id,
        has_snapshot: !!audit.pricing_snapshot,
        has_input_stack: !!audit.input_stack,
      });

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
      }
    });

    setResults(affectedAudits);
    setChecked(true);
    console.log("Affected audits:", affectedAudits);
  };

  return (
    <div style={{ padding: "20px" }}>
      <h1>Pricing Change Detection</h1>
      <button onClick={checkAudits}>Check Audits</button>

      {checked && results.length === 0 && (
        <p style={{ color: "orange", marginTop: "16px" }}>
          ⚠️ No pricing changes detected. Either prices haven't changed,
          or input_stack is null in Supabase rows.
        </p>
      )}

      {results.length > 0 && (
        <div style={{ marginTop: "20px" }}>
          <h3>🔴 {results.length} audit(s) affected by pricing changes:</h3>
          {results.map((r, i) => (
            <div key={i} style={{
              padding: "16px", marginBottom: "12px",
              background: "#1e1e2e", borderRadius: "8px"
            }}>
              <p><strong>Email:</strong> {r.email}</p>
              <p><strong>Report ID:</strong> {r.reportId}</p>
              <strong>Changes:</strong>
              {r.changes.map((c, j) => (
                <p key={j} style={{ color: "#f87171" }}>
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