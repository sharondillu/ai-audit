import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { supabase } from "../utils/supabaseClient";

function ReportPage() {
 const { id } = useParams();
 const [result, setResult] = useState(null);

 useEffect(() => {
   const fetchReport = async () => {
     const { data, error } = await supabase
       .from("leads")
       .select("audit_data")
       .eq("report_id", id)
       .single();

     if (error) {
       console.error(error);
     } else {
       setResult(data.audit_data);
     }
   };

   fetchReport();
 }, [id]);

 if (!result) return <p>Loading...</p>;

 return (
   <div style={{ padding: "20px" }}>
     <h1>${result.monthlySavings}/month</h1>
     <p>${result.annualSavings}/year</p>

     <h3>Breakdown</h3>
     {result.breakdown.map((item, i) => (
       <div key={i}>
         <strong>{item.tool}</strong>
         <p>{item.recommendation}</p>
         <p>${item.savings}</p>
       </div>
     ))}
   </div>
 );
}

export default ReportPage;
