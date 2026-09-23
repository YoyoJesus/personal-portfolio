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
}

export interface Listening {
  recent: Track[];
  topArtists: Artist[];
  missingKey: boolean;
  failed?: boolean;
}

const API = "https://ws.audioscrobbler.com/2.0/";

const EMPTY = { recent: [], topArtists: [] };

export async function getListening(user: string): Promise<Listening> {
  const key = env.LASTFM_API_KEY;
  if (!key) return { ...EMPTY, missingKey: true };
  // Last.fm intermittently answers with an error payload, so retry once before giving up.
  const call = async (method: string, extra = "", retries = 1): Promise<any> => {
    const url = `${API}?method=${method}&user=${user}&api_key=${key}&format=json${extra}`;
    const data = await fetch(url)
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
    const tracks: Track[] = recent.recenttracks.track.map((t: any) => ({
      name: t.name,
      artist: t.artist["#text"],
      art: t.image?.at(-1)?.["#text"] ?? "",
      link: t.url,
      nowPlaying: t["@attr"]?.nowplaying === "true",
    }));
    return {
      missingKey: false,
      recent: tracks.filter((t, i) => tracks.findIndex((u) => u.link === t.link) === i).slice(0, 5),
      topArtists: top.topartists.artist.map((a: any) => ({ name: a.name, plays: Number(a.playcount), link: a.url })),
    };
  } catch (err) {
    console.error(err);
    return { ...EMPTY, missingKey: false, failed: true };
  }
}
