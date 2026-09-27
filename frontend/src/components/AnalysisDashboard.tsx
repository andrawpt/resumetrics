import React, { useState } from 'react';
import type { ResumeAnalysisData } from '../types/resume';
import {
  Briefcase,
  Award,
  CheckCircle2,
  AlertTriangle,
  Lightbulb,
  FileText,
  Copy,
  Check,
  RotateCcw,
  TrendingUp,
} from 'lucide-react';
import { ScrollReveal } from './ScrollReveal';

interface AnalysisDashboardProps {
  filename: string;
  data: ResumeAnalysisData;
  onReset: () => void;
}

export const AnalysisDashboard: React.FC<AnalysisDashboardProps> = ({
  filename,
  data,
  onReset,
}) => {
  const [copied, setCopied] = useState(false);

  const {
    profile_classification,
    candidate_profile,
    strengths,
    job_recommendations,
    keyword_and_skill_gap,
    actionable_improvements,
  } = data;

  const handleCopySummary = () => {
    const textToCopy = `=== ATS RESUME SUMMARY: ${filename} ===\nHeadline: ${candidate_profile.headline}\nCareer Stage: ${profile_classification.career_stage}\nSummary: ${candidate_profile.summary}\n\nTop Strengths:\n${strengths.map((s) => `- ${s}`).join('\n')}\n\nRecommended Roles:\n${job_recommendations.map((j) => `- ${j.role} (${j.match_score} match)`).join('\n')}`;

    navigator.clipboard.writeText(textToCopy);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  return (
    <div className="flex flex-col gap-4 sm:gap-5 2xl:gap-6 w-full font-normal">
      <ScrollReveal direction="down" delay={0} className="w-full">
        <div className="flex flex-wrap items-center justify-between gap-3 2xl:gap-4 p-4 sm:p-5 2xl:p-6 bg-zinc-950 border border-zinc-800 rounded-2xl shadow-xl">
          <div>
            <div className="flex items-center gap-1.5 2xl:gap-2 text-[11px] sm:text-xs 2xl:text-xs font-normal text-zinc-400 uppercase tracking-wider mb-1">
              <FileText size={13} className="2xl:hidden" />
              <FileText size={14} className="hidden 2xl:block" />
              Document: {filename}
            </div>
            <h2 className="text-lg sm:text-xl md:text-2xl 2xl:text-2xl font-normal text-white tracking-tight">Resume Analysis & Career Strategy Report</h2>
          </div>

          <div className="flex items-center gap-2.5 2xl:gap-3">
            <button
              type="button"
              className="inline-flex items-center gap-1.5 2xl:gap-2 px-3.5 py-2 2xl:px-4 2xl:py-2.5 rounded-lg 2xl:rounded-xl bg-zinc-900 hover:bg-zinc-800 border border-zinc-700 text-white text-xs font-normal transition-all duration-200 hover:-translate-y-0.5 cursor-pointer"
              onClick={handleCopySummary}
            >
              {copied ? <Check size={14} className="text-white" /> : <Copy size={14} />}
              <span>{copied ? 'Copied!' : 'Copy Summary'}</span>
            </button>

            <button
              type="button"
              className="inline-flex items-center gap-1.5 2xl:gap-2 px-3.5 py-2 2xl:px-4 2xl:py-2.5 rounded-lg 2xl:rounded-xl bg-white text-black hover:bg-zinc-200 text-xs font-normal transition-all duration-200 hover:-translate-y-0.5 cursor-pointer"
              onClick={onReset}
            >
              <RotateCcw size={14} />
              <span>Analyze Another Resume</span>
            </button>
          </div>
        </div>
      </ScrollReveal>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-4 sm:gap-5 2xl:gap-6">
        <ScrollReveal direction="up" delay={120} className="w-full">
          <div className="p-6 bg-zinc-950 border border-zinc-800 rounded-2xl shadow-xl flex flex-col gap-4 h-full">
            <h3 className="flex items-center gap-2.5 text-lg font-normal text-white">
              <Briefcase className="text-zinc-300" size={22} />
              Role Recommendations & Match Score
            </h3>
            <div className="flex flex-col gap-3">
              {job_recommendations.map((job, idx) => (
                <div key={idx} className="p-4 bg-zinc-900 border border-zinc-800 hover:border-zinc-500 rounded-xl flex gap-4 transition-all duration-300 hover:-translate-y-1">
                  <div className="w-14 h-14 rounded-full bg-zinc-800 border-2 border-white text-white font-normal text-sm flex items-center justify-center shrink-0 shadow-md">
                    {job.match_score}
                  </div>
                  <div>
                    <div className="font-normal text-white text-base mb-0.5">{job.role}</div>
                    <div className="text-xs font-normal text-zinc-400 mb-2">Level: {job.seniority_level}</div>
                    <div className="text-xs text-zinc-300 leading-relaxed font-normal">{job.match_reason}</div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </ScrollReveal>

        <ScrollReveal direction="up" delay={200} className="w-full">
          <div className="p-6 bg-zinc-950 border border-zinc-800 rounded-2xl shadow-xl flex flex-col gap-4 h-full">
            <h3 className="flex items-center gap-2.5 text-lg font-normal text-white">
              <Award className="text-zinc-300" size={22} />
              Key Resume Strengths (Verifiable Strengths)
            </h3>
            <div className="flex flex-col gap-3">
              {strengths.map((strength, idx) => (
                <div key={idx} className="flex items-start gap-3 p-4 bg-zinc-900 border-l-4 border-l-white rounded-r-xl border-y border-r border-zinc-800 text-sm leading-relaxed text-zinc-200 font-normal transition-all duration-300 hover:border-r-zinc-600 hover:-translate-y-0.5">
                  <CheckCircle2 className="text-white shrink-0 mt-0.5" size={18} />
                  <div>{strength}</div>
                </div>
              ))}
            </div>
          </div>
        </ScrollReveal>
      </div>

      <ScrollReveal direction="up" delay={150} className="w-full">
        <div className="p-6 bg-zinc-950 border border-zinc-800 rounded-2xl shadow-xl flex flex-col gap-4">
          <h3 className="flex items-center gap-2.5 text-lg font-normal text-white">
            <TrendingUp className="text-zinc-300" size={22} />
            Skill Matrix & Industry Gap Analysis
          </h3>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mt-2">
            <div className="flex flex-col gap-3">
              <div className="text-xs font-normal uppercase tracking-wider text-white flex items-center gap-2">
                <CheckCircle2 size={16} /> Demonstrated Skills (Detected in Resume)
              </div>
              <div className="flex flex-wrap gap-2">
                {keyword_and_skill_gap.demonstrated_skills.map((skill, idx) => (
                  <span key={idx} className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-full bg-zinc-900 border border-zinc-700 text-white text-xs font-normal transition-all duration-200 hover:border-zinc-500 hover:scale-105">
                    <Check size={14} /> {skill}
                  </span>
                ))}
              </div>
            </div>

            <div className="flex flex-col gap-3">
              <div className="text-xs font-normal uppercase tracking-wider text-zinc-400 flex items-center gap-2">
                <AlertTriangle size={16} /> Critical Skill Gaps (Industry Required)
              </div>
              <div className="flex flex-wrap gap-2">
                {keyword_and_skill_gap.critical_gaps_for_employment.map((gap, idx) => (
                  <span key={idx} className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-full bg-zinc-900 border border-zinc-700 text-zinc-300 text-xs font-normal transition-all duration-200 hover:border-zinc-500 hover:scale-105">
                    <AlertTriangle size={14} className="text-zinc-400" /> {gap}
                  </span>
                ))}
              </div>
            </div>
          </div>
        </div>
      </ScrollReveal>

      <ScrollReveal direction="up" delay={200} className="w-full">
        <div className="p-6 bg-zinc-950 border border-zinc-800 rounded-2xl shadow-xl flex flex-col gap-4">
          <h3 className="flex items-center gap-2.5 text-lg font-normal text-white">
            <Lightbulb className="text-zinc-300" size={22} />
            Actionable Improvements (Resume Action Plan)
          </h3>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mt-2">
            {actionable_improvements.map((item, idx) => (
              <div key={idx} className="p-5 bg-zinc-900 border border-zinc-800 hover:border-zinc-500 rounded-xl flex flex-col gap-3 justify-between transition-all duration-300 hover:-translate-y-1">
                <div>
                  <span className="inline-block text-[11px] font-normal px-2.5 py-1 rounded-full bg-zinc-800 border border-zinc-700 text-white mb-3">
                    {item.section}
                  </span>
                  <div className="p-3 bg-zinc-950 border-l-2 border-zinc-500 text-zinc-300 text-xs rounded-r-md mb-3 leading-relaxed font-normal">
                    <strong className="block text-white mb-0.5 font-normal">Issue / Flaw:</strong> {item.identified_issue}
                  </div>
                </div>
                <div className="text-xs text-zinc-300 leading-relaxed font-normal">
                  <div className="font-normal text-white flex items-center gap-1.5 mb-1 text-[11px]">
                    <Lightbulb size={14} /> Recommended Action:
                  </div>
                  {item.recommended_action}
                </div>
              </div>
            ))}
          </div>
        </div>
      </ScrollReveal>
    </div>
  );
};
