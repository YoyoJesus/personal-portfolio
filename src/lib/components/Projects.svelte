<script lang="ts">
  import { onMount } from "svelte";
  import Section from "./Section.svelte";
  import type { LanguageProps, ProjectProps } from "$lib/types";

  let { projects }: { projects: ProjectProps[] } = $props();
  let carousel: HTMLDivElement | undefined = $state();
  let activeIndex = $state(0);
  let carouselHeight = $state(0);
  let scrollTimer: ReturnType<typeof setTimeout> | undefined;
  const gap = 16;

  function cardStep() {
    const card = carousel?.querySelector<HTMLElement>(".project-card");
    return card ? card.getBoundingClientRect().width + gap : 0;
  }

  function updateCarouselHeight() {
    const card = carousel?.querySelectorAll<HTMLElement>(".project-card")[projects.length + activeIndex];
    carouselHeight = card?.offsetHeight ?? 0;
  }

  function centerCarousel() {
    if (!carousel || !projects.length || !carousel.clientWidth) return;
    const step = cardStep();
    if (step) carousel.scrollLeft = (projects.length + activeIndex) * step;
    updateCarouselHeight();
  }

  function handleCarouselScroll() {
    if (!carousel || !projects.length) return;
    const step = cardStep();
    if (!step) return;

    const cardIndex = Math.round(carousel.scrollLeft / step);
    activeIndex = ((cardIndex % projects.length) + projects.length) % projects.length;
    updateCarouselHeight();

    if (scrollTimer) clearTimeout(scrollTimer);
    scrollTimer = setTimeout(() => {
      if (!carousel) return;
      const settledIndex = Math.round(carousel.scrollLeft / step);
      if (settledIndex < projects.length || settledIndex >= projects.length * 2) {
        carousel.scrollLeft = (projects.length + activeIndex) * step;
      }
    }, 150);
  }

  function moveCarousel(direction: number) {
    const step = cardStep();
    if (!carousel || !step) return;
    if (scrollTimer) clearTimeout(scrollTimer);
    const cardIndex = Math.round(carousel.scrollLeft / step);
    carousel.scrollTo({
      left: (cardIndex + direction) * step,
      behavior: "instant",
    });
  }

  onMount(() => {
    window.addEventListener("resize", centerCarousel);
    centerCarousel();
    return () => {
      window.removeEventListener("resize", centerCarousel);
      if (scrollTimer) clearTimeout(scrollTimer);
    };
  });

  const uniqueLanguages = (languages: LanguageProps[]) =>
    languages.filter((language, index, all) => all.findIndex((item) => item.name === language.name) === index);

  const projectLinks = (project: ProjectProps) =>
    [
      { label: "View site", href: project.linkPreview },
      { label: "Source code", href: project.linkSource },
      { label: "Read writeup", href: project.linkWriteup },
    ].filter((link): link is { label: string; href: string } => Boolean(link.href && link.href !== "/"));
</script>

