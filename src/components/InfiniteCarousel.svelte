<script lang="ts">
  import { onMount, onDestroy } from 'svelte';
  import type { ProjectProps } from '@types';
  
  export let projects: ProjectProps[] = [];
  
  let carouselContainer: HTMLDivElement;
  let scrollTimeout: number;
  let cardWidth = 0;
  
  // Triple the projects for infinite scroll
  const tripleProjects = [...projects, ...projects, ...projects];
  
  // Helper to get image src (handles both string and object types)
  function getImageSrc(img: any): string {
    return typeof img === 'string' ? img : img?.src || '';
  }
  
  onMount(() => {
    if (carouselContainer) {
      const viewportWidth = window.innerWidth;
      cardWidth = Math.min(viewportWidth * 0.9, 420) + 16;
      // Start at the middle section
      carouselContainer.scrollLeft = projects.length * cardWidth;
    }
  });

  onDestroy(() => {
    if (scrollTimeout) {
      clearTimeout(scrollTimeout);
    }
  });
  
  function handleScroll() {
    if (!carouselContainer) return;
    const scrollLeft = carouselContainer.scrollLeft;
    const maxScroll = carouselContainer.scrollWidth;
    const singleSetWidth = projects.length * cardWidth;

    if (scrollLeft <= 10) {
      carouselContainer.scrollLeft = singleSetWidth + scrollLeft;
    } else if (scrollLeft >= maxScroll - carouselContainer.clientWidth - 10) {
      carouselContainer.scrollLeft = scrollLeft - singleSetWidth;
    }
  }

  function handleTouchStart() {
    if (scrollTimeout) clearTimeout(scrollTimeout);
  }

  function handleTouchEnd() {
    // no-op: wrapping is handled by handleScroll
  }
  
</script>

<div 
  bind:this={carouselContainer}
  on:scroll={handleScroll}
  on:touchstart={handleTouchStart}
  on:touchend={handleTouchEnd}
  role="region"
  aria-label="Projects carousel"
  class="mb-8 -mx-4 px-4 overflow-x-auto scrollbar-hide"
>
  <div class="carousel-track flex gap-4 pb-4">
    {#each tripleProjects as { name, summary, image, linkPreview, linkSource, linkWriteup, collaborators, languages }}
      <div class="project-card w-[90vw] max-w-[420px] shrink-0 snap-center border-2 border-white bg-black">
        <div class="relative z-[1] flex h-[600px] w-full flex-col bg-[#f5f5f5]">
          <div class="px-6 pt-8 pb-4 flex-shrink-0">
            <p class="mb-5 text-xs font-bold uppercase tracking-[0.14em] text-neutral">Selected work</p>
            <h3 class="mb-3 font-serif text-3xl font-bold tracking-tight text-primary">
              {name}
            </h3>
            <p class="text-sm text-neutral line-clamp-4">{summary}</p>
            <div class="flex flex-wrap gap-3 pt-6 text-xs font-bold uppercase tracking-[0.08em] text-white">
              {#if linkSource !== "/"}
                <a
                  href={linkSource}
                  target="_blank"
                  class="whitespace-nowrap border-b border-white pb-1 hover:text-primary"
                >
                  Source
                </a>
              {/if}
              {#if linkPreview !== "/"}
                <a
                  href={linkPreview}
                  target="_blank"
                  class="whitespace-nowrap border-b border-white pb-1 hover:text-primary"
                >
                  Demo
                </a>
              {/if}
              {#if linkWriteup !== "/"}
                <a
                  href={linkWriteup}
                  target="_blank"
                  class="whitespace-nowrap border-b border-white pb-1 hover:text-primary"
                >
                  Writeup
                </a>
              {/if}
            </div>
            {#if languages && languages.length > 0}
              <div class="flex gap-2 mt-3">
                {#each languages as { icon, name: langName, languageLink }}
                  {@const isUrl = icon.startsWith('http://') || icon.startsWith('https://')}
                  {#if languageLink}
                    <a
                      href={languageLink}
                      target="_blank"
                      class="group"
                      title={langName}
                    >
                      {#if isUrl}
                        <img src={icon} alt={langName} class="h-6 w-6 object-contain grayscale" />
                      {:else}
                        <i class={`${icon} text-2xl`}></i>
                      {/if}
                    </a>
                  {:else}
                    <div title={langName}>
                      {#if isUrl}
                        <img src={icon} alt={langName} class="h-6 w-6 object-contain grayscale" />
                      {:else}
                        <i class={`${icon} text-2xl`}></i>
                      {/if}
                    </div>
                  {/if}
                {/each}
              </div>
            {/if}
            {#if collaborators && collaborators.length > 0}
              <div class="mt-4 border-t border-white/20 pt-4">
                <p class="mb-2 text-xs font-bold uppercase tracking-[0.12em] text-neutral">Collaborators</p>
                <div class="flex gap-2">
                  {#each collaborators as { name: collabName, image: collabImage, profileLink }}
                    {#if profileLink}
                      <a
                        href={profileLink}
                        target="_blank"
                        class="group relative"
                        title={collabName}
                      >
                        <img
                          src={getImageSrc(collabImage)}
                          alt={collabName}
                          width="32"
                          height="32"
                          class="h-8 w-8 border border-white object-cover grayscale"
                        />
                      </a>
                    {:else}
                      <div
                        class="relative"
                        title={collabName}
                      >
                        <img
                          src={getImageSrc(collabImage)}
                          alt={collabName}
                          width="32"
                          height="32"
                          class="h-8 w-8 border border-white object-cover grayscale"
                        />
                      </div>
                    {/if}
                  {/each}
                </div>
              </div>
            {/if}
          </div>
          <div class="min-h-0 flex-1 overflow-hidden border-t-2 border-white bg-black p-2">
            <img
              class="h-full w-full object-cover object-center grayscale"
              src={getImageSrc(image)}
              alt={name}
              width="736"
              height="483"
            />
          </div>
        </div>
      </div>
    {/each}
  </div>
</div>

<style>
  .scrollbar-hide {
    -ms-overflow-style: none;
    scrollbar-width: none;
  }
  
  .scrollbar-hide::-webkit-scrollbar {
    display: none;
  }
  
</style>
