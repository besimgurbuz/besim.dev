import { generateURL } from '$lib/utils/steam-utils';
import type { RequestEvent } from './$types';
import type { SteamResponse } from './response-model';

export const steamClient = (
	authKey: string,
	userId: string
): ((fetch: RequestEvent['fetch']) => Promise<SteamResponse>) => {
  const steamRecentlyPlayedUrl = generateURL(
    'IPlayerService', 
    'GetRecentlyPlayedGames',
    {key: authKey, steamid: userId}
  );

	return async (fetch: RequestEvent['fetch']): Promise<SteamResponse> => {
		const res = await fetch(steamRecentlyPlayedUrl);
		return res.json();
	};
};

