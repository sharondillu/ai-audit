import { useState, useEffect } from "react";
import "./AuditForm.css";

const TOOL_CONFIG = {
 Cursor: ["Hobby", "Pro", "Business", "Enterprise"],
 "GitHub Copilot": ["Individual", "Business", "Enterprise"],
 Claude: ["Free", "Pro", "Max", "Team", "Enterprise", "API"],
 ChatGPT: ["Plus", "Team", "Enterprise", "API"],
 "Anthropic API": ["API"],
 "OpenAI API": ["API"],
 Gemini: ["Pro", "Ultra", "API"],
 Windsurf: ["Free", "Pro"],
};

function AuditForm({ onAudit }) {
 const [teamSize, setTeamSize] = useState(1);
 const [useCase, setUseCase] = useState("");
 const [tools, setTools] = useState([
   { tool: "", plan: "", users: 1, cost: "" },
 ]);
 const [error, setError] = useState("");

 /* =========================
    LOAD FROM LOCAL STORAGE
 ========================= */
 useEffect(() => {
   const saved = JSON.parse(localStorage.getItem("auditData"));
   if (saved) {
     setTeamSize(saved.teamSize || 1);
     setUseCase(saved.useCase || "");
     setTools(saved.tools || []);
   }
 }, []);

 /* =========================
    SAVE TO LOCAL STORAGE
 ========================= */
 useEffect(() => {
   localStorage.setItem(
     "auditData",
     JSON.stringify({ teamSize, useCase, tools })
   );
 }, [teamSize, useCase, tools]);

 /* =========================
    TOOL HANDLERS
 ========================= */
 const updateTool = (index, field, value) => {
   const updated = [...tools];
   updated[index][field] = value;
   setTools(updated);
 };

 const addTool = () => {
   setTools([
     ...tools,
     { tool: "", plan: "", users: 1, cost: "" },
   ]);
 };

 const removeTool = (index) => {
   const updated = tools.filter((_, i) => i !== index);
   setTools(updated);
 };

 /* =========================
    SUBMIT HANDLER
 ========================= */
 const handleSubmit = (e) => {
   e.preventDefault();

   const totalUsers = tools.reduce(
     (sum, t) => sum + Number(t.users || 0),
     0
   );

   if (totalUsers > teamSize) {
     setError("Total tool users cannot exceed team size");
     return;
   }

   for (let t of tools) {
     if (!t.tool || !t.plan) {
       setError("Please select tool and plan");
       return;
     }
   }

   setError("");

   onAudit({
     teamSize,
     useCase,
     tools,
   });
 };

 return (
   <div className="form-container">
     <form className="audit-form" onSubmit={handleSubmit}>
       <h2 className="form-title">AI Spend Audit</h2>

       {/* TEAM SIZE */}
       <label>Team Size</label>
       <input
         type="number"
         min="1"
         value={teamSize}
         onChange={(e) => setTeamSize(e.target.value)}
       />

       {/* USE CASE */}
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

       {/* TOOLS */}
       {tools.map((tool, index) => (
         <div key={index} className="tool-card">

           <label>Tool</label>
           <select
             value={tool.tool}
             onChange={(e) =>
               updateTool(index, "tool", e.target.value)
             }
              >
             <option value="">Select Tool</option>
             {Object.keys(TOOL_CONFIG).map((t) => (
               <option key={t}>{t}</option>
             ))}
           </select>

           <label>Plan</label>
           <select
             value={tool.plan}
             onChange={(e) =>
               updateTool(index, "plan", e.target.value)
             }
              >
             <option value="">Select Plan</option>
             {TOOL_CONFIG[tool.tool]?.map((p) => (
               <option key={p}>{p}</option>
             ))}
           </select>

           {tool.plan !== "API" && (
             <>
               <label>Users</label>
               <input
                 type="number"
                 value={tool.users}
                 onChange={(e) =>
                   updateTool(index, "users", e.target.value)
                 }
               />
             </>
           )}

           <label>Monthly Spend ($)</label>
           <input
             type="number"
             value={tool.cost}
             onChange={(e) =>
               updateTool(index, "cost", e.target.value)
             }
           />

           <button
             type="button"
             className="remove-btn"
             onClick={() => removeTool(index)}
             >
             Remove
           </button>
         </div>
       ))}

       <button type="button" onClick={addTool}>
         + Add Tool
       </button>

       {error && <p className="error">{error}</p>}

       <button type="submit">Run Audit</button>
     </form>
   </div>
 );
}

export default AuditForm;