Day 1— 2026-05-20
Hours worked: 11
What I did:

Implemented persistent audit storage in Supabase (audits table)
Added support for storing report_id, email, input_stack, audit_result, and pricing_snapshot
Updated ResultCard to save full audit data after email submission
Created basic ReportPage.jsx to display saved audits using report_id
Fixed multiple Supabase insert and retrieval bugs
Improved shareable report URL generation

What I learned:

Importance of consistent data structure between frontend and database
How to safely handle null checks when fetching from Supabase
Better understanding of Row Level Security (RLS) policies

Blockers / what I'm stuck on:

ReportPage was breaking due to null audit_result (fixed later)

Plan for tomorrow:

Implement pricing change detection logic
Build email notification system
Add diff view for re-audit


Day 2 — 2026-05-21
Hours worked: 9
What I did:

Built pricing change detection logic and admin trigger
Implemented rerun comparison (diff view) between old and new audit
Set up email notification flow using Resend
Migrated email sending from frontend to Supabase Edge Functions
Fixed pricing comparison logic (casing and key matching issues)
Polished overall Round 2 flow and tested end-to-end

What I learned:

How to properly compare pricing snapshots and detect meaningful changes
Moving sensitive operations (email) to server-side (Edge Functions)
The challenges and importance of working on an existing codebase without major rewrites

Blockers / what I'm stuck on:
Got stuck with email delivery — initially tried calling Resend directly from frontend which caused CORS and 401 errors. Solved it by migrating the email logic to Supabase Edge Functions.

 All 4 required features are now functional



Final Notes 
I intentionally worked within the constraints of my Round 1 codebase and did not restart the project even when facing architecture challenges. This helped me demonstrate the ability to extend existing code under time pressure.