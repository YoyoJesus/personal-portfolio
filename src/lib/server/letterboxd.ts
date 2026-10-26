export interface Film {
  title: string;
  year: string;
  rating: number | null;
  watched: string;
  rewatch: boolean;
  liked: boolean;
  poster: string;
  link: string;
  /** Review paragraphs as plain text; null when the entry is a diary log without a review. */
  review: string[] | null;
  spoilers: boolean;
}

const tag = (xml: string, name: string) => xml.match(new RegExp(`<${name}>([^]*?)</${name}>`))?.[1]?.trim() ?? "";

const ENTITIES: Record<string, string> = { amp: "&", lt: "<", gt: ">", quot: '"', apos: "'", nbsp: " " };

const decode = (s: string) =>
  s.replace(/&(#x[\da-f]+|#\d+|\w+);/gi, (m, e: string) => {
    if (e[0] !== "#") return ENTITIES[e.toLowerCase()] ?? m;
    return String.fromCodePoint(e[1].toLowerCase() === "x" ? parseInt(e.slice(2), 16) : Number(e.slice(1)));
  });

const SPOILER_NOTE = "This review may contain spoilers.";

// The description is the poster in its own <p>, then the review paragraphs (or a "Watched on" line for diary-only logs).
function parseReview(item: string): Pick<Film, "review" | "spoilers"> {
  if (!/<guid[^>]*>letterboxd-review-/.test(item)) return { review: null, spoilers: false };
  const html = item.match(/<description><!\[CDATA\[([\s\S]*?)\]\]><\/description>/)?.[1] ?? "";
  const paragraphs = [...html.matchAll(/<p>([\s\S]*?)<\/p>/g)]
    .map(([, p]) => decode(p.replace(/<br\s*\/?>/gi, "\n").replace(/<[^>]+>/g, "")).trim())
    .filter(Boolean);
  const spoilers = paragraphs.includes(SPOILER_NOTE);
  const review = paragraphs.filter((p) => p !== SPOILER_NOTE);
  return { review: review.length ? review : null, spoilers };
}

export async function getRecentFilms(user: string, limit = 10): Promise<Film[]> {
  try {
    const res = await fetch(`https://letterboxd.com/${user}/rss/`, { headers: { "User-Agent": "Mozilla/5.0" } });
    if (!res.ok) return [];
    const xml = await res.text();
    return [...xml.matchAll(/<item>([\s\S]*?)<\/item>/g)]
      .map(([, item]) => ({
        title: decode(tag(item, "letterboxd:filmTitle")),
        year: tag(item, "letterboxd:filmYear"),
        rating: tag(item, "letterboxd:memberRating") ? Number(tag(item, "letterboxd:memberRating")) : null,
        watched: tag(item, "letterboxd:watchedDate"),
        rewatch: tag(item, "letterboxd:rewatch") === "Yes",
        liked: tag(item, "letterboxd:memberLike") === "Yes",
        poster: item.match(/<img src="([^"]+)"/)?.[1] ?? "",
        link: tag(item, "link"),
        ...parseReview(item),
      }))
      .filter((f) => f.title)
      .sort((a, b) => b.watched.localeCompare(a.watched))
      .slice(0, limit);
  } catch {
    return [];
  }
}
