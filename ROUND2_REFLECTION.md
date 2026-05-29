# ROUND2_REFLECTION.md

## Biggest technical challenge

The hardest issue during Round 2 was stabilizing the pricing-change detection flow while preserving compatibility with the existing Round 1 architecture.

Initially, all audits were being flagged as affected because the comparison logic was too broad and ignored which tools were actually selected in an audit. After narrowing the logic, detection stopped working entirely because the stored pricing keys and current pricing keys had inconsistent casing (`Pro` vs `pro`).

I debugged this by logging the exact shapes of:
- stored input_stack data
- pricing snapshots
- current pricing objects

The root issue turned out to be inconsistent normalization between tool keys and plan keys. I fixed this by normalizing only tool names while preserving exact plan casing.

Another issue appeared during report reruns where old audit data loaded correctly but new calculations failed because the rerun page expected result objects before async fetches completed. Adding loading guards and carefully sequencing state updates fixed the issue.

---

## Biggest architecture decision

The largest architecture decision was moving email delivery out of the frontend and into Supabase Edge Functions.

My initial implementation used Resend directly inside the frontend application because it was the fastest way to prove the notification flow worked. However, this exposed email logic and depended on browser execution.

I reversed this approach and migrated the flow into Edge Functions. This improved:
- API key security
- separation of concerns
- scalability
- production realism

This decision also simplified the frontend because the admin page now only triggers backend processing instead of managing email delivery directly.

---

## What I would improve next

If I had another week, I would focus on making the pricing system more realistic and less manually maintained.

Currently, pricing updates are simulated by modifying the centralized pricing object directly. This was intentional for deterministic testing and assignment scope, but a real production system would likely:
- sync vendor pricing automatically
- support historical pricing versions
- store pricing updates separately from audit logic

I would also implement:
- grouped email notifications
- notification preferences
- audit history timelines
- visual recommendation diffs
- automated scheduled jobs instead of manual triggers

The current rerun comparison works well functionally, but the UI could become much more visual and product-oriented.

---

## AI tool usage

I used AI tools heavily throughout Round 2, mainly for:
- debugging architecture decisions
- refactoring flows
- React state management guidance
- Supabase integration help
- edge function structure
- PR documentation drafting

I did not trust AI outputs blindly, especially for:
- async state flow
- Supabase query behavior
- routing logic
- pricing comparison logic

One important failure I caught was incorrect assumptions about the structure of `input_stack`. The AI initially assumed a generic shape that did not match my actual stored database structure, which caused change detection to silently fail. I fixed this by logging real stored audit objects and adapting the detection logic to the actual data shape.

This reinforced the importance of validating assumptions against real application state instead of relying entirely on generated code.

---

## Self-evaluation

### Discipline — 8/10
I maintained steady progress under a short deadline and continued iterating even after several architecture issues appeared late in development.

### Code Quality — 7/10
The core flows are modular and readable, especially after separating detection logic and email handling. Some areas still need cleanup and stronger typing.

### Design Sense — 7/10
The rerun comparison view became significantly clearer after adding pricing summaries and visual comparison cards, though the UI could still be more polished.

### Problem Solving — 9/10
Most progress during Round 2 came from debugging and adapting the architecture without restarting the project, especially around pricing snapshots and rerun consistency.

### Entrepreneurial Thinking — 8/10
I focused on building features that directly improve long-term usefulness of audits instead of adding superficial UI features.