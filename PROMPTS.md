# Prompt Usage

## Overview

AI tools (primarily ChatGPT) were used during development for debugging, code structuring, and product decisions.  
All prompts were written to include context, code snippets, and clear goals to get useful and accurate responses.

---

## Key Prompts Used

### 1. Debugging React Router issue

```plaintext
I am getting this error: "You cannot render a <Router> inside another <Router>". 
Here is my main.jsx and App.jsx code. Explain why this happens and how to fix it correctly.


2. Fixing audit logic condition issue

My audit logic always returns the first condition and never reaches else if. 
Here is my evaluateTool function. Can you identify why and suggest a fix?

3. Building shareable report system

Build a shareable report system using React and Supabase where each audit generates a unique URL and public page without exposing email or company data.

4. Designing result card UX

Suggest improvements for a result card that shows savings, breakdown, and recommendations. It should be clean and easy to scan.

What Didn’t Work

Attempt: AI-generated summaries (Anthropic idea)

 initially explored using the [Anthropic](chatgpt://generic-entity?number=0) API to generate personalized summaries dynamically.


Issue:

No free credits were available for testing
All available plans required payment upfront
Limited ability to iterate quickly during development
Impact:

Slowed down experimentation
Added external dependency and cost

Why this was better:

No external cost
Faster development and testing
Fully deterministic and consistent output
Better aligned with the requirement for clear, explainable logic

Key takeaway

Constraints such as API cost and access influenced architectural decisions.
In this case, a simpler rule-based approach provided a more reliable and practical solution.

Conclusion

AI was used as a support tool, not a source of truth.
All outputs were reviewed, tested, and adapted before integration.