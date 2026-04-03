export interface CvHeader {
  name: string;
  location: string;
  phone: string;
  email: string;
  linkedin: string;
  github: string;
  tiktok: string;
  youtube: string;
}

export interface CvProfile {
  id: number;
  name: string;
  text: string;
}

export interface CvExperience {
  id: number;
  company: string;
  companyUrl?: string;
  location: string;
  role: string;
  period: string;
  bullets: string[];
}

export interface CvSkillCategory {
  id: number;
  category: string;
  skills: string;
}

export interface CvEducation {
  id: number;
  institution: string;
  location: string;
  degree: string;
  period: string;
}

export interface CvLanguage {
  id: number;
  language: string;
  level: string;
}

export interface CvSoftSkill {
  id: number;
  skill: string;
}

export interface CvData {
  header: CvHeader;
  profiles: CvProfile[];
  activeProfileId: number;
  experiences: CvExperience[];
  enterpriseExperiences: CvExperience[];
  technicalSkills: CvSkillCategory[];
  education: CvEducation[];
  languages: CvLanguage[];
  softSkills: CvSoftSkill[];
}
