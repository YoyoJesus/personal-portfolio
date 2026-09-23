<script lang="ts">
  import Section from "./Section.svelte";
  import type { ExperienceProps } from "$lib/types";

  let { text, href, experience }: { text: string; href: string; experience: ExperienceProps[] } = $props();
</script>

<Section {text} {href}>
  {#each experience as { company, position, startDate, workType, endDate, summary, previousPositions }}
    <div class="mb-10">
      <h3 class="mb-1.5 font-serif text-2xl font-semibold text-white">
        {company}
      </h3>
      <div class="flex flex-col items-start pb-5">
        <h4 class="mb-0.5 font-serif text-2xl font-medium text-primary">
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
              class="relative mb-3 pl-8 text-base text-neutral before:absolute before:top-1 before:left-0 before:content-[url(/check.svg)]"
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
    </div>
  {/each}
</Section>
