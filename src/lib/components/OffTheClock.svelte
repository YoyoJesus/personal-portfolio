<script lang="ts">
  import LinkIcon from "$lib/icons/LinkIcon.svelte";
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

  const watchedOn = (d: string) =>
    new Date(`${d}T12:00:00`).toLocaleDateString("en-US", { month: "short", day: "numeric" });
  const stars = (rating: number | null) =>
    rating == null ? "" : "★".repeat(Math.floor(rating)) + (rating % 1 ? "½" : "");

  // Index of the film whose review popover is open; spoiler reviews stay blurred until revealed.
  let openReview = $state<number | null>(null);
  let revealed = $state<number | null>(null);
  const toggleReview = (i: number) => (openReview = openReview === i ? null : i);

  // Keep popovers on screen: the first column opens rightward, the last leftward, and the phone's middle column centers.
  const mobileSide = (i: number) => i === 0 || i % 2 === 1 ? "max-sm:left-0" : "max-sm:right-0";
  const popoverSide = (i: number) => `${mobileSide(i)} ${i % 5 === 0 ? "sm:left-0" : "sm:right-0"}`;
</script>

<!-- composedPath keeps the original ancestors, so clicks on buttons that remove themselves (like the spoiler reveal) still count as inside. -->
<svelte:window
  onclick={(e) => {
    if (!e.composedPath().some((el) => el instanceof Element && el.classList.contains("review-pop"))) openReview = null;
  }}
  onkeydown={(e) => e.key === "Escape" && (openReview = null)}
/>

