export type SteamServiceDefinition = {
  IPlayerService: {
    GetRecentlyPlayedGames: {
      params: {
        steamid: string;
      },
      model: {
        response: {
          total_count: number;
          games: {
            appid: number;
            name: string;
            img_icon_url: string;
          }[]
        }
      }
    },
    GetOwnedGames: {
      params: {
        steamid: string;
        include_appinfo?: boolean;
        include_played_free_games?: boolean;
        appids_filter?: string[];
      },
      model: {
        response: {
          game_count: number;
          games: {
            appid: number;
            name: string,
            playtime_forever: number;
            img_icon_url: string,
            playtime_windows_forever: number;
            playtime_mac_forever: number;
            playtime_linux_forever: number;
            playtime_deck_forever: number;
            rtime_last_played: number;
            content_descriptorids: number[],
            playtime_disconnected: number
          }[]
        }
      }
    },
  },
  ISteamUserStats: {
    GetPlayerAchievements: {
      params: {
        steamid: string;
        appid: number;
      },
      model: {
        playerstats: {
          steamID: string,
          gameName: string,
          achievements: {
            apiname: string,
            achieved: number;
            unlocktime: number;
          }[],
          success: boolean;
        }
      }
    }
  }
}

export type SteamService = keyof SteamServiceDefinition;

export type SteamServiceMethod<S extends SteamService> = Extract<keyof SteamServiceDefinition[S], string>;

export type SteamRequiredParams = {
  key: string;
}

export type SteamParams<S extends SteamService, M extends SteamServiceMethod<S>> = SteamRequiredParams & (SteamServiceDefinition[S][M] extends { params: infer P } ? P : never);


export type SteamResponseModel<S extends SteamService, M extends SteamServiceMethod<S>> = SteamServiceDefinition[S][M] extends { model: infer Model } ? Model : never;
