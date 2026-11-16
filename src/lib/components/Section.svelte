<script lang="ts">
  import type { Snippet } from "svelte";
  let { text, href, children }: { text: string; href: string; children: Snippet } = $props();
  const firstWord = $derived(text.split(" ")[0]);
  const remaining = $derived(text.slice(firstWord.length));
</script>

<section id={href} class="content-section" aria-labelledby="{href}-heading">
  <h2 id="{href}-heading">{firstWord}<span>{remaining}</span></h2>
  {@render children()}
</section>

<style>
  .content-section { padding-block: clamp(4rem, 8vw, 7rem); }
  h2 { margin-bottom: clamp(2.5rem, 5vw, 4rem); max-width: 18ch; font-family: var(--font-serif); font-size: clamp(2.75rem, 6vw, 4.5rem); font-weight: 750; letter-spacing: -0.04em; line-height: 1.02; text-wrap: balance; color: var(--color-white); }
  h2 span { font-weight: 400; color: var(--color-neutral); }
</style>
