import { SITE_CONFIG } from "$lib/config";
import { getRecentFilms } from "$lib/server/letterboxd";
import { getListening } from "$lib/server/lastfm";
import { getTopGames } from "$lib/server/steam";
import { getContributions } from "$lib/server/github";
import type { PageServerLoad } from "./$types";

export const load: PageServerLoad = async ({ setHeaders }) => {
  const { letterboxd, lastfm, steam, github } = SITE_CONFIG.activity;
  const [films, listening, gaming, contributions] = await Promise.all([
    getRecentFilms(letterboxd, 5),
    getListening(lastfm),
    getTopGames(steam),
    getContributions(github),
  ]);
  // Vercel's CDN serves a cached copy for a minute, then refreshes in the background.
  setHeaders({ "cache-control": "public, max-age=0, s-maxage=60, stale-while-revalidate=300" });
  return { films, listening, gaming, contributions };
};
