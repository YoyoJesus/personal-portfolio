export interface Contributions {
  total: number;
  weeks: number[][];
  months: { week: number; label: string }[];
}

const API = "https://github-contributions-api.jogruber.de/v4";

export async function getContributions(user: string): Promise<Contributions> {
  try {
    const res = await fetch(`${API}/${user}?y=last`);
    const data = await res.json();
    const days: { date: string; level: number }[] = data.contributions ?? [];
    if (!days.length) return { total: 0, weeks: [], months: [] };
    // Pad both ends so every column is a full Sunday-to-Saturday week, like GitHub's graph.
    const start = new Date(days[0].date);
    start.setUTCDate(start.getUTCDate() - start.getUTCDay());
    const levels = [...Array(new Date(days[0].date).getUTCDay()).fill(0), ...days.map((d) => d.level)];
    while (levels.length % 7) levels.push(0);
    const weeks: number[][] = [];
    const months: Contributions["months"] = [];
    for (let i = 0; i < levels.length; i += 7) {
      const w = i / 7;
      weeks.push(levels.slice(i, i + 7));
      const sunday = new Date(start);
      sunday.setUTCDate(start.getUTCDate() + i);
      const label = sunday.toLocaleString("en-US", { month: "short", timeZone: "UTC" });
      if (months.at(-1)?.label !== label) months.push({ week: w, label });
    }
    // Drop a leading label that would be squeezed against the next one.
    if (months.length > 1 && months[1].week - months[0].week < 3) months.shift();
    return { total: data.total?.lastYear ?? 0, weeks, months };
  } catch {
    return { total: 0, weeks: [], months: [] };
  }
}
