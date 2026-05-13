# SpendWise AI

SpendWise AI is a web application that helps startups and engineering teams audit their AI tool spending and identify potential cost savings.

The platform analyzes subscriptions such as ChatGPT, Claude, GitHub Copilot, Gemini, Cursor, and other AI services to provide recommendations for reducing unnecessary expenses.

---

## 📸 Screenshots

### Audit Form & Result
![Audit Form](docs/screenshot/AuditForm&ResultCard.png)

### Results Dashboard
![Results](docs/screenshot/ResultCard_OverSpending.png)

### MultiTool&ShareableLink
![MultiTool&Shareable](docs/screenshot/MultiTool&ShareableLink.png)

### Shareable Report
![Share Page](docs/screenshot/Shareable_Report.png)

---

## ⚡ Quick Start

### 1. Clone the repo

git clone <https://github.com/sharondillu/ai-github>
cd ai-audit

⸻

### 2. Install dependencies
npm install

### 3. Setup environment variables

VITE_SUPABASE_URL=project_url

VITE_SUPABASE_ANON_KEY=anon_key

### 4. Run locally

npm run dev

### 5. Deploy

Netlify

## 🌐 Live Demo

## 👉 Deployed URL: https://spendwise-ai-audit.netlify.app/


## 🧠 Key Features

-Per-tool audit with recommendations and savings
-Rule-based personalized summary (deterministic, no external AI API)
-Shareable public reports (/report/:id)
-Privacy-safe (no email/company in public view)
-Supabase-backed persistence

## ⚖️ Decisions (Trade-offs)

1. Rule-based summary vs AI API

Chose deterministic logic to ensure consistent, explainable output and avoid API cost.


2. JavaScript vs TypeScript

Used JavaScript to prioritize speed and iteration within the time constraint.


3. Supabase vs custom backend

Used Supabase for fast setup instead of building a backend from scratch.


4. Store audit_data vs recompute

Stored full audit result as JSON to ensure consistency across shared reports.


5. Client-side logic vs backend processing

Kept logic on frontend for simplicity; can be moved to backend for scaling.


## 🏗️ Architecture

See 👉 ARCHITECTURE.md


## 📊 Metrics & GTM

See:

metrics.md
gtm.md
economic.md

## 🧪 Testing

See 👉 tests.md


## 🔐 Security Note

Supabase anon key is used (public-safe)
.env file is not committed
Public reports exclude sensitive data

## 🚧 Limitations

Static Open Graph tags (no dynamic previews)
Simplified pricing assumptions
No authentication layer

## 🔮 Future Improvements

Dynamic OG tags for better sharing previews
Improved pricing models
User dashboard for saved audits
Backend API for scaling

## 🏁 Status

✔ Audit logic complete
✔ Summary system implemented
✔ Shareable links working
✔ Supabase integrated

## 📄 Documentation

ARCHITECTURE.md
REFLECTION.md
PROMPT.md
LANDING_COPY.md

## 🎯 Conclusion

AI Audit demonstrates strong product thinking, deterministic logic, and real-world SaaS patterns like shareable results, persistence, and clear UX.

---

## Project Goal

The goal of SpendWise AI is to help startups understand whether they are overspending on AI subscriptions and suggest better pricing alternatives.


## Author

Sharon Rose

