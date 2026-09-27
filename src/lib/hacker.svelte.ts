export const HACKER_ALIAS = "yoyojesus";
export const HACKER_HASHES = ["#hacker", "#robot"];
const STORAGE_KEY = "hackermode";

export const hacker = $state({ on: false, sequence: null as "boot" | "shutdown" | null });

function apply(on: boolean) {
  hacker.on = on;
  document.documentElement.classList.toggle("hacker", on);
  localStorage.setItem(STORAGE_KEY, on ? "1" : "0");
}

/** Enter plays the boot log over the themed site; exit plays the shutdown log before restoring it. */
export function setHacker(on: boolean) {
  if (hacker.on === on || hacker.sequence) return;
  if (on) apply(true);
  hacker.sequence = on ? "boot" : "shutdown";
}

export function finishSequence() {
  if (hacker.sequence === "shutdown") apply(false);
  hacker.sequence = null;
}

/** Restore a previous session without replaying the boot sequence. */
export function restoreHacker() {
  hacker.on = localStorage.getItem(STORAGE_KEY) === "1";
  document.documentElement.classList.toggle("hacker", hacker.on);
}
