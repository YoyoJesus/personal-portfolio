<script lang="ts">
  import Section from "./Section.svelte";
  import type { EducationProps } from "$lib/types";
  import { hacker } from "$lib/hacker.svelte";
  let { entries }: { entries: EducationProps[] } = $props();
</script>

<Section text={hacker.on ? "$ cat education" : "Education"} href="education">
  {#each entries as entry}
    <article class="education-entry">
      <img src={entry.logo} alt="" width="88" height="88" loading="lazy" />
      <div>
        <p class="institution">{entry.institution}</p>
        <h3>{entry.degree}</h3>
        {#if entry.concentration || entry.gpa}
          <p class="details">
            {#if entry.concentration}<span>{entry.concentration} concentration</span>{/if}
            {#if entry.gpa}<span>GPA {entry.gpa}</span>{/if}
          </p>
        {/if}
        <p class="dates">{entry.startYear}-{entry.expectedEndYear} (expected)</p>
        <ul aria-label="Academic distinctions">
          {#each entry.distinctions as distinction}<li>{distinction}</li>{/each}
        </ul>
        {#if entry.honorRolls?.length}
          <dl class="honor-rolls">
            {#each entry.honorRolls as roll}
              <div>
                <dt>{roll.name}</dt>
                <dd>{roll.terms.join(", ")}</dd>
              </div>
            {/each}
          </dl>
        {/if}
      </div>
    </article>
  {/each}
</Section>

<style>
  .education-entry { display: grid; gap: 1.5rem; align-items: start; }
  img { width: 5.5rem; height: 5.5rem; object-fit: contain; padding: 0.65rem; border-radius: 0.75rem; background: #fff; }
  .institution { color: var(--color-neutral); font-size: 1rem; margin-bottom: 0.5rem; }
  h3 { font-family: var(--font-serif); font-size: clamp(1.75rem, 4vw, 2.75rem); line-height: 1.1; letter-spacing: -0.03em; font-weight: 650; color: var(--color-white); }
  .details { display: flex; flex-wrap: wrap; gap: 0.25rem 1.25rem; margin-top: 0.75rem; color: var(--color-neutral); font-size: 1rem; }
  .honor-rolls { display: grid; gap: 0.75rem; margin-top: 1.25rem; font-size: 0.9rem; }
  dt { color: var(--color-white); font-weight: 600; }
  dd { color: var(--color-neutral); }
  .dates { margin-top: 1rem; color: var(--color-volt-soft); font-size: 0.9rem; }
  ul { display: flex; flex-wrap: wrap; gap: 0.6rem 1.5rem; margin-top: 1.5rem; color: var(--color-neutral); font-size: 0.9rem; }
  li { padding-top: 0.75rem; border-top: 1px solid var(--color-edge-strong); }
  @media (min-width: 640px) { .education-entry { grid-template-columns: 5.5rem minmax(0, 1fr); gap: 2rem; } }
</style>
