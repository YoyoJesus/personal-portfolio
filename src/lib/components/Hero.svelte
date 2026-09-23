<script lang="ts">
  import ContactForm from "./ContactForm.svelte";
  import type { HeroProps } from "$lib/types";

  let { name, specialty, summary, resume, blog }: HeroProps = $props();

  let contactOpen = $state(false);
</script>

<section class="py-24 md:py-32" id="#hero">
  <h1 class="mb-1.5 font-serif text-7xl font-bold tracking-tightest text-white sm:text-8xl md:mb-0 md:text-9xl">
    {name}
  </h1>
  <p
    class="mb-9 font-serif text-4xl leading-[46px] font-bold tracking-tighter text-primary sm:text-5xl md:text-6xl"
  >
    {specialty}
  </p>
  <p class="mb-16 text-base font-normal text-neutral md:text-lg">
    {summary}
  </p>

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
