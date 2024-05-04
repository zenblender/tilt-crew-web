export interface BasePlayer {
  name: string;
  nameColumnIndex: number;
}

export interface RatedPlayer {
  name: string;
  rating: number;
  ratingChangeThisWeek: number;
  ratingChangeThisSeason: number;
}

export interface WeekResult {
  weekNumber: number; // 1-based
  ratedPlayers: RatedPlayer[];
}

export interface Season {
  seasonName: string;
  allWeekResults: WeekResult[];
}
