
# 🧪 TESTS

This project includes automated tests for the core audit logic implemented in auditEngine.js.

The purpose of these tests is to ensure that the system:
- correctly calculates savings  
- selects the best pricing plan  
- recommends alternative tools based on use case  
- handles edge cases safely  

---

## ⚙️ Test Setup

Testing framework: Vitest

### Install dependencies

bash npm install

### Run tests

bash npm run test

---

## 📁 Test File Location

plaintext src/tests/auditEngine.test.js

---

## 🧠 What is being tested?

The following functions are tested:

- evaluateTool() → evaluates a single tool  
- generateAudit() → processes all tools and returns total savings  

---

## ✅ Test Cases

---

### 1. Overpay Detection

Goal: Ensure the system detects when the user is paying more than expected.

js it("detects overpay correctly", () => {   const input = {     tool: "ChatGPT",     plan: "Plus",     users: 2,     cost: 80, // expected = 40   };    const result = evaluateTool(input, "Writing / Content Creation");    expect(result.savings).toBeGreaterThan(0);   expect(result.recommendation.toLowerCase()).toContain("paying"); });

---

### 2. Plan Optimization (Cheaper Plan Exists)

Goal: Suggest switching to a cheaper plan when cost matches expected but a better option exists.

js it("suggests cheaper plan", () => {   const input = {     tool: "ChatGPT",     plan: "Team", // 25/user     users: 2,    cost: 50, // matches expected   };    const result = evaluateTool(input, "Writing / Content Creation");    expect(result.savings).toBeGreaterThan(0);   expect(result.recommendation.toLowerCase()).toContain("switch"); });

---

### 3. Alternative Tool Recommendation

Goal: Recommend a better tool for the selected use case.

js it("suggests alternative tools for coding", () => {   const input = {     tool: "ChatGPT",     plan: "Plus",     users: 2,    cost: 40, // exact cost   };    const result = evaluateTool(input, "Coding / Software Development");    expect(result.savings).toBeGreaterThan(0);   expect(result.recommendation.toLowerCase()).toMatch(/consider|alternative|switch/); });

---

### 4. Optimal Setup (No Savings)

Goal: Confirm that no savings are suggested when the configuration is already optimal.

js it("returns no savings for optimal setup", () => {   const input = {     tool: "GitHub Copilot",     plan: "Individual",     users: 2,     cost: 20,   };    const result = evaluateTool(input, "Coding / Software Development");    expect(result.savings).toBe(0);   expect(result.recommendation.toLowerCase()).toContain("efficient"); });

---

### 5. Free Plan Handling

Goal: Ensure free plans do not trigger false savings.

js it("handles free plan correctly", () => {   const input = {   tool: "ChatGPT",     plan: "Free",     users: 2,     cost: 0,   };    const result = evaluateTool(input, "Writing / Content Creation");    expect(result.savings).toBe(0); });

---

### 6. Invalid Pricing Data

Goal: Safely handle unknown tools or plans.

js it("handles invalid pricing safely", () => {   const input = {     tool: "UnknownTool",     plan: "Pro",     users: 2,     cost: 50,   };    const result = evaluateTool(input, "Coding / Software Development");    expect(result.savings).toBe(0);   expect(result.recommendation.toLowerCase()).toContain("not available"); });

---

### 7. Zero Users Edge Case

Goal: Prevent incorrect calculations when users = 0.

js it("handles zero users", () => {   const input = {     tool: "ChatGPT",     plan: "Plus",     users: 0,     cost: 0,   };    const result = evaluateTool(input, "Writing / Content Creation");    expect(result.savings).toBe(0); });

---

### 8. Multi-Tool Audit Calculation

Goal: Validate total savings and breakdown across multiple tools.

js it("calculates total audit correctly", () => {   const data = {     useCase: "Coding / Software Development",     tools: [       {         tool: "ChatGPT",         plan: "Plus",         users: 2,         cost: 80, // overpay       },       {         tool: "GitHub Copilot",         plan: "Individual",         users: 2,     cost: 20, // optimal       },     ],   };    const result = generateAudit(data);    expect(result.monthlySavings).toBeGreaterThan(0);   expect(result.annualSavings).toBe(result.monthlySavings * 12);   expect(result.breakdown.length).toBe(2); });

---

## 📊 Coverage Summary

These tests cover:

- Overpayment logic  
- Plan comparison logic  
- Alternative recommendations  
- Free plan handling  
- Edge cases (invalid input, zero users)  
- Multi-tool aggregation  

---

## 🚀 Future Improvements

- Add tests for API-based pricing tools  
- Add integration tests for full UI flow  
- Add React component tests using React Testing Library