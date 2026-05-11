
# 📊 METRICS

## 🎯 North Star Metric

Audit → Qualified Lead Conversion Rate (%)

The percentage of completed audits that result in a Credex consultation booking.

### Why this metric?

This is not a daily-use product—it’s a high-intent, occasional-use tool.  
Users typically run an audit when they suspect inefficiency or are evaluating tools.

So metrics like DAU or session time are misleading.

The real value is created when:
1. A user completes an audit  
2. They recognize cost inefficiency  
3. They take action (book consultation / engage with Credex)

This makes conversion rate the clearest signal of:
- product usefulness  
- business value  
- monetization potential  

---

## 📈 Input Metrics (Drivers)

### 1. Audit Completion Rate

% of users who start the audit and successfully complete it

Why it matters:
- Measures UX friction
- Indicates form clarity and usability

Target:
60–80%

---

### 2. High Savings Detection Rate

% of audits that show meaningful savings (e.g., >$50/month)

Why it matters:
- If too low → tool feels useless  
- If too high → logic may be unrealistic  

Target:
30–50%

---

### 3. Recommendation Engagement Rate

% of users who interact with or read recommendations (scroll depth / click)

Why it matters:
- Indicates trust in output  
- Measures clarity and relevance of insights  

Target:
50%+

---

## 🛠 What I Would Instrument First

If deployed, I would track:

- audit_started
- audit_completed
- savings_calculated
- high_savings_flag (boolean)
- recommendation_viewed
- cta_clicked (e.g., “Book Consultation”)

### Why these?

They create a clear funnel:

plaintext User lands → Starts audit → Completes → Sees savings → Clicks CTA

This allows quick identification of drop-off points.

---

## 🚨 Pivot Trigger

If Audit → Consultation conversion < 5% after 200+ completed audits

### Why?

At that point:
- enough data exists to validate signal  
- low conversion suggests:
 - weak recommendations OR
 - low perceived value OR
 - wrong target audience  

---

## 💡 What Success Looks Like (Week 1)

- 100 audit completions  
- 30+ users see meaningful savings  
- 10–15 consultation clicks  
- 5+ qualified leads  

---

## 🧠 Key Insight

This tool is not about engagement—it’s about decision-making impact.

A successful metric system focuses on:
“Did the audit change user behavior?”

Not:
“Did the user spend time on the app?”