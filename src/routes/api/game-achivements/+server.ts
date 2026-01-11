import type { RequestHandler } from "@sveltejs/kit";
import { getPlayStationAchivements as getPSAchivements, getSteamAchivements } from "./achivement-clients";
import type { CombinedGameAchivement, GameAchivement } from "$lib/models/achivements";

const {
  VITE_PSN_SSO,
  VITE_STEAM_AUTH_KEY,
  VITE_STEAM_USER_ID
} = import.meta.env;

const MY_GOATS = ["baldur's gate 3", "elden ring", "god of war ragnarök"]; 

const formatGameName = (gameName: string) => {
  const filters = ['™', 'Trophies', '\n'];
  let result = gameName;

  for (const f of filters) {
    result = result.replace(f, "");
  }

  return result.trim().toLowerCase();
};

export const GET = (async ({fetch, setHeaders}) => {
  const psResult = await getPSAchivements(VITE_PSN_SSO);
  const steamResult = await getSteamAchivements(VITE_STEAM_AUTH_KEY, VITE_STEAM_USER_ID, fetch);

  const combinedMap: Record<string, GameAchivement> = {};

  for (const psAchivement of psResult.achivements) {
    const gameKey = formatGameName(psAchivement.gameName);
    combinedMap[gameKey] = psAchivement;
  }

  for (const steamAchivement of steamResult.achivements) {
    const gameKey = formatGameName(steamAchivement.gameName);
    if (!combinedMap[gameKey]) {
      combinedMap[gameKey] = steamAchivement;
      continue;
    } 

    const psPercentage = combinedMap[gameKey]?.stats.completePercentage || 0;
    const steamPercentage = steamAchivement.stats.completePercentage || 0;

    if (psPercentage < steamPercentage) {
      combinedMap[gameKey] = steamAchivement;
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
