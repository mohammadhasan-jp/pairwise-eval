export type Comparison = {
  winner: string;
  loser: string;
};

export type RankingResult = {
  employee_id: string;
  score: number;
};

export type EmployeeScores = {
  employee_id: string;
  scores: Record<string, number>;
};

export type RankingRequest = {
  employees: EmployeeScores[];
  pairwise_matrix: number[][];
  criteria: string[];
};
