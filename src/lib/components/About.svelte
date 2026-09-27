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
  <div class="flex flex-col items-center gap-12 md:flex-row md:gap-8">
    <p class="w-auto text-base text-neutral md:pr-5">{hacker.on ? hackerDescription : description}</p>
    <div
      class={[
        "h-80 w-64 flex-shrink-0 rotate-[5deg] p-4 md:rotate-[7deg]",
        hacker.on ? "border border-primary/60 bg-surface" : "bg-white",
      ]}
    >
      <img
        class="object-cover"
        src={hacker.on ? HACKER_AVATAR : image}
        width="260"
        height="260"
        alt={hacker.on ? HACKER_ALIAS : name}
        loading="lazy"
        decoding="async"
      />
      {#if hacker.on}
        <p class="mt-4 text-sm text-primary">&gt; {HACKER_ALIAS}<span class="animate-pulse">_</span></p>
      {/if}
    </div>
  </div>
</Section>
