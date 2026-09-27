<script lang="ts">
  import ContactForm from "./ContactForm.svelte";
  import ContributionGraph from "./ContributionGraph.svelte";
  import type { HackerHeroProps, HeroProps } from "$lib/types";
  import { HACKER_ALIAS, hacker } from "$lib/hacker.svelte";
  import type { Contributions } from "$lib/server/github";

  let {
    name,
    specialty,
    summary,
    resume,
    blog,
    hackerHero,
    contributions,
    githubUser,
  }: HeroProps & { hackerHero: HackerHeroProps; contributions: Contributions; githubUser: string } = $props();

  let contactOpen = $state(false);
  const displayName = $derived(hacker.on ? HACKER_ALIAS : name);
</script>

<section class="py-24 md:py-32" id="#hero">
  <h1
    class="glitch mb-1.5 font-serif text-7xl font-bold tracking-tightest text-white sm:text-8xl md:mb-0 md:text-9xl"
    data-text={displayName}
  >
    {displayName}
  </h1>
  <p
    class={[
      "mb-9 font-serif font-bold text-primary",
      hacker.on
        ? "text-[min(3.9vw,2rem)] leading-tight whitespace-nowrap"
        : "text-4xl leading-[46px] tracking-tighter sm:text-5xl md:text-6xl",
    ]}
  >
    {hacker.on ? hackerHero.specialty : specialty}
  </p>
  {#if hacker.on}
    <p class="mb-6 text-base font-normal text-neutral md:text-lg">
      {hackerHero.summary}
    </p>
    <div class="mb-16 text-sm md:mb-10 md:text-base">
      <p class="mb-2 text-neutral">$ cat wins.txt</p>
      <ul class="space-y-1">
        {#each hackerHero.wins as { place, event }}
          <li class="text-white"><span class="text-primary">[{place}]</span> {event}</li>
        {/each}
      </ul>
    </div>
  {:else}
    <p class="mb-16 text-base font-normal text-neutral md:mb-10 md:text-lg">
      {summary}
    </p>
  {/if}

  <ContributionGraph {contributions} user={githubUser} />

  <div class="flex flex-wrap gap-4">
    <button
      id="open-contact-form"
      class="inline-block cursor-pointer rounded-full bg-primary px-8 py-5 text-sm leading-5 font-medium text-[#fff] transition-all hover:bg-primary/90"
      onclick={() => (contactOpen = true)}
    >
      Get in Touch
    </button>

    <a
      class="inline-block rounded-full bg-primary px-8 py-5 text-sm leading-5 font-medium text-[#fff] transition-all hover:bg-primary/90"
      href={resume}
      target="_blank">View my Resume</a
    >

    <a
      class="inline-block rounded-full bg-primary px-8 py-5 text-sm leading-5 font-medium text-[#fff] transition-all hover:bg-primary/90"
      href={blog}
      target="_blank">Read my Blog</a
    >
  </div>
</section>

<ContactForm bind:open={contactOpen} />
