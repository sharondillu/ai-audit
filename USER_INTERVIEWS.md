# USER_INTERVIEWS.md

## Interview 1 — 2026-05-09

**Name:** K R  
**Role:** R&D Engineer  
**Company:** Nokia Networks (Large Enterprise)

**Key Quotes:**
- “I personally don’t use any AI tools right now.”
- “There is pressure from higher management to start using Claude AI.”
- “Our company has its own internal AI tool, but management still wants us to use Claude.”
- “The company is pushing AI adoption but hasn’t given clear guidance on plans or budgets.”
- “I’m worried we might end up paying for external tools when we already have our own AI.”

**Most Surprising Thing:**
Even though the company has its own internal AI system, higher management is still pushing employees to use external tools like Claude. This shows a common conflict between internal tools and popular external AI platforms.

**What it changed in my design:**
- Made recommendations more balanced — sometimes suggesting to reduce external tool usage if internal alternatives exist.
- Improved messaging to be more enterprise-aware.

---

## Interview 2 — 2026-05-09

**Name:** S P  
**Role:** Full Stack Developer  
**Company:**(Startup / Mid-size)

**Key Quotes:**
- “We are currently using GitHub Copilot and Windsurf in free versions.”
- “We are planning to upgrade to paid plans soon but we are confused which plan is best.”
- “I don’t want to waste money on features we won’t use regularly.”
- “It would be really helpful to know exactly how much we can save before upgrading.”

**Most Surprising Thing:**
Even as a small startup, they are already planning to move to paid plans but have no structured way to evaluate which tool or plan gives the best value.

**What it changed in my design:**
- Made “Primary Use Case” field mandatory and more prominent as it affects recommendations.
- Added clear Free vs Paid plan comparison in the audit results.
- Highlighted upgrade decision support in the summary.

---

## Interview 3 — 2026-05-10


**Name:** M k 
**Role:** CTO  
**Company:** (Early-stage Startup)

**Key Quotes:**
- “I use Codex (paid) and Gemini (free for my mobile prepaid plan). I also use API models which cost me around $50 based on token usage.”
- “Currently spending close to 2000 for Codex and dev models, and it can go up to 3000 once tokens get exhausted.”
- “Most of the development is done by me and the team doesn’t use paid AI tools for now. I share the tools based on need using the same login.”
- “Pricing frustrates me, especially since it’s subscription-based.”
- “Yes, might need a tool like this in the near future.”

**Most Surprising Thing:**
Even as a CTO, he is personally handling most of the AI tool usage and sharing a single login with the team. This highlights a common problem of “shared logins” and uncontrolled usage, which can lead to unexpectedly high bills (especially with API token usage).

**What it changed in my design:**
- Added special handling for API usage (OpenAI API / Anthropic API) with usage-based cost tracking.
- Made the tool emphasize “Team vs Individual Usage” detection to catch cases where one person is paying for the whole team.
- Added stronger messaging around subscription fatigue and token exhaustion risks.
- Prioritized API cost transparency in the final recommendations.