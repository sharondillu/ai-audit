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

## Day 2 — Form Expansion, Multi-Tool Support & UI Debugging

### ⏱ Time Spent
~6–7 hours

---

## ✅ What I Built

### 1. Multi-Tool Input System
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