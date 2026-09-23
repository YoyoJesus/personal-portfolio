export interface Film {
  title: string;
  year: string;
  rating: number | null;
  watched: string;
  rewatch: boolean;
  liked: boolean;
  poster: string;
  link: string;
}

const tag = (xml: string, name: string) => xml.match(new RegExp(`<${name}>([^]*?)</${name}>`))?.[1]?.trim() ?? "";

export async function getRecentFilms(user: string, limit = 10): Promise<Film[]> {
  try {
    const res = await fetch(`https://letterboxd.com/${user}/rss/`, { headers: { "User-Agent": "Mozilla/5.0" } });
    if (!res.ok) return [];
    const xml = await res.text();
    return [...xml.matchAll(/<item>([\s\S]*?)<\/item>/g)]
      .map(([, item]) => ({
        title: tag(item, "letterboxd:filmTitle"),
        year: tag(item, "letterboxd:filmYear"),
        rating: tag(item, "letterboxd:memberRating") ? Number(tag(item, "letterboxd:memberRating")) : null,
        watched: tag(item, "letterboxd:watchedDate"),
        rewatch: tag(item, "letterboxd:rewatch") === "Yes",
        liked: tag(item, "letterboxd:memberLike") === "Yes",
        poster: item.match(/<img src="([^"]+)"/)?.[1] ?? "",
        link: tag(item, "link"),
      }))
      .filter((f) => f.title)
      .sort((a, b) => b.watched.localeCompare(a.watched))
      .slice(0, limit);
  } catch {
    return [];
  }
}
