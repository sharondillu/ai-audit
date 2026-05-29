
/* =========================
  PRICING DATA
========================= */

export const PRICING = {
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
   Team: 60,
   Enterprise: 60,
 },
 Gemini: {
   Pro: 20,
   Ultra: 30,
 },
 Cursor: {
   Hobby: 0,
   Pro: 50,
   Business: 40,
 },
};

/* =========================
  ALTERNATIVES
========================= */

const ALTERNATIVES = {
 "Coding / Software Development": ["GitHub Copilot", "Cursor"],
 "Writing / Content Creation": ["ChatGPT", "Claude"],
 "Data Analysis / Research": ["Claude", "Gemini"],
 "Mixed / Multiple Use Cases": ["ChatGPT", "Claude", "GitHub Copilot"],
};

/* =========================
  EVALUATE TOOL
========================= */

export const evaluateTool = (toolData, useCase) => {
 let { tool, plan, users, cost } = toolData;

 /* -------------------------
    FIX TYPES
 -------------------------- */
 const usersNum = Number(users) || 0;
 const costNum = Number(cost) || 0;

 if (!PRICING[tool] || !PRICING[tool][plan]) {
   return {
     tool,
     savings: 0,
     recommendation: "Pricing data not available for this selection.",
   };
 }

 const pricePerUser = PRICING[tool][plan];
 const expectedCost = pricePerUser * usersNum;

 /* -------------------------
    FIND BEST PLAN
 -------------------------- */
 let bestPlan = plan;
 let bestCost = expectedCost;

 Object.entries(PRICING[tool]).forEach(([p, price]) => {
   const total = price * usersNum;
   if (total < bestCost) {
     bestCost = total;
     bestPlan = p;
   }
 });

 /* -------------------------
    FIND BEST ALTERNATIVE
 -------------------------- */
 const alternatives = ALTERNATIVES[useCase] || [];

 let bestAlt = null;
 let bestAltCost = Infinity;

 alternatives.forEach((alt) => {
   const altPlans = PRICING[alt];
   if (!altPlans) return;

   Object.entries(altPlans).forEach(([p, price]) => {
     const total = price * usersNum;
     if (total < bestAltCost) {
       bestAltCost = total;
       bestAlt = `${alt} (${p})`;
     }
   });
 });

 /* -------------------------
    CALCULATE SAVINGS
 -------------------------- */
 const tolerance = 2;

 const overpaySavings =
   costNum > expectedCost + tolerance
     ? costNum - expectedCost
     : 0;

 const planSavings = expectedCost - bestCost;
 const altSavings = expectedCost - bestAltCost;

 let savings = 0;
 let recommendation ;

 /* -------------------------
    PICK BEST OPTION
 -------------------------- */

 if (
   overpaySavings >= planSavings &&
   overpaySavings >= altSavings &&
   overpaySavings > 0
 ) {
   savings = overpaySavings;
   recommendation =
     "You are paying $" +
     Math.round(savings) +
     " more than expected. This may indicate unused seats or billing inefficiencies.";
 }

 else if (planSavings >= altSavings && planSavings > 0) {
   savings = planSavings;
   recommendation =
     "Switch from " +
     plan +
     " → " +
     bestPlan +
     " to save $" +
     Math.round(savings) +
     "/month while maintaining the same usage.";
 }

 else if (altSavings > 0 && bestAlt) {
   savings = altSavings;
   recommendation =
     tool +
     " may be overkill for your use case. Consider switching to " +
     bestAlt +
     " to save $" +
     Math.round(savings) +
     "/month.";
 }

 else {
   recommendation =
     "Your current setup appears cost-efficient based on your usage.";
 }

 /* -------------------------
    USE CASE INSIGHT
 -------------------------- */

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

/* =========================
  GENERATE AUDIT
========================= */

export const generateAudit = (data) => {
 const breakdown = data.tools.map((tool) =>
   evaluateTool(tool, data.useCase)
 );

 const monthlySavings = breakdown.reduce(
   (sum, item) => sum + item.savings,
   0
 );

 return {
   monthlySavings,
   annualSavings: monthlySavings * 12,
   breakdown,
   inputData:data
 };
};