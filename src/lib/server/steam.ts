import { env } from "$env/dynamic/private";

export interface Game {
  name: string;
  hours: number;
  lastPlayed: string;
  recent: boolean;
  cover: string;
  link: string;
}

export interface Gaming {
  games: Game[];
  missingKey: boolean;
}

const API = "https://api.steampowered.com/IPlayerService/GetOwnedGames/v1/";
const ART = "https://shared.akamai.steamstatic.com/store_item_assets/steam/apps";

// Older games have no portrait art, so fall back to the wide header image.
async function coverFor(appid: number) {
  const portrait = `${ART}/${appid}/library_600x900.jpg`;
  const res = await fetch(portrait, { method: "HEAD" }).catch(() => null);
  return res?.ok ? portrait : `${ART}/${appid}/header.jpg`;
}

export async function getTopGames(steamId: string, limit = 5): Promise<Gaming> {
  const key = env.STEAM_API_KEY;
  if (!key) return { games: [], missingKey: true };
  try {
    const res = await fetch(`${API}?key=${key}&steamid=${steamId}&include_appinfo=1&format=json`);
    const owned: any[] = (await res.json()).response?.games ?? [];
    const top = owned.sort((a, b) => b.playtime_forever - a.playtime_forever).slice(0, limit);
    const games = await Promise.all(
      top.map(async (g) => ({
        name: g.name,
        hours: Math.round(g.playtime_forever / 60),
        lastPlayed: g.rtime_last_played ? new Date(g.rtime_last_played * 1000).toISOString().slice(0, 10) : "",
        recent: (g.playtime_2weeks ?? 0) > 0,
        cover: await coverFor(g.appid),
        link: `https://store.steampowered.com/app/${g.appid}/`,
      })),
    );
    return { games, missingKey: false };
  } catch {
    return { games: [], missingKey: false };
  }
}
