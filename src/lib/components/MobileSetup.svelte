<script lang="ts">
  import { onMount } from "svelte";
  import ToolIcon from "./ToolIcon.svelte";
  import IconExpand from "~icons/ph/arrows-out-simple";
  import IconClose from "~icons/ph/x-bold";
  import type { MobileProps } from "$lib/types";
  let { mobile }: { mobile: MobileProps } = $props();
  const appNames = ["GitHub", "Termius", "Discord", "Spotify", "Waze", "Google Authenticator"];
  const gearNames = ["CMF Watch Pro 2", "CMF Headphone Pro", "Shokz OpenRun", "Heltec WiFi LoRa 32 V3", "Moleskine Classic Notebook"];
  const apps = $derived(appNames.flatMap(name => mobile.apps.filter(item => item.name === name)));
  const gear = $derived(gearNames.flatMap(name => mobile.gear.filter(item => item.name === name)));
  const phoneApps = $derived(mobile.apps.filter(item => item.name !== "Claude"));
  let canExpand = $state(false);
  let phonePopover: HTMLDivElement;

  onMount(() => {
    const desktop = matchMedia("(min-width: 768px) and (hover: hover) and (pointer: fine)");
    const sync = () => {
      canExpand = desktop.matches;
      if (!canExpand && phonePopover.matches(":popover-open")) phonePopover.hidePopover();
    };
    sync();
    desktop.addEventListener("change", sync);
    return () => desktop.removeEventListener("change", sync);
  });
</script>

