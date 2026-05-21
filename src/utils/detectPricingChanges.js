import { PRICING } from "./auditEngine";

export const detectPricingChanges = (oldPricing, inputStack) => {
  console.log("PRICING loaded:", PRICING);
  const changes = [];

  // ✅ parse if string (Supabase sometimes returns JSON as string)
  const snapshot = typeof oldPricing === "string" ? JSON.parse(oldPricing) : oldPricing;
  const stack = typeof inputStack === "string" ? JSON.parse(inputStack) : inputStack;

  if (!snapshot || !stack) {
    console.log("Missing snapshot or inputStack — skipping");
    return changes;
  }

  const tools = stack?.tools || [];

  tools.forEach((item) => {
    const tool = item.tool;
    const plan = item.plan;
    const oldPrice = snapshot?.[tool]?.[plan];
    const newPrice = PRICING?.[tool]?.[plan];

    console.log(`${tool} ${plan}: old=$${oldPrice} new=$${newPrice}`);

    if (oldPrice !== undefined && newPrice !== undefined && oldPrice !== newPrice) {
      changes.push({ tool, plan, oldPrice, newPrice });
    }
  });

  return changes;
};