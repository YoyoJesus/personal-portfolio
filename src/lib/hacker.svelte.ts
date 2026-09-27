export const HACKER_ALIAS = "yoyojesus";
export const HACKER_HASHES = ["#hacker", "#robot"];
const STORAGE_KEY = "hackermode";

export const hacker = $state({ on: false, booting: false });

export function setHacker(on: boolean) {
  if (hacker.on === on) return;
  hacker.on = on;
  hacker.booting = on;
  document.documentElement.classList.toggle("hacker", on);
  localStorage.setItem(STORAGE_KEY, on ? "1" : "0");
}

/** Restore a previous session without replaying the boot sequence. */
export function restoreHacker() {
  hacker.on = localStorage.getItem(STORAGE_KEY) === "1";
  document.documentElement.classList.toggle("hacker", hacker.on);
}
