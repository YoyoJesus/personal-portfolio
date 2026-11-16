<script lang="ts">
  import Section from "./Section.svelte";
  import type { ExperienceProps } from "$lib/types";
  import { hacker } from "$lib/hacker.svelte";

  let {
    text,
    hackerText = text,
    href,
    experience,
  }: { text: string; hackerText?: string; href: string; experience: ExperienceProps[] } = $props();

  const entries = $derived(
    hacker.on ? experience.filter((e) => !e.hackerHidden).map((e) => ({ ...e, ...e.hacker })) : experience,
  );
</script>

<Section text={hacker.on ? hackerText : text} {href}>
  {#each entries as { company, logo, position, startDate, workType, endDate, summary, previousPositions }}
    <article class="role">
      <div class="role-company">
        {#if logo}
          <img src={logo} alt="" class="role-logo" loading="lazy" />
        {/if}
        <h3 class="role-name">
          {company}
        </h3>
      </div>
      <div class="flex flex-col items-start pb-5">
        <h4 class="role-position">
          {position}
        </h4>
        <span class="pb-[2px] text-sm text-white/70">
          {startDate} — {endDate}
        </span>
        <span class="pb-[1.25px] text-sm text-white/50">
          {workType}
        </span>
      </div>
      {#if Array.isArray(summary)}
        <ul class="list-none">
          {#each summary as log}
            <li
              class="role-point"
            >
              {log}
            </li>
          {/each}
        </ul>
      {:else}
        <p class="text-base text-neutral">{summary}</p>
      {/if}
      {#if previousPositions && previousPositions.length > 0}
        <div class="mt-5 border-l-2 border-white/15 pl-4">
          <p class="mb-2 text-sm tracking-wider text-white/50 uppercase">Previously</p>
          <ul class="list-none">
            {#each previousPositions as prev}
              <li class="mb-1.5 flex flex-col sm:flex-row sm:items-baseline sm:gap-3">
                <span class="font-serif text-base font-medium text-white/85">
                  {prev.position}
                </span>
                <span class="text-sm text-white/60">
                  {prev.startDate} — {prev.endDate}
                </span>
              </li>
            {/each}
          </ul>
        </div>
      {/if}
    </article>
  {/each}
</Section>

<style>
  .role { padding-block: 2.5rem; border-top: 1px solid var(--color-edge); }
  .role:first-of-type { border-top: 0; padding-top: 0; }
  .role:last-of-type { padding-bottom: 0; }
  .role-company { display: flex; align-items: center; gap: 1rem; margin-bottom: 1.25rem; }
  .role-logo { width: 3.25rem; height: 3.25rem; flex-shrink: 0; padding: 0.4rem; border-radius: 0.75rem; object-fit: contain; background: #ecebf5; }
  .role-name { font-family: var(--font-serif); font-size: clamp(1.75rem, 4vw, 2.25rem); font-weight: 650; letter-spacing: -0.025em; line-height: 1.15; color: var(--color-white); }
  .role-position { font-family: var(--font-serif); font-size: 1.5rem; line-height: 1.3; margin-bottom: 0.5rem; color: var(--color-volt-soft); }
  .role-point { position: relative; padding-left: 1.25rem; margin-bottom: 0.75rem; color: var(--color-neutral); line-height: 1.7; }
  .role-point::before { position: absolute; top: 0.7em; left: 0; width: 0.3rem; height: 0.3rem; border-radius: 50%; background: var(--color-accent); content: ""; }
</style>
