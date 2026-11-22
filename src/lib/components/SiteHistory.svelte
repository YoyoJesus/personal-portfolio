<script lang="ts">
  import Section from "./Section.svelte";
  import { tick } from "svelte";
  import IconClose from "~icons/ph/x-bold";
  import { hacker } from "$lib/hacker.svelte";
  import type { SiteVersion } from "$lib/types";

  let { versions }: { versions: SiteVersion[] } = $props();

  interface Shot {
    src: string;
    alt: string;
    width: number;
    height: number;
    title?: string;
    caption?: string;
  }

  let viewer: HTMLDialogElement;
  let shown = $state<Shot | null>(null);

  // Modifier and middle clicks still open the image in a new tab.
  async function open(event: MouseEvent, shot: Shot) {
    if (event.button !== 0 || event.metaKey || event.ctrlKey || event.shiftKey || event.altKey) return;
    event.preventDefault();
    shown = shot;
    await tick();
    viewer.showModal();
  }

  // Clicks on the backdrop land on the dialog itself; clicks on the image or caption land on its children.
  function closeOnBackdrop(event: MouseEvent) {
    if (event.target === viewer) viewer.close();
  }
</script>

<Section text={hacker.on ? "$ git log --reverse" : "Site History"} href="history" level="h1">
  <ol>
    {#each versions as { name, period, summary, screenshots, details }, i}
      <li class="version">
        <div class="overview">
          <div class="intro">
            <h2>{name}</h2>
            <p class="period">{period}</p>
            <p class="summary">{summary}</p>
          </div>
          <div class="screens">
            {#each [{ kind: "desktop", src: screenshots.desktop, alt: `${name} on a desktop screen`, width: 1440, height: 900 }, { kind: "phone", src: screenshots.phone, alt: `${name} on a phone`, width: 390, height: 844 }] as shot}
              <a
                class={shot.kind}
                href={shot.src}
                aria-label="View larger: {shot.alt}"
                aria-haspopup="dialog"
                onclick={(event) => open(event, shot)}
              >
                <img
                  src={shot.src}
                  alt=""
                  width={shot.width}
                  height={shot.height}
                  loading={i < 2 ? "eager" : "lazy"}
                  decoding="async"
                />
              </a>
            {/each}
          </div>
        </div>
        <ul class="gallery">
          {#each details as { title, caption, image }}
            <li>
              <figure>
                <a
                  href={image}
                  aria-label="View larger: {name}, {title}"
                  aria-haspopup="dialog"
                  onclick={(event) =>
                    open(event, { src: image, alt: `${name}: ${title}`, width: 1200, height: 750, title, caption })}
                >
                  <img src={image} alt="" width="1200" height="750" loading="lazy" decoding="async" />
                </a>
                <figcaption>
                  <h3>{title}</h3>
                  <p>{caption}</p>
                </figcaption>
              </figure>
            </li>
          {/each}
        </ul>
      </li>
    {/each}
  </ol>
</Section>

<!-- svelte-ignore a11y_click_events_have_key_events, a11y_no_noninteractive_element_interactions -->
<dialog
  class="viewer"
  aria-label={shown?.alt}
  bind:this={viewer}
  onclick={closeOnBackdrop}
  onclose={() => (shown = null)}
>
  {#if shown}
    <figure style:--ratio={shown.width / shown.height}>
      <img src={shown.src} alt={shown.alt} width={shown.width} height={shown.height} />
      {#if shown.title}
        <figcaption>
          <h3>{shown.title}</h3>
          <p>{shown.caption}</p>
        </figcaption>
      {/if}
    </figure>
  {/if}
  <button type="button" class="close" aria-label="Close" onclick={() => viewer.close()}><IconClose /></button>
</dialog>

<style>
  .version {
    border-top: 1px solid var(--color-edge);
    padding-block: clamp(2.5rem, 6vw, 5rem);
  }
  .overview {
    display: grid;
    gap: 2rem;
  }
  h2 {
    font-family: var(--font-serif);
    font-size: clamp(1.75rem, 3vw, 2.5rem);
    font-weight: 700;
    line-height: 1.1;
    text-wrap: balance;
    color: var(--color-white);
  }
  .period {
    margin-top: 0.75rem;
    font-size: var(--text-xs);
    color: var(--color-primary);
  }
  .summary {
    max-width: 38ch;
    margin-top: 1rem;
    font-size: var(--text-sm);
    line-height: 1.6;
    text-wrap: pretty;
    color: var(--color-soft);
  }
  .screens {
    position: relative;
    padding: 0 8% 8% 0;
  }
  .screens a,
  .gallery a {
    display: block;
    cursor: zoom-in;
  }
  .screens img,
  .gallery img {
    display: block;
    width: 100%;
    height: auto;
    border: 1px solid var(--color-edge-strong);
    border-radius: 0.5rem;
    transition: border-color 200ms;
  }
  .screens a:hover img,
  .gallery a:hover img {
    border-color: var(--color-edge-hover);
  }
  .phone {
    position: absolute;
    right: 0;
    bottom: 0;
    width: 22%;
  }
  .phone img {
    border-radius: 0.75rem;
  }
  .gallery {
    display: grid;
    gap: 2rem 1.5rem;
    margin-top: clamp(2.5rem, 4vw, 3.5rem);
  }
  h3 {
    margin-top: 1rem;
    font-family: var(--font-serif);
    font-size: var(--text-base);
    font-weight: 700;
    color: var(--color-white);
  }
  figcaption p {
    margin-top: 0.375rem;
    font-size: var(--text-xs);
    line-height: 1.6;
    text-wrap: pretty;
    color: var(--color-soft);
  }
  :global(html:has(dialog.viewer[open])) {
    overflow: hidden;
  }
  .viewer {
    max-width: none;
    max-height: none;
    margin: auto;
    padding: 0;
    border: 0;
    background: transparent;
    color: var(--color-white);
    overflow: visible;
  }
  .viewer::backdrop {
    background: rgb(var(--rgb-ink) / 0.95);
  }
  .viewer[open] {
    animation: viewer-in 200ms var(--ease-out-expo);
  }
  .viewer[open]::backdrop {
    animation: backdrop-in 200ms ease;
  }
  .viewer figure {
    /* Fill most of the viewport while keeping the screenshot's shape and leaving room for the caption. */
    --room: calc(100dvh - 4rem);
    width: min(calc(100vw - 2rem), 90rem, calc(var(--room) * var(--ratio)));
  }
  .viewer figure:has(figcaption) {
    --room: calc(100dvh - 10rem);
  }
  .viewer img {
    display: block;
    width: 100%;
    height: auto;
    border: 1px solid var(--color-edge-strong);
    border-radius: 0.75rem;
    box-shadow: 0 18px 60px rgb(0 0 0 / 0.45);
  }
  .viewer figcaption {
    max-width: 60ch;
  }
  .close {
    position: fixed;
    top: 1rem;
    right: 1rem;
    display: grid;
    place-items: center;
    width: 2.75rem;
    height: 2.75rem;
    border: 1px solid var(--color-edge-strong);
    border-radius: 50%;
    background: var(--color-black);
    color: var(--color-white);
    cursor: pointer;
    transition:
      border-color 200ms,
      color 200ms;
  }
  .close:hover {
    border-color: var(--color-edge-hover);
    color: var(--color-accent);
  }
  @keyframes viewer-in {
    from {
      opacity: 0;
      transform: scale(0.97);
    }
  }
  @keyframes backdrop-in {
    from {
      opacity: 0;
    }
  }
  @media (min-width: 768px) {
    .gallery {
      grid-template-columns: repeat(3, minmax(0, 1fr));
    }
  }
  @media (min-width: 900px) {
    .overview {
      grid-template-columns: minmax(0, 1fr) minmax(0, 2.2fr);
      gap: 3rem;
    }
    .intro {
      position: sticky;
      top: 7rem;
      align-self: start;
    }
  }
</style>
