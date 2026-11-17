<script lang="ts">
  import ToolIcon from "./ToolIcon.svelte";
  import type { MobileProps } from "$lib/types";
  let { mobile }: { mobile: MobileProps } = $props();
  const appNames = ["GitHub", "Termius", "Discord", "Spotify", "Waze", "Google Authenticator"];
  const gearNames = ["CMF Watch Pro 2", "CMF Headphone Pro", "Shokz OpenRun", "Heltec WiFi LoRa 32 V3", "Moleskine Classic Notebook"];
  const apps = $derived(appNames.flatMap(name => mobile.apps.filter(item => item.name === name)));
  const gear = $derived(gearNames.flatMap(name => mobile.gear.filter(item => item.name === name)));
</script>

<div class="mobile-setup">
  <h3>On the <span>go</span></h3>
  <div class="mobile-layout">
    <div class="phone-summary">
      <h4>{#if mobile.phone.href}<a href={mobile.phone.href} target="_blank" rel="noopener noreferrer">{mobile.phone.name}</a>{:else}{mobile.phone.name}{/if}</h4>
      {#if mobile.phone.detail}<p>{mobile.phone.detail}</p>{/if}
      <ul class="apps" aria-label="Selected phone apps">
        {#each apps as item}
          <li>
            {#snippet content()}<span class="app-icon">{#if item.icon}<ToolIcon icon={item.icon} />{/if}</span><span>{item.label ?? item.name}</span>{/snippet}
            {#if item.href}<a href={item.href} target="_blank" rel="noopener noreferrer" aria-label={item.name}>{@render content()}</a>{:else}<span class="app">{@render content()}</span>{/if}
          </li>
        {/each}
      </ul>
    </div>
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

<style>
  .mobile-setup { margin-top: 2rem; padding-top: 1.5rem; border-top: 1px solid var(--color-edge-strong); }
  h3 { font-family: var(--font-serif); font-size: 2rem; line-height: 1.1; margin-bottom: 1.25rem; font-weight: 650; letter-spacing: -0.03em; }
  h3 span, h4 span { font-weight: 400; color: var(--color-neutral); }
  .mobile-layout { display: grid; gap: 1.5rem; align-items: start; }
  .phone-summary { background: var(--color-surface); padding: 1.25rem; border-radius: 0.75rem; min-width: 0; }
  h4 { font-family: var(--font-serif); font-size: 1.5rem; line-height: 1.2; font-weight: 550; }
  p { color: var(--color-neutral); font-size: 0.8rem; margin-top: 0.3rem; }
  .apps { display: grid; grid-template-columns: repeat(6, minmax(0, 1fr)); gap: 0.5rem; margin-top: 1.25rem; }
  .apps a, .app { display: flex; flex-direction: column; align-items: center; gap: 0.4rem; font-size: 0.6rem; color: var(--color-soft); text-align: center; overflow-wrap: anywhere; }
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
  @media (min-width: 850px) { .mobile-layout { grid-template-columns: minmax(0, 0.9fr) minmax(0, 1.8fr); gap: 2rem; } }
</style>
