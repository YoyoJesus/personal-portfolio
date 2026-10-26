<script lang="ts">
  import IconLetterboxd from "~icons/simple-icons/letterboxd";
  import IconLastfm from "~icons/simple-icons/lastdotfm";
  import IconSteam from "~icons/simple-icons/steam";
  import IconHeart from "~icons/ph/heart-fill";
  import IconRewatch from "~icons/ph/arrows-clockwise-bold";
  import IconMusicNote from "~icons/ph/music-note-bold";
  import IconController from "~icons/ph/game-controller-fill";
  import IconPlaying from "~icons/svg-spinners/bars-scale-middle";
  import IconReview from "~icons/ph/chat-text-fill";
  import IconClose from "~icons/ph/x-bold";
  import { fade } from "svelte/transition";
  import Section from "./Section.svelte";
  import type { Film } from "$lib/server/letterboxd";
  import type { Listening } from "$lib/server/lastfm";
  import type { Gaming } from "$lib/server/steam";
  import { hacker } from "$lib/hacker.svelte";

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

  // Index of the film whose review popover is open; spoiler reviews stay blurred until revealed.
  let openReview = $state<number | null>(null);
  let revealed = $state<number | null>(null);

  // Keep popovers on screen: the first column opens rightward, the last leftward, and the phone's middle column centers.
  const mobileSide = ["max-sm:left-0", "max-sm:left-1/2 max-sm:-translate-x-1/2", "max-sm:right-0"];
  const popoverSide = (i: number) => `${mobileSide[i % 3]} ${i % 5 === 0 ? "sm:left-0" : "sm:right-0"}`;
</script>

<!-- composedPath keeps the original ancestors, so clicks on buttons that remove themselves (like the spoiler reveal) still count as inside. -->
<svelte:window
  onclick={(e) => {
    if (!e.composedPath().some((el) => el instanceof Element && el.classList.contains("review-pop"))) openReview = null;
  }}
/>

