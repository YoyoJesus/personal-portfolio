<script lang="ts">
  import { SITE_CONFIG, SITE_CONTENT } from "$lib/config";
  import Hero from "$lib/components/Hero.svelte";
  import Experience from "$lib/components/Experience.svelte";
  import Projects from "$lib/components/Projects.svelte";
  import OffTheClock from "$lib/components/OffTheClock.svelte";
  import About from "$lib/components/About.svelte";

  let { data } = $props();

  const { letterboxd, lastfm, steam } = SITE_CONFIG.activity;

  // svelte-ignore state_referenced_locally
  let films = $state(data.films);
  // svelte-ignore state_referenced_locally
  let listening = $state(data.listening);

  // Poll Letterboxd and Last.fm while the tab is visible so "now playing" stays current.
  $effect(() => {
    const refresh = async () => {
      if (document.hidden) return;
      const res = await fetch("/api/activity").catch(() => null);
      if (!res?.ok) return;
      const fresh = await res.json();
      films = fresh.films;
      // Keep what we have rather than blanking the section on a failed poll.
      if (!fresh.listening.failed) listening = fresh.listening;
    };
    refresh();
    const timer = setInterval(refresh, 30_000);
    document.addEventListener("visibilitychange", refresh);
    return () => {
      clearInterval(timer);
      document.removeEventListener("visibilitychange", refresh);
    };
  });
</script>

<Hero {...SITE_CONTENT.hero} contributions={data.contributions} githubUser={SITE_CONFIG.activity.github} />
<Experience text="Work Experience" href="experience" experience={SITE_CONTENT.experience} />
<Experience text="Leadership / Volunteering" href="leadership" experience={SITE_CONTENT.leadership} />
<Projects projects={SITE_CONTENT.projects} />
<OffTheClock {films} {listening} letterboxdUser={letterboxd} lastfmUser={lastfm} gaming={data.gaming} steamId={steam} />
<About {...SITE_CONTENT.about} name={SITE_CONTENT.hero.name} />
