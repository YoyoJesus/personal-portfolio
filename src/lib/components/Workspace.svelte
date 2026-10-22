<script lang="ts">
  import Section from "./Section.svelte";
  import ToolIcon from "./ToolIcon.svelte";
  import type { WorkspaceItem, WorkspaceProps } from "$lib/types";
  import { HACKER_ALIAS, HACKER_HOST, hacker } from "$lib/hacker.svelte";

  let { workspace, hackerWorkspace }: { workspace: WorkspaceProps; hackerWorkspace: WorkspaceProps } = $props();

  const current = $derived(hacker.on ? hackerWorkspace : workspace);
  const hasImage = $derived(!!current.image?.trim());

  let activeIndex = $state<number | null>(null);

  const activate = (i: number) => () => (activeIndex = i);
  const deactivate = (i: number) => () => {
    if (activeIndex === i) activeIndex = null;
  };

  function chipTitle(item: WorkspaceItem): string | undefined {
    const since = item.since ? `since ${item.since}` : "";
    if (item.trying) return since ? `currently trying (${since})` : "currently trying";
    return since || undefined;
  }

  const linkFocus = "transition-colors hover:text-accent focus-visible:outline-2 focus-visible:outline-accent";
</script>

{#snippet status(item: WorkspaceItem)}
  {#if chipTitle(item)}<span class="sr-only">({chipTitle(item)})</span>{/if}
{/snippet}

{#snippet itemName(item: WorkspaceItem, cls: string)}
  {#if item.href}
    <a href={item.href} target="_blank" rel="noopener noreferrer" class="{cls} {linkFocus}">
      {item.name}
      {#if !hacker.on}<span class="text-xs text-white/50" aria-hidden="true">↗</span>{/if}
    </a>
  {:else}
    <span class={cls}>{item.name}</span>
  {/if}
{/snippet}

<Section text={hacker.on ? "$ neofetch" : "Workspace"} href="workspace">
  {#if hacker.on}
    <div class="mb-6 font-mono text-sm">
      <p class="font-bold text-primary">{HACKER_ALIAS}@{HACKER_HOST}</p>
      <p class="text-neutral/40" aria-hidden="true">-------------------------</p>
    </div>
  {/if}

  <div class={hasImage ? "grid grid-cols-1 items-start gap-8 lg:grid-cols-5 lg:gap-10" : ""}>
    {#if hasImage}
      <div class="relative overflow-hidden rounded-2xl border border-edge bg-surface shadow-sm lg:col-span-3">
        <img
          src={current.image}
          alt={current.imageAlt || (hacker.on ? "Hacking workspace setup" : "Workspace desk setup")}
          loading="lazy"
          decoding="async"
          class="aspect-[4/3] w-full object-cover sm:aspect-[16/10] lg:aspect-[4/3]"
        />
        {#if hacker.on}
          <div
            class="pointer-events-none absolute inset-0 bg-primary/20 bg-[linear-gradient(transparent_50%,rgba(0,0,0,0.5)_50%)] bg-[length:100%_4px] mix-blend-multiply ring-1 ring-primary/40 ring-inset"
            aria-hidden="true"
          ></div>
        {/if}
        {#each current.gear as item, i (item.name)}
          {#if item.pin}
            {@const active = activeIndex === i}
            <button
              type="button"
              aria-label="{i + 1}: {item.name}"
              class={[
                "absolute flex -translate-x-1/2 -translate-y-1/2 items-center justify-center text-xs transition-all duration-150 focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-accent",
                hacker.on ? "h-6 border px-1.5 font-mono font-bold" : "size-7 rounded-full font-semibold shadow-md",
                active ? "z-10 scale-110 bg-accent text-black" : "hover:scale-105",
                active && (hacker.on ? "border-accent shadow-[0_0_8px_var(--color-accent)]" : "ring-2 ring-white"),
                !active &&
                  (hacker.on
                    ? "border-primary bg-surface/90 text-primary"
                    : "bg-primary text-white ring-1 ring-white/30"),
              ]}
              style="left: {item.pin.x}%; top: {item.pin.y}%;"
              onmouseenter={activate(i)}
              onmouseleave={deactivate(i)}
              onfocus={activate(i)}
              onblur={deactivate(i)}
              onclick={activate(i)}
            >
              {hacker.on ? `[${i + 1}]` : i + 1}
            </button>
          {/if}
        {/each}
      </div>
    {/if}

    <ol
      class={[
        hacker.on && "font-mono",
        hasImage
          ? "flex flex-col gap-2.5 lg:col-span-2"
          : hacker.on
            ? "flex max-w-2xl flex-col gap-2.5"
            : "grid grid-cols-1 gap-3 md:grid-cols-2 md:gap-x-8",
      ]}
    >
      {#each current.gear as item, i (item.name)}
        {@const active = activeIndex === i}
        <!-- Unlinked pinned rows need their own focus target so keyboard users can light up the pin. -->
        <!-- svelte-ignore a11y_no_noninteractive_tabindex -->
        <li
          tabindex={hasImage && item.pin && !item.href ? 0 : undefined}
          class={[
            "flex gap-3 transition-colors focus-visible:outline-2 focus-visible:outline-accent",
            hacker.on
              ? ["items-baseline rounded px-2.5 py-1.5", active ? "bg-surface-raised" : "hover:bg-surface/50"]
              : [
                  "items-start rounded-xl border p-2.5",
                  active ? "border-edge-hover bg-surface" : "border-transparent hover:border-edge hover:bg-surface/40",
                ],
          ]}
          onmouseenter={activate(i)}
          onmouseleave={deactivate(i)}
          onfocusin={activate(i)}
          onfocusout={deactivate(i)}
        >
          {#if hacker.on}
            <span class={["shrink-0 text-xs font-bold", active ? "text-accent" : "text-primary"]} aria-hidden="true">
              [{i + 1}]
            </span>
            <div class="min-w-0 flex-1">
              <div class="flex flex-wrap items-baseline gap-x-2 gap-y-1">
                {@render itemName(item, "shrink-0 text-sm font-medium text-white lowercase")}
                {#if item.detail}
                  <span class="mx-1 min-w-4 flex-1 border-b border-dotted border-edge-strong" aria-hidden="true"></span>
                  <span class="ml-auto text-xs text-neutral">{item.detail}</span>
                {/if}
              </div>
              {#if item.since || item.trying}
                <p class="mt-0.5 flex gap-x-2 text-xs text-neutral/70">
                  {#if item.since}<span># since {item.since}</span>{/if}
                  {#if item.trying}<span># trying</span>{/if}
                </p>
              {/if}
            </div>
          {:else}
            <span
              class={[
                "flex size-7 shrink-0 items-center justify-center rounded-full text-xs font-semibold shadow-sm transition-all duration-150",
                active
                  ? "scale-105 bg-accent text-black ring-2 ring-white"
                  : "bg-primary text-white ring-1 ring-white/30",
              ]}
              aria-hidden="true"
            >
              {i + 1}
            </span>
            <div class="min-w-0 flex-1">
              <div class="flex flex-wrap items-baseline gap-x-2 gap-y-0.5">
                {@render itemName(item, "font-serif text-base font-semibold text-white")}
                {#if item.since}<span class="text-xs text-neutral/70">since {item.since}</span>{/if}
                {#if item.trying}<span class="text-xs font-medium text-accent">currently trying</span>{/if}
              </div>
              {#if item.detail}<p class="mt-0.5 text-xs text-neutral">{item.detail}</p>{/if}
            </div>
          {/if}
        </li>
      {/each}
    </ol>
  </div>

  {#if !hacker.on}
    <div class="mt-12 space-y-6 sm:mt-16 sm:space-y-8">
      {#each current.groups as group (group.title)}
        <div class="flex flex-col gap-2.5 sm:flex-row sm:items-start sm:gap-6">
          <h3 class="w-40 shrink-0 pt-1 text-xs font-semibold tracking-wider text-white/50 uppercase">{group.title}</h3>
          <ul class="flex flex-1 flex-wrap items-center gap-1.5" aria-label="{group.title} tools">
            {#each group.items as item (item.name)}
              <li
                class="inline-flex items-center rounded-full border border-edge-strong px-2.5 py-1 text-[0.7rem] leading-tight text-chip"
                title={chipTitle(item)}
              >
                {#snippet chip()}
                  {#if item.icon}
                    <span
                      class="flex size-4 shrink-0 items-center justify-center [&>i]:text-base [&>img]:size-4 [&>img]:object-contain"
                    >
                      <ToolIcon icon={item.icon} />
                    </span>
                  {/if}
                  {item.name}
                  {#if item.trying}<span class="size-1.5 rounded-full bg-accent" aria-hidden="true"></span>{/if}
                  {@render status(item)}
                {/snippet}
                {#if item.href}
                  <a
                    href={item.href}
                    target="_blank"
                    rel="noopener noreferrer"
                    class="inline-flex items-center gap-1.5 transition-colors hover:text-white focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-accent"
                  >
                    {@render chip()}
                  </a>
                {:else}
                  <span class="inline-flex items-center gap-1.5">{@render chip()}</span>
                {/if}
              </li>
            {/each}
          </ul>
        </div>
      {/each}
    </div>
  {:else}
    <div class="mt-10 space-y-2.5 font-mono text-sm sm:mt-12">
      {#each current.groups as group (group.title)}
        <div class="flex flex-wrap items-baseline gap-x-1.5 text-white lowercase">
          <span><span class="font-bold text-primary">{group.title}</span><span class="text-neutral">:</span></span>
          {#each group.items as item, idx (item.name)}
            <span title={chipTitle(item)}
              >{#if item.href}<a
                  href={item.href}
                  target="_blank"
                  rel="noopener noreferrer"
                  class="underline-offset-4 hover:underline {linkFocus}">{item.name}</a
                >{:else}{item.name}{/if}{#if item.trying}<span class="text-accent" aria-hidden="true">*</span
                >{/if}{@render status(item)}{#if idx < group.items.length - 1}<span class="text-neutral/60">,</span
                >{/if}</span
            >
          {/each}
        </div>
      {/each}
    </div>

    <div class="mt-8 flex gap-2 pt-2" aria-hidden="true">
      {#each ["bg-muted", "bg-primary", "bg-accent", "bg-neutral", "bg-edge-strong", "bg-white"] as swatch (swatch)}
        <span class="h-3 w-8 {swatch}"></span>
      {/each}
    </div>
  {/if}
</Section>
