<script lang="ts">
  import Section from "./Section.svelte";
  import InfiniteCarousel from "./InfiniteCarousel.svelte";
  import type { ProjectProps } from "$lib/types";

  let { projects }: { projects: ProjectProps[] } = $props();

  const linkClass =
    "after:relative after:bottom-[-5px] after:content-[url(/external.svg)] hover:underline whitespace-nowrap";
</script>

{#snippet languageIcon(icon: string, langName: string)}
  {#if icon.startsWith("http://") || icon.startsWith("https://")}
    <img src={icon} alt={langName} class="h-8 w-8 object-contain" />
  {:else}
    <i class={`${icon} text-3xl`}></i>
  {/if}
{/snippet}

<Section text="Featured Projects" href="projects">
  <!-- Mobile infinite carousel -->
  <div class="sm:hidden">
    <InfiniteCarousel {projects} />
  </div>

  <!-- Desktop stacked cards (original layout) -->
  <div class="hidden sm:block">
    {#each projects as { name, summary, image, linkPreview, linkSource, linkWriteup, collaborators, languages }, index}
      <div style={`top: ${98 + Math.min(index, 2) * 40}px;`} class="sticky mb-12 rounded-2xl border border-neutral/20 bg-black">
        <div
          class="bg-difu relative z-[1] grid w-full grid-rows-2 rounded-2xl bg-[#5A7863]/85 before:absolute before:inset-0 before:z-[-1] before:rounded-2xl before:bg-[url(/raja.png)] before:bg-[length:128px] before:bg-repeat before:opacity-[5%] before:content-[''] sm:h-[36rem] sm:grid-cols-2 sm:grid-rows-1"
        >
          <div class="flex flex-col px-6 pt-12 pb-6">
            <h3 class="mb-5 font-serif text-3xl font-medium text-[#B8DB80]">
              {name}
            </h3>
            <p class="text-base text-neutral">{summary}</p>
            <div class="flex flex-wrap gap-4 pt-10 text-white">
              {#if linkSource !== "/"}
                <a href={linkSource} target="_blank" class={linkClass}>Source</a>
              {/if}
              {#if linkPreview !== "/"}
                <a href={linkPreview} target="_blank" class={linkClass}>Live Site</a>
              {/if}
              {#if linkWriteup !== "/"}
                <a href={linkWriteup} target="_blank" class={linkClass}>Writeup</a>
              {/if}
            </div>
            {#if languages && languages.length > 0}
              <div class="mt-4 flex gap-3">
                {#each languages as { icon, name: langName, languageLink }}
                  {#if languageLink}
                    <a href={languageLink} target="_blank" class="group" title={langName}>
                      {@render languageIcon(icon, langName)}
                    </a>
                  {:else}
                    <div title={langName}>
                      {@render languageIcon(icon, langName)}
                    </div>
                  {/if}
                {/each}
              </div>
            {/if}
            {#if collaborators && collaborators.length > 0}
              <div class="mt-auto pt-6">
                <p class="mb-3 text-xs text-neutral/60">Collaborators:</p>
                <div class="flex gap-2">
                  {#each collaborators as { name: collabName, image: collabImage, profileLink }}
                    {#if profileLink}
                      <a href={profileLink} target="_blank" class="group relative" title={collabName}>
                        <img
                          src={collabImage}
                          alt={collabName}
                          width="40"
                          height="40"
                          loading="lazy"
                          decoding="async"
                          class="h-10 w-10 rounded-full object-cover ring-2 ring-transparent transition-all group-hover:ring-[#B8DB80]"
                        />
                      </a>
                    {:else}
                      <div class="relative" title={collabName}>
                        <img
                          src={collabImage}
                          alt={collabName}
                          width="40"
                          height="40"
                          loading="lazy"
                          decoding="async"
                          class="h-10 w-10 rounded-full object-cover"
                        />
                      </div>
                    {/if}
                  {/each}
                </div>
              </div>
            {/if}
          </div>
          <div class="flex items-end justify-end overflow-hidden p-3">
            <img
              class="h-full w-full rounded-2xl object-cover object-center sm:h-[85%]"
              src={image}
              alt={name}
              width="1000"
              height="483"
              loading="lazy"
              decoding="async"
            />
          </div>
        </div>
      </div>
    {/each}
  </div>
</Section>
