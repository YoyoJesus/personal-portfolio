<script lang="ts">
  import ContributionGraph from "./ContributionGraph.svelte";
  import { hacker } from "$lib/hacker.svelte";
  import type { Contributions } from "$lib/server/github";
  import type { Quote } from "$lib/server/quotable";
  let { contributions, githubUser }: { contributions: Contributions; githubUser: string } = $props();
  let quote = $state<Quote | null>(null);
  $effect(() => {
    fetch("/api/quote")
      .then((res) => res.ok ? res.json() : null)
      .then((q) => quote = q)
      .catch(() => {});
  });
</script>

<div class="pt-12">
  <ContributionGraph {contributions} user={githubUser} />
  {#if quote}
    <figure class="text-sm text-neutral">
      {#if hacker.on}<p class="mb-1">$ fortune</p>{/if}
      <blockquote class="text-white/80 {hacker.on ? '' : 'italic'}">“{quote.content}”</blockquote>
      <figcaption class="mt-2">— {quote.author}</figcaption>
    </figure>
  {/if}
</div>
