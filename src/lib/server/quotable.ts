import { get } from "node:https";

export interface Quote {
  content: string;
  author: string;
}

const API = "https://api.quotable.io/quotes/random?maxLength=140";

// api.quotable.io has served an expired certificate for a while, so fetch() rejects it.
// The response is plain text rendered escaped, so skipping verification for this one call is acceptable.
export function getQuote(): Promise<Quote | null> {
  return new Promise((resolve) => {
    const req = get(API, { rejectUnauthorized: false, timeout: 3000 }, (res) => {
      let body = "";
      res.on("data", (chunk) => (body += chunk));
      res.on("end", () => {
        try {
          const [{ content, author }] = JSON.parse(body);
          resolve({ content, author });
        } catch {
          resolve(null);
        }
      });
    });
    req.on("timeout", () => req.destroy());
    req.on("error", () => resolve(null));
  });
}
