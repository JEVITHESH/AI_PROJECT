
export interface User {
  id: string;
  email: string;
  name: string;
}

export interface Chemical {
  id: string;
  name: string;
  amount?: string;
}

export enum HazardLevel {
  SAFE = 'SAFE',
  CAUTION = 'CAUTION',
  DANGER = 'DANGER',
  LETHAL = 'LETHAL'
}

export interface PredictionResult {
  safetyScore: number;
  hazardLevel: HazardLevel;
  primaryReaction: string;
  hazards: string[];
  warnings: string[];
  alternatives: string[];
  explanation: string;
  confidence: number;
}

export interface HistoryItem {
  id: string;
  userId: string; // Linked to user account or 'guest'
  chemicals: string[];
  result: PredictionResult;
  timestamp: number;
}