<Section text={hacker.on ? "$ ps aux --afk" : "When I'm Not Coding"} href="not-coding">
  <div class="mb-16">
    <div class="mb-5 flex items-baseline justify-between">
      <h3 class="flex items-center gap-2 font-serif text-2xl font-semibold text-white">
        <IconLetterboxd class="size-6 text-accent" /> Recently Watched
      </h3>
      <a
        href={`https://letterboxd.com/${letterboxdUser}/`}
        target="_blank"
        class="text-sm text-neutral hover:text-primary"
      >
        View All <span aria-hidden="true">↗</span>
      </a>
    </div>
    {#if films.length}
      <ul class="grid grid-cols-3 gap-3 sm:grid-cols-5">
        {#each films as f, i}
          <li class={["relative", mobileHide(i)]}>
            <a href={f.link} target="_blank" class="group block" title={`${f.title} (${f.year})`}>
              <img
                src={f.poster}
                alt={`${f.title} poster`}
                loading="lazy"
                class="aspect-[2/3] w-full rounded-lg border border-neutral/20 object-cover transition-all group-hover:ring-2 group-hover:ring-accent"
              />
            </a>
            <div class="mt-1.5 flex items-center justify-between text-xs">
              <span class="text-accent">{stars(f.rating)}</span>
              <span class="flex items-center gap-1 text-neutral">
                {#if f.review}
                  <!-- Opens on click and stays open until the X, Escape, or a click elsewhere; anchors to the poster column. -->
                  <!-- svelte-ignore a11y_no_static_element_interactions -->
                  <span class="review-pop inline-flex" onkeydown={(e) => e.key === "Escape" && (openReview = null)}>
                    <button
                      type="button"
                      aria-label={`Read my review of ${f.title}`}
                      aria-expanded={openReview === i}
                      aria-controls="review-{i}"
                      onclick={() => (openReview = openReview === i ? null : i)}
                      class="rounded-sm text-accent transition-transform hover:scale-125 focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-accent"
                    >
                      <IconReview class="size-3.5" />
                    </button>
                    {#if openReview === i}
                      <div
                        id="review-{i}"
                        transition:fade={{ duration: 120 }}
                        class={[
                          "absolute top-full z-20 mt-2 w-72 max-w-[80vw] border p-4 text-left shadow-xl",
                          popoverSide(i),
                          hacker.on
                            ? "border-primary bg-surface font-mono"
                            : "rounded-xl border-edge-strong bg-surface-raised/95 backdrop-blur",
                        ]}
                      >
                        <div class="flex items-start justify-between gap-3">
                          <p class="text-sm font-semibold text-white">
                            {f.title} <span class="font-normal text-neutral">({f.year})</span>
                          </p>
                          <button
                            type="button"
                            aria-label="Close review"
                            onclick={() => (openReview = null)}
                            class="-mt-0.5 -mr-1 shrink-0 rounded p-1 text-neutral transition-colors hover:text-white focus-visible:outline-2 focus-visible:outline-accent"
                          >
                            <IconClose class="size-3.5" />
                          </button>
                        </div>
                        {#if f.rating != null}<p class="mt-0.5 text-xs text-accent">{stars(f.rating)}</p>{/if}
                        <div class="relative mt-2.5">
                          <div
                            class={[
                              "max-h-56 [scrollbar-width:none] space-y-2 overflow-y-auto [mask-image:linear-gradient(to_bottom,black_80%,transparent)] pb-6 text-xs leading-relaxed whitespace-pre-line text-soft [&::-webkit-scrollbar]:hidden",
                              f.spoilers && revealed !== i && "pointer-events-none blur-sm select-none",
                            ]}
                            aria-hidden={f.spoilers && revealed !== i}
                          >
                            {#each f.review as paragraph}<p>{paragraph}</p>{/each}
                          </div>
                          {#if f.spoilers && revealed !== i}
                            <button
                              type="button"
                              onclick={() => (revealed = i)}
                              class="absolute inset-0 m-auto h-fit w-fit rounded-full border border-edge-strong bg-surface px-3 py-1.5 text-xs font-medium text-white transition-colors hover:border-accent hover:text-accent focus-visible:outline-2 focus-visible:outline-accent"
                            >
                              Contains spoilers. Show review
                            </button>
                          {/if}
                        </div>
                        <a
                          href={f.link}
                          target="_blank"
                          class="mt-3 inline-block text-xs text-neutral transition-colors hover:text-accent"
                        >
                          Read on Letterboxd <span aria-hidden="true">↗</span>
                        </a>
                      </div>
                    {/if}
                  </span>
                {/if}
                {#if f.liked}<IconHeart class="size-3 text-primary" />{/if}
                {#if f.rewatch}<IconRewatch class="size-3" />{/if}
                {#if f.watched}{watchedOn(f.watched)}{/if}
              </span>
            </div>
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
        <IconLastfm class="size-6 text-accent" /> Listening Activity
      </h3>
      <a
        href={`https://www.last.fm/user/${lastfmUser}`}
        target="_blank"
        class="text-sm text-neutral hover:text-primary"
      >
        Last.fm <span aria-hidden="true">↗</span>
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
                  <span class="grid size-11 place-items-center rounded-md bg-muted/60 text-neutral">
                    <IconMusicNote class="size-4" />
                  </span>
                {/if}
                <span class="min-w-0 flex-1">
                  <span class="block truncate text-sm font-medium text-white group-hover:text-accent">
                    {t.name}
                  </span>
                  <span class="block truncate text-xs text-neutral">{t.artist}</span>
                </span>
                {#if t.nowPlaying}
                  <IconPlaying class="size-5 shrink-0 text-accent" aria-label="Playing now" />
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
        <IconSteam class="size-6 text-accent" /> Most Played
      </h3>
      <a
        href={`https://steamcommunity.com/profiles/${steamId}`}
        target="_blank"
        class="text-sm text-neutral hover:text-primary"
      >
        Steam <span aria-hidden="true">↗</span>
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
                class="aspect-[2/3] w-full rounded-lg border border-neutral/20 object-cover transition-all group-hover:ring-2 group-hover:ring-accent"
              />
              <span class="mt-1.5 flex items-center justify-between text-xs">
                <span class="text-accent tabular-nums">{g.hours.toLocaleString("en-US")} hrs</span>
                <span class="flex items-center gap-1 text-neutral">
                  {#if g.recent}<IconController class="size-3.5 text-accent" />{/if}
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

  <!-- One row: labels stay short, and narrow screens scroll the row sideways instead of wrapping. -->
  <ul
    class="mt-12 flex [scrollbar-width:none] gap-x-4 overflow-x-auto border-t border-neutral/20 pt-5 text-xs whitespace-nowrap text-neutral sm:justify-between [&::-webkit-scrollbar]:hidden"
  >
    <li class="flex shrink-0 items-center gap-1.5"><span class="text-accent">★★★½</span> My rating</li>
    <li class="flex shrink-0 items-center gap-1.5"><IconReview class="size-3.5 text-accent" /> Review</li>
    <li class="flex shrink-0 items-center gap-1.5"><IconHeart class="size-3.5 text-primary" /> Liked</li>
    <li class="flex shrink-0 items-center gap-1.5"><IconRewatch class="size-3.5" /> Rewatch</li>
    <li class="flex shrink-0 items-center gap-1.5"><IconPlaying class="size-4 text-accent" /> Now playing</li>
    <li class="flex shrink-0 items-center gap-1.5">
      <IconController class="size-3.5 text-accent" /> Played in last 2 weeks
    </li>
  </ul>
</Section>
