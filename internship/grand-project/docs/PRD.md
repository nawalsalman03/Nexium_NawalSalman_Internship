# Resume Tailor — Product Requirements Document

## 1. Executive Summary

**Vision:**  
Resume Tailor is an AI-powered web application designed to help job seekers instantly improve and tailor their resumes for specific job roles. By leveraging AI automation and user-friendly interfaces, the app bridges the gap between generic resumes and job-specific tailoring — helping users increase their chances of landing interviews.

**Value Proposition:**  
With most resumes being filtered by Applicant Tracking Systems (ATS) and hiring managers scanning resumes for relevant keywords, it’s essential to align resumes closely with job requirements. Resume Tailor provides users with a fast, reliable, and intuitive way to optimize resumes for target job titles or descriptions.

**Key Objectives:**
- Deliver resume tailoring for at least 3 major job domains by default (e.g., software, marketing, HR).
- Maintain >90% uptime and <3s AI response time.
- Have at least 80% of users complete one tailoring session end-to-end.

**Success Criteria:**
- 100 resumes tailored within first week of launch.
- 30% of users return within a week.
- 90% successful summary generations via AI.

---

## 2. Problem Statement

**Market Situation:**  
Most job seekers send generic resumes to multiple roles. Recruiters prefer resumes that match job descriptions. There's a gap in tools that help users personalize resumes quickly.

**User Pain Points:**
- Don’t know how to reword resume for a job.
- Lack confidence in content.
- Manual tailoring is slow and hard.

**Opportunity Size:**
- 300M+ job seekers globally.
- Growing demand for AI resume tools.
- High dropout rate in application funnels due to poor resumes.

**Cost of Inaction:**
- Poor job application results.
- Missed job opportunities.

---

## 3. Solution Overview

**How it Works:**
1. User logs in via email magic link.
2. Pastes resume + job title or description.
3. App sends data to n8n (OpenAI logic).
4. Suggestions returned in seconds (summary, skills, language).
5. User views, copies, or exports tailored content.

**Technical Approach:**
- **Frontend:** Built with Next.js, TailwindCSS, ShadCN UI.
- **Backend:** Supabase (auth, resume sessions), MongoDB (AI logs).
- **AI Logic:** n8n flow hitting OpenAI API.
- **CI/CD:** Vercel deploy with auto preview.

**Differentiators:**
- Magic link login (no password friction).
- Fast generation (within seconds).
- Clean UI with export-ready output.

---

## 4. User Personas

### 1. Zara – Fresh Graduate
- Age: 22, Non-tech background, applying for marketing jobs.
- "I have no idea how to improve my resume. I just want it to sound more professional."
- Low technical proficiency, uses mobile mostly.

### 2. Ahmed – Mid-Career Developer
- Age: 28, 5 years’ experience in full-stack roles.
- "I want my resume to highlight relevant skills for each job."
- Medium proficiency. Wants speed and relevance.

### 3. Saima – Career Coach
- Uses the tool to help her clients.
- Wants reusable and customizable suggestions.
- High proficiency, desktop user.

---

## 5. Technical Architecture

**System Components:**
- Frontend: Next.js, TailwindCSS, ShadCN UI
- Backend: Supabase (Auth + Resume Storage), MongoDB (AI logs)
- AI Logic: n8n automation using OpenAI
- Deployment: Vercel with GitHub CI/CD

**Data Flow:**
- Resume form → API → Supabase insert.
- API triggers n8n with inputs.
- n8n formats and sends request to OpenAI.
- Response returned → saved in DB → rendered in UI.

**Security:**
- Auth with Supabase Magic Link
- Rate limit API (basic edge function)
- Sanitize all inputs

---

## 6. Functional Requirements

**P0 Features (Must Have):**
- Magic link login
- Resume input + job title field
- Resume suggestion via n8n/OpenAI
- Save session to Supabase
- Show final output with copy button

**P1 Features (Should Have):**
- Export to `.txt` or `.doc`
- Input validation and form reset
- User profile with history

**P2 Features (Nice to Have):**
- Autosave draft
- Role-specific templates

**User Stories:**
- As a user, I want to sign in using email so I can access my resume.
- As a user, I want to paste my resume and job title so I can tailor it.
- As a user, I want instant suggestions so I can improve my resume.
- As a user, I want to save and revisit my session.

---

## 7. API Specifications

### `POST /api/tailor`

**Body:**
```json
{
  "resumeText": "string",
  "jobTitle": "string"
}