<div class="mobile-setup">
  <h3>On the <span>go</span></h3>
  <div class="mobile-layout">
    <button type="button" class="phone-summary" popovertarget="phone-apps" disabled={!canExpand} aria-label={canExpand ? `Explore apps on my ${mobile.phone.name}` : `${mobile.phone.name}: ${apps.map(item => item.name).join(", ")}`}>
      <span class="phone-heading"><strong>{mobile.phone.name}</strong><IconExpand aria-hidden="true" /></span>
      {#if mobile.phone.detail}<span class="phone-detail">{mobile.phone.detail}</span>{/if}
      <span class="apps" aria-hidden="true">
        {#each apps as item}
          <span class="app"><span class="app-icon">{#if item.icon}<ToolIcon icon={item.icon} />{/if}</span><span>{item.label ?? item.name}</span></span>
        {/each}
      </span>
      <span class="explore-apps">Explore phone apps</span>
    </button>
    <div class="gear-summary">
      <h4>Mobile <span>gear</span></h4>
      <ul class="gear" aria-label="Selected mobile gear">
        {#each gear as item}
          <li>
            {#snippet content()}{#if item.image}<img src={item.image} alt="" loading="lazy" width="30" height="34" />{/if}<strong>{item.name}</strong>{#if item.detail}<small>{item.detail}</small>{/if}{/snippet}
            {#if item.href}<a href={item.href} target="_blank" rel="noopener noreferrer">{@render content()}</a>{:else}<span>{@render content()}</span>{/if}
          </li>
        {/each}
      </ul>
    </div>
  </div>
</div>

<div id="phone-apps" class="phone-popover" popover="auto" role="dialog" aria-labelledby="phone-title" bind:this={phonePopover}>
  <div class="phone-frame">
    <div class="phone-camera" aria-hidden="true"></div>
    <div class="phone-top">
      <div><h4 id="phone-title">{mobile.phone.name}</h4><p>{mobile.phone.detail}</p></div>
      <button type="button" class="phone-close" popovertarget="phone-apps" popovertargetaction="hide" aria-label="Close phone apps"><IconClose /></button>
    </div>
    <ul class="full-apps" aria-label="Phone apps">
      {#each phoneApps as item}
        <li>
          {#snippet appContent()}<span class="full-app-icon">{#if item.icon}<ToolIcon icon={item.icon} />{/if}</span><span>{item.label ?? item.name}</span>{/snippet}
          {#if item.href}<a href={item.href} target="_blank" rel="noopener noreferrer" aria-label={item.name}>{@render appContent()}</a>{:else}<span class="full-app">{@render appContent()}</span>{/if}
        </li>
      {/each}
    </ul>
    <ul class="phone-dock" aria-label="Pinned phone apps">
      {#each mobile.dock as item}
        <li>
          {#snippet dockContent()}<span class="full-app-icon">{#if item.icon}<ToolIcon icon={item.icon} />{/if}</span><span>{item.name}</span>{/snippet}
          {#if item.href}<a href={item.href} target="_blank" rel="noopener noreferrer">{@render dockContent()}</a>{:else}<span class="full-app">{@render dockContent()}</span>{/if}
        </li>
      {/each}
    </ul>
    <div class="gesture-bar" aria-hidden="true"></div>
  </div>
</div>

<style>
  .mobile-setup { margin-top: 2rem; padding-top: 1.5rem; border-top: 1px solid var(--color-edge-strong); }
  h3 { font-family: var(--font-serif); font-size: 2rem; line-height: 1.1; margin-bottom: 1.25rem; font-weight: 650; letter-spacing: -0.03em; }
  h3 span, h4 span { font-weight: 400; color: var(--color-neutral); }
  .mobile-layout { display: grid; gap: 1.5rem; align-items: start; }
  .phone-summary { background: var(--color-surface); padding: 1.25rem; border-radius: 0.75rem; min-width: 0; width: 100%; text-align: left; cursor: pointer; }
  .phone-summary:enabled:hover { background: var(--color-surface-raised); }
  .phone-summary:disabled { cursor: default; }
  .phone-summary:disabled .phone-heading :global(svg), .phone-summary:disabled .explore-apps { display: none; }
  .phone-heading { display: flex; align-items: center; justify-content: space-between; gap: 1rem; }
  .phone-heading strong { font-family: var(--font-serif); font-size: 1.5rem; line-height: 1.2; font-weight: 550; }
  .phone-heading :global(svg) { width: 1.1rem; height: 1.1rem; color: var(--color-accent); }
  .phone-detail { display: block; color: var(--color-neutral); font-size: 0.8rem; margin-top: 0.3rem; }
  .explore-apps { display: block; margin-top: 1rem; font-size: 0.7rem; color: var(--color-accent); }
  h4 { font-family: var(--font-serif); font-size: 1.5rem; line-height: 1.2; font-weight: 550; }
  p { color: var(--color-neutral); font-size: 0.8rem; margin-top: 0.3rem; }
  .apps { display: grid; grid-template-columns: repeat(6, minmax(0, 1fr)); gap: 0.5rem; margin-top: 1.25rem; }
  .app { display: flex; flex-direction: column; align-items: center; gap: 0.4rem; font-size: 0.6rem; color: var(--color-soft); text-align: center; overflow-wrap: anywhere; }
  .app-icon { display: flex; width: 1.4rem; height: 1.4rem; align-items: center; justify-content: center; }
  .app-icon :global(img), .app-icon :global(i) { width: 1.4rem; height: 1.4rem; font-size: 1.4rem; object-fit: contain; }
  .gear-summary { min-width: 0; }
  .gear { display: grid; grid-template-columns: repeat(5, minmax(0, 1fr)); gap: 0.65rem; margin-top: 1.25rem; }
  .gear li { min-width: 0; }
  .gear a, .gear li > span { display: flex; flex-direction: column; align-items: start; gap: 0.45rem; }
  .gear img { width: 30px; height: 34px; object-fit: contain; }
  strong { font-size: 0.7rem; line-height: 1.4; font-weight: 500; overflow-wrap: anywhere; }
  small { font-size: 0.65rem; line-height: 1.4; color: var(--color-neutral); }
  a:hover { color: var(--color-accent); }
  .phone-popover { position: fixed; inset: 0; margin: auto; width: min(22rem, calc(100vw - 2rem)); max-height: calc(100dvh - 2rem); padding: 0.4rem; border: 1px solid var(--color-edge-strong); border-radius: 2.5rem; background: var(--color-black); color: var(--color-white); overflow-y: auto; scrollbar-width: thin; scrollbar-color: var(--color-edge-strong) transparent; box-shadow: 0 18px 60px rgb(0 0 0 / 0.45); }
  .phone-frame { padding: 1rem 1rem 0.75rem; border-radius: 2rem; background: var(--color-surface); }
  .phone-camera { width: 0.65rem; height: 0.65rem; margin: 0 auto 1.25rem; border-radius: 50%; background: var(--color-black); }
  .phone-top { display: flex; justify-content: space-between; align-items: start; gap: 0.5rem; }
  .phone-top h4 { font-size: 1.3rem; }
  .phone-close { display: grid; place-items: center; min-width: 2.75rem; min-height: 2.75rem; border-radius: 50%; cursor: pointer; color: var(--color-neutral); }
  .phone-close:hover { background: var(--color-black); color: var(--color-accent); }
  .full-apps, .phone-dock { display: grid; grid-template-columns: repeat(4, minmax(0, 1fr)); gap: 1.25rem 0.3rem; margin-top: 1.75rem; }
  .full-apps a, .phone-dock a, .full-app { display: flex; flex-direction: column; align-items: center; gap: 0.5rem; text-align: center; font-size: 0.65rem; line-height: 1.4; overflow-wrap: anywhere; }
  .full-app-icon { display: grid; place-items: center; width: 2.75rem; height: 2.75rem; }
  .full-app-icon :global(img), .full-app-icon :global(i) { width: 2rem; height: 2rem; font-size: 2rem; object-fit: contain; }
  .phone-dock { padding-top: 1.25rem; border-top: 1px solid var(--color-edge-strong); }
  .gesture-bar { width: 5rem; height: 0.2rem; border-radius: 1rem; margin: 1.5rem auto 0; background: var(--color-neutral); }
  @media (min-width: 850px) { .mobile-layout { grid-template-columns: minmax(0, 0.9fr) minmax(0, 1.8fr); gap: 2rem; } }
</style>
