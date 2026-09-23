<script lang="ts">
  import { onMount } from "svelte";
  import Menu from "$lib/icons/Menu.svelte";
  import type { HeaderProps } from "$lib/types";

  let { siteLogo, navLinks }: HeaderProps = $props();

  let menuOpen = $state(false);
  let active = $state("");

  const toggleMenu = () => (menuOpen = !menuOpen);

  // Update navigation based on scroll position with Intersection Observer
  onMount(() => {
    const sections = document.querySelectorAll("section");
    const observer = new IntersectionObserver(
      (entries) => {
        for (const entry of entries) {
          if (entry.isIntersecting) active = `#${entry.target.id}`;
        }
      },
      { threshold: 0.5 },
    );
    const observe = () => sections.forEach((section) => observer.observe(section));
    const onVisibility = () => (document.visibilityState === "hidden" ? observer.disconnect() : observe());

    observe();
    document.addEventListener("visibilitychange", onVisibility);
    return () => {
      observer.disconnect();
      document.removeEventListener("visibilitychange", onVisibility);
    };
  });
</script>

<header class="sticky top-0 z-50 mx-auto flex max-w-5xl animate-slide-in justify-between bg-black px-5 py-6">
  <a href="/" aria-label="Home link">
    <img class="rounded-full" src={siteLogo} width="45" height="45" alt="website logo" loading="lazy" decoding="async" />
  </a>

  <button
    type="button"
    id="menu-button"
    class="px-1.5 text-neutral sm:hidden"
    aria-expanded={menuOpen}
    aria-controls="main-menu"
    onclick={toggleMenu}
  >
    <Menu />
  </button>

  <nav
    class={[
      "absolute top-20 right-5 rounded-xl border border-neutral/40 bg-black px-4 py-5 text-neutral sm:static sm:block sm:border-0 sm:bg-transparent sm:p-0",
      !menuOpen && "hidden",
    ]}
    id="main-menu"
  >
    <ul class="gap-2 sm:flex">
      {#each navLinks as link}
        <li class="relative">
          <a
            class={[
              "nav-item relative block p-2 text-sm font-medium transition-all duration-500 after:absolute after:bottom-0 after:left-2/4 after:h-2 after:w-1 after:-translate-x-2/4 after:text-primary after:opacity-0 after:content-['•'] hover:text-white",
              active === link.href && "text-white md:after:opacity-100",
            ]}
            href={link.href}
            onclick={toggleMenu}
          >
            {link.text}
          </a>
        </li>
      {/each}
    </ul>
  </nav>
</header>

<style>
  header {
    animation-timeline: scroll();
    animation-range: 0 650px;
  }
</style>
