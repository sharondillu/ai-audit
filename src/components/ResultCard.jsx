import { generateSummary } from "../utils/generateSummary";
import { useEffect,useState } from "react";

import "./ResultCard.css";
import { supabase } from "../utils/supabaseClient";

function ResultCard({ result,formData }) {
 const [email, setEmail] = useState("");
 const [saved, setSaved] = useState(false);
 const [loading, setLoading] = useState(false);
  const [summary, setSummary] = useState("");           
  const [summaryLoading, setSummaryLoading] = useState(false); 
const [shareUrl, setShareUrl] = useState("");

 useEffect(() => {
  if(result){
 setSaved(false);
 setEmail(""); // optional reset
 setSummary("");
 setLoading(false);
  }
}, [result]);

 if (!result) {
   return (
     <div className="result-container">
       <div className="result-card empty">
         Run an Audit to discover hidden savings in your AI stack
       </div>
     </div>
   );
 }
//const summary = generateSummary(result);

 const { monthlySavings, annualSavings, breakdown } = result;

 const isHigh = monthlySavings > 500;
 const isLow = monthlySavings < 100;

  const handleGenerateSummary = () => {
    if (!formData || !result) {
      alert("Please run the audit first");
      return;
    }

    setSummaryLoading(true);

    setTimeout(() => {
      try {
        const generatedSummary = generateSummary(formData, result);
        console.log("Generated Summary:", generatedSummary); // For debugging
        setSummary(generatedSummary || "Summary generated successfully.");
      } catch (err) {
        console.error(err);
        setSummary("Based on your audit, there are opportunities to optimize your AI spending.");
      }
      setSummaryLoading(false);
    }, 1000);
  };





 const handleSave = async () => {
   if (!email) return alert("Enter email");
   if(!email.includes("@")){
    alert("Please Enter a valid email");
    return;
   }

    const reportId = generateId();


   setLoading(true);

   const { error } = await supabase.from("leads").insert([
     {
       email,
      report_id: reportId,
       monthly_savings: result.monthlySavings,
     annual_savings: result.annualSavings,
     audit_data: result,
    
      // monthly_savings: monthlySavings,
      // annual_savings: annualSavings,
     },
   ]);

   setLoading(false);

   if (error) {
     console.error(error);
   } else {
     setSaved(true);
     setShareUrl(`${window.location.origin}/report/${reportId}`);
   }
 };
const generateId = () => {
 return Math.random().toString(36).substring(2, 10);
};







 return (
   <div className="result-container">
     <div className="result-card">

       {/* HERO */}
       <div className="hero">
         <h2>You can save</h2>
         <h1>${monthlySavings}/month</h1>
         <p>${annualSavings}/year</p>
       </div>

       {/* CONDITIONAL MESSAGE */}
       {isHigh && (
         <div className="highlight danger">
           🚀 You’re overspending significantly.  
           Talk to Credex to capture these savings.
         </div>
       )}

       {isLow && (
         <div className="highlight success">
           ✅ You’re spending well. No major optimizations needed.
         </div>
       )}

       {/* BREAKDOWN */}
       <div className="breakdown">
         <h3>Breakdown</h3>

         {breakdown.map((item, index) => (
           <div key={index} className="breakdown-item">
             <div>
               <strong>{item.tool}</strong>
               <p>{item.recommendation}</p>
             </div>

             <div className="savings">
               ${item.savings}
             </div>
           </div>
         ))}
       </div>

        {/* Personalized Summary */}
        <div style={{ marginTop: "40px" }}>
          <button
            onClick={handleGenerateSummary}
            disabled={summaryLoading}
            style={{
              width: "100%",
              padding: "16px",
              fontSize: "1.1rem",
              backgroundColor: "#6366f1",
              color: "white",
              border: "none",
              borderRadius: "12px",
              cursor: "pointer",
              fontWeight: "600"
            }}
          >
            {summaryLoading ? "Generating..." : "✨ Generate Personalized Summary"}
          </button>

          {summary && (
            <div className="recommendation-box" style={{ marginTop: "20px", textAlign: "left" }}>
              <h3>Personalized Summary</h3>
              <p>{summary}</p>
            </div>
          )}
        </div>







       {/* CTA SECTION */}

       {!saved ? (
         <div className="cta-box">

           {isHigh ? (
             <>
               <h3>Book a free Credex consultation</h3>
               <p>We’ll help you reduce your AI spend further.</p>

               <input
                 type="email"
                 placeholder="Work email"
                 value={email}
                 onChange={(e) => setEmail(e.target.value)}
               />

               <button onClick={handleSave} disabled={loading}>
                 {loading ? "Booking..." : "Book Consultation"}
               </button>
             </>
           ) : (
             <>
               <h3>Stay updated</h3>
               <p>We’ll notify you when new optimizations apply.</p>

               <input
                 type="email"
                 placeholder="Your email"
                 value={email}
                 onChange={(e) => setEmail(e.target.value)}
               />

               <button onClick={handleSave} disabled={loading}>
                 {loading ? "Saving..." : "Notify Me"}
               </button>
             </>
           )}

         </div>
       ) : (
         <div className="success-box">
           ✅ Saved! 
          Your audit is ready to share.
         
          <div className="share-box">
   <p>Share your result:</p>
   <div className="share-row">
   <input value={shareUrl} readOnly />
   <button onClick={() => navigator.clipboard.writeText(shareUrl)}>
 Copy Link
</button></div>
 </div></div>
        

       )}

     </div>
   </div>
 );
}

export default ResultCard;
