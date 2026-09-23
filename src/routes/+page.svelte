<script lang="ts">
  import { SITE_CONFIG, SITE_CONTENT } from "$lib/config";
  import Hero from "$lib/components/Hero.svelte";
  import Experience from "$lib/components/Experience.svelte";
  import Projects from "$lib/components/Projects.svelte";
  import OffTheClock from "$lib/components/OffTheClock.svelte";
  import About from "$lib/components/About.svelte";

  let { data } = $props();

  const { letterboxd, lastfm, steam } = SITE_CONFIG.activity;
</script>

<Hero {...SITE_CONTENT.hero} contributions={data.contributions} githubUser={SITE_CONFIG.activity.github} />
<Experience text="Work Experience" href="experience" experience={SITE_CONTENT.experience} />
<Experience text="Leadership / Volunteering" href="leadership" experience={SITE_CONTENT.leadership} />
<Projects projects={SITE_CONTENT.projects} />
<OffTheClock
  films={data.films}
  listening={data.listening}
  letterboxdUser={letterboxd}
  lastfmUser={lastfm}
  gaming={data.gaming}
  steamId={steam}
/>
<About {...SITE_CONTENT.about} name={SITE_CONTENT.hero.name} />
