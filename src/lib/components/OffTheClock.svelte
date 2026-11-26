<script lang="ts">
  import LinkIcon from "$lib/icons/LinkIcon.svelte";
  import IconLetterboxd from "~icons/simple-icons/letterboxd";
  import IconLastfm from "~icons/simple-icons/lastdotfm";
  import IconSteam from "~icons/simple-icons/steam";
  import IconXbox from "~icons/simple-icons/xbox";
  import IconHeart from "~icons/ph/heart-fill";
  import IconRewatch from "~icons/ph/arrows-clockwise-bold";
  import IconMusicNote from "~icons/ph/music-note-bold";
  import IconController from "~icons/ph/game-controller-fill";
  import IconPlaying from "~icons/svg-spinners/bars-scale-middle";
  import IconReview from "~icons/ph/chat-text-fill";
  import IconClose from "~icons/ph/x-bold";
  import IconCards from "~icons/ph/cards-three-fill";
  import { fade } from "svelte/transition";
  import Section from "./Section.svelte";
  import type { FavoriteFilm, Film } from "$lib/server/letterboxd";
  import type { Listening } from "$lib/server/lastfm";
  import type { Game, Gaming } from "$lib/server/steam";
  import type { CommanderDeck } from "$lib/server/archidekt";
  import type { FavoriteGame } from "$lib/types";
  import { hacker } from "$lib/hacker.svelte";

  interface Props {
    films: Film[];
    favoriteFilms: FavoriteFilm[];
    listening: Listening;
    letterboxdUser: string;
    lastfmUser: string;
    gaming: Gaming;
    steamId: string;
    xboxGames: Game[];
    xboxGamertag: string;
    favoriteGames: FavoriteGame[];
    decks: CommanderDeck[];
    archidektUser: string;
  }

  let { films, favoriteFilms, listening, letterboxdUser, lastfmUser, gaming, steamId, xboxGames, xboxGamertag, favoriteGames, decks, archidektUser }: Props = $props();

  const watchedOn = (d: string) =>
    new Date(`${d}T12:00:00`).toLocaleDateString("en-US", { month: "short", day: "numeric" });
  const stars = (rating: number | null) =>
    rating == null ? "" : "★".repeat(Math.floor(rating)) + (rating % 1 ? "½" : "");

  // Recently played games lead, then the most hours across both platforms.
  const rotation = $derived(
    [
      ...gaming.games.map((g) => ({ ...g, platform: "Steam" })),
      ...xboxGames.map((g) => ({ ...g, platform: "Xbox" })),
    ]
      .sort((a, b) => Number(b.recent) - Number(a.recent) || b.hours - a.hours)
      .slice(0, 5),
  );

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

