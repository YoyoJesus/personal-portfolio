import { env } from "$env/dynamic/private";
import type { Game } from "./steam";

interface Title {
  titleId: string;
  name: string;
  displayImage: string | null;
  titleHistory: { lastTimePlayed: string } | null;
}

interface Stat {
  titleid: string;
  value?: string;
}

const API = "https://xbl.io/api/v2";
// OpenXBL's free tier allows 150 requests an hour and each refresh costs two.
const TTL = 30 * 60 * 1000;
// shortcut: cache is per server instance, move to a shared store if cold starts burn the rate limit.
let cache: { at: number; games: Game[] } | null = null;

async function xbl<T>(key: string, path: string, body?: unknown): Promise<T> {
  const res = await fetch(`${API}${path}`, {
    method: body ? "POST" : "GET",
    // Node sends "Accept-Language: *" by default, which OpenXBL rejects inside a 200 response.
    headers: {
      "X-Authorization": key,
      Accept: "application/json",
      "Accept-Language": "en-US",
      "Content-Type": "application/json",
    },
    body: body ? JSON.stringify(body) : undefined,
  });
  if (!res.ok) throw new Error(`OpenXBL ${path} ${res.status}`);
  const { content } = await res.json();
  if (typeof content !== "object") throw new Error(`OpenXBL ${path}: ${JSON.stringify(content)}`);
  return content;
}

export async function getXboxGames(limit = 5): Promise<Game[]> {
  const key = env.OPENXBL_API_KEY;
  if (!key) return [];
  if (cache && Date.now() - cache.at < TTL) return cache.games;
  try {
    const { xuid, titles } = await xbl<{ xuid: string; titles: Title[] }>(key, "/player/titleHistory");
    const stats = await xbl<{ statlistscollection: { stats: Stat[] }[] }>(key, "/player/stats", {
      xuids: [xuid],
      stats: titles.map((t) => ({ name: "MinutesPlayed", titleId: t.titleId })),
    });
    const minutes = new Map(stats.statlistscollection[0]?.stats.map((s) => [s.titleid, Number(s.value ?? 0)]));
    const twoWeeksAgo = Date.now() - 14 * 24 * 60 * 60 * 1000;
    const games = titles
      .filter((t) => (minutes.get(t.titleId) ?? 0) > 0)
      .sort((a, b) => (minutes.get(b.titleId) ?? 0) - (minutes.get(a.titleId) ?? 0))
      .slice(0, limit)
      .map((t) => {
        const last = t.titleHistory?.lastTimePlayed ?? "";
        return {
          name: t.name,
          hours: Math.round((minutes.get(t.titleId) ?? 0) / 60),
          lastPlayed: last.slice(0, 10),
          recent: last ? Date.parse(last) > twoWeeksAgo : false,
          cover: (t.displayImage ?? "").replace(/^http:/, "https:"),
          link: `https://www.xbox.com/en-US/search/results?q=${encodeURIComponent(t.name)}`,
        };
      });
    cache = { at: Date.now(), games };
    return games;
  } catch {
    return cache?.games ?? [];
  }
}
