<script lang="ts">
  import type { Contributions } from "$lib/server/github";

  let { contributions, user }: { contributions: Contributions; user: string } = $props();

  const shades = ["bg-white/5", "bg-primary/40", "bg-primary/60", "bg-primary/80", "bg-primary"];
  const columns = $derived(`grid-template-columns: repeat(${contributions.weeks.length}, minmax(0, 1fr))`);
</script>

{#if contributions.weeks.length}
  <a class="mb-12 hidden md:block" href="https://github.com/{user}" target="_blank" rel="noopener">
    <div class="mb-1.5 grid gap-x-[2px] text-xs text-neutral" style={columns}>
      {#each contributions.months as { week, label }}
        <span class="whitespace-nowrap" style="grid-area: 1 / {week + 1}">{label}</span>
      {/each}
    </div>
    <div class="grid grid-flow-col grid-rows-7 gap-[2px]" style={columns}>
      {#each contributions.weeks as week}
        {#each week as level}
          <span class="aspect-square rounded-[1px] {shades[level]}"></span>
        {/each}
      {/each}
    </div>
    <p class="mt-2 text-xs text-neutral">{contributions.total.toLocaleString()} contributions in the last year</p>
  </a>
{/if}
