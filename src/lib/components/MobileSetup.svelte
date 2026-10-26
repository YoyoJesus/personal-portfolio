<script lang="ts">
  import IconWifi from "~icons/ph/wifi-high-fill";
  import IconSignal from "~icons/ph/cell-signal-full-fill";
  import IconBattery from "~icons/ph/battery-high-fill";
  import IconGoogle from "~icons/simple-icons/google";
  import IconMic from "~icons/ph/microphone-fill";
  import ToolIcon from "./ToolIcon.svelte";
  import type { MobileProps, WorkspaceItem } from "$lib/types";
  import { hacker } from "$lib/hacker.svelte";

  let { mobile }: { mobile: MobileProps } = $props();

  // Filled in on the client so the status bar shows the visitor's local time without a hydration mismatch.
  let now = $state<Date | null>(null);
  $effect(() => {
    now = new Date();
    const id = setInterval(() => (now = new Date()), 30_000);
    return () => clearInterval(id);
  });

  const time = $derived(
    now ? now.toLocaleTimeString([], { hour: "numeric", minute: "2-digit" }).replace(/\s?[AP]M$/i, "") : "9:41",
  );
  const date = $derived(now ? now.toLocaleDateString([], { weekday: "short", month: "short", day: "numeric" }) : "");

  const linkFocus = "transition-colors hover:text-accent focus-visible:outline-2 focus-visible:outline-accent";
</script>

{#snippet app(item: WorkspaceItem & { label?: string }, showLabel: boolean)}
  {#snippet tile()}
    <span
      class="flex size-10 items-center justify-center rounded-full bg-neutral-900 shadow-sm ring-1 ring-white/10 [&>i]:text-2xl [&>img]:size-6 [&>img]:object-contain"
    >
      {#if item.icon}<ToolIcon icon={item.icon} />{/if}
    </span>
    {#if showLabel}
      <span class="w-full truncate text-center text-[0.58rem] leading-tight tracking-tight text-white/90"
        >{item.label ?? item.name}</span
      >
    {:else}
      <span class="sr-only">{item.name}</span>
    {/if}
  {/snippet}
  {#if item.href}
    <a
      href={item.href}
      target="_blank"
      rel="noopener noreferrer"
      title={item.name}
      class="flex flex-col items-center gap-1 rounded-xl transition-transform hover:scale-105 focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-accent"
    >
      {@render tile()}
    </a>
  {:else}
    <span class="flex flex-col items-center gap-1" title={item.name}>{@render tile()}</span>
  {/if}
{/snippet}

<div class="mt-16 sm:mt-20">
  <h3
    class={hacker.on
      ? "mb-6 font-mono text-sm font-bold text-primary"
      : "mb-8 text-xs font-semibold tracking-wider text-white/50 uppercase"}
  >
    {hacker.on ? "$ adb shell getprop ro.product.model" : "On the Go"}
  </h3>

  <div class="flex flex-col items-center gap-10 sm:flex-row sm:items-center sm:gap-14">
    <div
      class={[
        "relative aspect-[9/19.5] w-64 shrink-0 overflow-hidden rounded-[2.5rem] border-[5px] shadow-2xl",
        hacker.on
          ? "border-neutral-900 bg-[radial-gradient(circle_at_30%_20%,#3a0507,#050505_70%)] ring-1 ring-primary/50"
          : "border-neutral-900 bg-[linear-gradient(165deg,#4a7fd8_0%,#2c4f96_40%,#15233f_80%,#0b1222_100%)] ring-1 ring-edge-strong",
      ]}
      role="img"
      aria-label="Home screen of my {mobile.phone.name}"
    >
      <div class="flex h-full flex-col px-4 pt-2 pb-2.5" aria-hidden="false">
        <div class="relative flex items-center justify-between text-[0.6rem] font-medium text-white/90">
          <span class="tabular-nums">{time}</span>
          <span
            class="absolute left-1/2 size-2.5 -translate-x-1/2 rounded-full bg-black ring-1 ring-white/10"
            aria-hidden="true"
          ></span>
          <span class="flex items-center gap-0.5" aria-hidden="true">
            <IconWifi /><IconSignal /><IconBattery />
          </span>
        </div>

        <div class="mt-7 text-white">
          <p class={["text-base leading-tight font-medium", hacker.on && "font-mono"]}>{date || " "}</p>
          {#if hacker.on}<p class="font-mono text-[0.65rem] text-white/70">root@pixel:~#</p>{/if}
        </div>

        <ul class="mt-auto grid grid-cols-4 gap-x-1 gap-y-3" aria-label="Home screen apps">
          {#each mobile.apps as item (item.name)}
            <li>{@render app(item, true)}</li>
          {/each}
        </ul>

        <div
          class="mt-4 flex h-8 items-center gap-2 rounded-full bg-white/15 px-3 text-white/80 backdrop-blur"
          aria-hidden="true"
        >
          <IconGoogle class="size-3.5" />
          <span class="flex-1"></span>
          <IconMic class="size-3.5" />
        </div>

        <ul class="mt-3 grid grid-cols-4 gap-x-2" aria-label="Dock">
          {#each mobile.dock as item (item.name)}
            <li>{@render app(item, false)}</li>
          {/each}
        </ul>

        <span class="mx-auto mt-2.5 h-1 w-20 rounded-full bg-white/70" aria-hidden="true"></span>
      </div>
    </div>

    <div class={["w-full max-w-md", hacker.on && "font-mono"]}>
      {#if mobile.phone.href}
        <a
          href={mobile.phone.href}
          target="_blank"
          rel="noopener noreferrer"
          class={[
            hacker.on ? "text-lg font-bold text-primary lowercase" : "font-serif text-2xl font-semibold text-white",
            linkFocus,
          ]}>{mobile.phone.name}</a
        >
      {:else}
        <p
          class={hacker.on
            ? "text-lg font-bold text-primary lowercase"
            : "font-serif text-2xl font-semibold text-white"}
        >
          {mobile.phone.name}
        </p>
      {/if}
      {#if mobile.phone.detail}<p class="mt-1 text-sm text-neutral">{mobile.phone.detail}</p>{/if}

      {#if mobile.gear.length}
        <h4 class="mt-8 text-xs font-semibold tracking-wider text-white/50 uppercase">
          {hacker.on ? "# also carrying" : "Also in the bag"}
        </h4>
        <ul class="mt-3 space-y-2 text-sm" aria-label="On-the-go gear">
          {#each mobile.gear as item (item.name)}
            <li class="flex items-center gap-3">
              {#if item.image}
                <span
                  class="flex size-9 shrink-0 items-center justify-center rounded-lg bg-white/5 p-1 ring-1 ring-white/10"
                >
                  <img
                    src={item.image}
                    alt=""
                    loading="lazy"
                    decoding="async"
                    class="max-h-full max-w-full object-contain"
                  />
                </span>
              {/if}
              <div class="flex flex-wrap items-baseline gap-x-2">
                {#if item.href}
                  <a
                    href={item.href}
                    target="_blank"
                    rel="noopener noreferrer"
                    class={["text-white", hacker.on && "lowercase", linkFocus]}>{item.name}</a
                  >
                {:else}
                  <span class={["text-white", hacker.on && "lowercase"]}>{item.name}</span>
                {/if}
                {#if item.detail}<span class="text-xs text-neutral">{item.detail}</span>{/if}
              </div>
            </li>
          {/each}
        </ul>
      {/if}
    </div>
  </div>
</div>
