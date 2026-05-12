# DEVLOG — SpendWise AI

---

# Day 1 — Project Setup & Planning

Date: 2026-05-07

Hours Worked: 3

## What I Completed

- Read and analyzed the project requirements carefully
- Planned project structure and development approach
- Created React project using Vite
- Setup initial folder structure
- Built responsive Header component
- Designed modern hero section UI
- Built responsive AI Spend Audit form
- Improved mobile responsiveness and form alignment
- Created reusable component structure

---

## Technical Decisions

### Why React + Vite
Chosen for fast development experience, reusable components, and clean frontend architecture.

### Why Plain CSS
Used plain CSS instead of Tailwind to maintain full styling control and reduce setup complexity.

### UI Direction
Focused on building a modern SaaS-style dark UI to improve trust and visual quality.

---

## Challenges Faced

- First experience using Vite setup workflow
- Responsive form alignment issues on mobile devices
- Select/input sizing inconsistencies

---

## Solutions Implemented

- Improved CSS responsiveness using media queries
- Added consistent width and spacing rules
- Refactored layout for mobile-first behavior

---

## Assumptions

- Small teams using enterprise/team AI plans may benefit from lower-tier subscriptions
- Users prioritize simplicity and fast insights over complex dashboards

---

## Next Steps

- Build audit engine logic
- Add savings recommendation system
- Create audit result cards
- Add multi-tool support

# DEVLOG.md

## Day 2— Audit Logic Improvement, Testing & User Interviews

### ⏱ Time Spent
~6-7 hours

---

## ✅ What I Built

### 1.Multi-Tool Input System
- Converted the form from single tool → dynamic multi-tool structure
- Users can now:
- Add multiple AI tools
- Select tool name and plan dynamically
- Enter users and monthly spend per tool
- Remove tool entries


**Why:**
Most real teams use multiple AI tools. Supporting multi-tool input makes the audit realistic and useful.

---

### 2. Dynamic Plan Handling
- Plans update based on selected tool
- Prevents invalid combinations (e.g., wrong plan for tool)

---

### 3. Local Storage Persistence
- Implemented `localStorage` to save form state
- Data persists across refresh

**Implementation:**
- Used `JSON.stringify` to store data
- Used `JSON.parse` to restore state on load
- Wrapped parsing in safe logic to avoid crashes

**Why:**
Improves UX by preventing data loss during refresh or navigation.

---

### 4. Free Plan Handling Fix
- Disabled cost input when "Free" plan selected
- Automatically set cost = 0

**Why:**
Avoids invalid input and improves clarity

---

## 🐞 Bugs Faced & Fixes

### Issue 1: `setTeamSize` Red Underline
- Cause: Type mismatch / editor warning
- Fix:
 - Ensured proper number conversion using `Number()`
 - Added safe parsing logic

---

### Issue 2: UI Collapse After Multi-Tool Update
- Cause:
 - Old CSS not compatible with new layout
 - Misaligned structure

- Fix:
 - Refactored form structure using consistent `.field` blocks
 - Simplified CSS layout
 - Removed conflicting styles

---

### Issue 3: Result Card Appearing Below Form
- Cause:
 - Default vertical layout
 - Result not rendered initially (`null` return)

- Fix:
 - Introduced flex layout in parent container
 - Ensured ResultCard always renders (with placeholder)
 - Adjusted width constraints

---

## 🧠 Key Decisions

### 1. Simplicity Over Over-Engineering
Avoided complex grid systems initially to stabilize UI.

---

### 2. Data Safety
Used defensive coding for:
- localStorage parsing
- default fallback values

---

### 3. UX Focus
- Disabled irrelevant inputs
- Added meaningful defaults
- Prevented invalid user flows

---

## 📌 What’s Working Now

- Multi-tool input ✔
- Dynamic plan selection ✔
- Persistent form data ✔
- Stable UI (no collapse) ✔
- Form + Result layout structure ✔

---

## 🔜 Next Steps (Day 3)

- Improve audit logic (more realistic recommendations)
- Add validation:
 - Tool users ≤ team size
- Build Email Capture (required feature)
- Improve Result Card visual clarity

---

## 💭 Reflection

