import { useEffect,useState } from "react";

import "./ResultCard.css";
import { supabase } from "../utils/supabaseClient";

function ResultCard({ result }) {
 const [email, setEmail] = useState("");
 const [saved, setSaved] = useState(false);
 const [loading, setLoading] = useState(false);

 useEffect(() => {
  if(result){
 setSaved(false);
 setEmail(""); // optional reset
 setLoading(false);
  }
}, [result]);

 if (!result) {
   return (
     <div className="result-container">
       <div className="result-card empty">
         Run Audit to see your results
       </div>
     </div>
   );
 }

 const { monthlySavings, annualSavings, breakdown } = result;

 const isHigh = monthlySavings > 500;
 const isLow = monthlySavings < 100;

 const handleSave = async () => {
   if (!email) return alert("Enter email");
   if(!email.includes("@")){
    alert("Please Enter a valid email");
    return;
   }

   setLoading(true);

   const { error } = await supabase.from("leads").insert([
     {
       email,
       monthly_savings: monthlySavings,
       annual_savings: annualSavings,
     },
   ]);

   setLoading(false);

   if (error) {
     console.error(error);
   } else {
     setSaved(true);
   }
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
           ✅ Saved! We’ll be in touch.
         </div>
       )}

     </div>
   </div>
 );
}

export default ResultCard;
