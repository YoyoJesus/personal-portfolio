<script lang="ts">
  import Section from "./Section.svelte";
  import type { AboutProps, HeroProps } from "$lib/types";

  let { description, image, name }: AboutProps & Pick<HeroProps, "name"> = $props();
</script>

<Section text="About Me" href="about">
  <div class="flex flex-col items-center gap-12 md:flex-row md:gap-8">
    <p class="w-auto text-base text-neutral md:pr-5">{description}</p>
    <div class="h-80 w-64 flex-shrink-0 rotate-[5deg] bg-white p-4 md:rotate-[7deg]">
      <img class="object-cover" src={image} width="260" height="260" alt={name} loading="lazy" decoding="async" />
    </div>
  </div>
</Section>