Today involved significant debugging and restructuring.  
The biggest learning was how UI structure and state logic must evolve together.

Also realized that handling real-world edge cases (like free plans and multiple tools) is more important than just building a working form.

The app is now moving from a basic form → toward a usable product.

## Day 3 — Audit Logic Improvement, Testing & User Interviews

### ⏱ Time Spent
5 hours

---

## ✅ What I Built

### 1.Major Audit Engine Upgrade
- Completely improved the audit logic with more intelligent and defensible rules
- Added alternative plan recommendations (e.g., suggesting Pro instead of Team/Enterprise for small teams)
- Added logic for detecting overpaying vs official pricing
- Included use-case based suggestions where possible
- Calculated accurate monthly and annual savings

### 2. Enhanced Result Display
- Updated ResultCard to show per-tool breakdown clearly
- Added recommended action, savings amount, and clear reasoning for each tool
---

### 3. User Interviews
- Successfully completed 2 user interviews
- Waiting for response from CTO for the third interview

## 🐞 Bugs Faced & Fixes

### Issue 1:Wrong Savings Calculation
- Tested many cases (1 person on Enterprise plan, high monthly spend on Free plan, etc.)
- Fix:
 - Fixed multiple calculation bugs and improved robustness of audit function


## 🧠 Key Decisions

### 1. Quality Over Speed
Spent more time making the audit logic realistic and defensible rather than adding many features quickly.
---

### 2. Testing First
Tested with different real-world scenarios before finalizing the logic.
---


## 📌 What’s Working Now

- Multi-tool form with persistence ✔
- Dynamic plan selection ✔
- Stronger & smarter audit logic ✔
- Clear per-tool recommendations with savings ✔
- Two real user interviews completed ✔

---

## 🔜 Next Steps (Day 4)

- Integrate Supabase database for storing audit results
- Implement email capture (lead generation)
- Create unique shareable report URL
- Add basic error handling and loading states
---

## 💭 Reflection

Today was one of the most important days. Improving the audit logic was challenging but very rewarding. I learned how critical it is to think from the user’s and company’s perspective while writing recommendations — not just do simple math.
Finding and fixing bugs through different test cases helped me understand where the logic could break. Conducting user interviews also gave me real insights that I could immediately apply to the product.
The project is now starting to feel like a real useful tool rather than just a form. Tomorrow I will move into backend integration which will be a big step.


📅 DEVLOG — Day 4

Date: 2026-05-10

Hours Worked: 5

🎯 Focus of the Day
The primary objective for Day 4 was to elevate the project from a purely technical coding task to a complete product-oriented solution. The focus shifted toward strengthening the product layer by developing essential business and user-centric documentation while finalizing and rigorously testing the core audit engine.

🧠 Work Completed
1. Completed Product Thinking Documents
I finalized four key strategic documents:

METRICS.md
ECONOMICS.md
GTM.md (Go-To-Market Strategy)
USER_INTERVIEWS.md

Key Learning:
Creating these documents shifted my perspective from simply “building features” to genuinely solving a real business problem. I had to deeply consider target users, their pain points, usage patterns, and how the product creates measurable value.
2. Real User Interviews
I conducted actual user conversations and documented insights regarding:

Current AI tool usage habits
Awareness and management of AI-related costs
Willingness to track spending

Major Insight:
Most users do not actively track their spending on AI tools and significantly underestimate their total monthly costs across multiple platforms.
Product Impact:
These findings reinforced the need for clear cost-saving visualizations and improved recommendation clarity in the audit results.
3. Comprehensive Audit Logic Testing
Created a dedicated test suite:
src/tests/auditEngine.test.js
Test Cases Covered:

Overpay detection
Better plan recommendation
Alternative tool suggestions
Optimal setup (zero savings)
Free plan handling
Invalid pricing data
Multi-tool audit calculations

Key Learning:
Initially, most test inputs triggered only the overpay condition. I resolved this by designing precise, isolated input scenarios for each logic branch, ensuring full test coverage.
4. Refined Core Audit Engine
Significantly improved the audit logic by separating concerns into:

Pricing validation
Plan optimization
Alternative tool comparison

Improvements Made:

