<script lang="ts">
  import { onMount } from "svelte";
  import Section from "./Section.svelte";
  import type { AboutProps, HeroProps } from "$lib/types";
  import { HACKER_ALIAS, HACKER_AVATAR, hacker } from "$lib/hacker.svelte";

  let {
    description,
    hackerDescription,
    image,
    name,
  }: AboutProps & Pick<HeroProps, "name"> & { hackerDescription: string } = $props();
  let portrait: HTMLElement;
  let revealed = $state(false);

  onMount(() => {
    const observer = new IntersectionObserver(([entry]) => {
      if (!entry.isIntersecting) return;
      revealed = true;
      observer.disconnect();
    }, { threshold: 0.25 });
    observer.observe(portrait);
    return () => observer.disconnect();
  });
</script>

<Section text={hacker.on ? "$ whoami" : "About Me"} href="about">
  <div class="about-layout">
    <p class="about-copy">{hacker.on ? hackerDescription : description}</p>
    <figure class="portrait" class:revealed bind:this={portrait}>
      <img
        src={hacker.on ? HACKER_AVATAR : image}
        width="260"
        height="320"
        alt={hacker.on ? HACKER_ALIAS : name}
        loading="lazy"
        decoding="async"
      />
      {#if hacker.on}<figcaption>&gt; {HACKER_ALIAS}</figcaption>{/if}
    </figure>
  </div>
</Section>

<style>
  .about-layout { display: grid; align-items: center; gap: 2rem; }
  .about-copy { max-width: 42ch; font-size: clamp(1.125rem, 2vw, 1.35rem); line-height: 1.7; color: var(--color-neutral); }
  .portrait { width: min(100%, 16rem); overflow: hidden; border-radius: 0.75rem; }
  .portrait img { display: block; width: 100%; aspect-ratio: 4 / 5; height: auto; object-fit: cover; object-position: center 30%; }
  figcaption { padding-top: 0.75rem; color: var(--color-volt-soft); font-size: 0.875rem; }
  @media (hover: hover) and (pointer: fine) and (prefers-reduced-motion: no-preference) {
    .portrait { transition: transform 600ms var(--ease-out-expo); }
    .portrait img { transition: transform 700ms var(--ease-out-expo); }
    .portrait.revealed img { animation: portrait-reveal 1000ms var(--ease-out-expo) both; }
    .portrait:hover { transform: perspective(800px) rotateY(-5deg) rotateX(2deg); }
    .portrait:hover img { transform: scale(1.035); }
  }
  @keyframes portrait-reveal {
    from { clip-path: inset(0 0 16% 0 round 0.75rem); filter: blur(5px) saturate(0.65); }
    to { clip-path: inset(0 round 0.75rem); filter: blur(0) saturate(1); }
  }
  @media (min-width: 640px) { .about-layout { grid-template-columns: minmax(0, 1fr) 14rem; gap: 3rem; } }
</style>
