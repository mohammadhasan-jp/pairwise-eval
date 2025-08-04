import axios from "axios";

export type Comparison = {
  winner_id: number;
  loser_id: number;
};

export type Employee = {
  id: number;
  name: string;
};

export type RankingRequest = {
  employees: Employee[];
  comparisons: Comparison[];
};

export type RankingResult = {
  employee_id: number;
  score: number;
};

const BASE_URL = "http://localhost:3000";

export async function postBradleyTerryRanking(data: RankingRequest): Promise<RankingResult[]> {
  const res = await axios.post<RankingResult[]>(`${BASE_URL}/rankings/bradley-terry`, data);
  return res.data;
}
