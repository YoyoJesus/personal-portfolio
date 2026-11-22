<script lang="ts">
  import { onMount, type Snippet } from "svelte";
  import { kineticLetters } from "$lib/actions/kineticLetters";
  import { hacker } from "$lib/hacker.svelte";
  let { text, href, children, compactEnd = false, level = "h2" }: { text: string; href: string; children: Snippet; compactEnd?: boolean; level?: "h1" | "h2" } = $props();
  let heading: HTMLElement;
  let arrived = $state(false);

  onMount(() => {
    const observer = new IntersectionObserver(([entry]) => {
      if (!entry.isIntersecting) return;
      arrived = true;
      observer.disconnect();
    }, { rootMargin: "0px 0px 5% 0px" });
    observer.observe(heading);
    return () => observer.disconnect();
  });
</script>

<section id={href} class="content-section" class:compact-end={compactEnd} class:showcase={["projects", "workspace", "not-coding", "history"].includes(href)} aria-labelledby="{href}-heading">
  <svelte:element this={level} class="section-heading" class:arrived id="{href}-heading" aria-label={text} bind:this={heading} use:kineticLetters={{ enabled: !hacker.on }}>
    {#each text.split(" ") as word, w}
      {#if w}{" "}{/if}<span class="heading-word" class:secondary={w > 0} aria-hidden="true">{#each word.split("") as letter, i}<span class="heading-letter" data-kinetic-letter style="--i: {w * 8 + i}">{letter}</span>{/each}</span>
    {/each}
  </svelte:element>
  {@render children()}
</section>

<style>
  .content-section { padding-block: clamp(4rem, 8vw, 7rem); }
  .compact-end { padding-bottom: clamp(1.5rem, 3vw, 2.5rem); }
  .section-heading { margin-bottom: clamp(2.5rem, 5vw, 4rem); max-width: 18ch; font-family: var(--font-serif); font-size: clamp(2.75rem, 6vw, 4.5rem); font-weight: 750; letter-spacing: -0.04em; line-height: 1.02; text-wrap: balance; color: var(--color-white); }
  .showcase { width: min(calc(100vw - 2.5rem), 76rem); margin-inline: calc((100% - min(100vw - 2.5rem, 76rem)) / 2); }
  .showcase .section-heading { font-size: clamp(3rem, 7vw, 6rem); }
  .heading-word { --base: 750; display: inline-block; white-space: nowrap; overflow: hidden; vertical-align: bottom; padding-bottom: 0.15em; margin-bottom: -0.15em; }
  .secondary { --base: 400; color: var(--color-neutral); }
  .heading-letter { display: inline-block; font-weight: var(--w, var(--base)); transition: font-weight 450ms var(--ease-out-expo); }
  .arrived .heading-letter { animation: letter-in 900ms var(--ease-out-expo) backwards; animation-delay: calc(var(--i) * 22ms); }
  @keyframes letter-in { from { transform: translateY(105%) rotate(6deg); font-weight: 900; opacity: 0; } to { transform: none; font-weight: var(--base); opacity: 1; } }
</style>
