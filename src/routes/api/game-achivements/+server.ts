import type { RequestHandler } from "@sveltejs/kit";
import { getPlayStationAchivements as getPSAchivements, getSteamAchivements } from "./achivement-clients";
import type { CombinedGameAchivement, GameAchivement } from "$lib/models/achivements";

const {
  VITE_PSN_SSO,
  VITE_STEAM_AUTH_KEY,
  VITE_STEAM_USER_ID
} = import.meta.env;

const MY_GOATS = ["Baldur's Gate 3", "ELDEN RING", "God of War Ragnarök"]; 

export const GET = (async ({fetch, setHeaders}) => {
  const psResult = await getPSAchivements(VITE_PSN_SSO);
  const steamResult = await getSteamAchivements(VITE_STEAM_AUTH_KEY, VITE_STEAM_USER_ID, fetch);

  const combinedMap: Record<string, GameAchivement> = {};

  for (const psAchivement of psResult.achivements) {
    combinedMap[psAchivement.gameName] = psAchivement;
  }

  for (const steamAchivement of steamResult.achivements) {
    if (!combinedMap[steamAchivement.gameName]) {
      combinedMap[steamAchivement.gameName] = steamAchivement;
      continue;
    } 

    const psPercentage = combinedMap[steamAchivement.gameName]?.stats.completePercentage || 0;
    const steamPercentage = steamAchivement.stats.completePercentage || 0;

    if (psPercentage < steamPercentage) {
      combinedMap[steamAchivement.gameName] = steamAchivement;
    }
  }

  const achivements = Object.values(combinedMap);
  
  achivements.sort((achA, achB) => {
    if (achA.stats.completePercentage > achB.stats.completePercentage) {
      return -1;
    } else {
      return 1;
    }
  });

  setHeaders({
    'Cache-Control': 'public, max-age=640, s-maxage=18000, stale-while-revalidate=600'
  });

  return new Response(JSON.stringify({ 
    achivements, 
    steam: {
      total: steamResult.totalCount, 
      earned: steamResult.earnedCount,
      perfectGames: steamResult.perfectGames,
    },
    playstation: {
      total: psResult.totalCount,
      earned: psResult.earnedCount,
      bronze: psResult.bronze,
      silver: psResult.silver,
      gold: psResult.gold,
      platinum: psResult.platinum
    },
    overallCompletePercentage: ((steamResult.earnedCount + psResult.earnedCount) / (steamResult.totalCount + psResult.totalCount)) * 100,
    goats: MY_GOATS.map((game) => combinedMap[game])
  } as CombinedGameAchivement));
}) satisfies RequestHandler;