<Section text={hacker.on ? "$ ps aux --afk" : "When I'm Not Coding"} href="not-coding" compactEnd>
  <div class="media-journal">
  <div class="activity-section film-journal">
    <p class="media-label">Movies</p>
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
              <span
                class="tip tip-start text-accent"
                role="img"
                aria-label={f.rating == null ? "Not rated" : `My rating: ${f.rating} out of 5`}
                data-tip={f.rating == null ? "Not rated" : `My rating: ${f.rating} / 5`}>{f.rating == null ? "NR" : stars(f.rating)}</span
              >
              <span class="film-signals">
                {#if f.review}
                  <button
                    type="button"
                    aria-label={`Read my review of ${f.title}`}
                    aria-expanded={openReview === i}
                    aria-controls="review-{i}"
                    onclick={() => toggleReview(i)}
                    data-tip="Read my review"
                    class="review-pop tip rounded-sm text-accent transition-transform hover:scale-125 focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-accent max-sm:hidden"
                  >
                    <IconReview class="size-3.5" />
                  </button>
                {/if}
                {#if f.liked}<span class="tip" role="img" aria-label="Liked" data-tip="Liked"><IconHeart class="size-3 text-primary" /></span>{/if}
                {#if f.rewatch}<span class="tip" role="img" aria-label="Rewatch" data-tip="Rewatch"><IconRewatch class="size-3" /></span>{/if}
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
    {#if favoriteFilms.length}
      <div class="top-four">
        <h4 class="top-four-title">{hacker.on ? "$ head -4 favorites" : "Top Four Movies"}</h4>
        <ol class="top-four-shelf">
          {#each favoriteFilms as f}
            <li class="film-entry">
              <a href={f.link} target="_blank" rel="noopener noreferrer" class="group block" title={f.year ? `${f.title} (${f.year})` : f.title}>
                <img
                  src={f.poster}
                  alt={`${f.title} poster`}
                  loading="lazy"
                  width="600"
                  height="900"
                  class="aspect-[2/3] w-full rounded-lg border border-neutral/20 object-cover transition-all group-hover:ring-2 group-hover:ring-accent"
                />
              </a>
              <p class="film-name">{f.title}{#if f.year}{" "}<span class="film-year">({f.year})</span>{/if}</p>
            </li>
          {/each}
        </ol>
      </div>
    {/if}
  </div>

  <div class="activity-section games-journal">
    <p class="media-label">Games</p>
    <div class="activity-heading">
      <h3 class="activity-title">
        <IconController class="size-6 text-accent" /> Games in the <span>rotation</span>
      </h3>
      <span class="flex gap-4 text-sm text-neutral">
        <a href={`https://steamcommunity.com/profiles/${steamId}`} target="_blank" rel="noopener noreferrer" class="inline-flex items-center gap-1.5 hover:text-primary">
          <IconSteam class="size-3.5" /> Steam <span aria-hidden="true"><LinkIcon /></span>
        </a>
        <a href={`https://www.xbox.com/en-US/play/user/${encodeURIComponent(xboxGamertag)}`} target="_blank" rel="noopener noreferrer" class="inline-flex items-center gap-1.5 hover:text-primary">
          <IconXbox class="size-3.5" /> Xbox <span aria-hidden="true"><LinkIcon /></span>
        </a>
      </span>
    </div>
    {#if rotation.length}
      <ul class="film-shelf">
        {#each rotation as g}
          <li class="film-entry">
            <a href={g.link} target="_blank" rel="noopener noreferrer" class="group block" title={g.name}>
              <img
                src={g.cover}
                alt={`${g.name} cover`}
                loading="lazy"
                class="aspect-[2/3] w-full rounded-lg border border-neutral/20 object-cover transition-all group-hover:ring-2 group-hover:ring-accent"
              />
            </a>
            <p class="film-name" title={g.name}>{g.name}</p>
            <div class="film-rating">
              <span class="text-accent tabular-nums">{g.hours.toLocaleString("en-US")} hrs</span>
              <span class="film-signals">
                {#if g.recent}<span class="tip" role="img" aria-label="Played in the last 2 weeks" data-tip="Played in the last 2 weeks"><IconController class="size-3 text-accent" /></span>{/if}
              </span>
              <span class="film-watched">{g.platform}</span>
            </div>
          </li>
        {/each}
      </ul>
    {:else}
      <p class="text-sm text-neutral">
        {gaming.missingKey && !xboxGames.length
          ? "Games appear here once STEAM_API_KEY is set in .env."
          : "Steam and Xbox didn't respond. Try refreshing in a minute."}
      </p>
    {/if}
    {#if favoriteGames.length}
      <div class="top-four">
        <h4 class="top-four-title">{hacker.on ? "$ sort -r favorites" : "All-time favorite games"}</h4>
        <ol class="favorite-shelf">
          {#each favoriteGames as g, i}
            <li>
              <a href={g.href} target="_blank" rel="noopener noreferrer" class="group block" title={g.name}>
                <span class="favorite-rank" aria-hidden="true">{hacker.on ? `[${i + 1}]` : String(i + 1).padStart(2, "0")}</span>
                <img
                  src={g.cover}
                  alt={`${g.name} cover`}
                  loading="lazy"
                  width="400"
                  height="600"
                  class="aspect-[2/3] w-full rounded-lg border border-neutral/20 object-cover transition-all group-hover:ring-2 group-hover:ring-accent"
                />
                <p class="favorite-name">{g.name}</p>
                <p class="favorite-meta">{g.year} · {g.platform}</p>
              </a>
            </li>
          {/each}
        </ol>
      </div>
    {/if}
  </div>
  </div>
  <div class="activity-section music-journal">
    <p class="media-label">Music</p>
    <div class="activity-heading">
      <h3 class="activity-title"><IconLastfm class="size-6 text-accent" /> Listening <span>lately</span></h3>
      <a href={`https://www.last.fm/user/${lastfmUser}`} target="_blank" rel="noopener noreferrer" class="text-sm text-neutral hover:text-primary">Last.fm <span aria-hidden="true"><LinkIcon /></span></a>
    </div>
    {#if listening.recent.length}
      <ul class="album-gallery" aria-label="Recently played tracks">
        {#each listening.recent as track}
          <li>
            <a href={track.link} target="_blank" rel="noopener noreferrer" class="album-link group">
              {#if track.art}<img src={track.art} alt="" loading="lazy" width="220" height="220" class="border border-neutral/20 transition-all group-hover:ring-2 group-hover:ring-accent" />{:else}<span class="album-fallback border border-neutral/20 transition-all group-hover:ring-2 group-hover:ring-accent"><IconMusicNote /></span>{/if}
              <h4 title={track.name}>{track.name.split(" (")[0]}</h4><p>{track.artist}</p>
              {#if track.nowPlaying}<span class="playing"><IconPlaying /> Playing now</span>{/if}
            </a>
          </li>
        {/each}
      </ul>
      {#if listening.topArtists.length}
        <div class="artist-line"><p>Top artists this month</p><ul>{#each listening.topArtists as artist}<li><a href={artist.link} target="_blank" rel="noopener noreferrer" title={`${artist.plays} plays`}>{#if artist.art}<img src={artist.art} alt="" loading="lazy" width="48" height="48" onerror={(event) => { event.currentTarget.setAttribute("hidden", ""); }} />{/if}<span>{artist.name}</span></a></li>{/each}</ul></div>
      {/if}
    {:else}<p class="text-neutral">Recent listening is unavailable. Try again in a minute or visit Last.fm.</p>{/if}
  </div>
  <div class="activity-section deck-journal">
    <p class="media-label">Magic: The Gathering</p>
    <div class="activity-heading">
      <h3 class="activity-title"><IconCards class="size-6 text-accent" /> Commander <span>decks</span></h3>
      <a href={`https://archidekt.com/u/${archidektUser}`} target="_blank" rel="noopener noreferrer" class="text-sm text-neutral hover:text-primary">Archidekt <span aria-hidden="true"><LinkIcon /></span></a>
    </div>
    {#if decks.length}
      <ul class="deck-list">
        {#each decks as deck}
          <li class="deck">
            <div class="deck-heading">
              <a href={deck.link} target="_blank" rel="noopener noreferrer" class="deck-name">{deck.name}</a>
              <span class="deck-meta">
                <span class="pips" role="img" aria-label={`Colors: ${deck.colors.join("") || "colorless"}`}>
                  {#each deck.colors as c}<span class="pip pip-{c}" aria-hidden="true">{c}</span>{/each}
                </span>
                {deck.size} cards
              </span>
            </div>
            <div class="deck-cards">
              {#each deck.commanders as card}
                <img src={card.image} alt={card.name} title={card.name} loading="lazy" width="488" height="680" class="mtg-card commander" />
              {/each}
              {#each deck.showcase as card}
                <img src={card.image} alt={card.name} title={card.name} loading="lazy" width="488" height="680" class="mtg-card" />
              {/each}
            </div>
          </li>
        {/each}
      </ul>
    {:else}<p class="text-neutral">Archidekt didn't respond. Try refreshing in a minute.</p>{/if}
  </div>

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
  .top-four { margin-top: 2rem; padding-top: 1.5rem; border-top: 1px solid var(--color-edge); }
  .top-four-title { margin-bottom: 1rem; color: var(--color-neutral); font-size: 0.85rem; }
  .top-four-shelf { display: grid; grid-template-columns: repeat(2, minmax(0, 1fr)); gap: 1.5rem 0.75rem; }
  .tip { position: relative; }
  span.tip { display: inline-flex; }
  .tip::after { content: attr(data-tip); position: absolute; bottom: calc(100% + 6px); left: 50%; z-index: 30; translate: -50% 2px; padding: 0.3rem 0.5rem; border: 1px solid var(--color-edge-strong); border-radius: 0.375rem; background: var(--color-surface-raised); color: var(--color-white); font-size: 0.7rem; line-height: 1.2; white-space: nowrap; opacity: 0; pointer-events: none; transition: opacity 120ms, translate 120ms; }
  .tip-start::after { left: 0; translate: 0 2px; }
  .tip:hover::after, .tip:focus-visible::after { opacity: 1; translate: -50% 0; }
  .tip-start:hover::after, .tip-start:focus-visible::after { translate: 0 0; }
  :global(html.hacker) .tip::after { border-radius: 0; border-color: var(--color-primary); }
  .film-watched { color: var(--color-neutral); font-variant-numeric: tabular-nums; }
  .favorite-shelf { display: grid; grid-auto-flow: column; grid-auto-columns: 42%; gap: 1rem; overflow-x: auto; scroll-snap-type: x mandatory; scrollbar-width: none; padding-top: 0.25rem; }
  .favorite-shelf::-webkit-scrollbar { display: none; }
  .favorite-shelf li { min-width: 0; scroll-snap-align: start; }
  .favorite-rank { display: block; margin-bottom: 0.4rem; color: var(--color-accent); font-family: var(--font-serif); font-size: 1.5rem; font-weight: 650; line-height: 1; letter-spacing: -0.03em; font-variant-numeric: tabular-nums; }
  :global(html.hacker) .favorite-rank { font-size: 1rem; }
  .favorite-name { margin-top: 0.6rem; color: var(--color-white); font-family: var(--font-serif); font-size: 0.9rem; line-height: 1.35; overflow-wrap: anywhere; }
  .favorite-meta { margin-top: 0.2rem; color: var(--color-neutral); font-size: 0.75rem; font-variant-numeric: tabular-nums; }
  .music-journal, .deck-journal { margin-top: 3rem; }
  .deck-list { display: grid; gap: 2.5rem 2rem; }
  .deck-heading { display: flex; flex-wrap: wrap; align-items: baseline; justify-content: space-between; gap: 0.25rem 1rem; margin-bottom: 1rem; }
  .deck-name { color: var(--color-white); font-family: var(--font-serif); font-size: 1.15rem; font-weight: 600; line-height: 1.3; }
  .deck-name:hover { color: var(--color-accent); }
  .deck-meta { display: inline-flex; align-items: center; gap: 0.6rem; color: var(--color-neutral); font-size: 0.8rem; font-variant-numeric: tabular-nums; }
  .pips { display: inline-flex; gap: 0.2rem; }
  .pip { display: grid; place-items: center; width: 1.1rem; height: 1.1rem; border-radius: 50%; font-size: 0.6rem; font-weight: 700; line-height: 1; }
  .pip-W { background: #f8f6d8; color: #3b3a2c; }
  .pip-U { background: #c1d7e9; color: #0e3a5c; }
  .pip-B { background: #bab1ab; color: #1c1714; }
  .pip-R { background: #e49977; color: #5a1a0c; }
  .pip-G { background: #a3c095; color: #173a22; }
  :global(html.hacker) .pip { border-radius: 0; }
  .deck-cards { display: grid; grid-template-columns: repeat(3, minmax(0, 1fr)); gap: 0.75rem; }
  .mtg-card { width: 100%; height: auto; aspect-ratio: 488 / 680; border-radius: 4.75% / 3.5%; background: var(--color-surface); box-shadow: 0 0 0 1px var(--color-edge); transition: transform 400ms var(--ease-out-expo); }
  .mtg-card:hover { transform: translateY(-3px); }
  .mtg-card.commander { box-shadow: 0 0 0 2px var(--color-accent); }
  .media-label { display: flex; align-items: center; gap: 0.9rem; margin-bottom: 1.1rem; color: var(--color-accent); font-size: 0.72rem; font-weight: 500; letter-spacing: 0.18em; text-transform: uppercase; }
  .media-label::after { content: ""; flex: 1; height: 1px; background: var(--color-edge-strong); }
  .album-gallery { display: grid; grid-template-columns: repeat(2, minmax(0, 1fr)); gap: 1.5rem 1rem; }
  .album-gallery li { min-width: 0; }
  .album-link { display: block; }
  .album-link img, .album-fallback { display: grid; place-items: center; width: 100%; height: auto; aspect-ratio: 1; object-fit: cover; border-radius: 0.5rem; margin-bottom: 0.8rem; background: var(--color-surface); }
  .album-link h4 { font-size: 1rem; line-height: 1.3; color: var(--color-white); font-weight: 550; overflow-wrap: anywhere; }
  .album-link p { margin-top: 0.3rem; color: var(--color-neutral); font-size: 0.85rem; }
  .playing { display: inline-flex; align-items: center; gap: 0.4rem; color: var(--color-accent); font-size: 0.75rem; margin-top: 0.4rem; }
  .playing :global(svg) { width: 1rem; height: 1rem; }
  .artist-line { display: flex; flex-wrap: wrap; gap: 1rem 1.5rem; align-items: center; margin-top: 1.75rem; padding-top: 1.25rem; border-top: 1px solid var(--color-edge); font-size: 0.85rem; }
  .artist-line p { color: var(--color-neutral); }
  .artist-line ul { display: flex; flex-wrap: wrap; gap: 0.75rem 1.5rem; }
  .artist-line a { display: flex; align-items: center; gap: 0.65rem; }
  .artist-line img { width: 3rem; height: 3rem; border-radius: 50%; object-fit: cover; }
  .artist-line a:hover { color: var(--color-accent); }
  :global(#not-coding .group img) { transition: transform 400ms var(--ease-out-expo); }
  :global(#not-coding .group:hover img) { transform: translateY(-3px); }
  @media (min-width: 640px) { .deck-cards { grid-template-columns: repeat(6, minmax(0, 1fr)); } .film-shelf, .album-gallery { grid-template-columns: repeat(5, minmax(0, 1fr)); } .top-four-shelf { grid-template-columns: repeat(4, minmax(0, 1fr)); } .favorite-shelf { grid-auto-flow: row; grid-template-columns: repeat(5, minmax(0, 1fr)); overflow: visible; } }
  @media (min-width: 1100px) { .media-journal, .deck-list { grid-template-columns: repeat(2, minmax(0, 1fr)); } .deck-cards { grid-template-columns: repeat(3, minmax(0, 1fr)); } .games-journal { border-left: 1px solid var(--color-edge); padding-left: 2rem; } }
</style>