<Section text={hacker.on ? "$ ps aux --afk" : "When I'm Not Coding"} href="not-coding">
  <div class="media-journal">
  <div class="activity-section film-journal">
    <div class="activity-heading">
      <h3 class="activity-title">
        <IconLetterboxd class="size-6 text-accent" /> Watched <span>recently</span>
      </h3>
      <a
        href={`https://letterboxd.com/${letterboxdUser}/`}
        target="_blank"
        class="text-sm text-neutral hover:text-primary"
      >
        View All <span aria-hidden="true"><LinkIcon /></span>
      </a>
    </div>
    {#if films.length}
      <ul class="film-shelf">
        {#each films as f, i}
          <li class="film-entry relative">
            <a href={f.link} target="_blank" class="group block" title={f.year ? `${f.title} (${f.year})` : f.title}>
              <img
                src={f.poster}
                alt={`${f.title} poster`}
                loading="lazy"
                class="aspect-[2/3] w-full rounded-lg border border-neutral/20 object-cover transition-all group-hover:ring-2 group-hover:ring-accent"
              />
            </a>
            <p class="film-name" title={f.year ? `${f.title} (${f.year})` : f.title}>{f.title}{#if f.year}{" "}<span class="film-year">({f.year})</span>{/if}</p>
            <div class="film-rating">
              <span class="text-accent" aria-label={f.rating == null ? "Not rated" : `${f.rating} out of 5 stars`}>{f.rating == null ? "NR" : stars(f.rating)}</span>
              <span class="film-signals">
                {#if f.review}
                  <button
                    type="button"
                    aria-label={`Read my review of ${f.title}`}
                    aria-expanded={openReview === i}
                    aria-controls="review-{i}"
                    onclick={() => toggleReview(i)}
                    class="review-pop rounded-sm text-accent transition-transform hover:scale-125 focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-accent max-sm:hidden"
                  >
                    <IconReview class="size-3.5" />
                  </button>
                {/if}
                {#if f.liked}<IconHeart class="size-3 text-primary" />{/if}
                {#if f.rewatch}<IconRewatch class="size-3" />{/if}
              </span>
              <span class="film-watched">{#if f.watched}<time datetime={f.watched}>{watchedOn(f.watched)}</time>{/if}</span>
            </div>
            {#if f.review}
              <!-- Phones get a full-width button; the info row is too narrow for the inline icon. -->
              <button
                type="button"
                aria-label={`Read my review of ${f.title}`}
                aria-expanded={openReview === i}
                aria-controls="review-{i}"
                onclick={() => toggleReview(i)}
                class={[
                  "review-pop mt-2 flex w-full items-center justify-center gap-1.5 border py-1 text-xs font-medium text-accent focus-visible:outline-2 focus-visible:outline-accent sm:hidden",
                  hacker.on ? "border-primary/60" : "rounded-md border-edge-strong bg-surface/60",
                  openReview === i && "border-accent",
                ]}
              >
                <IconReview class="size-3.5" /> Review
              </button>
              {#if openReview === i}
                <div class="review-pop contents">
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
                        {f.title}{#if f.year} <span class="font-normal text-neutral">({f.year})</span>{/if}
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
                      Read on Letterboxd <span aria-hidden="true"><LinkIcon /></span>
                    </a>
                  </div>
                </div>
              {/if}
            {/if}
          </li>
        {/each}
      </ul>
    {:else}
      <p class="text-neutral">The Letterboxd feed didn't load. Try refreshing in a minute.</p>
    {/if}
  </div>

  <div class="activity-section games-journal">
    <div class="activity-heading">
      <h3 class="activity-title">
        <IconSteam class="size-6 text-accent" /> Games in the <span>rotation</span>
      </h3>
      <a
        href={`https://steamcommunity.com/profiles/${steamId}`}
        target="_blank"
        class="text-sm text-neutral hover:text-primary"
      >
        Steam <span aria-hidden="true"><LinkIcon /></span>
      </a>
    </div>
    {#if gaming.games.length}
      <ul class="game-shelf">
        {#each gaming.games as g, i}
          <li>
            <a href={g.link} target="_blank" class="game-entry group" title={g.name}>
              <img
                src={g.cover}
                alt={`${g.name} cover`}
                loading="lazy"
                class="aspect-[2/3] w-full rounded-lg border border-neutral/20 object-cover transition-all group-hover:ring-2 group-hover:ring-accent"
              />
              <span class="game-info">
                <strong>{g.name}</strong>
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

  </div>
  <div class="activity-section music-journal">
    <div class="activity-heading">
      <h3 class="activity-title"><IconLastfm class="size-6 text-accent" /> Listening <span>lately</span></h3>
      <a href={`https://www.last.fm/user/${lastfmUser}`} target="_blank" rel="noopener noreferrer" class="text-sm text-neutral hover:text-primary">Last.fm <span aria-hidden="true"><LinkIcon /></span></a>
    </div>
    {#if listening.recent.length}
      <ul class="album-gallery" aria-label="Recently played tracks">
        {#each listening.recent as track}
          <li>
            <a href={track.link} target="_blank" rel="noopener noreferrer" class="album-link group">
              {#if track.art}<img src={track.art} alt="" loading="lazy" width="220" height="220" />{:else}<span class="album-fallback"><IconMusicNote /></span>{/if}
              <h4 title={track.name}>{track.name.split(" (")[0]}</h4><p>{track.artist}</p>
              {#if track.nowPlaying}<span class="playing"><IconPlaying /> Playing now</span>{/if}
            </a>
          </li>
        {/each}
      </ul>
      {#if listening.topArtists.length}
        <div class="artist-line"><p>Top artists this month</p><ul>{#each listening.topArtists as artist}<li><a href={artist.link} target="_blank" rel="noopener noreferrer" title={`${artist.plays} plays`}>{artist.name}</a></li>{/each}</ul></div>
      {/if}
    {:else}<p class="text-neutral">Recent listening is unavailable. Try again in a minute or visit Last.fm.</p>{/if}
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

<style>
  .media-journal { display: grid; gap: 2.5rem; align-items: start; }
  .activity-heading { display: flex; flex-wrap: wrap; align-items: baseline; justify-content: space-between; gap: 0.75rem 1rem; margin-bottom: 1.5rem; }
  .activity-title { display: flex; flex-wrap: wrap; align-items: center; gap: 0.45rem; color: var(--color-white); font-family: var(--font-serif); font-size: clamp(1.7rem, 2.8vw, 2.25rem); line-height: 1.1; font-weight: 650; letter-spacing: -0.03em; }
  .activity-title span { color: var(--color-neutral); font-weight: 400; }
  .film-shelf { display: grid; grid-template-columns: repeat(2, minmax(0, 1fr)); gap: 1.5rem 0.75rem; }
  .film-entry { min-width: 0; }
  .film-name { display: -webkit-box; -webkit-box-orient: vertical; -webkit-line-clamp: 2; line-clamp: 2; overflow: hidden; height: 2.7em; overflow-wrap: anywhere; margin-top: 0.6rem; color: var(--color-white); font-family: var(--font-serif); font-size: 0.9rem; line-height: 1.35; }
  .film-year { color: var(--color-neutral); font-size: 0.7rem; white-space: nowrap; font-variant-numeric: tabular-nums; }
  .film-rating { display: grid; grid-template-columns: auto 1fr auto; align-items: center; gap: 0.1rem; min-height: 1.4rem; margin-top: 0.25rem; font-size: 0.65rem; white-space: nowrap; }
  .film-signals { display: flex; align-items: center; gap: 0.1rem; color: var(--color-neutral); }
  .film-signals :global(svg) { width: 0.7rem; height: 0.7rem; }
  .film-watched { color: var(--color-neutral); font-variant-numeric: tabular-nums; }
  .game-shelf { display: grid; gap: 0.9rem; }
  .game-entry { display: flex; gap: 0.75rem; align-items: center; }
  .game-entry img { width: 1.8rem; height: 2.5rem; border-radius: 0.25rem; flex-shrink: 0; }
  .game-info { display: flex; flex-direction: column; gap: 0.25rem; font-size: 0.75rem; }
  .game-info strong { font-size: 0.95rem; color: var(--color-white); font-weight: 500; }
  .music-journal { border-top: 1px solid var(--color-edge-strong); margin-top: 2rem; padding-top: 2rem; }
  .album-gallery { display: grid; grid-template-columns: repeat(2, minmax(0, 1fr)); gap: 1.5rem 1rem; }
  .album-gallery li { min-width: 0; }
  .album-link { display: block; }
  .album-link img, .album-fallback { display: grid; place-items: center; width: 100%; height: auto; aspect-ratio: 1; object-fit: cover; border-radius: 0.5rem; margin-bottom: 0.8rem; background: var(--color-surface); }
  .album-link h4 { font-size: 1rem; line-height: 1.3; color: var(--color-white); font-weight: 550; overflow-wrap: anywhere; }
  .album-link p { margin-top: 0.3rem; color: var(--color-neutral); font-size: 0.85rem; }
  .playing { display: inline-flex; align-items: center; gap: 0.4rem; color: var(--color-accent); font-size: 0.75rem; margin-top: 0.4rem; }
  .playing :global(svg) { width: 1rem; height: 1rem; }
  .artist-line { display: flex; flex-wrap: wrap; gap: 1rem 1.5rem; align-items: baseline; margin-top: 1.75rem; padding-top: 1.25rem; border-top: 1px solid var(--color-edge); font-size: 0.85rem; }
  .artist-line p { color: var(--color-neutral); }
  .artist-line ul { display: flex; flex-wrap: wrap; gap: 0.75rem 1.5rem; }
  .artist-line a:hover { color: var(--color-accent); }
  :global(#not-coding .group img) { transition: transform 400ms var(--ease-out-expo); }
  :global(#not-coding .group:hover img) { transform: translateY(-3px); }
  @media (min-width: 640px) { .film-shelf, .album-gallery { grid-template-columns: repeat(5, minmax(0, 1fr)); } }
  @media (min-width: 1100px) { .media-journal { grid-template-columns: minmax(0, 1.2fr) minmax(0, 1fr); } .games-journal { border-left: 1px solid var(--color-edge); padding-left: 2rem; } }
</style>
