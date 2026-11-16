<script lang="ts">
  import Section from "./Section.svelte";
  import type { AboutProps, HeroProps } from "$lib/types";
  import { HACKER_ALIAS, HACKER_AVATAR, hacker } from "$lib/hacker.svelte";

  let {
    description,
    hackerDescription,
    image,
    name,
  }: AboutProps & Pick<HeroProps, "name"> & { hackerDescription: string } = $props();
</script>

<Section text={hacker.on ? "$ whoami" : "About Me"} href="about">
  <div class="about-layout">
    <p class="about-copy">{hacker.on ? hackerDescription : description}</p>
    <figure class="portrait">
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
  @media (min-width: 640px) { .about-layout { grid-template-columns: minmax(0, 1fr) 14rem; gap: 3rem; } }
</style>
