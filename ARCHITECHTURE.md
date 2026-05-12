Architecture Overview

This project is a React-based B2B audit tool that analyzes a team’s AI tool usage and identifies cost-saving opportunities. The system is designed with a clear separation between UI, business logic, and data persistence, ensuring maintainability and extensibility.

Mermaid

flowchart TD
    A[User - AuditForm] --> B[Audit Engine - evaluateTool]
    B --> C[Result Object - savings + breakdown]
    C --> D[ResultCard UI]

    D -->|Save| E[Supabase DB]
    E --> F[report_id generated]

    F --> G[Shareable URL /report/:id]

    G --> H[ReportPage]
    H --> I[Fetch audit_data from Supabase]
    I --> J[Render Public Result]


High-Level Flow

User Input (AuditForm)
        ↓
Audit Engine (evaluateTool logic)
        ↓
Result Object (savings + breakdown)
        ↓
ResultCard UI + Summary
        ↓
(Optional) Save to Supabase
        ↓
Generate Shareable Link (/report/:id)
        ↓
Public Report Page (ReportPage)
Frontend Architecture

The frontend is built using React with a component-based structure:

src/
 ├── components/
 │    ├── AuditForm.jsx,AuditForm.css
 │    ├── ResultCard.jsx,ResultCard.css
 │
 ├── pages/
 │    └── ReportPage.jsx
 │
 ├── utils/
 │    ├── auditEngine.js
 │    ├── generateSummary.js
 │    ├── supabaseClient.js
 │
 ├── App.jsx
 ├── main.jsx

Why This Stack

Frontend: React  
Backend: Supabase  
Routing: React Router  

React was chosen for its component-based architecture, enabling clear separation between UI and logic.

Supabase was selected as a lightweight backend to handle persistence without requiring custom API development, allowing rapid iteration.

React Router enables clean separation between the main app and public report pages, supporting shareable URLs.

This stack prioritizes speed of development, simplicity, and deployability within the assignment timeline.

Scaling Considerations (10k audits/day)

The current architecture is optimized for an MVP, but can be extended to handle higher scale:

1. Frontend Scaling

React app can be deployed via CDN (e.g., Vercel, Netlify)
Static assets cached globally for fast load times

2. Backend Scaling (Supabase)

Supabase Postgres can handle moderate traffic, but:
indexing on report_id is required
read-heavy endpoints (ReportPage) should be optimized

3. Optimization Opportunities

Cache frequently accessed reports (e.g., CDN or edge caching)
Move audit computation to backend if logic becomes heavier
Batch writes or queue audit saves if traffic spikes

4. Future Architecture Upgrade

For 10k+ audits/day:

Frontend (React)
↓
API Layer (Node / Serverless)
↓
Database (Postgres)
↓
Cache (Redis / CDN)
5. Key Bottlenecks Today

Client-side computation (not heavy now, but may grow)
Supabase query latency for report fetching
No caching layer

Summary

The current system is sufficient for MVP usage, but scaling would require introducing:

caching
backend API layer
optimized database queries

Key Architectural Decisions

1. Separation of Concerns (Core Decision)

UI Layer: React components (AuditForm, ResultCard)
Logic Layer: auditEngine.js, generateSummary.js
Data Layer: Supabase (supabaseClient.js)
This avoids mixing business logic with UI, making the system easier to test and extend.


2. Audit Engine (Deterministic Logic)

The audit logic is implemented as a rule-based engine:

Evaluates each tool based on:
-plan type
-number of users
-use case
Outputs:
-recommendation
-estimated savings
This approach ensures:

-consistent results
-no dependency on external APIs
-explainable reasoning (important for finance-related decisions)

3. Rule-Based Summary (generateSummary.js)

Instead of using an external LLM API, a deterministic summary generator was implemented:

Logic is based on:

-total monthly savings thresholds
-overall efficiency of tool usage
Why this decision:

-avoids API cost and latency
-ensures predictable output
-eliminates hallucination risk
-improves evaluation score for reasoning clarity

4. State Management

State is managed locally in React:

-MainApp holds core state:
    -audit result
-ResultCard manages:
    -email input
    -save status
    -share link
This keeps state close to where it is used, avoiding unnecessary complexity.


5. Routing Architecture

Routing is implemented using React Router:

/ → MainApp (AuditForm + ResultCard)
/report/:id → ReportPage (public result)

Design choice:

separate “interactive app” vs “public report view”
enables shareable links

Backend / Data Layer (Supabase)

Supabase is used as a lightweight backend for:

storing leads
storing audit results
Table:

leads

id
created_at
email
report_id
monthly_saving
annual_saving
audit_data (JSON)
Why store audit_data

Instead of recomputing results:

full audit output is stored as JSON
ensures consistency between original and shared view
simplifies report rendering

Shareable Link System (Viral Loop)

Each audit generates a unique:

/report/:report_id

Flow

User saves audit
→ report_id generated
→ stored in DB
→ share link created
→ public page fetches data
Privacy Design

Public report only fetches:

    audit_data

Public Report Page

ReportPage.jsx:

-reads report_id from URL
-fetches audit data from Supabase
-renders:
    savings
    breakdown
    recommendations
No editing or authentication required → low friction sharing


Styling Approach

-Component-level CSS files (ResultCard.css, etc.)
-Focus on:
    readability
    clean layout
    mobile responsiveness

Tradeoffs & Limitations

1. No dynamic Open Graph tags

Only static OG tags implemented
Full dynamic previews require server-side rendering
2. No authentication layer

Simplicity prioritized over access control
3. Simplified audit model

Uses rule-based assumptions instead of real billing integrations

Future Improvements

-Dynamic OG tags for better social previews
-User dashboard for saved audits
-More advanced pricing models per tool
--Historical tracking of savings



Summary

This architecture prioritizes:

-clarity over complexity
-deterministic logic over black-box AI
-fast iteration and usability

The result is a system that is:

-easy to understand
-easy to extend
-aligned with real-world SaaS product design


Use of Plain JavaScript (Design Decision)

This project is implemented using plain JavaScript instead of TypeScript.

Rationale

Given the time-constrained nature of the assignment (7-day build window), the decision was made to prioritize:

-rapid iteration on product features
-clarity of business logic
-end-to-end functionality (audit → save → share)
Adding TypeScript would have introduced additional overhead in:

-type definitions for dynamic audit data structures
-integration with Supabase client types
-refactoring UI components during frequent logic changes

Mitigation of Risks

To maintain code quality without TypeScript:

-audit logic is modularized (auditEngine.js, generateSummary.js)
-functions are deterministic and predictable
-variable naming is explicit (monthlySavings, audit_data, etc.)
-edge cases are handled in core logic (e.g., invalid inputs, empty states)
This ensures the system remains:

-readable
-maintainable
-testable 

Given the scope (MVP audit tool), speed and clarity were prioritized over strict typing.


Future Improvement

If this project were extended:

-migrate core logic (auditEngine) to TypeScript
-define types for:
    -tool input schema
    -audit result structure
-improve test coverage with typed contracts