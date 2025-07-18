# 📰 Blog Summariser

A modern AI-inspired web app that takes any blog URL, scrapes its content, summarizes it, and provides an Urdu translation — all in seconds.

Built with **Next.js**, **TailwindCSS**, and deployed on **Vercel**. Data is saved to **Supabase** for persistence.

---

## 🔗 Live Demo

👉 [nexium-nawal-salman-internship.vercel.app](https://nexium-nawal-salman-internship.vercel.app/)

Try it with real blogs:

- https://jamesclear.com/focus  
- https://zenhabits.net/morning/  
- https://blog.todoist.com/articles/getting-things-done/  
- https://jamesclear.com/atomic-habits-summary  
- https://css-tricks.com/snippets/css/complete-guide-grid/  

---

## 🎯 Features

- ✅ Enter a blog URL and extract its main content
- ✅ Summarizes using basic logic (first 2 sentences)
- ✅ Auto-translates English summary to **Urdu** (static dictionary logic)
- ✅ Saves blog title + summary to **Supabase**
- ✅ Displays both English and Urdu summaries beautifully
- ✅ Background video with clean modern UI

---

## 🛠️ Tech Stack

- **Frontend**: Next.js 14 (App Router), React, TailwindCSS, ShadCN UI
- **Backend**: Next.js API Routes (`/api/scrape`, `/api/save`)
- **Database**: Supabase (PostgreSQL)
- **Deployment**: Vercel

---

## ⚙️ Setup Instructions (Locally)

1. **Clone the repo**  
   ```bash
   git clone https://github.com/YOUR-USERNAME/YOUR-REPO.git
   cd internship/assignment-2
2. **Install dependencies**
   ```bash
   npm install
3. **Set envionment Variables**
  create .env.local and add:
   ```bash
   NEXT_PUBLIC_SUPABASE_URL=your_supabase_url
   NEXT_PUBLIC_SUPABASE_ANON_KEY=your_anon_key
4. **Run Locally**
   ```bash
   npm run dev
   
## 💡 Author
Made with 💻 by Nawal Salman as part of the Nexium Progressive Web Development Internship — blending AI-inspired logic, language translation, and modern full-stack development.

## 🗂️ Folder Structure
   ```bash
   internship/
   └── assignment-2/
       ├── app/
       │   ├── api/
       │   │   ├── scrape/route.js
       │   │   └── save/route.js
       │   └── page.js
       ├── lib/translate.js
       ├── utils/
       ├── public/bgvid.mp4
       ├── styles/
       ├── .env.local
       └── tailwind.config.js
