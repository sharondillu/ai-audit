export const generateSummary = (formData, auditResult) => {
 const { teamSize = 1, useCase = "Mixed Use Cases", tools = [] } = formData || {};
 const monthlySavings = auditResult?.monthlySavings || 0;
 const annualSavings = Math.round(monthlySavings * 12);

 const toolNames = tools.length > 0
   ? tools.map(t => t.tool || "Unknown Tool").join(", ")
   : "your AI tools";

 let summary ;

 if (monthlySavings > 500) {
   summary = `You are likely overpaying for overlapping AI tools. `;
   summary += `Your audit shows a potential saving of $${monthlySavings}/month ($${annualSavings}/year). `;
   summary += `For a ${teamSize}-person team focused on ${useCase.toLowerCase()}, consolidating tools like ${toolNames} could significantly reduce costs.`;
 }
 else if (monthlySavings > 100) {
   summary = `There is a moderate opportunity to optimize your AI spend. `;
   summary += `You can save around $${monthlySavings}/month ($${annualSavings}/year) by refining usage across tools like ${toolNames}.`;
 }
 else {
   summary = `Your current AI stack is already well optimized. `;
   summary += `For a ${teamSize}-person team using ${toolNames}, there is minimal unnecessary spend.`;
 }

 summary += ` Reviewing tool usage regularly will help maintain efficiency as your team grows.`;

 return summary;
};