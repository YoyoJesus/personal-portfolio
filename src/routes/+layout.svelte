<script lang="ts">
  import "@fontsource/be-vietnam-pro";
  import "@fontsource-variable/gabarito";
  import "../app.css";
  import { onNavigate } from "$app/navigation";
  import { page } from "$app/state";
  import { SITE_CONFIG } from "$lib/config";
  import NoiseField from "$lib/components/NoiseField.svelte";
  import Header from "$lib/components/Header.svelte";
  import Footer from "$lib/components/Footer.svelte";
  import HackerMode from "$lib/components/HackerMode.svelte";
  import { HACKER_ALIAS, hacker } from "$lib/hacker.svelte";

  let { children } = $props();

  const { siteLogo, navLinks, author, socialLinks, socialImage, canonicalURL } = SITE_CONFIG;
  const ogImgUrl = canonicalURL + socialImage;
  const title = $derived(page.data.title ?? SITE_CONFIG.title);
  const description = $derived(page.data.description ?? SITE_CONFIG.description);
  const pageURL = $derived(page.url.pathname === "/" ? canonicalURL : canonicalURL + page.url.pathname);

  // Page changes jump straight to their target; smooth scrolling is for anchors within a page.
  onNavigate(({ from, to }) => {
    if (from?.url.pathname === to?.url.pathname) return;
    document.documentElement.style.scrollBehavior = "auto";
    return () => document.documentElement.style.removeProperty("scroll-behavior");
  });
</script>

<svelte:head>
  <meta name="description" content={description} />
  <meta name="author" content={author} />
  <title>{hacker.on ? `${HACKER_ALIAS} :: terminal` : title}</title>

  <meta property="og:title" content={title} />
  <meta property="og:description" content={description} />
  <meta property="og:url" content={pageURL} />
  <meta property="og:image" content={ogImgUrl} />

  <meta property="twitter:card" content="summary_large_image" />
  <meta property="twitter:url" content={pageURL} />
  <meta property="twitter:title" content={title} />
  <meta property="twitter:description" content={description} />
  <meta property="twitter:image" content={ogImgUrl} />
</svelte:head>

<div class="ambient-field" aria-hidden="true"><NoiseField quiet /></div>
<Header {siteLogo} {navLinks} />
<main>
  {@render children()}
</main>
<Footer {author} {socialLinks} />
<HackerMode />
