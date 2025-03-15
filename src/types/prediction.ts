
export interface Team {
  id: string;
  name: string;
  logoUrl: string;
  weight?: number;
  league: string;
}

export interface Match {
  homeTeam: Team | null;
  awayTeam: Team | null;
}

export interface HeadToHeadStats {
  homeWins: number;
  awayWins: number;
  draws: number;
  homeWinPercentage: number;
  awayWinPercentage: number;
  drawPercentage: number;
}

export interface AverageGoals {
  averageTotalGoals: number;
  averageHomeGoals: number;
  averageAwayGoals: number;
}

export interface TeamAnalysis {
  homeTeam: string;
  awayTeam: string;
  matchesCount: number;
  bothTeamsScoredPercentage: number;
  averageGoals: AverageGoals;
  homeFormIndex: number;
  awayFormIndex: number;
  headToHeadStats: HeadToHeadStats;
  predictionScore?: number;
}

export interface ModelPredictions {
  randomForest: string;
  poisson: {
    homeGoals: number;
    awayGoals: number;
  };
  elo: {
    homeWinProb: number;
    drawProb: number;
    awayWinProb: number;
  };
}

export interface Prediction {
  homeExpectedGoals: number;
  awayExpectedGoals: number;
  bothTeamsToScoreProb: number;
  predictedWinner: string;
  confidence: number;
  modelPredictions: ModelPredictions;
}

export interface PredictionResponse {
  match: {
    homeTeam: Team;
    awayTeam: Team;
  };
  teamAnalysis: TeamAnalysis;
  prediction: Prediction;
}
