// src/App.jsx

import { useState } from "react";

import Header from "./components/Header";
import AuditForm from "./components/AuditForm";
import ResultCard from "./components/ResultCard";
import "./App.css";

/* =========================
  PRICING DATA
========================= */

const PRICING = {
 ChatGPT: {
   Free: 0,
   Plus: 20,
   Pro: 30,
   Team: 25,
   Enterprise: 60,
 },
 "GitHub Copilot": {
   Free: 0,
   Pro: 10,
   Team: 19,
   Enterprise: 39,
 },
 Claude: {
   Free: 0,
   Pro: 20,
   Team: 30,
   Enterprise: 60,
 },
 Gemini: {
   Free: 0,
   Pro: 20,
   Team: 30,
   Enterprise: 60,
 },
 Cursor: {
   Free: 0,
   Pro: 20,
   Team: 40,
   Enterprise: 60,
 }
};

const evaluateTool = (toolData, useCase) => {
 const { tool, plan, users, cost } = toolData;

 if (plan === "Free") {
   return {
     tool,
     savings: 0,
     recommendation:
       "You're on a free plan. Upgrade only if your usage requires advanced features.",
   };
 }

 const pricePerUser = PRICING[tool]?.[plan];

 if (pricePerUser === undefined) {
   return {
     tool,
     savings: 0,
     recommendation: "Pricing data unavailable.",
   };
 }

 const expectedCost = pricePerUser * users;

 let savings = 0;
 let recommendation = "";

 /* -------------------------
    RULE 1: Overpay
 -------------------------- */
 if (cost > expectedCost) {
   savings = cost - expectedCost;
   recommendation =
     "You're paying more than expected. This may indicate unused seats or billing inefficiencies.";
 }

 /* -------------------------
    RULE 2: Plan mismatch
 -------------------------- */
 if (users <= 2 && (plan === "Team" || plan === "Enterprise")) {
   const cheaperCost = 20 * users;

   if (cost > cheaperCost) {
     savings = cost - cheaperCost;
     recommendation =
       "For small teams, individual plans are typically more cost-efficient than Team or Enterprise tiers.";
   }
 }

 /* -------------------------
    RULE 3: USE CASE LOGIC
 -------------------------- */

 // Coding
 if (useCase === "Coding / Software Development") {
   if (tool === "ChatGPT") {
     recommendation +=
       " For coding workflows, tools like GitHub Copilot or Cursor may provide better developer productivity.";
   }
 }

 // Writing
 if (useCase === "Writing / Content Creation") {
   if (tool === "GitHub Copilot") {
     recommendation +=
       " Copilot is optimized for coding. For writing tasks, Claude or ChatGPT may be more effective.";
   }
 }

 // Research
 if (useCase === "Data Analysis / Research") {
   if (tool === "ChatGPT") {
     recommendation +=
       " For research-heavy workflows, tools like Claude or Gemini may offer better long-context understanding.";
   }
 }

 // Mixed
 if (useCase === "Mixed / Multiple Use Cases") {
   recommendation +=
     " Consider diversifying tools across use cases instead of relying on a single platform.";
 }

 /* -------------------------
    FINAL FALLBACK
 -------------------------- */
 if (savings <= 0 && recommendation === "") {
   recommendation =
     "Your current setup appears cost-efficient based on your usage.";
 }

 return {
   tool,
   savings: Math.max(0, Math.round(savings)),
   recommendation,
 };
};
const generateAudit = (data) => {
 const { tools, useCase } = data;

 let totalMonthly = 0;
 let breakdown = [];

 tools.forEach((toolItem) => {

   const cleanTool = {
     ...toolItem,
     cost: Number(toolItem.cost),
     users: Number(toolItem.users),
   };

   const result = evaluateTool(cleanTool, useCase);

   totalMonthly += result.savings;

   breakdown.push({
     tool: result.tool,
     savings: result.savings,
     recommendation: result.recommendation,
   });

 });

 return {
   monthlySavings: totalMonthly,
   annualSavings: totalMonthly * 12,
   breakdown,
 };
};

/* =========================
  APP
========================= */

function App() {
 const [result, setResult] = useState(null);

 const handleAudit = (data) => {
   const res = generateAudit(data);
   setResult(res);
 };

 return (
   <div className="app-container">
     <Header />
     <div className="main-content">
     <AuditForm onAudit={handleAudit} />
     <ResultCard result={result} />
   </div></div>
 );
}

export default App;
