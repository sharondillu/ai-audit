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
