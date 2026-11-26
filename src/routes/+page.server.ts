import { SITE_CONFIG } from "$lib/config";
import { getFavoriteFilms, getRecentFilms } from "$lib/server/letterboxd";
import { getListening } from "$lib/server/lastfm";
import { getTopGames } from "$lib/server/steam";
import { getXboxGames } from "$lib/server/xbox";
import { getContributions } from "$lib/server/github";
import { getCommanderDecks } from "$lib/server/archidekt";
import type { PageServerLoad } from "./$types";

export const load: PageServerLoad = async ({ setHeaders }) => {
  const { letterboxd, letterboxdFavorites, lastfm, steam, github, commanderDecks } = SITE_CONFIG.activity;
  const [films, favoriteFilms, listening, gaming, xboxGames, contributions, decks] = await Promise.all([
    getRecentFilms(letterboxd, 5),
    getFavoriteFilms(letterboxdFavorites),
    getListening(lastfm),
    getTopGames(steam),
    getXboxGames(),
    getContributions(github),
    getCommanderDecks(commanderDecks),
  ]);
  // Vercel's CDN serves a cached copy for a minute, then refreshes in the background.
  // Skip the CDN cache when Last.fm failed so an empty section isn't served for minutes.
  setHeaders({
    "cache-control": listening.failed ? "no-store" : "public, max-age=0, s-maxage=60, stale-while-revalidate=300",
  });
  return { films, favoriteFilms, listening, gaming, xboxGames, contributions, decks };
};