{#snippet toolIcon(language: LanguageProps)}
  {#if language.icon.startsWith("http://") || language.icon.startsWith("https://")}
    <img src={language.icon} alt="" loading="lazy" decoding="async" />
  {:else}
    <i class={language.icon} aria-hidden="true"></i>
  {/if}
{/snippet}

{#snippet projectCard(project: ProjectProps, featured: boolean, duplicate: boolean)}
  <article class:featured class="project-card" inert={duplicate} aria-hidden={duplicate ? "true" : undefined}>
    <div class="project-image">
      <img
        src={project.image}
        alt={`${project.name} project preview`}
        loading="lazy"
        decoding="async"
        width="1000"
        height="625"
      />
    </div>

    <div class="project-details">
      <div class="project-heading">
        <h3>{project.name}</h3>
      </div>

      <p class="project-summary">{project.summary}</p>

      {#if project.languages?.length}
        <ul class="project-tech" aria-label="Technologies used">
          {#each uniqueLanguages(project.languages) as language (language.name)}
            <li>
              {#if language.languageLink}
                <a href={language.languageLink} target="_blank" rel="noopener noreferrer">
                  {@render toolIcon(language)}
                  <span>{language.name}</span>
                </a>
              {:else}
                {@render toolIcon(language)}
                <span>{language.name}</span>
              {/if}
            </li>
          {/each}
        </ul>
      {/if}

      <div class="project-footer">
        <div class="project-links">
          {#each projectLinks(project) as link (link.label)}
            <a href={link.href} target="_blank" rel="noopener noreferrer">
              {link.label} <span aria-hidden="true">↗</span>
            </a>
          {/each}
        </div>

        {#if project.collaborators?.length}
          <div class="project-team" aria-label="Collaborators">
            {#each project.collaborators as collaborator (collaborator.name)}
              {#if collaborator.profileLink}
                <a
                  href={collaborator.profileLink}
                  target="_blank"
                  rel="noopener noreferrer"
                  aria-label={`Visit ${collaborator.name}'s profile`}
                  title={collaborator.name}
                >
                  <img src={collaborator.image} alt="" width="32" height="32" loading="lazy" decoding="async" />
                </a>
              {:else}
                <span title={collaborator.name} aria-label={collaborator.name}>
                  <img src={collaborator.image} alt="" width="32" height="32" loading="lazy" decoding="async" />
                </span>
              {/if}
            {/each}
          </div>
        {/if}
      </div>
    </div>
  </article>
{/snippet}

<Section text="Featured Projects" href="projects">
  <div class="projects-intro">
    <p>Things I've built and explored.</p>
  </div>

  {#if projects.length}
    <div class="mobile-carousel">
      <div
        class="carousel-viewport"
        bind:this={carousel}
        onscroll={handleCarouselScroll}
        role="region"
        aria-label="Projects carousel"
        style:height={carouselHeight ? `${carouselHeight}px` : undefined}
      >
        <div class="carousel-track">
          {#each [...projects, ...projects, ...projects] as project, repeatedIndex (repeatedIndex)}
            {@render projectCard(
              project,
              false,
              repeatedIndex < projects.length || repeatedIndex >= projects.length * 2,
            )}
          {/each}
        </div>
      </div>
      <div class="carousel-controls">
        <span>Swipe to browse</span>
        <div>
          <button type="button" onclick={() => moveCarousel(-1)} aria-label="Previous project">←</button>
          <button type="button" onclick={() => moveCarousel(1)} aria-label="Next project">→</button>
        </div>
      </div>
    </div>
  {/if}

  <div class="projects-grid">
    {#each projects as project, index (project.name)}
      {@render projectCard(project, index === 0, false)}
    {/each}
  </div>
</Section>

<style>
  .projects-intro {
    margin: -1.5rem 0 2rem;
    color: #94a3b8;
    font-size: 0.875rem;
    line-height: 1.5;
  }

  .projects-intro p {
    max-width: 32rem;
  }
  .projects-grid {
    display: none;
    gap: 1.25rem;
  }

  .mobile-carousel {
    margin-right: -1.25rem;
  }

  .carousel-viewport {
    overflow-x: auto;
    overscroll-behavior-x: contain;
    scroll-snap-type: x mandatory;
    scrollbar-width: none;
    transition: height 180ms ease;
  }

  .carousel-viewport::-webkit-scrollbar {
    display: none;
  }

  .carousel-track {
    display: flex;
    align-items: flex-start;
    gap: 1rem;
  }

  .carousel-track :global(.project-card) {
    flex: 0 0 calc(100% - 2rem);
    scroll-snap-align: start;
  }

  .carousel-controls {
    display: flex;
    align-items: center;
    justify-content: space-between;
    margin: 1rem 1.25rem 0 0;
    color: #b8db80;
    font-family: "Gabarito Variable", sans-serif;
    font-size: 0.8rem;
    font-weight: 600;
    letter-spacing: 0.08em;
  }

  .carousel-controls div {
    display: flex;
    gap: 0.5rem;
  }

  .carousel-controls button {
    display: grid;
    width: 2.5rem;
    height: 2.5rem;
    place-items: center;
    border: 1px solid #53684f;
    border-radius: 50%;
    color: #e2e8f0;
    cursor: pointer;
    font-size: 1.1rem;
  }

  .carousel-controls button:hover {
    border-color: #b8db80;
    color: #b8db80;
  }

  .carousel-controls button:focus-visible {
    outline: 2px solid #b8db80;
    outline-offset: 3px;
  }

  .project-card {
    display: flex;
    flex-direction: column;
    min-width: 0;
    overflow: hidden;
    border: 1px solid #3c503d;
    border-radius: 1.25rem;
    background: #243328;
    transition:
      border-color 180ms ease,
      transform 180ms ease;
  }

  .project-card:hover {
    border-color: #71945d;
    transform: translateY(-3px);
  }
  .project-image {
    position: relative;
    overflow: hidden;
    aspect-ratio: 16 / 10;
    background: #34473a;
  }
  .project-image::after {
    position: absolute;
    inset: 0;
    border-bottom: 1px solid #ffffff18;
    box-shadow: inset 0 0 0 1px #ffffff12;
    content: "";
    pointer-events: none;
  }
  .project-image img {
    width: 100%;
    height: 100%;
    object-fit: cover;
    object-position: top center;
  }
  .project-details {
    display: flex;
    flex: 1;
    flex-direction: column;
    padding: 1.5rem;
  }
  .project-heading h3 {
    color: #e2e8f0;
    font-family: "Gabarito Variable", sans-serif;
    font-size: clamp(1.6rem, 4vw, 2rem);
    font-weight: 600;
    letter-spacing: -0.04em;
    line-height: 1.1;
  }

  .project-summary {
    margin-top: 0.9rem;
    color: #b9c5bf;
    font-size: 0.875rem;
    line-height: 1.65;
  }
  .project-tech {
    display: flex;
    flex-wrap: wrap;
    gap: 0.4rem;
    margin-top: 1.4rem;
    padding: 0;
    list-style: none;
  }
  .project-tech li {
    display: inline-flex;
    align-items: center;
    gap: 0.4rem;
    border: 1px solid #53684f;
    border-radius: 999px;
    padding: 0.3rem 0.65rem;
    color: #c7d8bd;
    font-size: 0.7rem;
    line-height: 1.25;
  }
  .project-tech a {
    display: inline-flex;
    align-items: center;
    gap: 0.4rem;
  }
  .project-tech :global(img),
  .project-tech :global(i) {
    display: block;
    width: 1rem;
    height: 1rem;
    flex: none;
    font-size: 1rem;
    object-fit: contain;
  }
  .project-tech a:focus-visible {
    outline: 2px solid #b8db80;
    outline-offset: 4px;
  }
  .project-footer {
    display: flex;
    flex-wrap: wrap;
    align-items: center;
    justify-content: space-between;
    gap: 1rem;
    margin-top: auto;
    padding-top: 1.75rem;
  }
  .project-links {
    display: flex;
    flex-wrap: wrap;
    gap: 0.75rem 1.2rem;
  }
  .project-links a {
    color: #e2e8f0;
    font-size: 0.8rem;
    font-weight: 600;
    text-decoration: underline;
    text-decoration-color: #91b876;
    text-underline-offset: 0.3rem;
  }
  .project-links a:hover {
    color: #b8db80;
  }
  .project-links a span {
    display: inline-block;
    margin-left: 0.1rem;
    text-decoration: none;
  }
  .project-team {
    display: flex;
    align-items: center;
    padding-left: 0.3rem;
  }
  .project-team a,
  .project-team span {
    display: block;
    width: 2rem;
    height: 2rem;
    margin-left: -0.3rem;
    border: 2px solid #243328;
    border-radius: 50%;
  }
  .project-team img {
    width: 100%;
    height: 100%;
    border-radius: 50%;
    object-fit: cover;
  }
  .project-team a:hover {
    outline: 2px solid #b8db80;
  }
  .project-links a:focus-visible,
  .project-team a:focus-visible {
    outline: 2px solid #b8db80;
    outline-offset: 4px;
  }

  @media (min-width: 640px) {
    .mobile-carousel {
      display: none;
    }
    .projects-grid {
      display: grid;
      grid-template-columns: repeat(2, minmax(0, 1fr));
    }
    .project-card.featured {
      grid-column: 1 / -1;
      flex-direction: row-reverse;
    }
    .featured .project-image,
    .featured .project-details {
      width: 50%;
    }
    .featured .project-image {
      aspect-ratio: auto;
    }
    .featured .project-image img {
      position: absolute;
      inset: 0;
    }
  }

  @media (prefers-reduced-motion: reduce) {
    .carousel-viewport {
      transition: none;
    }
    .project-card {
      transition: none;
    }
    .project-card:hover {
      transform: none;
    }
  }

  @media (max-width: 639px) {
    .project-card:hover {
      transform: none;
    }
  }
</style>
