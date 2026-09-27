import type { AnalyzeResponse } from '../types/resume';

const API_ENDPOINT = '/api/analyze';
const FALLBACK_DIRECT_URL = 'http://localhost:8000/api/analyze';

export async function analyzeResumeFile(file: File): Promise<AnalyzeResponse> {
  const formData = new FormData();
  formData.append('file', file);

  let response: Response;

  try {
    response = await fetch(API_ENDPOINT, {
      method: 'POST',
      body: formData,
    });
  } catch {
    try {
      response = await fetch(FALLBACK_DIRECT_URL, {
        method: 'POST',
        body: formData,
      });
    } catch {
      throw new Error(
        'Failed to connect to the Backend server. Ensure the FastAPI server is running.'
      );
    }
  }

  if (!response.ok) {
    let errorMessage = `Server error occurred (Status ${response.status}).`;
    try {
      const errorData = await response.json();
      if (errorData.detail) {
        errorMessage = typeof errorData.detail === 'string'
          ? errorData.detail
          : JSON.stringify(errorData.detail);
      }
    } catch {
      throw new Error(errorMessage);
    }
    throw new Error(errorMessage);
  }

  return response.json();
}

export const MOCK_SAMPLE_ANALYSIS: AnalyzeResponse = {
  status: 'success',
  filename: 'Sample_CV_Andra_Wikanjaya.pdf',
  data: {
    profile_classification: {
      career_stage: 'Aspiring / Student / Fresh Graduate',
      has_formal_employment: false,
      confidence_reason: 'Profile is dominated by self-directed academic projects and tech interests without formal employment history at registered companies.',
    },
    candidate_profile: {
      headline: 'Junior Fullstack & AI Developer | React, Python & FastAPI Enthusiast',
      summary: 'Candidate has a strong passion for modern web application development and artificial intelligence. Built several portfolio projects using React, TypeScript, and Python FastAPI, with a focus on local LLM integration.',
    },
    strengths: [
      'Solid understanding of modern web architecture (React + FastAPI REST API).',
      'High initiative in building real-world projects integrated with AI / Ollama Qwen.',
      'Clean project structure utilizing TypeScript and modern best practices.',
    ],
    job_recommendations: [
      {
        role: 'Junior Frontend Developer',
        seniority_level: 'Entry-Level / Associate',
        match_score: '85%',
        match_reason: 'Strong proficiency in React, HTML/CSS, TypeScript, and building responsive interactive UIs.',
      },
      {
        role: 'Junior Backend / Python Developer',
        seniority_level: 'Entry-Level / Associate',
        match_score: '78%',
        match_reason: 'Understands FastAPI basics, database/API integration, and document data processing in Python.',
      },
      {
        role: 'AI / Software Engineering Intern',
        seniority_level: 'Internship',
        match_score: '90%',
        match_reason: 'Hands-on experimentation with local LLMs (Ollama) adds significant value for AI internship/research roles.',
      },
    ],
    keyword_and_skill_gap: {
      demonstrated_skills: [
        'React',
        'TypeScript',
        'Python',
        'FastAPI',
        'Ollama / LLM API',
        'HTML5 / CSS3',
        'Git & GitHub',
        'RESTful APIs',
      ],
      critical_gaps_for_employment: [
        'Automated Testing (Jest / PyTest / Cypress)',
        'CI/CD Pipeline (GitHub Actions)',
        'Docker & Container Deployment',
        'Teamwork experience with Agile / Scrum methodology',
      ],
    },
    actionable_improvements: [
      {
        section: 'Portfolio Projects',
        identified_issue: 'Projects are currently running locally and not yet deployed to production.',
        recommended_action: 'Deploy applications to platforms such as Vercel (frontend) and Render/Railway (backend), then attach live demo links in the resume.',
      },
      {
        section: 'Testing & Quality Assurance',
        identified_issue: 'Automated unit tests have not yet been included in project repositories.',
        recommended_action: 'Add unit tests using PyTest for FastAPI backend endpoints and Vitest/Jest for React components.',
      },
      {
        section: 'Experience & Metrics',
        identified_issue: 'Project descriptions lack outcome metrics or specific technical challenges solved.',
        recommended_action: 'Use the STAR format (Situation, Task, Action, Result) and quantify qualitative/quantitative metrics from your projects.',
      },
    ],
  },
};
