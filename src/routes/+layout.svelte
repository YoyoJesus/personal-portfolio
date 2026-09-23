<script lang="ts">
  import "@fontsource/be-vietnam-pro";
  import "@fontsource-variable/gabarito";
  import "../app.css";
  import { SITE_CONFIG } from "$lib/config";
  import Header from "$lib/components/Header.svelte";
  import SideAnimations from "$lib/components/SideAnimations.svelte";
  import Footer from "$lib/components/Footer.svelte";

  let { children } = $props();

  const { title, description, siteLogo, navLinks, author, socialLinks, socialImage, canonicalURL } = SITE_CONFIG;
  const ogImgUrl = canonicalURL + socialImage;
</script>

<svelte:head>
  <meta name="description" content={description} />
  <meta name="author" content={author} />
  <title>{title}</title>

  <meta property="og:title" content={title} />
  <meta property="og:description" content={description} />
  <meta property="og:url" content={canonicalURL} />
  <meta property="og:image" content={ogImgUrl} />

  <meta property="twitter:card" content="summary_large_image" />
  <meta property="twitter:url" content={canonicalURL} />
  <meta property="twitter:title" content={title} />
  <meta property="twitter:description" content={description} />
  <meta property="twitter:image" content={ogImgUrl} />
</svelte:head>

<SideAnimations />
<Header {siteLogo} {navLinks} />
<main class="mx-auto max-w-3xl px-5">
  {@render children()}
</main>
<Footer {author} {socialLinks} />
