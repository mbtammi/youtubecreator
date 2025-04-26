# Project Prompt for GitHub Copilot

## Project: Creator Inspiration Engine

### 🚀 Goal:
Build a web application that helps content creators generate relevant YouTube content ideas based on a set of inspiring channels and (optionally) their own channel. It uses YouTube data and AI to detect trends and generate video title ideas, topic suggestions, and scripts.

---

### 🧠 Core Features:

1. **User Input:**
   - Users can input 3–5 YouTube channel usernames or IDs that inspire them.
   - Optional: They can enter their own channel for personalized suggestions.

2. **Data Collection:**
   - Use the YouTube Data API to fetch:
     - Recent video titles
     - Descriptions
     - Tags (if available)
     - View count, like count, comment count, and publish date
   - Store this in a database (MongoDB or Firebase).

3. **Trending Topic Detection:**
   - Analyze recent videos for:
     - Keywords and phrases using NLP (TF-IDF, frequency count)
     - High-performing videos (views/subs ratio)
     - Trending clusters via embeddings and cosine similarity (optional)
   - Generate a short list of 5–10 trending topics based on the above data.

4. **AI-Powered Content Ideation:**
   - Use the OpenAI API to:
     - Generate video titles for each topic.
     - Optionally generate video descriptions or even full scripts.
     - Tailor tone and format to match the user’s own channel if provided.

5. **User Output:**
   - Display a dashboard with:
     - Top 10 content ideas
     - For each: Title, optional description/script, and the source of inspiration (which channel and video).
   - Allow users to export ideas (CSV, Markdown, or copy-to-clipboard).
   - Optionally email a weekly report (in Pro version).

---

### 🧱 Tech Stack:

- **Frontend:** React + TailwindCSS
- **Backend:** Node.js + Express
- **Database:** MongoDB or Firebase
- **APIs:**
  - YouTube Data API
  - OpenAI (GPT) for idea generation
- **Authentication:** Supabase or Firebase Auth (optional for MVP)
- **Hosting:** Vercel (Frontend) + Render/Fly.io/Heroku (Backend)

---

### 💡 Bonus Ideas:
- Track content performance over time and suggest idea iterations.
- Integrate with Twitter or TikTok to compare cross-platform trends.
- Save “Favorite” content ideas for later.
- Offer user-created templates for idea formats.

---

### 💰 Monetization (future):
- Free tier: Limited channel inputs and ideas/month
- Pro tier: Unlimited channels, export features, scheduled emails
- Agency tier: Multi-client support, branded exports, collaboration tools

