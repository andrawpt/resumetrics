export interface ProfileClassification {
  career_stage: string;
  has_formal_employment: boolean;
  confidence_reason: string;
}

export interface CandidateProfile {
  headline: string;
  summary: string;
}

export interface JobRecommendation {
  role: string;
  seniority_level: string;
  match_score: string;
  match_reason: string;
}

export interface KeywordAndSkillGap {
  demonstrated_skills: string[];
  critical_gaps_for_employment: string[];
}

export interface ActionableImprovement {
  section: string;
  identified_issue: string;
  recommended_action: string;
}

export interface ResumeAnalysisData {
  profile_classification: ProfileClassification;
  candidate_profile: CandidateProfile;
  strengths: string[];
  job_recommendations: JobRecommendation[];
  keyword_and_skill_gap: KeywordAndSkillGap;
  actionable_improvements: ActionableImprovement[];
}

export interface AnalyzeResponse {
  status: string;
  filename: string;
  data: ResumeAnalysisData;
}

