<script lang="ts">
  import IconLetterboxd from "~icons/simple-icons/letterboxd";
  import IconLastfm from "~icons/simple-icons/lastdotfm";
  import IconSteam from "~icons/simple-icons/steam";
  import IconHeart from "~icons/ph/heart-fill";
  import IconRewatch from "~icons/ph/arrows-clockwise-bold";
  import IconMusicNote from "~icons/ph/music-note-bold";
  import IconController from "~icons/ph/game-controller-fill";
  import IconPlaying from "~icons/svg-spinners/bars-scale-middle";
  import Section from "./Section.svelte";
  import type { Film } from "$lib/server/letterboxd";
  import type { Listening } from "$lib/server/lastfm";
  import type { Gaming } from "$lib/server/steam";

  interface Props {
    films: Film[];
    listening: Listening;
    letterboxdUser: string;
    lastfmUser: string;
    gaming: Gaming;
    steamId: string;
  }

  let { films, listening, letterboxdUser, lastfmUser, gaming, steamId }: Props = $props();

  // Phones only get the first three films and games.
  const mobileHide = (i: number) => (i >= 3 ? "max-sm:hidden" : "");
  const maxPlays = $derived(Math.max(...listening.topArtists.map((a) => a.plays), 1));
  const watchedOn = (d: string) =>
    new Date(`${d}T12:00:00`).toLocaleDateString("en-US", { month: "short", day: "numeric" });
  const stars = (rating: number | null) =>
    rating == null ? "" : "★".repeat(Math.floor(rating)) + (rating % 1 ? "½" : "");
</script>

