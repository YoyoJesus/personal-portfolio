<script lang="ts">
  import Section from "./Section.svelte";
  import { hacker } from "$lib/hacker.svelte";
  import type { SiteVersion } from "$lib/types";

  let { versions }: { versions: SiteVersion[] } = $props();
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
            <img
              class="desktop"
              src={screenshots.desktop}
              alt="{name} on a desktop screen"
              width="1440"
              height="900"
              loading={i < 2 ? "eager" : "lazy"}
              decoding="async"
            />
            <img
              class="phone"
              src={screenshots.phone}
              alt="{name} on a phone"
              width="390"
              height="844"
              loading={i < 2 ? "eager" : "lazy"}
              decoding="async"
            />
          </div>
        </div>
        <ul class="gallery">
          {#each details as { title, caption, image }}
            <li>
              <figure>
                <a href={image} target="_blank" rel="noopener" aria-label="{name}, {title}: view full-size screenshot">
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
  .screens img {
    display: block;
    height: auto;
    border: 1px solid var(--color-edge-strong);
  }
  .desktop {
    width: 100%;
    border-radius: 0.5rem;
  }
  .phone {
    position: absolute;
    right: 0;
    bottom: 0;
    width: 22%;
    border-radius: 0.75rem;
  }
  .gallery {
    display: grid;
    gap: 2rem 1.5rem;
    margin-top: clamp(2.5rem, 4vw, 3.5rem);
  }
  .gallery a {
    display: block;
  }
  .gallery img {
    width: 100%;
    height: auto;
    border: 1px solid var(--color-edge-strong);
    border-radius: 0.5rem;
    transition: border-color 200ms;
  }
  .gallery a:hover img {
    border-color: var(--color-edge-hover);
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
