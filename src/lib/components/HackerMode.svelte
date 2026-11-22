<script lang="ts">
  import { onMount } from "svelte";
  import NoiseField from "./NoiseField.svelte";
  import { HACKER_ALIAS, HACKER_FAVICON, HACKER_HASHES, HACKER_HOST, finishSequence, hacker, restoreHacker, setHacker } from "$lib/hacker.svelte";

  const KONAMI = ["arrowup", "arrowup", "arrowdown", "arrowdown", "arrowleft", "arrowright", "arrowleft", "arrowright", "b", "a"];
  const PASSPHRASE = "hacker";

  const BOOT = [
    `${HACKER_ALIAS}@${HACKER_HOST}:~$ theme hacker`,
    "[+] dark palette",
    "[+] monospace typography",
    "[+] keyboard shortcuts ready",
    "[+] hacker profile selected",
    "$ whoami",
    HACKER_ALIAS,
    "",
    "hello, friend.",
  ];

  const SHUTDOWN = [
    "$ logout",
    "[+] leaving hacker profile",
    "[+] restoring default theme ...... done",
    "[+] restoring typography",
    "",
    "goodbye, friend.",
    "",
    "Default profile selected.",
    `${HACKER_ALIAS}@${HACKER_HOST}:~$ `,
  ];
  const SIGN_OFFS = ["hello, friend.", "goodbye, friend."];

  const lines = $derived(hacker.sequence === "shutdown" ? SHUTDOWN : BOOT);

  let shown = $state(0);
  let keys: string[] = [];
  let typed = "";

  function checkHash() {
    if (!HACKER_HASHES.includes(location.hash.toLowerCase())) return;
    history.replaceState(history.state, "", location.pathname + location.search);
    setHacker(true);
  }

  function onkeydown(e: KeyboardEvent) {
    if (hacker.sequence) return finishSequence();

    const target = e.target as HTMLElement;
    if (target.closest("input, textarea, [contenteditable]")) return;

    const key = e.key.toLowerCase();
    keys = [...keys, key].slice(-KONAMI.length);
    typed = (typed + (key.length === 1 ? key : " ")).slice(-PASSPHRASE.length);

    if (keys.join() === KONAMI.join() || typed === PASSPHRASE) {
      keys = [];
      typed = "";
      setHacker(!hacker.on);
    }
  }

  onMount(() => {
    restoreHacker();
    checkHash();
  });

  $effect(() => {
    if (!hacker.on) return;
    const icon = document.querySelector<HTMLLinkElement>("link[rel='icon']");
    const previous = icon?.href;
    if (icon) icon.href = HACKER_FAVICON;
    return () => {
      if (icon && previous) icon.href = previous;
    };
  });

  // Type the boot/shutdown log out line by line, then hand control back to the site.
  $effect(() => {
    if (!hacker.sequence) return;
    if (matchMedia("(prefers-reduced-motion: reduce)").matches) return finishSequence();

    const total = lines.length;
    let done: ReturnType<typeof setTimeout>;
    shown = 0;
    const timer = setInterval(() => {
      if (shown < total) shown++;
      else {
        clearInterval(timer);
        done = setTimeout(finishSequence, 900);
      }
    }, 220);
    return () => {
      clearInterval(timer);
      clearTimeout(done);
    };
  });
</script>

<svelte:window {onkeydown} onhashchange={checkHash} />

{#if hacker.on}
  <div class="interference" aria-hidden="true"></div>

  <button
    type="button"
    class="fixed bottom-4 left-4 z-[70] cursor-pointer border border-primary/60 bg-black/80 px-3 py-1.5 text-xs text-primary backdrop-blur-sm transition-colors hover:bg-primary hover:text-black"
    onclick={() => setHacker(false)}
  >
    exit hacker mode
  </button>
{/if}

{#if hacker.sequence}
  <!-- svelte-ignore a11y_click_events_have_key_events, a11y_no_static_element_interactions -->
  <div class="boot fixed inset-0 z-[100] bg-black" onclick={finishSequence}>
    <div class="boot-field" aria-hidden="true"><NoiseField quiet /></div>
    <div class="boot-content">
      <h2 class="boot-title">{hacker.sequence === "shutdown" ? "goodbye," : "hello,"}<br /><span>friend.</span></h2>
      <pre class="boot-log" aria-hidden="true">{#each lines.slice(0, shown).filter(line => !SIGN_OFFS.includes(line)) as line, i}{i ? "\n" : ""}<span class:log-command={!line.startsWith("[+]")}>{line}</span>{/each}<span class="cursor">_</span></pre>
    </div>
    <button type="button" class="boot-skip" onclick={finishSequence}>Skip transition</button>
  </div>
{/if}

<style>
  .interference {
    position: fixed;
    inset: 0;
    z-index: 60;
    pointer-events: none;
    overflow: hidden;
  }
  .interference::after {
    position: absolute;
    inset: -30% 0;
    content: "";
    background: linear-gradient(transparent 46%, rgb(var(--rgb-volt) / 0.035) 49.8%, rgb(var(--rgb-ember) / 0.07) 50%, transparent 50.3%);
    animation: signal-sweep 18s linear infinite;
  }
  @keyframes signal-sweep {
    0% { transform: translateY(-65%); }
    85%, 100% { transform: translateY(65%); }
  }
  .boot { overflow-y: auto; }
  .boot-field { position: absolute; inset: 0; opacity: 0.3; pointer-events: none; }
  .boot-content { position: relative; display: grid; align-content: center; gap: 2rem; max-width: 88rem; min-height: 100svh; margin-inline: auto; padding: 5rem clamp(1.25rem, 4vw, 3.5rem) 7rem; }
  .boot-title { font-family: var(--font-serif); font-size: clamp(3.5rem, 9vw, 9rem); font-weight: 800; letter-spacing: -0.04em; line-height: 0.95; color: var(--color-white); }
  .boot-title span { font-weight: 400; color: var(--color-neutral); }
  .boot-log { min-height: 15rem; font-size: clamp(0.75rem, 1.1vw, 0.95rem); line-height: 1.8; white-space: pre-wrap; overflow-wrap: anywhere; color: var(--color-neutral); }
  .log-command { color: var(--color-white); }
  .boot-skip { position: absolute; bottom: 1.5rem; right: clamp(1.25rem, 4vw, 3.5rem); border: 1px solid var(--color-edge-strong); border-radius: 999px; padding: 0.75rem 1.25rem; font-size: 0.8rem; color: var(--color-white); cursor: pointer; }
  .boot-skip:hover { border-color: var(--color-primary); }
  @media (min-width: 900px) { .boot-content { grid-template-columns: 1fr 1fr; align-items: center; gap: 4rem; } }
  @media (prefers-reduced-motion: reduce) { .interference { display: none; } }
  .cursor {
    color: var(--color-primary);
    animation: blink 1s steps(1) infinite;
  }

  @keyframes blink {
    50% {
      opacity: 0;
    }
  }
</style>
