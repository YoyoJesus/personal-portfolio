<script lang="ts">
  import Section from "./Section.svelte";
  import ToolIcon from "./ToolIcon.svelte";
  import type { WorkspaceProps } from "$lib/types";
  import { HACKER_ALIAS, HACKER_HOST, hacker } from "$lib/hacker.svelte";

  let {
    workspace,
    hackerWorkspace,
  }: {
    workspace: WorkspaceProps;
    hackerWorkspace: WorkspaceProps;
  } = $props();

  const current = $derived(hacker.on ? hackerWorkspace : workspace);
</script>

<Section text={hacker.on ? "$ neofetch" : "Workspace"} href="workspace">
  {#if current.image && current.image.trim() !== ""}
    <div class="mb-10 overflow-hidden rounded-2xl border border-edge bg-surface shadow-sm">
      <img
        src={current.image}
        alt={current.imageAlt || (hacker.on ? "Hacking workspace setup" : "Workspace desk setup")}
        loading="lazy"
        decoding="async"
        class="max-h-[30rem] w-full object-cover"
      />
    </div>
  {/if}

  {#if !hacker.on}
    <div class="grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-3">
      {#each current.groups as group (group.title)}
        <article
          class="flex flex-col rounded-2xl border border-edge bg-surface p-6 transition-all duration-200 hover:border-edge-hover"
        >
          <h3 class="mb-5 font-serif text-xl font-semibold tracking-tight text-white">
            {group.title}
          </h3>

          <ul class="m-0 flex list-none flex-col gap-4 p-0">
            {#each group.items as item (item.name)}
              <li class="flex items-start gap-3">
                {#if item.icon}
                  <span
                    class="mt-0.5 flex size-5 shrink-0 items-center justify-center [&>i]:text-lg [&>img]:size-5 [&>img]:object-contain"
                  >
                    <ToolIcon icon={item.icon} />
                  </span>
                {/if}

                <div class="min-w-0 flex-1">
                  <div class="flex flex-wrap items-center gap-x-2 gap-y-1">
                    {#if item.href}
                      <a
                        href={item.href}
                        target="_blank"
                        rel="noopener noreferrer"
                        class="group inline-flex items-center gap-1 font-medium text-white transition-colors hover:text-accent"
                      >
                        <span>{item.name}</span>
                        <span
                          class="text-xs text-white/50 transition-transform group-hover:translate-x-0.5 group-hover:-translate-y-0.5"
                          aria-hidden="true"
                        >
                          ↗
                        </span>
                      </a>
                    {:else}
                      <span class="font-medium text-white">{item.name}</span>
                    {/if}

                    {#if item.since}
                      <span class="rounded-full border border-edge-strong bg-white/5 px-2 py-0.5 text-xs text-white/60">
                        since {item.since}
                      </span>
                    {/if}

                    {#if item.trying}
                      <span
                        class="rounded-full border border-accent/40 bg-accent/10 px-2 py-0.5 text-xs font-medium text-accent"
                      >
                        currently trying
                      </span>
                    {/if}
                  </div>

                  {#if item.detail}
                    <p class="mt-1 text-sm text-neutral">{item.detail}</p>
                  {/if}
                </div>
              </li>
            {/each}
          </ul>
        </article>
      {/each}
    </div>
  {:else}
    <div class="mb-6 font-mono text-sm">
      <p class="font-bold text-primary">{HACKER_ALIAS}@{HACKER_HOST}</p>
      <p class="text-neutral/40" aria-hidden="true">-------------------------</p>
    </div>

    <div class="grid grid-cols-1 gap-6 font-mono sm:grid-cols-2 lg:grid-cols-3">
      {#each current.groups as group (group.title)}
        <article
          class="flex flex-col rounded-xl border border-edge bg-surface p-5 transition-colors hover:border-edge-hover"
        >
          <h3 class="mb-4 text-base font-bold">
            <span class="text-primary">{group.title.toLowerCase()}</span><span class="text-neutral">:</span>
          </h3>

          <ul class="m-0 flex list-none flex-col gap-3.5 p-0">
            {#each group.items as item (item.name)}
              <li class="flex items-start gap-2.5 text-sm">
                {#if item.icon}
                  <span
                    class="mt-0.5 flex size-4 shrink-0 items-center justify-center [&>i]:text-sm [&>img]:size-4 [&>img]:object-contain"
                  >
                    <ToolIcon icon={item.icon} />
                  </span>
                {:else}
                  <span class="shrink-0 text-primary select-none" aria-hidden="true">&gt;</span>
                {/if}

                <div class="min-w-0 flex-1">
                  <div class="flex flex-wrap items-center gap-x-2 gap-y-1">
                    {#if item.href}
                      <a
                        href={item.href}
                        target="_blank"
                        rel="noopener noreferrer"
                        class="group inline-flex items-center gap-1 font-medium text-white transition-colors hover:text-accent"
                      >
                        <span>{item.name}</span>
                        <span
                          class="text-xs text-white/50 transition-transform group-hover:translate-x-0.5 group-hover:-translate-y-0.5"
                          aria-hidden="true"
                        >
                          ↗
                        </span>
                      </a>
                    {:else}
                      <span class="font-medium text-white">{item.name}</span>
                    {/if}

                    {#if item.since}
                      <span class="border border-edge-strong bg-edge/30 px-1.5 py-0.5 text-xs text-neutral">
                        [since {item.since}]
                      </span>
                    {/if}

                    {#if item.trying}
                      <span class="border border-accent/60 bg-accent/15 px-1.5 py-0.5 text-xs font-medium text-accent">
                        [currently trying]
                      </span>
                    {/if}
                  </div>

                  {#if item.detail}
                    <p class="mt-1 text-xs text-neutral">{item.detail}</p>
                  {/if}
                </div>
              </li>
            {/each}
          </ul>
        </article>
      {/each}
    </div>

    <div class="mt-8 flex gap-2 pt-2" aria-hidden="true">
      <span class="h-3 w-8 bg-muted"></span>
      <span class="h-3 w-8 bg-primary"></span>
      <span class="h-3 w-8 bg-accent"></span>
      <span class="h-3 w-8 bg-neutral"></span>
      <span class="h-3 w-8 bg-edge-strong"></span>
      <span class="h-3 w-8 bg-white"></span>
    </div>
  {/if}
</Section>
