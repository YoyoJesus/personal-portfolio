import { env } from "$env/dynamic/private";

export interface Track {
  name: string;
  artist: string;
  art: string;
  link: string;
  nowPlaying: boolean;
}

export interface Artist {
  name: string;
  plays: number;
  link: string;
  art: string;
}

export interface Listening {
  recent: Track[];
  topArtists: Artist[];
  missingKey: boolean;
  failed?: boolean;
}

interface LastfmImage { "#text": string; }
interface LastfmTrack {
  name: string;
  artist: { "#text": string };
  image?: LastfmImage[];
  url: string;
  "@attr"?: { nowplaying?: string };
}
interface LastfmArtist { name: string; playcount: string; url: string; image?: LastfmImage[]; }
interface LastfmResponse {
  error?: number;
  message?: string;
  recenttracks?: { track: LastfmTrack[] };
  topartists?: { artist: LastfmArtist[] };
}

const API = "https://ws.audioscrobbler.com/2.0/";
const EMPTY = { recent: [], topArtists: [] };
const artistImages = new Map<string, { art: string; expires: number }>();

function usableArtistImage(value: string): string {
  try {
    const url = new URL(value);
    if (url.protocol !== "https:" || !["lastfm-img.freetls.fastly.net", "lastfm.freetls.fastly.net"].includes(url.hostname)) return "";
    return url.pathname.includes("2a96cbd8b46e442fc41c2b86b821562f") ? "" : url.href;
  } catch { return ""; }
}

async function artistArt(artist: LastfmArtist, key: string): Promise<string> {
  const apiArt = usableArtistImage(artist.image?.at(-1)?.["#text"] ?? "");
  if (apiArt) return apiArt;
  const cached = artistImages.get(artist.name);
  if (cached && cached.expires > Date.now()) return cached.art;
  let art = "";
  try {
    // The artist API supplies a placeholder; the public artist page carries the actual photo.
    const response = await fetch(`https://www.last.fm/music/${encodeURIComponent(artist.name).replace(/%20/g, "+")}`, { signal: AbortSignal.timeout(5000) });
    if (response.ok) {
      const html = await response.text();
      const tag = html.match(/<meta\b[^>]*property=["']og:image["'][^>]*>/i)?.[0];
      art = usableArtistImage(tag?.match(/content=["']([^"']+)["']/i)?.[1] ?? "");
      if (art) art = art.replace("/i/u/ar0/", "/i/u/avatar170s/");
    }
  } catch { /* Keep the artist link even when its photo is unavailable. */ }
  if (!art) {
    try {
      const params = new URLSearchParams({ method: "artist.gettopalbums", artist: artist.name, api_key: key, format: "json", limit: "1" });
      const response = await fetch(`${API}?${params}`, { signal: AbortSignal.timeout(5000) });
      const data: { topalbums?: { album?: { image?: LastfmImage[] }[] } } = await response.json();
      art = usableArtistImage(data.topalbums?.album?.[0]?.image?.at(-1)?.["#text"] ?? "");
    } catch { /* Artist names remain usable without artwork. */ }
  }
  art ||= cached?.art ?? "";
  if (artistImages.size >= 50) {
    const oldest = artistImages.keys().next().value;
    if (oldest) artistImages.delete(oldest);
  }
  artistImages.set(artist.name, { art, expires: Date.now() + (art ? 86_400_000 : 600_000) });
  return art;
}

export async function getListening(user: string): Promise<Listening> {
  const key = env.LASTFM_API_KEY;
  if (!key) return { ...EMPTY, missingKey: true };
  const call = async (method: string, extra = "", retries = 1): Promise<LastfmResponse> => {
    const url = `${API}?method=${method}&user=${encodeURIComponent(user)}&api_key=${key}&format=json${extra}`;
    const data: LastfmResponse | null = await fetch(url)
      .then((r) => r.json())
      .catch(() => null);
    if (data && !data.error) return data;
    if (retries) return call(method, extra, retries - 1);
    throw new Error(data?.message ?? `Last.fm ${method} failed`);
  };
  try {
    const [recent, top] = await Promise.all([
      call("user.getrecenttracks", "&limit=20"),
      call("user.gettopartists", "&period=1month&limit=5"),
    ]);
    const tracks: Track[] = (recent.recenttracks?.track ?? []).map((t) => ({
      name: t.name,
      artist: t.artist["#text"],
      art: t.image?.at(-1)?.["#text"] ?? "",
      link: t.url,
      nowPlaying: t["@attr"]?.nowplaying === "true",
    }));
    return {
      missingKey: false,
      recent: tracks.filter((t, i) => tracks.findIndex((u) => u.link === t.link) === i).slice(0, 5),
      topArtists: await Promise.all((top.topartists?.artist ?? []).map(async (a) => ({ name: a.name, plays: Number(a.playcount), link: a.url, art: await artistArt(a, key) }))),
    };
  } catch (err) {
    console.error(err);
    return { ...EMPTY, missingKey: false, failed: true };
  }
}
