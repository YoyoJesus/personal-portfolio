import { get } from "node:https";

export interface Quote {
  content: string;
  author: string;
}

// Keep the quotes on-topic for a portfolio: work, learning, and drive.
const TAGS = [
  "Business",
  "Success",
  "Technology",
  "Motivational",
  "Inspirational",
  "Leadership",
  "Wisdom",
  "Education",
  "Science",
  "Creativity",
  "Perseverance",
  "Work",
  "Character",
  "Knowledge",
  "Change",
  "Future",
  "Opportunity",
  "Courage",
  "Imagination",
];

// Quotes carry several tags, so a Wisdom quote can still be about politics or religion.
const BLOCKED_TAGS = new Set([
  "Politics",
  "Conservative",
  "Social Justice",
  "Religion",
  "Faith",
  "Spirituality",
  "War",
  "Power Quotes",
  "Love",
  "Sadness",
  "Pain",
  "Humorous",
  "Stupidity",
  "Sports",
  "Athletics",
]);

const BLOCKED_AUTHORS = new Set([
  "Ayn Rand",
  "Barack Obama",
  "Elon Musk",
  "Ezra Taft Benson",
  "Frank Abagnale",
  "George S. Patton",
  "Gordon Hinckley",
  "Indira Gandhi",
  "Joe Paterno",
  "Joseph Prince",
  "Joyce Meyer",
  "Marcia Fudge",
  "Margaret Thatcher",
  "Napoleon",
  "Niccolò Machiavelli",
  "Pope Paul VI",
  "Robert Kiyosaki",
  "Woody Allen",
]);

const API = `https://api.quotable.io/quotes/random?limit=10&maxLength=140&tags=${encodeURIComponent(TAGS.join("|"))}`;

interface Result extends Quote {
  tags: string[];
}

// api.quotable.io has served an expired certificate for a while, so fetch() rejects it.
// The response is plain text rendered escaped, so skipping verification for this one call is acceptable.
export function getQuote(): Promise<Quote | null> {
  return new Promise((resolve) => {
    const req = get(API, { rejectUnauthorized: false, timeout: 3000 }, (res) => {
      let body = "";
      res.on("data", (chunk) => (body += chunk));
      res.on("end", () => {
        try {
          const quotes: Result[] = JSON.parse(body);
          const pick = quotes.find((q) => !BLOCKED_AUTHORS.has(q.author) && !q.tags.some((t) => BLOCKED_TAGS.has(t)));
          resolve(pick ? { content: pick.content, author: pick.author } : null);
        } catch {
          resolve(null);
        }
      });
    });
    req.on("timeout", () => req.destroy());
    req.on("error", () => resolve(null));
  });
}
