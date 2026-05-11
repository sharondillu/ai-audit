
import { describe, it, expect } from "vitest";
import { evaluateTool, generateAudit } from "../utils/auditEngine";

/* =========================
  1. OVERPAY CONDITION
========================= */
describe("Overpay detection", () => {
 it("detects when user is paying more than expected", () => {
   const input = {
     tool: "ChatGPT",
     plan: "Plus",
     users: 2,
     cost: 80, // expected = 40
   };

   const result = evaluateTool(input, "Writing / Content Creation");

   expect(result.savings).toBeGreaterThan(0);
   expect(result.recommendation.toLowerCase()).toContain("paying");
 });
});

/* =========================
  2. BETTER PLAN CONDITION
========================= */
describe("Plan optimization", () => {
 it("suggests cheaper plan when available", () => {
   const input = {
     tool: "ChatGPT",
     plan: "Team", // 25
     users: 2,
     cost: 50, // exact cost (no overpay)
   };

   const result = evaluateTool(input, "Writing / Content Creation");

   expect(result.savings).toBeGreaterThan(0);
   expect(result.recommendation.toLowerCase()).toContain("switch");
 });
});

/* =========================
  3. ALTERNATIVE TOOL CONDITION
========================= */
describe("Alternative tool suggestion", () => {
 it("suggests alternative for coding use case", () => {
   const input = {
     tool: "ChatGPT",
     plan: "Plus",
     users: 2,
     cost: 40, // exact cost (no overpay)
   };

   const result = evaluateTool(input, "Coding / Software Development");

   expect(result.savings).toBeGreaterThan(0);
   expect(result.recommendation.toLowerCase()).toMatch(/consider|switch/);
 });
});

/* =========================
  4. NO SAVINGS (OPTIMAL)
========================= */
describe("Optimal setup", () => {
 it("returns no savings when setup is already optimal", () => {
   const input = {
     tool: "GitHub Copilot",
     plan: "Individual",
     users: 2,
     cost: 20, // expected = 20
   };

   const result = evaluateTool(input, "Coding / Software Development");

   expect(result.savings).toBe(0);
   expect(result.recommendation.toLowerCase()).toContain("efficient");
 });
});

/* =========================
  5. INVALID PRICING
========================= */
describe("Invalid pricing handling", () => {
 it("handles unknown tool or plan safely", () => {
   const input = {
     tool: "UnknownTool",
     plan: "Pro",
     users: 2,
     cost: 50,
   };

   const result = evaluateTool(input, "Coding / Software Development");

   expect(result.savings).toBe(0);
   expect(result.recommendation.toLowerCase()).toContain("not available");
 });
});

/* =========================
  6. ZERO USERS EDGE CASE
========================= */
describe("Edge cases", () => {
 it("handles zero users gracefully", () => {
   const input = {
     tool: "ChatGPT",
     plan: "Plus",
     users: 0,
     cost: 0,
   };

   const result = evaluateTool(input, "Writing / Content Creation");

   expect(result.savings).toBe(0);
 });
});

/* =========================
  7. MULTI-TOOL AUDIT
========================= */
describe("Full audit calculation", () => {
 it("calculates total savings correctly", () => {
   const data = {
     useCase: "Coding / Software Development",
     tools: [
       {
         tool: "ChatGPT",
         plan: "Plus",
         users: 2,
         cost: 80, // overpay
       },
       {
         tool: "GitHub Copilot",
         plan: "Individual",
         users: 2,
         cost: 20, // optimal
       },
     ],
   };

   const result = generateAudit(data);

   expect(result.monthlySavings).toBeGreaterThan(0);
   expect(result.annualSavings).toBe(result.monthlySavings * 12);
   expect(result.breakdown.length).toBe(2);
 });
});