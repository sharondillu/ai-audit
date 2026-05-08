// src/components/AuditForm.jsx

import { useState, useEffect } from "react";
import "./AuditForm.css";

/* =========================
  TOOL PLAN CONFIG
========================= */

const TOOL_PLANS = {
 ChatGPT: ["Free", "Plus", "Pro", "Team", "Enterprise"],
 Claude: ["Free", "Pro", "Team", "Enterprise"],
 "GitHub Copilot": ["Free", "Pro", "Team", "Enterprise"],
 Gemini: ["Free", "Pro", "Team", "Enterprise"],
 Cursor: ["Free", "Pro", "Team", "Enterprise"],
};

function AuditForm({ onAudit }) {
 /* =========================
    STATE
 ========================= */

 const [teamSize, setTeamSize] = useState(1);
 const [useCase, setUseCase] = useState("");

 const [tools, setTools] = useState([
   {
     tool: "ChatGPT",
     plan: "Plus",
     cost: "",
     users: 1,
   },
 ]);

 /* =========================
    LOAD FROM LOCAL STORAGE
 ========================= */

 useEffect(() => {
   const saved = localStorage.getItem("auditData");

   if (saved) {
     const parsed = JSON.parse(saved);

     setTeamSize(Number(parsed.teamSize) || 1);
     setUseCase(parsed.useCase || "");
     setTools(parsed.tools || [{
        tool:"ChatGPT",
        plan:"plus",
        cost:"",
        users:1,
     },
    ]);
   }
 }, []);

 /* =========================
    SAVE TO LOCAL STORAGE
 ========================= */

 useEffect(() => {
   const data = { teamSize, useCase, tools };
   localStorage.setItem("auditData", JSON.stringify(data));
 }, [teamSize, useCase, tools]);

 /* =========================
    HANDLERS
 ========================= */

 const addTool = () => {
   setTools([
     ...tools,
     {
       tool: "ChatGPT",
       plan: "Plus",
       cost: "",
       users: 1,
     },
   ]);
 };

 const removeTool = (index) => {
   const updated = tools.filter((_, i) => i !== index);
   setTools(updated);
 };

 const updateTool = (index, field, value) => {
   const updated = [...tools];

   updated[index][field] = value;

   // ✅ Auto-set cost for free plan
   if (field === "plan" && value === "Free") {
     updated[index].cost = 0;
   }

   setTools(updated);
 };

 /* =========================
    SUBMIT
 ========================= */

 const handleSubmit = () => {
   onAudit({
     teamSize,
     useCase,
     tools,
   });
 };

 /* =========================
    UI
 ========================= */

 return (
   <div className="audit-form">

     <h2>AI Spend Audit</h2>

     {/* ===== Overall Info ===== */}
     <div className="section">
       <h3>Overall Information</h3>

       <label>Total Team Size</label>
       <input
         type="number"
         min="1"
         value={teamSize}
         onChange={(e) => setTeamSize(Number(e.target.value))}
       />

       <label>Primary Use Case</label>
       <select
         value={useCase}
         onChange={(e) => setUseCase(e.target.value)}
        >
         <option value="">Select</option>
         <option>Coding / Software Development</option>
         <option>Writing / Content Creation</option>
         <option>Data Analysis / Research</option>
         <option>Mixed / Multiple Use Cases</option>
         <option>Other</option>
       </select>

       <p className="form-hint">
         Add all AI tools your team currently uses for accurate results.
       </p>
     </div>

     {/* ===== Tools Section ===== */}
     <div className="section">
       <h3>Tools</h3>

       {tools.map((item, index) => (
         <div key={index} className="tool-card">

           {/* Tool Name */}
           <label>Tool</label>
           <select
             value={item.tool}
             onChange={(e) => {
               const selectedTool = e.target.value;
               const defaultPlan = TOOL_PLANS[selectedTool][0];

               updateTool(index, "tool", selectedTool);
               updateTool(index, "plan", defaultPlan);
             }}
              >
             {Object.keys(TOOL_PLANS).map((tool) => (
               <option key={tool}>{tool}</option>
             ))}
           </select>

           {/* Plan */}
           <label>Plan</label>
           <select
             value={item.plan}
             onChange={(e) =>
               updateTool(index, "plan", e.target.value)
             }
             >
             {TOOL_PLANS[item.tool].map((plan) => (
               <option key={plan}>{plan}</option>
             ))}
           </select>

           {/* Cost */}
           <label>Monthly Spend ($)</label>
           <input
             type="number"
             value={item.cost}
             disabled={item.plan === "Free"}
             onChange={(e) =>
               updateTool(index, "cost", Number(e.target.value))
             }
           />

           {item.plan === "Free" && (
             <p className="hint">
               Free plan — no cost applicable
             </p>
           )}

           {/* Users */}
           <label>Users</label>
           <input className="half"
             type="number"
             min="1"
             value={item.users}
             onChange={(e) =>
               updateTool(index, "users", Number(e.target.value))
             }
           />

           {/* Remove */}
           {tools.length > 1 && (
             <button
               className="remove-btn"
               onClick={() => removeTool(index)}
              >
               Remove
             </button>
           )}
         </div>
       ))}

       {/* Add Tool */}
       <button className="add-btn" onClick={addTool}>
         + Add Tool
       </button>
     </div>

     {/* Submit */}
     <button className="submit-btn" onClick={handleSubmit}>
       Run Audit
     </button>

   </div>
 );
}

export default AuditForm;