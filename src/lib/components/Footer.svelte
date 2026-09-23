<script lang="ts">
  import type { SiteConfig } from "$lib/types";

  let { author, socialLinks }: Pick<SiteConfig, "author" | "socialLinks"> = $props();
  const currentYear = new Date().getFullYear();
</script>

<footer class="w-full border-t border-neutral/20 px-5 pt-5 pb-8 text-center text-white">
  <ul class="mb-5 flex flex-wrap justify-center gap-x-5 text-xs">
    {#each socialLinks as { text, href }}
      <li>
        <a
          {href}
          target="_blank"
          class="inline-block px-4 py-3 after:relative after:bottom-[-4px] after:content-[url(/external.svg)] hover:text-primary"
        >
          {text}
        </a>
      </li>
    {/each}
  </ul>
  <p class="text-xs">
    {author} - {currentYear}
  </p>
</footer>
