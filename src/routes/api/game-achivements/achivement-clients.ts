import { exchangeAccessCodeForAuthTokens, exchangeNpssoForAccessCode, getUserTitles } from "psn-api";
import type { RequestEvent } from "./$types";
import { callSteamService, generateGameHeaderURL, generateGameIconURL, generateGameStoreURL } from "$lib/utils/steam-utils";
import type { SteamResponseModel } from "$lib/models/steam";
import { 
  GamePlatform, 
  type PlayStationGameAchivementResult, 
  type SteamGameAchivement, 
  type SteamGameAchivementResult 
} from "$lib/models/achivements";
import { sum } from "$lib/utils/math";


const clearGameName = (initialName: string) => {
  const filters = ['™', 'Trophies', '\n'];
  let result = initialName;

  for (const f of filters) {
    result = result.replace(f, "");
  }

  return result.trim();
};

export const getPlayStationAchivements = async (npsso: string) => {
  const accessCode = await exchangeNpssoForAccessCode(npsso);
  const authorization = await exchangeAccessCodeForAuthTokens(accessCode);

  const trophyTitlesResponse = await getUserTitles(
    authorization,
    "me"
  );
  return trophyTitlesResponse.trophyTitles.reduce<PlayStationGameAchivementResult>(
    (result, titleTropy) => {
      const totalAchivements = sum(Object.values(titleTropy.definedTrophies));
      const earnedAchivements = sum(Object.values(titleTropy.earnedTrophies));

      result.achivements.push({
        platform: GamePlatform.PlayStation,
        gameName: clearGameName(titleTropy.trophyTitleName),
        gameImageUrl: titleTropy.trophyTitleIconUrl,
        gameHeaderUrl: titleTropy.trophyTitleIconUrl,
        stats: {
          totalAchivements,
          earnedAchivements,
          completePercentage: titleTropy.progress,
          tropyCounts: titleTropy.earnedTrophies
        }
      });

      return {
        totalCount: result.totalCount + totalAchivements,
        earnedCount: result.earnedCount + earnedAchivements,
        bronze: result.bronze + titleTropy.earnedTrophies.bronze,
        silver: result.silver + titleTropy.earnedTrophies.silver,
        gold: result.gold + titleTropy.earnedTrophies.gold,
        platinum: result.platinum + titleTropy.earnedTrophies.platinum,
        achivements: result.achivements
      }
    }, 
    {
      totalCount: 0,
      earnedCount: 0,
      bronze: 0,
      silver: 0,
      gold: 0,
      platinum: 0,
      achivements: []
    } as PlayStationGameAchivementResult
  );
};


export const getSteamAchivements = async (
  authKey: string, 
  userId: string,
  fetch: RequestEvent['fetch']
) => {
  const ownedGames = await callSteamService(
    'IPlayerService', 
    'GetOwnedGames', 
    {key: authKey, steamid: userId, include_appinfo: true, include_played_free_games: false},
    fetch
  )

  const playedGames = ownedGames.response.games.filter(game => game.playtime_forever > 0);
  
  const achivementPromises = playedGames.map<Promise<SteamGameAchivement>>(
    async (game) => {
      const achivements = await callSteamService(
        'ISteamUserStats',
        'GetPlayerAchievements',
        {key: authKey, steamid: userId, appid: game.appid},
        fetch
      );

      return {
        platform: GamePlatform.Steam,
        gameName: clearGameName(game.name),
        gameImageUrl: generateGameIconURL(game.appid, game.img_icon_url),
        gameHeaderUrl: generateGameHeaderURL(game.appid),
        gameStoreUrl: generateGameStoreURL(game.appid),
        stats: generateCompletePercentageOfSteamGame(achivements)
      } as SteamGameAchivement;
    }
  );

  const allPlayedGamesAchivements = await Promise.all(achivementPromises);

  return allPlayedGamesAchivements.reduce<SteamGameAchivementResult>(
    (result, titleResult) => {
      if (!titleResult.stats) {
        return result;
      }

      result.achivements.push(titleResult);

      return {
        totalCount: result.totalCount + titleResult.stats.totalAchivements,
        earnedCount: result.earnedCount + titleResult.stats.earnedAchivements,
        perfectGames: result.perfectGames + (
          titleResult.stats.totalAchivements == titleResult.stats.earnedAchivements ? 1 : 0
        ),
        achivements: result.achivements
      } as SteamGameAchivementResult;
    }, 
    {
      totalCount: 0,
      earnedCount: 0,
      perfectGames: 0,
      achivements: []
    } as SteamGameAchivementResult
  );
};

const generateCompletePercentageOfSteamGame = (achivementResponse: SteamResponseModel<'ISteamUserStats', 'GetPlayerAchievements'>): SteamGameAchivement['stats'] | null => {
  if (!achivementResponse.playerstats.success || !achivementResponse.playerstats.achievements?.length) return null;

  const totalCount = achivementResponse.playerstats.achievements.length;

  const earnedCount = achivementResponse.playerstats.achievements.filter(a => a.achieved == 1 && a.unlocktime > 0).length;
  
  return {
    totalAchivements: totalCount,
    earnedAchivements: earnedCount,
    completePercentage: ((earnedCount / totalCount) * 100)
  };
}

