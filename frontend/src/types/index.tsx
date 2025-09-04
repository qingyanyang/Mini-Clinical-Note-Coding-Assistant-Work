export interface IAnalyzeRequest {
  transcriptText: string;
  ack?: boolean;
}

export interface IFormatRequest {
  rawTranscriptText: string;
}

export type Confidence = "low" | "med" | "high";
export type RiskLevel = "none" | "high";
export type EMLevel = "99212" | "99213" | "99214" | "99215" | null;

export interface ISOAP {
  subjective: string;
  objective: string;
  assessment: string;
  plan: string;
}

export interface IProblem {
  name: string;
  rationale: string;
}

export interface IICD {
  code: string;
  description: string;
  confidence: Confidence;
}

export interface ICPT {
  code: string;
  justification: string;
  confidence: Confidence;
}

export interface IAnalysis {
  schemaVersion: 1;
  documentation: ISOAP;
  problems: IProblem[];
  icd10: IICD[];
  billing: {
    emLevel: EMLevel;
    cpt: ICPT[];
    hintSummary: string;
  };
  risks: {
    riskLevel: RiskLevel;
    reasons: string[];
  };
  complianceNote: string;
}

export interface IParsedResponse {
  schemaVersion?: 1;
  banner: { text: string };
  guardrails: {
    requiresAcknowledgement: boolean;
    reasons: string[];
  };
  data: IAnalysis;
  claimsSoftened?: boolean;
  trace?: {
    prompt: {
      system?: string;
      user: string;
    };
    rawModelText?: string;
    decisionLog: string[];
    meta?: {
      provider?: string;
      model?: string;
    };
  };
  sessionId?: string;
  createdAt?: string;
}

export interface IFormattedResponse {
  parsed: {
    formatted: string;
    turns: ISpeakerFormat[];
  };
}

export interface ISpeakerFormat {
  speaker: string;
  text: string;
}
export interface IApiFullResponse<T> {
  status: number;
  data: {
    parsedResponse: T;
  };
}
