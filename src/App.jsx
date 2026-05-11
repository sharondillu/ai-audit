// src/App.jsx

import { useState } from "react";

import Header from "./components/Header";
import AuditForm from "./components/AuditForm";
import ResultCard from "./components/ResultCard";
import {generateAudit} from "./utils/auditEngine";
import "./App.css";
/* =========================
  PRICING DATA
========================= 
const ALTERNATIVES = {
 "Coding / Software Development": ["GitHub Copilot", "Cursor"],
 "Writing / Content Creation": ["ChatGPT", "Claude"],
 "Data Analysis / Research": ["Claude", "Gemini"],
 "Mixed / Multiple Use Cases": ["ChatGPT", "Claude", "GitHub Copilot"],
};

/* =========================
  PRICING DATA
========================= 

const PRICING = {
 ChatGPT: {
   Plus: 20,
   Team: 25,
   Enterprise: 60,
 },
 "GitHub Copilot": {
   Individual: 10,
   Business: 19,
   Enterprise: 39,
 },
 Claude: {
   Pro: 20,
   Team: 30,
   Enterprise: 60,
 },
 Gemini: {
   Pro: 20,
   Ultra: 30,
 },
 Cursor: {
   Hobby: 0,
   Pro: 20,
   Business: 40,
 },
};

const evaluateTool = (toolData, useCase) => {
 const { tool, plan, users, cost } = toolData;

 if (!PRICING[tool]) {
   return {
     tool,
     savings: 0,
     recommendation: "Pricing data not available.",
   };
 }

 // Handle API tools
 if (plan === "API") {
   return {
     tool,
     savings: 0,
     recommendation:
       "API pricing depends on usage (tokens/requests). Monitor usage dashboards to optimize cost.",
   };
 }

 const pricePerUser = PRICING[tool][plan]?.price || 0;
 const expectedCost = pricePerUser * users;
 
 // 🔹 Find best plan
 let bestPlan = plan;
 let bestCost = expectedCost;

 Object.entries(PRICING[tool]).forEach(([p, data]) => {
   const total = data.price * users;
   if (total < bestCost) {
     bestCost = total;
     bestPlan = p;
   }
 });

 // 🔹 Alternative tools
 const alternatives = ALTERNATIVES[useCase] || [];

 let bestAlt = null;
 let bestAltCost = Infinity;

 alternatives.forEach((alt) => {
   const plans = PRICING[alt];
   if (!plans) return;

   Object.entries(plans).forEach(([p, data]) => {
     const total = data.price * users;
     if (total < bestAltCost) {
       bestAltCost = total;
       bestAlt = `${alt} (${p})`;
     }
   });
 });

 let savings = 0;
let recommendation;

 /* =========================
    CASE 1: Overpaying
 ========================= 
 if (cost > expectedCost) {
   savings = cost - expectedCost;

   recommendation = `You are paying $${savings} more than expected for ${tool}. This may indicate unused seats or incorrect billing.`;
 }

 /* =========================
    CASE 2: Better plan
 ========================= 
 else if (bestCost < expectedCost) {
   savings = expectedCost - bestCost;

   recommendation = `Switch from ${plan} → ${bestPlan} to save $${savings}/month while maintaining the same usage.`;
 }

 /* =========================
    CASE 3: Better alternative
 ========================= 
 else if (bestAltCost < expectedCost) {
   savings = expectedCost - bestAltCost;

   recommendation = `${tool} may be overkill for your use case. Consider switching to ${bestAlt} to save $${savings}/month.`;
 }

 /* =========================
    CASE 4: Efficient
 ========================= 
 else {
   recommendation =
     "Your current setup is cost-efficient based on your usage and team size.";
 }

 /* =========================
    USE CASE INSIGHT
 ========================= 

 if (useCase === "Coding / Software Development" && tool === "ChatGPT") {
   recommendation +=
     " For coding workflows, tools like GitHub Copilot or Cursor may provide better developer productivity.";
 }

 if (useCase === "Writing / Content Creation" && tool === "GitHub Copilot") {
   recommendation +=
     " Copilot is optimized for coding. Consider ChatGPT or Claude for writing tasks.";
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
