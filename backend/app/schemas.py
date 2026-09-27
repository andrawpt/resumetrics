from typing import List
from pydantic import BaseModel, Field

class ProfileClassification(BaseModel):
    career_stage: str = Field(..., description="Detected career stage of the candidate")
    has_formal_employment: bool = Field(..., description="Whether formal corporate employment is documented")
    confidence_reason: str = Field(..., description="Rationale for the classification decision")

class CandidateProfile(BaseModel):
    headline: str = Field(..., description="Realistic headline reflecting current capabilities")
    summary: str = Field(..., description="Concise objective summary of candidate profile")

class JobRecommendation(BaseModel):
    role: str = Field(..., description="Target job title")
    seniority_level: str = Field(..., description="Target seniority level")
    match_score: str = Field(..., description="Estimated match score percentage")
    match_reason: str = Field(..., description="Rationale for job match recommendation")

class KeywordAndSkillGap(BaseModel):
    demonstrated_skills: List[str] = Field(default_factory=list, description="Skills explicitly evidenced in the resume")
    critical_gaps_for_employment: List[str] = Field(default_factory=list, description="Missing skills required by industry")

class ActionableImprovement(BaseModel):
    section: str = Field(..., description="Resume section needing improvement")
    identified_issue: str = Field(..., description="Identified flaw or gap")
    recommended_action: str = Field(..., description="Specific recommendation to resolve the issue")

class ResumeAnalysisData(BaseModel):
    profile_classification: ProfileClassification
    candidate_profile: CandidateProfile
    strengths: List[str] = Field(default_factory=list)
    job_recommendations: List[JobRecommendation] = Field(default_factory=list)
    keyword_and_skill_gap: KeywordAndSkillGap
    actionable_improvements: List[ActionableImprovement] = Field(default_factory=list)

class ResumeAnalysisResponse(BaseModel):
    status: str
    filename: str
    data: ResumeAnalysisData

class HealthCheckResponse(BaseModel):
    status: str
    message: str
