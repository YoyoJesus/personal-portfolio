export interface MtgCard {
  name: string;
  image: string;
}

export interface CommanderDeck {
  name: string;
  link: string;
  /** WUBRG letters from the commanders' color identity, in WUBRG order. */
  colors: string[];
  size: number;
  commanders: MtgCard[];
  /** Cards with a "Showcase" color tag or category on Archidekt. */
  showcase: MtgCard[];
}

interface ArchidektCard {
  quantity: number;
  categories: string[] | null;
  /** Color tag as "Name,#hex"; the name is empty when untagged. */
  label?: string;
  card: { uid: string; scryfallImageHash?: string; oracleCard: { name: string; colorIdentity: string[] } };
}

interface ArchidektDeck {
  name: string;
  categories: { name: string; includedInDeck: boolean }[];
  cards: ArchidektCard[];
}

const COLORS: [string, string][] = [
  ["White", "W"],
  ["Blue", "U"],
  ["Black", "B"],
  ["Red", "R"],
  ["Green", "G"],
];

const SHOWCASE = "showcase";
const isShowcase = (c: ArchidektCard) =>
  c.label?.split(",")[0].trim().toLowerCase() === SHOWCASE || !!c.categories?.some((n) => n.toLowerCase() === SHOWCASE);

// Scryfall's CDN files images by the first two characters of the card's Scryfall ID.
const toCard = ({ card }: ArchidektCard): MtgCard => ({
  name: card.oracleCard.name,
  image: `https://cards.scryfall.io/normal/front/${card.uid[0]}/${card.uid[1]}/${card.uid}.jpg${card.scryfallImageHash ? `?${card.scryfallImageHash}` : ""}`,
});

export function parseDeck(id: number, deck: ArchidektDeck): CommanderDeck {
  const excluded = new Set(deck.categories.filter((c) => !c.includedInDeck).map((c) => c.name));
  // Archidekt counts a card toward the deck by its first category, so Maybeboard cards stay out.
  const cards = deck.cards.filter((c) => !excluded.has(c.categories?.[0] ?? ""));
  const commanders = cards.filter((c) => c.categories?.includes("Commander"));
  const identity = new Set(commanders.flatMap((c) => c.card.oracleCard.colorIdentity));
  return {
    name: deck.name,
    link: `https://archidekt.com/decks/${id}`,
    colors: COLORS.filter(([name]) => identity.has(name)).map(([, letter]) => letter),
    size: cards.reduce((sum, c) => sum + c.quantity, 0),
    commanders: commanders.map(toCard),
    showcase: cards.filter((c) => !c.categories?.includes("Commander") && isShowcase(c)).map(toCard),
  };
}

// Archidekt's API is undocumented and decks change rarely, so keep requests low.
const DECKS_TTL = 6 * 60 * 60 * 1000;
let decksCache: { at: number; key: string; decks: CommanderDeck[] } | null = null;

async function getDeck(id: number): Promise<CommanderDeck | null> {
  try {
    const res = await fetch(`https://archidekt.com/api/decks/${id}/`, { signal: AbortSignal.timeout(8000) });
    if (!res.ok) return null;
    return parseDeck(id, await res.json());
  } catch {
    return null;
  }
}

export async function getCommanderDecks(ids: number[]): Promise<CommanderDeck[]> {
  const key = ids.join(",");
  if (decksCache?.key === key && Date.now() - decksCache.at < DECKS_TTL) return decksCache.decks;
  const decks = (await Promise.all(ids.map(getDeck))).filter((d): d is CommanderDeck => d !== null);
  if (decks.length === ids.length) decksCache = { at: Date.now(), key, decks };
  return decks;
}
