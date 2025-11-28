export interface Stats {
  id: string;
  total_adoptions: number;
  total_rescued_pets: number;
  total_volunteers: number;
  updated_at: string;
}

export interface UpdateStatsInput {
  total_adoptions?: number;
  total_rescued_pets?: number;
  total_volunteers?: number;
}