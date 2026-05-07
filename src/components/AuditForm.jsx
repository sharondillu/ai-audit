import { useState } from "react";
import "./AuditForm.css";

function AuditForm() {
 const [tool, setTool] = useState("ChatGPT");
 const [plan, setPlan] = useState("Plus");
 const [teamSize, setTeamSize] = useState("");
 const [cost, setCost] = useState("");

 const handleSubmit = (e) => {
   e.preventDefault();

   alert(
     `Tool: ${tool}\nPlan: ${plan}\nTeam Size: ${teamSize}\nMonthly Cost: $${cost}`
   );
 };

 return (
   <div className="form-container">
     <form className="audit-form" onSubmit={handleSubmit}>

       <h2 className="form-title">
         Run Your AI Spend Audit
       </h2>

       <label>AI Tool</label>
       <select
         value={tool}
         onChange={(e) => setTool(e.target.value)}
>
         <option>ChatGPT</option>
         <option>Claude</option>
         <option>GitHub Copilot</option>
         <option>Gemini</option>
         <option>Cursor</option>
       </select>

       <label>Plan Type</label>
       <select
         value={plan}
         onChange={(e) => setPlan(e.target.value)}
        >
         <option>Free</option>
         <option>Plus</option>
         <option>Pro</option>
         <option>Team</option>
         <option>Enterprise</option>
       </select>

       <label>Team Size</label>
       <input
         type="number"
         placeholder="Enter number of users"
         value={teamSize}
         onChange={(e) => setTeamSize(e.target.value)}
       />

       <label>Monthly Spend ($)</label>
       <input
         type="number"
         placeholder="Enter monthly cost"
         value={cost}
         onChange={(e) => setCost(e.target.value)}
       />

       <button type="submit">
         Generate Audit
       </button>

     </form>
   </div>
 );
}

export default AuditForm;
