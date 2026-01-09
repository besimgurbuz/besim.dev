import type { SteamParams, SteamResponseModel, SteamService, SteamServiceMethod } from "$lib/models/steam";

const BASE_STEAM_API_URL = 'https://api.steampowered.com';

const steamServiceMethodVersionMap: {
  [S in SteamService]: {
    [M in SteamServiceMethod<S>]: string;
  };
} = {
  IPlayerService: {
    GetRecentlyPlayedGames: 'v0001',
    GetOwnedGames: 'v0001',
  },
  ISteamUserStats: {
    GetPlayerAchievements: 'v0001'
  }
};

export const generateGameIconURL = (gameId: number, gameImageIconPath: string): string => {
  return `https://media.steampowered.com/steamcommunity/public/images/apps/${gameId}/${gameImageIconPath}.jpg`
}

export const generateGameStoreURL = (gameId: number): string => {
  return `https://store.steampowered.com/app/${gameId}`
}

export const generateGameHeaderURL = (gameId: number): string => {
  return `https://cdn.akamai.steamstatic.com/steam/apps/${gameId}/header.jpg`;
}

export const generateURL = <S extends SteamService, M extends SteamServiceMethod<S>>(
  serviceName: S, 
  method: M, 
  params: SteamParams<S, M>
): URL => {
  const url = new URL(`${BASE_STEAM_API_URL}/${serviceName}/${method}/${steamServiceMethodVersionMap[serviceName][method]}`);

  for (const [pKey, pValue] of Object.entries(params)) {
    url.searchParams.append(pKey, pValue.toString());
  }
  url.searchParams.append('format', 'json');

  return url;
}

export const callSteamService = async <S extends SteamService, M extends SteamServiceMethod<S>>(
  serviceName: S, 
  method: M, 
  params: SteamParams<S, M>,
  _fetch: typeof fetch
): Promise<SteamResponseModel<S, M>> => {
  const url  = generateURL(
    serviceName,
    method,
    params
  );
  const res = await _fetch(url);
  return res.json();
}
