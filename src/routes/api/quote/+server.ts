import { json } from "@sveltejs/kit";
import { getQuote } from "$lib/server/quotable";
import type { RequestHandler } from "./$types";

export const GET: RequestHandler = async () => {
  return json(await getQuote(), { headers: { "cache-control": "no-store" } });
};
