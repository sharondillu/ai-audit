import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { supabase } from "../utils/supabaseClient";
import { generateAudit } from "../utils/auditEngine";
import "./RerunPage.css";
import { detectPricingChanges }
from "../utils/detectPricingChanges";


export default function RerunPage() {
  const { id } = useParams();
  const [oldAudit, setOldAudit] = useState(null);
  const [newAudit, setNewAudit] = useState(null);

  const [pricingChanges, setPricingChanges] =
 useState([]);

  useEffect(() => {
    const fetchAudit = async () => {
      const { data, error } = await supabase
        .from("audits")
        .select("*")
        .eq("report_id", id)
        .single();

      if (error) {
        console.error(error);
        return;
      }

      // ✅ parse if string
      const parsedOld = typeof data.audit_result === "string"
        ? JSON.parse(data.audit_result)
        : data.audit_result;



      const parsedInput = typeof data.input_stack === "string"
        ? JSON.parse(data.input_stack)
        : data.input_stack;

        
      setOldAudit(parsedOld);

      const changes =
 detectPricingChanges(
   data.pricing_snapshot,
   data.input_stack
 );

setPricingChanges(changes);


      setNewAudit(generateAudit(parsedInput)); // ✅ pass parsed object
    };

    fetchAudit();
  }, [id]);

  if (!oldAudit || !newAudit) return <p>Loading...</p>;

  const savingsDelta = newAudit.monthlySavings - oldAudit.monthlySavings;

  return (
    <div className="rerun-container">
      <h1 className="rerun-title">Re-Audit Comparison</h1>

      <div className="headline-card">
        <h2>Savings Impact</h2>
        <p>Old Monthly Savings: <strong>${oldAudit.monthlySavings}</strong></p>
        <p>New Monthly Savings: <strong>${newAudit.monthlySavings}</strong></p>
        <p className={`delta ${savingsDelta > 0 ? "positive" : savingsDelta < 0 ? "negative" : ""}`}>
          Difference: <strong>{savingsDelta > 0 ? "+" : ""}{savingsDelta}/month</strong>
        </p>
      </div>
    <div className="pricing-summary">

 <h2>
   Pricing Changes Detected
 </h2>

 {
   pricingChanges.length === 0 ? (

     <p>
       No pricing changes detected.
     </p>

   ) : (

     pricingChanges.map(
       (change, index) => (

         <div
           key={index}
           className="pricing-change-card"
        >

           <p>

             <strong>
               {change.tool}
             </strong>

             {" "}
             {change.plan}

           </p>

           <p>

             ${change.oldPrice}

             {" → "}

             ${change.newPrice}

           </p>

         </div>
       )
     )
   )
 }

</div>








      <div className="comparison-grid">
        <div className="audit-card">
          <h2>Previous Audit</h2>
          <p>Monthly Savings: ${oldAudit.monthlySavings}</p>
          <p>Annual Savings: ${oldAudit.annualSavings}</p>
          <h3>Breakdown</h3>
          {oldAudit.breakdown?.length > 0 ? (
    <ul>
      {oldAudit.breakdown.map((item, i) => (
        <li key={i}>
          <strong>{item.tool}</strong> — {item.recommendation}
          <span> (${item.savings}/mo)</span>
        </li>
      ))}
    </ul>
  ) : (
    <p style={{ color: "#999" }}>No breakdown data in saved audit.</p>
  )}
        </div>

        <div className="audit-card">
          <h2>Updated Audit</h2>
          <p>Monthly Savings: ${newAudit.monthlySavings}</p>
          <p>Annual Savings: ${newAudit.annualSavings}</p>
          <h3>Breakdown</h3>
          <ul>
            {newAudit.breakdown?.map((item, i) => {
              // ✅ highlight changed recommendations
              const oldItem = oldAudit.breakdown?.find(o => o.tool === item.tool);
              const changed = oldItem?.savings !== item.savings;
              return (
                <li key={i} style={{ color: changed ? "#6366f1" : "inherit" }}>
                  <strong>{item.tool}</strong>
                  {changed && <span> ● </span>}
                  — {item.recommendation}
                  <span> (${item.savings}/mo</span>
                  {changed && oldItem &&
                    <span style={{ color: "#999" }}> was ${oldItem.savings}</span>
                  }
                  <span>)</span>
                </li>
              );
            })}
          </ul>
        </div>
      </div>
    </div>
  );
}