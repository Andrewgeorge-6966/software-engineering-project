import { api } from './client';

export interface LeaderboardEntry {
  id: number;
  name: string;
  role: string;
  points: number;
  actsOfServicePoints: number;
}

export const fetchLeaderboard = async (): Promise<LeaderboardEntry[]> => {
  const response = await api.get('/users/leaderboard');
  return response.data.data as LeaderboardEntry[];
};

export const fetchWorkerLeaderboard = async (): Promise<LeaderboardEntry[]> => {
  const response = await api.get('/users/leaderboard/workers');
  return response.data.data as LeaderboardEntry[];
};
