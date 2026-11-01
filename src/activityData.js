// Deterministic sample data, deliberately separate from profile integrations.
export function generateActivity(seed = 27, days = 365) {
  let state = seed >>> 0;
  const random = () => {
    state = (1664525 * state + 1013904223) >>> 0;
    return state / 4294967296;
  };
  const end = Date.UTC(2026, 10, 1);
  return Array.from({ length: days }, (_, index) => {
    const district = 0.45 + 0.55 * Math.pow(Math.sin(index / 47), 2);
    const github =
      random() > 0.32 ? Math.ceil(Math.pow(random(), 1.6) * 18 * district) : 0;
    const leetcode =
      random() > 0.51 ? Math.ceil(Math.pow(random(), 1.7) * 8 * district) : 0;
    return {
      index,
      date: new Date(end - (days - index - 1) * 86400000)
        .toISOString()
        .slice(0, 10),
      github,
      leetcode,
    };
  });
}
export const activity = generateActivity();
export const activityColors = {
  github: ["#03421b", "#1c6b2a", "#2e9d3c", "#55d45a"],
  leetcode: ["#6b4f10", "#9d741b", "#d1a62c", "#f2d55b"],
  both: ["#163d70", "#245d9c", "#3883c7", "#66a9e0"],
};
export function buildingForDay(day, filter = "all") {
  if (filter === "both" && (!day.github || !day.leetcode)) return null;
  const github = filter === "leetcode" ? 0 : day.github;
  const leetcode = filter === "github" ? 0 : day.leetcode;
  const count = github + leetcode;
  if (!count) return null;
  const source = github && leetcode ? "both" : github ? "github" : "leetcode";
  const bands = source === "both" ? [4, 9, 16] : source === "github" ? [3, 7, 12] : [1, 3, 5];
  return {
    source,
    count,
    level: bands.filter(value => count > value).length,
    height: 0.28 + count * (source === "both" ? 0.28 : source === "github" ? 0.33 : 0.48),
  };
}
export function calendarLayout(rows) {
  const offset = new Date(rows[0].date).getUTCDay();
  const cells = rows.map((day, i) => ({
    ...day,
    column: Math.floor((i + offset) / 7),
    row: (i + offset) % 7,
  }));
  const months = cells.filter((day, i) => i === 0 || day.date.endsWith("-01"))
    .map((day) => ({
      key: day.date,
      column: day.column,
      label: new Intl.DateTimeFormat("en", { month: "short", timeZone: "UTC" }).format(new Date(day.date)),
    }));
  return { cells, months, columns: cells.at(-1).column + 1 };
}
export const formatDay = (date) =>
  new Intl.DateTimeFormat("en", {
    day: "numeric",
    month: "short",
    year: "numeric",
    timeZone: "UTC",
  }).format(new Date(date));