Ensured only one dominant recommendation is presented
Made all savings calculations realistic and non-negative
Enhanced overall output reliability

5. Codebase Organization
Improved project structure for better maintainability:
plaintextsrc/
├── components/
├── utils/
│   └── auditEngine.js
└── tests/
    └── auditEngine.test.js
This separation of UI and business logic follows real-world software engineering best practices.
6. Documentation Standardization
Ensured all project documents follow a consistent, professional structure with clear headings, reasoning, and practical examples.

📊 Achievements of the Day

Successfully combined technical implementation with business thinking
Audit system is now fully tested and validated
Product decisions are grounded in real user insights
Overall documentation quality raised significantly


🤔 Challenges Faced

Creating effective test cases that properly trigger different logic branches
Preventing overlapping conditions between overpay detection and plan optimization
Translating raw user interview insights into concrete product improvements
Developing realistic economic assumptions backed by clear calculations


💡 Key Insight of the Day
A strong product is not just built — it is validated, explained, and justified.

🚀 Next Steps

Final UI polish and improvements
Complete landing page copy (LANDING_COPY.md)
Final README refinement
Submission preparation and packaging


🧠 Final Reflection
Day 4 was the most significant day in the entire project so far. Moving beyond coding to focus on why the product exists, who it serves, and how it delivers value transformed the project.
The combination of a working and tested technical core, real user insights, and solid business documentation gives me strong confidence that this solution is not only functional but also genuinely useful in a real-world context.

End of DevLog — Day 4


## Day 5 — 2026-05-11  
Hours worked: 6  

What I did:  
- Successfully integrated Supabase into the project and connected the frontend to the database  
- Created leads table and verified data insertion (email + savings data)  
- Fixed issues with API errors (RLS, column mismatch, async handling)  
- Improved ResultCard UI with conditional logic:
 - High savings (> $500) → Credex consultation CTA  
 - Low savings (< $100) → honest messaging (“You’re spending well”)  
- Added email validation (basic + improved UX)  
- Fixed state reset issue using useEffect so UI refreshes correctly without manual reload  
- Minor UI polish for better alignment and clarity  

What I learned:  
- How real-world backend integration works (Supabase setup, API calls, debugging errors)  
- Importance of Row Level Security (RLS) and how it affects database operations  
- React state management patterns, especially resetting UI using useEffect  
- Difference between actual runtime errors vs editor/lint warnings  
- How to design product logic based on user value (high vs low intent users)  

Blockers / what I'm stuck on:  
- Tried to integrate Anthropic API for generating personalized summary paragraphs  
- Could not proceed due to API access limitation (requires paid plan; no free credits available)  
- Need to decide whether to mock this feature or skip it due to time constraints  

Plan for tomorrow:  
- Decide on lightweight alternative for personalized summary (static or rule-based)  
- Finalize README and documentation sections  
- Do full project review (UI, logic, data flow)  
- Prepare final submission checklist and polish

## Day 6 — 2026-05-12  
Hours worked: 7  

What I did:  
- Implemented a rule-based personalized summary system based on audit results (high / medium / low savings cases)  
- Integrated summary into ResultCard UI with clear, concise messaging  
- Built shareable result feature:
 - Generated unique report_id for each audit  
 - Stored full audit result (audit_data) in Supabase  
 - Created public route /report/:id to display results  
- Ensured privacy by excluding sensitive fields (email, company) from public report  
- Connected React Router and fixed routing issues (duplicate Router error)  
- Added share UI with copy-to-clipboard functionality and responsive styling  

What I learned:  
- How to design deterministic, explainable logic instead of relying on external APIs  
- How routing works in React apps and how to structure pages vs components  
- How to design a basic viral loop using shareable links and public pages 
- Importance of separating private vs public data in real-world applications  

Blockers / what I'm stuck on:  
- Dynamic Open Graph tags for share previews are not fully implemented due to limitations of client-side rendering  
- Need to decide whether to keep static OG tags or attempt advanced setup  

Plan for tomorrow:  
- Finalize README sections (architecture, decisions, metrics, GTM)  
- Review all features against assignment rubric  
- Do final UI polish and bug testing  
- Prepare project for submission (clean commits, documentation check)