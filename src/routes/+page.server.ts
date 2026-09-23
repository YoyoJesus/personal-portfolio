import { SITE_CONFIG } from "$lib/config";
import { getRecentFilms } from "$lib/server/letterboxd";
import { getListening } from "$lib/server/lastfm";
import { getTopGames } from "$lib/server/steam";
import type { PageServerLoad } from "./$types";

export const load: PageServerLoad = async () => {
  const { letterboxd, lastfm, steam } = SITE_CONFIG.activity;
  const [films, listening, gaming] = await Promise.all([
    getRecentFilms(letterboxd),
    getListening(lastfm),
    getTopGames(steam),
  ]);
  return { films, listening, gaming };
};
