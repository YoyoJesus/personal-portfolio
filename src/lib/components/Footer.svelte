<script lang="ts">
  import { page } from "$app/state";
  import LinkIcon from "$lib/icons/LinkIcon.svelte";
  import type { SiteConfig } from "$lib/types";
  import { HACKER_ALIAS, HACKER_HOST, hacker } from "$lib/hacker.svelte";

  let { author, socialLinks }: Pick<SiteConfig, "author" | "socialLinks"> = $props();
  const currentYear = new Date().getFullYear();
</script>

<footer class="w-full border-t border-edge px-5 pt-12 pb-10 text-center text-white">
  <ul class="mb-5 flex flex-wrap justify-center gap-x-5 text-xs">
    {#each socialLinks as { text, href }}
      <li>
        <a
          {href}
          target="_blank"
          class="inline-block rounded-full border border-edge-strong px-4 py-3 text-soft transition-colors hover:border-underline hover:text-white"
        >
          {text} <span aria-hidden="true"><LinkIcon /></span>
        </a>
      </li>
    {/each}
  </ul>
  <a
    href="/history"
    aria-current={page.url.pathname === "/history" ? "page" : undefined}
    class="inline-block py-3 text-xs text-soft underline transition-colors hover:text-white"
  >
    Site history
  </a>
  <p class="mt-4 text-xs text-neutral">
    {hacker.on ? `${HACKER_ALIAS}@${HACKER_HOST}` : author} - {currentYear}
  </p>
</footer>
