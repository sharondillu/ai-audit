import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { supabase } from "../utils/supabaseClient";
import ResultCard from "../components/ResultCard";

function ReportPage() {
  const { id:reportId } = useParams();
  const [result, setResult] = useState(null);
  const [formData, setFormData] = useState(null); // ✅ separate state for formData
  const [loading, setLoading] = useState(true);
  const [notFound, setNotFound] = useState(false); // ✅ handle missing report

console.log("reportId from URL:", reportId); 

  
  useEffect(() => {
    const fetchReport = async () => {
      try {
        const { data, error } = await supabase
          .from("audits")
          .select("*")
          .eq("report_id", reportId)
          .maybeSingle();
          console.log("RAW data from Supabase:", data);
console.log("audit_result:", data?.audit_result);
console.log("typeof audit_result:", typeof data?.audit_result);
console.log("monthlySavings:", data?.audit_result?.monthlySavings);

        if (error) {
          console.error("Supabase error:", error);
          setLoading(false);
          return;
        }

        if (!data) {
          console.log("No Report Found");
          setNotFound(true);  // ✅ show a proper message
          setLoading(false);
          return;
        }

        const rawResult = data.audit_result;
        const parsedResult = typeof rawResult === "string"
          ? JSON.parse(rawResult)
          : rawResult;

        // ✅ ADD HERE — parse input_stack safely
        const rawInput = data.input_stack;
        const parsedInput = rawInput
          ? (typeof rawInput === "string" ? JSON.parse(rawInput) : rawInput)
          : null;

        setResult(parsedResult);
        setFormData(parsedInput);
      } catch (err) {
        console.error("Unexpected error:", err);
      } finally {
        setLoading(false); // ✅ always runs, avoids infinite spinner
      }
    };

    if (reportId) fetchReport(); // ✅ guard against undefined reportId
  }, [reportId]);

  if (loading) return <p>Loading...</p>;

  if (notFound) return <p>Report not found. The link may be invalid or expired.</p>; // ✅

  if (!result) return <p>No result data available.</p>; // ✅ guard against null result render crash

  return (
    <div style={{ padding: "20px" }}>
      <ResultCard result={result} formData={formData} readOnly={true}/> {/* ✅ formData from input_stack */}
    </div>
  );
}

export default ReportPage;