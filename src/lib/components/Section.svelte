<script lang="ts">
  import type { Snippet } from "svelte";

  let { text, href, children }: { text: string; href: string; children: Snippet } = $props();
</script>

<section id={href} class="py-24">
  <h2 class="mb-14 font-serif text-4xl font-bold tracking-tighter text-white md:text-5xl">
    {text}
  </h2>
  {@render children()}
</section>
