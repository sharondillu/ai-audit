// src/utils/generateSummary.js

export const generateSummary = (formData, auditResult) => {
  const { teamSize = 1, useCase = "Mixed Use Cases", tools = [] } = formData || {};
  const monthlySavings = auditResult?.monthlySavings || 0;
  const annualSavings = Math.round(monthlySavings * 12);

  const toolNames = tools.length > 0 
    ? tools.map(t => t.tool || "Unknown Tool").join(", ") 
    : "your AI tools";

  let summary = "";

  if (monthlySavings > 500) {
    summary = `Your audit reveals a significant opportunity to save $${monthlySavings} per month ($${annualSavings} annually). `;
    summary += `With a team of ${teamSize} members primarily working on ${useCase.toLowerCase()}, several tools like ${toolNames} can be optimized for better value.`;
  } 
  else if (monthlySavings > 100) {
    summary = `You can save $${monthlySavings} per month ($${annualSavings} per year) by making strategic adjustments. `;
    summary += `Your ${teamSize} person team using ${toolNames} for ${useCase.toLowerCase()} has good potential for cost reduction.`;
  } 
  else {
    summary = `Your current AI tool setup looks reasonably optimized for your ${teamSize} person team focused on ${useCase.toLowerCase()}. `;
    summary += `You're using ${toolNames} efficiently with limited room for further savings.`;
  }

  summary += ` Regular monitoring of your AI spending will help you stay efficient as your team grows.`;

  return summary;
};