import { json } from "@sveltejs/kit";
import { SITE_CONFIG } from "$lib/config";
import { getRecentFilms } from "$lib/server/letterboxd";
import { getListening } from "$lib/server/lastfm";
import type { RequestHandler } from "./$types";

export const GET: RequestHandler = async () => {
  const { letterboxd, lastfm } = SITE_CONFIG.activity;
  const [films, listening] = await Promise.all([getRecentFilms(letterboxd, 5), getListening(lastfm)]);
  return json(
    { films, listening },
    { headers: { "cache-control": "public, max-age=0, s-maxage=30, stale-while-revalidate=60" } },
  );
};
