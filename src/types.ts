export type ProjectCategory = 'all' | 'agents' | 'rag' | 'structured' | 'multimodal';

export interface ResumeBullet {
  bullet: string;
  category: 'Impact' | 'Architecture' | 'Optimization';
  metrics: string;
}

export interface InterviewQA {
  question: string;
  interviewerIntent: string;
  recommendedAnswer: string;
}

export interface SampleInput {
  name: string;
  description: string;
  payload: any;
}

export interface EnterpriseProject {
  id: string;
  title: string;
  tagline: string;
  category: 'agents' | 'rag' | 'structured' | 'multimodal';
  complexity: 'Advanced' | 'Production-Ready' | 'Staff-Level';
  targetRoles: string[];
  keyMetric: string;
  metricLabel: string;
  summary: string;
  architectureSummary: string;
  asciiDiagram: string;
  productionStack: {
    category: string;
    technologies: string[];
  }[];
  keyTradeoffs: {
    decision: string;
    rationale: string;
    alternativeDiscarded: string;
  }[];
  resumeBullets: ResumeBullet[];
  interviewQA: InterviewQA[];
  sampleInputs: SampleInput[];
  endpoint: string;
}