<Section text="When I'm Not Coding" href="not-coding">
  <div class="mb-16">
    <div class="mb-5 flex items-baseline justify-between">
      <h3 class="flex items-center gap-2 font-serif text-2xl font-semibold text-white">
        <IconLetterboxd class="size-6 text-[#B8DB80]" /> Recently Watched
      </h3>
      <a
        href={`https://letterboxd.com/${letterboxdUser}/`}
        target="_blank"
        class="text-sm text-neutral after:relative after:bottom-[-4px] after:content-[url(/external.svg)] hover:text-primary"
      >
        View All
      </a>
    </div>
    {#if films.length}
      <ul class="grid grid-cols-3 gap-3 sm:grid-cols-5">
        {#each films as f, i}
          <li class={mobileHide(i)}>
            <a href={f.link} target="_blank" class="group block" title={`${f.title} (${f.year})`}>
              <img
                src={f.poster}
                alt={`${f.title} poster`}
                loading="lazy"
                class="aspect-[2/3] w-full rounded-lg border border-neutral/20 object-cover transition-all group-hover:ring-2 group-hover:ring-[#B8DB80]"
              />
              <span class="mt-1.5 flex items-center justify-between text-xs">
                <span class="text-[#B8DB80]">{stars(f.rating)}</span>
                <span class="flex items-center gap-1 text-neutral">
                  {#if f.liked}<IconHeart class="size-3 text-primary" />{/if}
                  {#if f.rewatch}<IconRewatch class="size-3" />{/if}
                  {#if f.watched}{watchedOn(f.watched)}{/if}
                </span>
              </span>
            </a>
          </li>
        {/each}
      </ul>
    {:else}
      <p class="text-neutral">The Letterboxd feed didn't load. Try refreshing in a minute.</p>
    {/if}
  </div>

  <div>
    <div class="mb-5 flex items-baseline justify-between">
      <h3 class="flex items-center gap-2 font-serif text-2xl font-semibold text-white">
        <IconLastfm class="size-6 text-[#B8DB80]" /> Listening Activity
      </h3>
      <a
        href={`https://www.last.fm/user/${lastfmUser}`}
        target="_blank"
        class="text-sm text-neutral after:relative after:bottom-[-4px] after:content-[url(/external.svg)] hover:text-primary"
      >
        Last.fm
      </a>
    </div>
    {#if listening.recent.length === 0}
      <p class="rounded-2xl border border-neutral/20 p-5 text-neutral">
        {listening.missingKey
          ? "Scrobbles appear here once LASTFM_API_KEY is set in .env."
          : "Last.fm didn't respond. Try refreshing in a minute."}
      </p>
    {:else}
      <div class="grid gap-10 sm:grid-cols-2">
        <ol class="space-y-3">
          {#each listening.recent as t}
            <li>
              <a href={t.link} target="_blank" class="group flex items-center gap-3">
                {#if t.art}
                  <img src={t.art} alt="" class="size-11 rounded-md object-cover" />
                {:else}
                  <span class="grid size-11 place-items-center rounded-md bg-[#5A7863]/60 text-neutral">
                    <IconMusicNote class="size-4" />
                  </span>
                {/if}
                <span class="min-w-0 flex-1">
                  <span class="block truncate text-sm font-medium text-white group-hover:text-[#B8DB80]">
                    {t.name}
                  </span>
                  <span class="block truncate text-xs text-neutral">{t.artist}</span>
                </span>
                {#if t.nowPlaying}
                  <IconPlaying class="size-5 shrink-0 text-[#B8DB80]" aria-label="Playing now" />
                {/if}
              </a>
            </li>
          {/each}
        </ol>
        <div>
          <p class="mb-3 text-sm text-white/50">Top artists this month</p>
          <ul class="space-y-2">
            {#each listening.topArtists as a}
              <li class="relative overflow-hidden rounded-md">
                <span class="absolute inset-y-0 left-0 bg-primary/35" style={`width: ${(a.plays / maxPlays) * 100}%`}
                ></span>
                <a href={a.link} target="_blank" class="relative flex justify-between px-3 py-1.5 text-sm text-white">
                  <span>{a.name}</span>
                  <span class="text-neutral tabular-nums">{a.plays} plays</span>
                </a>
              </li>
            {/each}
          </ul>
        </div>
      </div>
    {/if}
  </div>

  <div class="mt-16">
    <div class="mb-5 flex items-baseline justify-between">
      <h3 class="flex items-center gap-2 font-serif text-2xl font-semibold text-white">
        <IconSteam class="size-6 text-[#B8DB80]" /> Most Played
      </h3>
      <a
        href={`https://steamcommunity.com/profiles/${steamId}`}
        target="_blank"
        class="text-sm text-neutral after:relative after:bottom-[-4px] after:content-[url(/external.svg)] hover:text-primary"
      >
        Steam
      </a>
    </div>
    {#if gaming.games.length}
      <ul class="grid grid-cols-3 gap-3 sm:grid-cols-5">
        {#each gaming.games as g, i}
          <li class={mobileHide(i)}>
            <a href={g.link} target="_blank" class="group block" title={g.name}>
              <img
                src={g.cover}
                alt={`${g.name} cover`}
                loading="lazy"
                class="aspect-[2/3] w-full rounded-lg border border-neutral/20 object-cover transition-all group-hover:ring-2 group-hover:ring-[#B8DB80]"
              />
              <span class="mt-1.5 flex items-center justify-between text-xs">
                <span class="text-[#B8DB80] tabular-nums">{g.hours.toLocaleString("en-US")} hrs</span>
                <span class="flex items-center gap-1 text-neutral">
                  {#if g.recent}<IconController class="size-3.5 text-[#B8DB80]" />{/if}
                  {#if g.lastPlayed}{watchedOn(g.lastPlayed)}{/if}
                </span>
              </span>
            </a>
          </li>
        {/each}
      </ul>
    {:else}
      <p class="rounded-2xl border border-neutral/20 p-5 text-neutral">
        {gaming.missingKey
          ? "Games appear here once STEAM_API_KEY is set in .env."
          : "Steam didn't respond. Try refreshing in a minute."}
      </p>
    {/if}
  </div>

  <ul class="mt-12 flex flex-wrap gap-x-6 gap-y-2 border-t border-neutral/20 pt-5 text-xs text-neutral">
    <li class="flex items-center gap-1.5"><span class="text-[#B8DB80]">★★★½</span> My rating</li>
    <li class="flex items-center gap-1.5"><IconRewatch class="size-3.5" /> Rewatch</li>
    <li class="flex items-center gap-1.5">
      <IconPlaying class="size-4 text-[#B8DB80]" /> Playing right now
    </li>
    <li class="flex items-center gap-1.5">
      <IconController class="size-3.5 text-[#B8DB80]" /> Played in the last 2 weeks
    </li>
  </ul>
</Section>
