<script lang="ts">
  import { onMount } from "svelte";
  import { HACKER_ALIAS, HACKER_HASHES, HACKER_HOST, finishSequence, hacker, restoreHacker, setHacker } from "$lib/hacker.svelte";

  const KONAMI = ["arrowup", "arrowup", "arrowdown", "arrowdown", "arrowleft", "arrowright", "arrowleft", "arrowright", "b", "a"];
  const PASSPHRASE = "hacker";

  const BOOT = [
    `${HACKER_ALIAS}@${HACKER_HOST}:~$ ssh yoyojesus@dev.asternberg.xyz`,
    "[+] connection established",
    "[+] loading profile .............. done",
    "[+] compiling projects ........... done",
    "[+] applying terminal theme ...... done",
    "$ whoami",
    HACKER_ALIAS,
    "",
    "hello, friend.",
  ];

  const SHUTDOWN = [
    "$ logout",
    "[+] saving session ............... done",
    "[+] restoring default theme ...... done",
    "[+] closing connection ........... done",
    "Connection to dev.asternberg.xyz closed.",
    "",
    "goodbye, friend.",
  ];

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

<svelte:head>
  {#if hacker.on}
    <title>{HACKER_ALIAS} :: terminal</title>
  {/if}
</svelte:head>

{#if hacker.on}
  <div class="scanlines" aria-hidden="true"></div>

  <button
    type="button"
    class="fixed bottom-4 left-4 z-[70] cursor-pointer border border-primary/60 bg-black/80 px-3 py-1.5 text-xs text-primary backdrop-blur-sm transition-colors hover:bg-primary hover:text-white"
    onclick={() => setHacker(false)}
  >
    exit hacker mode
  </button>
{/if}

{#if hacker.sequence}
  <!-- svelte-ignore a11y_click_events_have_key_events, a11y_no_static_element_interactions -->
  <div class="boot fixed inset-0 z-[100] flex items-center justify-center bg-black p-6" onclick={finishSequence}>
    <pre class="w-full max-w-xl text-sm leading-7 whitespace-pre-wrap text-white sm:text-base">{#each lines.slice(0, shown) as line, i}<span
          class={[line.startsWith("[+]") && "text-neutral", i === lines.length - 1 && "text-2xl text-primary sm:text-3xl"]}
          >{line}</span
        >{"\n"}{/each}<span class="cursor">█</span></pre>
    <p class="absolute bottom-6 text-xs text-neutral">click or press any key to skip</p>
  </div>
{/if}

<style>
  .scanlines {
    position: fixed;
    inset: 0;
    z-index: 60;
    pointer-events: none;
    background:
      repeating-linear-gradient(to bottom, transparent 0 2px, rgb(0 0 0 / 0.25) 2px 3px),
      radial-gradient(ellipse at center, transparent 55%, rgb(0 0 0 / 0.6) 100%);
  }

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
