<script lang="ts">
  import { onMount, onDestroy } from 'svelte';
  import type { ProjectProps } from '@types';
  
  export let projects: ProjectProps[] = [];
  
  let carouselContainer: HTMLDivElement;
  let carouselTrack: HTMLDivElement;
  let isUserScrolling = false;
  let scrollTimeout: number;
  let translateX = 0;
  let cardWidth = 0;
  let animationSpeed = 60; // pixels per second
  let lastTimestamp = 0;
  let animationFrame: number;
  
  // Triple the projects for infinite scroll
  const tripleProjects = [...projects, ...projects, ...projects];
  
  // Helper to get image src (handles both string and object types)
  function getImageSrc(img: any): string {
    return typeof img === 'string' ? img : img?.src || '';
  }
  
  onMount(() => {
    if (carouselTrack) {
      // Calculate card width (90vw max 420px + 16px gap)
      const viewportWidth = window.innerWidth;
      cardWidth = Math.min(viewportWidth * 0.9, 420) + 16;
      
      // Start at the beginning of middle section
      translateX = -(projects.length * cardWidth);
      carouselTrack.style.transform = `translateX(${translateX}px)`;
      
      // Also set initial scroll position to middle
      if (carouselContainer) {
        carouselContainer.scrollLeft = projects.length * cardWidth;
      }
      
      startAutoScroll();
    }
  });
  
  onDestroy(() => {
    if (animationFrame) {
      cancelAnimationFrame(animationFrame);
    }
    if (scrollTimeout) {
      clearTimeout(scrollTimeout);
    }
  });
  
  function startAutoScroll() {
    function animate(timestamp: number) {
      if (!carouselTrack || !carouselContainer) {
        animationFrame = requestAnimationFrame(animate);
        return;
      }
      
      if (!lastTimestamp) lastTimestamp = timestamp;
      const deltaTime = (timestamp - lastTimestamp) / 1000; // Convert to seconds
      lastTimestamp = timestamp;
      
      if (!isUserScrolling) {
        // Move left (negative direction)
        translateX -= animationSpeed * deltaTime;
        
        // Check for wrapping
        const singleSetWidth = projects.length * cardWidth;
        
        // If we've scrolled past the second set, wrap back to first set
        if (translateX < -(singleSetWidth * 2)) {
          translateX += singleSetWidth;
        }
        // If we're before the first set, wrap forward
        else if (translateX > -singleSetWidth) {
          translateX -= singleSetWidth;
        }
        
        carouselTrack.style.transform = `translateX(${translateX}px)`;
      }
      
      animationFrame = requestAnimationFrame(animate);
    }
    
    animationFrame = requestAnimationFrame(animate);
  }
  
  function handleScroll() {
    // User is manually scrolling - disable transform immediately
    if (!isUserScrolling) {
      isUserScrolling = true;
      if (carouselTrack) {
        carouselTrack.style.transform = 'none';
      }
    }
    
    // Only check for wrapping, don't force it aggressively
    if (carouselContainer) {
      const scrollLeft = carouselContainer.scrollLeft;
      const maxScroll = carouselContainer.scrollWidth;
      const singleSetWidth = projects.length * cardWidth;
      
      // Only wrap if they've scrolled very far
      if (scrollLeft <= 10) {
        // At the very beginning, jump to middle
        carouselContainer.scrollLeft = singleSetWidth + scrollLeft;
      } else if (scrollLeft >= maxScroll - carouselContainer.clientWidth - 10) {
        // At the very end, jump back
        carouselContainer.scrollLeft = scrollLeft - singleSetWidth;
      }
    }
    
    // Clear previous timeout
    if (scrollTimeout) {
      clearTimeout(scrollTimeout);
    }
    
    // Resume auto-scroll after user stops scrolling for 3 seconds
    scrollTimeout = setTimeout(() => {
      if (carouselContainer && carouselTrack) {
        // Sync translateX to current scroll position before resuming
        translateX = -carouselContainer.scrollLeft;
        carouselTrack.style.transform = `translateX(${translateX}px)`;
      }
      isUserScrolling = false;
      lastTimestamp = 0;
    }, 3000) as unknown as number;
  }
  
  function handleTouchStart() {
    isUserScrolling = true;
    if (carouselTrack) {
      carouselTrack.style.transform = 'none';
    }
    if (scrollTimeout) {
      clearTimeout(scrollTimeout);
    }
  }
  
  function handleTouchEnd() {
    scrollTimeout = setTimeout(() => {
      if (carouselContainer && carouselTrack) {
        translateX = -carouselContainer.scrollLeft;
        carouselTrack.style.transform = `translateX(${translateX}px)`;
      }
      isUserScrolling = false;
      lastTimestamp = 0;
    }, 3000) as unknown as number;
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
  <div bind:this={carouselTrack} class="carousel-track flex gap-4 pb-4">
    {#each tripleProjects as { name, summary, image, linkPreview, linkSource, linkWriteup, collaborators, languages }, index}
      <div class="project-card snap-center shrink-0 w-[90vw] max-w-[420px] rounded-2xl border border-neutral/20 bg-black">
        <div class="relative z-[1] flex flex-col h-[600px] w-full rounded-2xl bg-[#354C2C]/85 before:absolute before:inset-0 before:z-[-1] before:rounded-2xl before:bg-[url(/raja.png)] before:bg-[length:128px] before:bg-repeat before:opacity-[5%] before:content-['']">
          <div class="px-6 pt-8 pb-4 flex-shrink-0">
            <h3 class="mb-3 font-serif text-2xl font-medium text-[#B8DB80]">
              {name}
            </h3>
            <p class="text-sm text-neutral line-clamp-4">{summary}</p>
            <div class="flex flex-wrap gap-3 pt-6 text-white text-sm">
              <a
                href={linkSource}
                target="_blank"
                class="after:relative after:bottom-[-5px] after:content-[url(/external.svg)] hover:underline whitespace-nowrap"
              >
                Source
              </a>
              {#if linkPreview !== "/"}
                <a
                  href={linkPreview}
                  target="_blank"
                  class="after:relative after:bottom-[-5px] after:content-[url(/external.svg)] hover:underline whitespace-nowrap"
                >
                  Demo
                </a>
              {/if}
              {#if linkWriteup !== "/"}
                <a
                  href={linkWriteup}
                  target="_blank"
                  class="after:relative after:bottom-[-5px] after:content-[url(/external.svg)] hover:underline whitespace-nowrap"
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
                        <img src={icon} alt={langName} class="w-6 h-6 object-contain" />
                      {:else}
                        <i class={`${icon} text-2xl`}></i>
                      {/if}
                    </a>
                  {:else}
                    <div title={langName}>
                      {#if isUrl}
                        <img src={icon} alt={langName} class="w-6 h-6 object-contain" />
                      {:else}
                        <i class={`${icon} text-2xl`}></i>
                      {/if}
                    </div>
                  {/if}
                {/each}
              </div>
            {/if}
            {#if collaborators && collaborators.length > 0}
              <div class="mt-4 pt-4 border-t border-neutral/20">
                <p class="text-xs text-neutral/60 mb-2">Collaborators:</p>
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
                          class="w-8 h-8 rounded-full object-cover ring-2 ring-transparent group-hover:ring-[#B8DB80] transition-all"
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
                          class="w-8 h-8 rounded-full object-cover"
                        />
                      </div>
                    {/if}
                  {/each}
                </div>
              </div>
            {/if}
          </div>
          <div class="flex-1 overflow-hidden min-h-0">
            <img
              class="h-full w-full rounded-b-2xl object-cover object-center"
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
  
  .carousel-track {
    will-change: transform;
    transform: translateZ(0);
    backface-visibility: hidden;
    perspective: 1000px;
  }
</style>
