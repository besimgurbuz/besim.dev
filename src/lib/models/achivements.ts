import type { TrophyCounts } from "psn-api";

export enum GamePlatform {
  Steam = 'steam',
  PlayStation = 'ps'
}

export type SteamGameAchivement = {
  platform: GamePlatform.Steam;
  gameName: string;
  gameImageUrl: string;
  gameHeaderUrl: string;
  gameStoreUrl: string;
  stats: {
    totalAchivements: number;
    earnedAchivements: number;
    completePercentage: number;
  }
}

export type PlayStationGameAchivement = {
  platform: GamePlatform.PlayStation;
  gameName: string;
  gameImageUrl: string;
  gameHeaderUrl: string;
  stats: {
    totalAchivements: number;
    earnedAchivements: number;
    completePercentage: number;
    tropyCounts: TrophyCounts
  }
}

export type GameAchivement = SteamGameAchivement | PlayStationGameAchivement;

export type PlayStationGameAchivementResult = {
  totalCount: number;
  earnedCount: number;
  bronze: number;
  silver: number;
  gold: number;
  platinum: number;
  achivements: PlayStationGameAchivement[];
} 

export type SteamGameAchivementResult = {
  totalCount: number;
  earnedCount: number;
  perfectGames: number;
  achivements: SteamGameAchivement[];
};

export type GameAchivementResult = PlayStationGameAchivementResult | SteamGameAchivementResult;

export type CombinedGameAchivement = {
  achivements: GameAchivement[];
  steam: {
    total: number;
    earned: number;
    perfectGames: number;
  };
  playstation: {
    total: number;
    earned: number;
    bronze: number;
    silver: number;
    gold: number;
    platinum: number;
  };
  goats: [GameAchivement, GameAchivement, GameAchivement],
  overallCompletePercentage: number;
}
