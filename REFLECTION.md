# Reflection

## 1. The hardest bug I hit and how I debugged it

The hardest bug I encountered was in the audit logic where the system always returned the first recommendation condition, regardless of input. This made the tool unreliable because it failed to differentiate between different scenarios.

My initial hypothesis was that the input values were not being passed correctly. I logged the inputs and verified that they were correct. Then I suspected that the condition checks inside the evaluation function were not structured properly. I tested individual conditions manually and noticed that the first condition was too broad and always evaluated to true.

To debug further, I simplified the logic and added console logs inside each branch to see which paths were being executed. This confirmed that the first condition was always being hit. I then reordered the conditions and made them more specific, ensuring that edge cases were handled properly.

The final fix involved restructuring the conditional logic into clearer, mutually exclusive branches. After this change, I tested multiple scenarios and confirmed that different recommendations were now correctly triggered. This experience reinforced the importance of precise condition design and thorough testing.

---

## 2. A decision I reversed mid-week

Midway through the project, I initially decided to use an external AI API (Anthropic) to generate personalized summaries for the audit results. The idea was to create more natural and dynamic output.

However, I faced issues with API access and cost constraints. More importantly, I realized that relying on an AI model could introduce inconsistency and reduce trust in the recommendations, especially for a cost-focused tool where accuracy matters.

I reversed this decision and implemented a rule-based summary system instead. This allowed me to generate deterministic, consistent summaries based on savings thresholds and audit results.

This change improved reliability, reduced complexity, and aligned better with the assignment’s emphasis on clear reasoning. It also eliminated dependency on external services, making the application faster and easier to maintain.

---

## 3. What I would build in week 2

If I had a second week, I would focus on improving both the product depth and user experience.

First, I would build a proper landing page to improve user acquisition and clearly communicate the value proposition. This would include real testimonials, better visuals, and conversion-focused design.

Second, I would enhance the audit engine with more accurate pricing models and deeper analysis, such as detecting redundant workflows and suggesting consolidation strategies.

Third, I would implement dynamic Open Graph tags so that shared links generate rich previews, improving the viral loop.

Additionally, I would introduce a simple dashboard where users can view past audits and track savings over time.

Finally, I would consider moving the audit logic to a backend API to support scaling and more complex computations.

---

## 4. How I used AI tools

I used AI tools (primarily ChatGPT) throughout the project to assist with debugging, structuring code, and generating documentation.

For debugging, AI helped identify issues in React state management, routing setup, and conditional logic. For example, it helped diagnose the nested Router error and suggested the correct placement of BrowserRouter.

For development, AI assisted in generating component structures, Supabase integration patterns, and routing setup. However, I did not blindly copy code — I reviewed and adapted everything to fit the project.

For documentation, AI helped structure files like README, ARCHITECTURE, and test cases, improving clarity and completeness.

One instance where AI was wrong was in suggesting logic that caused the audit to always return the same recommendation. I identified the issue through testing and corrected the condition structure manually.

I did not rely on AI for core decision-making or business logic. Instead, I used it as a support tool while maintaining control over the implementation.

---

## 5. Self-rating

- Discipline: 8/10  
Maintained consistent daily progress and commits, though some earlier commits could have been more descriptive.

- Code Quality: 7/10  
Code is modular and readable, but could be improved with TypeScript and more formal testing.

- Design Sense: 7/10  
UI is clean and functional, but could benefit from more polish and stronger visual hierarchy.

- Problem Solving: 8/10  
Successfully debugged multiple issues and adapted solutions under constraints.

- Entrepreneurial Thinking: 9/10  
Focused on user value, viral loop, and real-world applicability rather than just building features.

