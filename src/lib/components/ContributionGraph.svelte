<script lang="ts">
  import type { Contributions, Day } from "$lib/server/github";

  let { contributions, user }: { contributions: Contributions; user: string } = $props();

  const shades = ["bg-white/5", "bg-primary/40", "bg-primary/60", "bg-primary/80", "bg-primary"];
  const columns = $derived(`grid-template-columns: repeat(${contributions.weeks.length}, minmax(0, 1fr))`);

  let hovered = $state<{ day: Day; x: number; y: number } | null>(null);

  function show(day: Day, cell: HTMLElement) {
    const box = cell.parentElement!.getBoundingClientRect();
    const rect = cell.getBoundingClientRect();
    hovered = { day, x: rect.left - box.left + rect.width / 2, y: rect.top - box.top };
  }

  const label = (day: Day) => {
    const date = new Date(`${day.date}T12:00:00`).toLocaleDateString("en-US", { month: "long", day: "numeric" });
    const count = day.count === 0 ? "No" : day.count;
    return `${count} contribution${day.count === 1 ? "" : "s"} on ${date}`;
  };
</script>

{#if contributions.weeks.length}
  <a class="mb-12 hidden md:block" href="https://github.com/{user}" target="_blank" rel="noopener">
    <div class="mb-1.5 grid gap-x-[2px] text-xs text-neutral" style={columns}>
      {#each contributions.months as { week, label }}
        <span class="whitespace-nowrap" style="grid-area: 1 / {week + 1}">{label}</span>
      {/each}
    </div>
    <div
      class="relative grid grid-flow-col grid-rows-7 gap-[2px]"
      style={columns}
      role="presentation"
      onmouseleave={() => (hovered = null)}
    >
      {#each contributions.weeks as week}
        {#each week as day}
          {#if day}
            <span
              class="aspect-square rounded-[1px] {shades[day.level]}"
              role="presentation"
              onmouseenter={(e) => show(day, e.currentTarget)}
            ></span>
          {:else}
            <span class="aspect-square rounded-[1px] {shades[0]}"></span>
          {/if}
        {/each}
      {/each}
      {#if hovered}
        <div
          class="pointer-events-none absolute z-10 -translate-x-1/2 -translate-y-full rounded-md bg-black px-2.5 py-1.5 text-xs whitespace-nowrap text-white shadow-lg ring-1 ring-white/10"
          style="left: {hovered.x}px; top: {hovered.y - 6}px"
        >
          {label(hovered.day)}
        </div>
      {/if}
    </div>
    <p class="mt-2 text-xs text-neutral">{contributions.total.toLocaleString()} contributions in the last year</p>
  </a>
{/if}
