# ROUND2_PR.md

## What this PR does

This PR upgrades SpendWise AI Audit from a one-time audit tool into a live re-audit system that reacts to pricing changes over time. Audits are now persisted in Supabase with pricing snapshots, pricing changes can be detected later, affected users receive email notifications, and users can re-run their audits to compare old vs updated recommendations side-by-side.

The goal of this feature is to prevent stale AI cost recommendations when vendors change pricing plans or restructure subscriptions.

---

## Why

AI pricing changes frequently. Cursor, Claude, Copilot, and ChatGPT have all changed pricing structures recently, which can invalidate previous audit recommendations. A static audit becomes less useful over time if the assumptions behind it are no longer accurate.

I assumed users would want to revisit previous recommendations without re-entering all of their stack details manually. The re-audit flow focuses on preserving the original user inputs while recalculating recommendations using current pricing data.

---

## How it works

### Persistent Audit Storage

Completed audits are now stored in a Supabase `audits` table with:

- report_id
- email
- input_stack
- audit_result
- pricing_snapshot
- created_at

The same `report_id` is reused for public share links and rerun links.

---

### Pricing Change Detection

Pricing data still lives in the centralized `PRICING` object inside `auditEngine.js`.

A new utility (`detectPricingChanges.js`) compares:
- stored pricing snapshots
- current pricing values

The detection flow only checks tools that were actually used in a specific audit.

---

### Re-Audit Flow

A new route was added:

`/rerun/:reportId`

The rerun page:
1. fetches the original audit
2. reruns the audit using current pricing
3. compares old vs new recommendations
4. highlights pricing differences and savings deltas

This allows users to understand exactly how pricing changes affected their original recommendations.

---

### Email Notifications

Email delivery is handled using Supabase Edge Functions and Resend.

The admin page contains a manual “Check Audits” trigger which:
1. scans stored audits
2. detects affected audits
3. sends notification emails
4. includes rerun links in the email body

This architecture keeps email logic and API keys server-side instead of exposing them in the frontend.

---

## What I cut

- I did not implement automated cron scheduling because the assignment explicitly allowed manual trigger endpoints, and I prioritized finishing the full re-audit flow end-to-end.


- I did not implement grouped/consolidated emails per user. Currently notifications are audit-based. I would optimize this next by batching affected audits into a single digest email.

- I did not build a pricing admin dashboard UI. Pricing changes are currently simulated by editing the centralized pricing object directly.

- I kept pricing data static instead of integrating vendor APIs because reliability and deterministic testing were more important within the 36-hour scope.

---

## How to test it manually

1. Run a new audit from the main application.
2. Save the audit with a valid email address.
3. Verify the audit appears in the Supabase `audits` table.
4. Change a pricing value inside `auditEngine.js` (example: Cursor Pro 30 → 50).
5. Open `/admin`.
6. Click “Check Audits”.
7. Verify affected audits are detected.
8. Verify notification emails are sent.
9. Open the rerun link from the email.
10. Verify the rerun page shows:
  - previous audit
  - updated audit
  - pricing change summary
  - savings delta

---

## What’s tested

- Persistent audit storage flow
- Report ID based share links
- Pricing snapshot persistence
- Pricing change comparison logic
- Rerun comparison rendering
- Email notification trigger flow
- Supabase Edge Function email delivery
- Existing Round 1 audit functionality regression checks

I did not add automated integration tests due to time constraints. If I continued this project, I would first add tests around:
- pricing comparison logic
- rerun consistency
- email trigger batching
- edge function delivery handling