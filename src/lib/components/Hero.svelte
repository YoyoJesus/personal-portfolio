<script lang="ts">
  import { kineticLetters } from "$lib/actions/kineticLetters";
  import NoiseField from "./NoiseField.svelte";
  import type { HackerHeroProps, HeroProps } from "$lib/types";
  import { HACKER_ALIAS, hacker } from "$lib/hacker.svelte";
  import ContactForm from "./ContactForm.svelte";
  let contactOpen = $state(false);

  let { name, summary, resume, blog, hackerHero }: HeroProps & { hackerHero: HackerHeroProps } = $props();

  const summaryLines = $derived((hacker.on ? hackerHero.summary : summary).split(/(?<=[.!?])\s+/));
  const displayName = $derived(hacker.on ? HACKER_ALIAS : name);
  // Each word on its own line, each letter its own span so it can stagger in and react to the cursor.
  const words = $derived(displayName.split(" "));

</script>

<section id="hero" class="hero" aria-labelledby="hero-name">
  <NoiseField />
  <div class="scrim" aria-hidden="true"></div>

  <div class="shell hero-inner">
    {#key displayName}
      <h1 id="hero-name" class="display hero-name glitch" data-text={displayName} aria-label={displayName} use:kineticLetters={{ enabled: !hacker.on, baseline: 480 }}>
        {#each words as word, w}
          <span class="word" aria-hidden="true">
            {#each word.split("") as ch, i}
              <span class="ch" data-kinetic-letter style="--i: {w * 7 + i}">{ch}</span>
            {/each}
          </span>
        {/each}
      </h1>
    {/key}

    <div class="hero-bottom">
      <div class="hero-copy">
        <div class="hero-summary">
          {#each summaryLines as line}<p>{line}</p>{/each}
        </div>
        {#if hacker.on}
          <div class="wins">
            <p class="text-faint">$ cat wins.txt</p>
            <ul>
              {#each hackerHero.wins as { place, event }}
                <li><span class="text-volt-soft">[{place}]</span> {event}</li>
              {/each}
            </ul>
          </div>
        {/if}
      </div>

      <div class="hero-actions">
        <button id="open-contact-form" type="button" class="btn btn-primary" onclick={() => (contactOpen = true)}>
          Get in Touch
          <span aria-hidden="true">→</span>
        </button>
        <a class="btn btn-ghost" href={resume} target="_blank" rel="noopener">View my Resume</a>
        <a class="btn btn-ghost" href={blog} target="_blank" rel="noopener">Read my Blog</a>
      </div>
    </div>


  </div>
</section>

<ContactForm bind:open={contactOpen} />

<style>
  .hero {
    position: relative;
    display: flex;
    min-height: 100svh;
    overflow: hidden;
    view-timeline: --hero block;
  }
  .scrim {
    position: absolute;
    inset: 0;
    z-index: 2;
    background:
      linear-gradient(to top, var(--color-ink) 0%, rgb(var(--rgb-ink) / 0.6) 35%, transparent 70%),
      linear-gradient(to right, rgb(var(--rgb-ink) / 0.7) 0%, transparent 60%);
    pointer-events: none;
  }
  .hero-inner {
    position: relative;
    z-index: 3;
    display: grid;
    grid-template-rows: 1fr auto;
    gap: 2rem;
    padding-block: 7.5rem 2rem;
  }
  .hero-name {
    align-self: end;
    display: flex;
    flex-direction: column;
    font-size: clamp(3.75rem, 16.5vw, 15.5rem);
    font-weight: 800;
    color: var(--color-fg);
    animation: hero-out linear both;
    animation-timeline: --hero;
    animation-range: exit 0% exit 80%;
  }
  .word {
    --base: 800;
    display: block;
    overflow: hidden;
    padding-bottom: 0.2em;
    margin-bottom: -0.2em;
    white-space: nowrap;
  }
  /* The surname sits at the light end of the weight axis; the cursor pulls letters back to heavy. */
  .word:nth-child(2) {
    --base: 400;
    color: var(--color-accent);
  }
  .ch {
    display: inline-block;
    font-weight: var(--w, var(--base));
    transition: font-weight 450ms var(--ease-out-expo);
    animation: letter-in 1100ms var(--ease-out-expo) backwards;
    animation-delay: calc(var(--i) * 45ms + 150ms);
  }
  @keyframes letter-in {
    from {
      transform: translateY(105%) rotate(6deg);
      font-weight: 900;
      opacity: 0;
    }
    60% {
      opacity: 1;
    }
    to {
      transform: none;
      font-weight: var(--base);
    }
  }
  @keyframes hero-out {
    to {
      transform: translateY(-12vh) scale(0.94);
      opacity: 0.15;
    }
  }

  .hero-bottom {
    display: grid;
    gap: 1.75rem;
    align-items: end;
  }
  .hero-summary {
    max-width: none;
    color: var(--color-dim);
    font-size: clamp(1rem, 1.6vw, 1.2rem);
    line-height: 1.6;
  }
  .hero-summary p + p { margin-top: 0.35rem; }
  .wins {
    margin-top: 1.25rem;
    font-size: 0.875rem;
    line-height: 1.7;
  }
  .hero-actions {
    display: flex;
    flex-wrap: wrap;
    gap: 0.75rem;
  }
  :global(html.hacker) .hero-name {
    font-size: clamp(3rem, 13vw, 11rem);
  }

  @supports not (animation-timeline: view()) {
    .hero-name {
      animation: none;
    }
  }
  @media (prefers-reduced-motion: reduce) {
    .hero-name,
    .ch {
      animation: none;
    }
  }
</style>
