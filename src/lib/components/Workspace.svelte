<script lang="ts">
  import { fade } from "svelte/transition";
  import Section from "./Section.svelte";
  import ToolIcon from "./ToolIcon.svelte";
  import type { WorkspaceItem, WorkspaceProps } from "$lib/types";
  import { HACKER_ALIAS, HACKER_HOST, hacker } from "$lib/hacker.svelte";

  let { workspace, hackerWorkspace }: { workspace: WorkspaceProps; hackerWorkspace: WorkspaceProps } = $props();

  const current = $derived(hacker.on ? hackerWorkspace : workspace);
  const hasImage = $derived(!!current.image?.trim());
  // Pinned gear lives in the photo popovers; anything else is listed below it.
  const unpinned = $derived(current.gear.filter((item) => !hasImage || !item.pin));

  let activeIndex = $state<number | null>(null);

  // Tapping outside any pin closes the popover on touch screens.
  function closeOnOutside(e: MouseEvent) {
    if (!(e.target as Element).closest(".workspace-pin")) activeIndex = null;
  }

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

<svelte:window onclick={closeOnOutside} />

<Section text={hacker.on ? "$ neofetch" : "Workspace"} href="workspace">
  {#if hacker.on}
    <div class="mb-6 font-mono text-sm">
      <p class="font-bold text-primary">{HACKER_ALIAS}@{HACKER_HOST}</p>
      <p class="text-neutral/40" aria-hidden="true">-------------------------</p>
    </div>
  {/if}

  {#if hasImage}
    <div class="relative">
      <img
        src={current.image}
        alt={current.imageAlt || (hacker.on ? "Hacking workspace setup" : "Workspace desk setup")}
        loading="lazy"
        decoding="async"
        class="h-auto w-full rounded-2xl border border-edge bg-surface shadow-sm"
      />
      {#if hacker.on}
        <div
          class="pointer-events-none absolute inset-0 rounded-2xl bg-primary/20 bg-[linear-gradient(transparent_50%,rgba(0,0,0,0.5)_50%)] bg-[length:100%_4px] mix-blend-multiply ring-1 ring-primary/40 ring-inset"
          aria-hidden="true"
        ></div>
      {/if}
      {#each current.gear as item, i (item.name)}
        {#if item.pin}
          {@const active = activeIndex === i}
          <!-- Wraps pin + popover so moving the pointer or focus into the popover keeps it open. -->
          <!-- svelte-ignore a11y_no_static_element_interactions -->
          <div
            class={["workspace-pin absolute size-0", active && "z-20"]}
            style="left: {item.pin.x}%; top: {item.pin.y}%;"
            onmouseenter={activate(i)}
            onmouseleave={deactivate(i)}
            onfocusin={activate(i)}
            onfocusout={(e) => {
              if (!e.currentTarget.contains(e.relatedTarget as Node | null)) deactivate(i)();
            }}
            onkeydown={(e) => e.key === "Escape" && deactivate(i)()}
          >
            <button
              type="button"
              aria-label="{i + 1}: {item.name}"
              aria-expanded={active}
              aria-controls="workspace-pop-{i}"
              class={[
                "absolute top-0 left-0 flex -translate-x-1/2 -translate-y-1/2 items-center justify-center text-xs whitespace-nowrap transition-all duration-150 focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-accent",
                hacker.on ? "h-6 border px-1.5 font-mono font-bold" : "size-7 rounded-full font-semibold shadow-md",
                active ? "scale-110 bg-accent text-black" : "hover:scale-105",
                active && (hacker.on ? "border-accent shadow-[0_0_8px_var(--color-accent)]" : "ring-2 ring-white"),
                !active &&
                  (hacker.on
                    ? "border-primary bg-surface/90 text-primary"
                    : "bg-primary text-white ring-1 ring-white/30"),
              ]}
              onclick={activate(i)}
            >
              {hacker.on ? `[${i + 1}]` : i + 1}
            </button>
            {#if active}
              <div
                id="workspace-pop-{i}"
                transition:fade={{ duration: 120 }}
                class={[
                  "absolute w-56 border p-3 text-left shadow-xl",
                  item.pin.y < 35
                    ? "top-5 before:absolute before:inset-x-0 before:-top-3 before:h-3"
                    : "bottom-5 before:absolute before:inset-x-0 before:-bottom-3 before:h-3",
                  item.pin.x < 25 ? "-left-4" : item.pin.x > 75 ? "-right-4" : "left-0 -translate-x-1/2",
                  hacker.on
                    ? "border-primary bg-surface font-mono"
                    : "rounded-xl border-edge-strong bg-surface-raised/95 backdrop-blur",
                ]}
              >
                {@render itemName(
                  item,
                  hacker.on
                    ? "text-sm font-bold text-primary lowercase"
                    : "font-serif text-base font-semibold text-white",
                )}
                {#if item.detail}<p class="mt-1 text-xs text-neutral">{item.detail}</p>{/if}
                {#if item.since || item.trying}
                  <p class="mt-1.5 flex flex-wrap gap-x-2 text-xs">
                    {#if item.since}
                      <span class="text-neutral/70">{hacker.on ? "# " : ""}since {item.since}</span>
                    {/if}
                    {#if item.trying}
                      <span class={hacker.on ? "text-neutral/70" : "font-medium text-accent"}>
                        {hacker.on ? "# trying" : "currently trying"}
                      </span>
                    {/if}
                  </p>
                {/if}
              </div>
            {/if}
          </div>
        {/if}
      {/each}
    </div>
  {/if}

  {#if unpinned.length}
    <ul
      class={["flex flex-wrap gap-x-5 gap-y-2.5 text-sm", hasImage ? "mt-5" : "flex-col", hacker.on && "font-mono"]}
      aria-label="Gear"
    >
      {#each unpinned as item (item.name)}
        <li class="flex flex-wrap items-baseline gap-x-2">
          {@render itemName(item, hacker.on ? "text-white lowercase" : "text-white")}
          {#if item.detail}<span class="text-xs text-neutral">{item.detail}</span>{/if}
          {#if item.since}<span class="text-xs text-neutral/70">{hacker.on ? "# " : ""}since {item.since}</span>{/if}
          {#if item.trying}<span class="text-xs text-accent">{hacker.on ? "# trying" : "currently trying"}</span>{/if}
        </li>
      {/each}
    </ul>
  {/if}

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
