<script lang="ts">
  import Section from "./Section.svelte";
  import type { CertificationProps } from "$lib/types";
  import { hacker } from "$lib/hacker.svelte";
  import IconArrow from "~icons/ph/arrow-up-right";
  let { certifications }: { certifications: CertificationProps[] } = $props();

  const groups = $derived.by(() => {
    const byIssuer = new Map<string, CertificationProps[]>();
    for (const cert of certifications) byIssuer.set(cert.issuer, [...(byIssuer.get(cert.issuer) ?? []), cert]);
    return [...byIssuer].map(([issuer, certs]) => ({ issuer, certs }));
  });
</script>

<Section text={hacker.on ? "$ ls certs/" : "Certifications"} href="certifications">
  {#each groups as { issuer, certs }}
    <div class="issuer">
      <h3>{issuer}</h3>
      <ul>
        {#each certs as cert}
          <li class="cert" class:has-badge={cert.badge}>
            {#if cert.badge}
              <img
                class="badge"
                class:tile={cert.badgeTile}
                style:background={cert.badgeTile}
                src={cert.badge}
                alt=""
                width="72"
                height="72"
                loading="lazy"
              />
            {/if}
            <h4>{cert.name}</h4>
            <p class="dates">
              {cert.issued}{#if cert.expires}<span class="expires">Expires {cert.expires}</span>{/if}
            </p>
            {#if cert.summary}<p class="summary">{cert.summary}</p>{/if}
            {#if cert.credentialId || cert.credentialUrl}
              <p class="credential">
                {#if cert.credentialId}<span>ID <code>{cert.credentialId}</code></span>{/if}
                {#if cert.credentialUrl}
                  <a href={cert.credentialUrl} target="_blank" rel="noopener noreferrer">
                    Verify<span class="sr-only"> {cert.name}</span>
                    <IconArrow aria-hidden="true" />
                  </a>
                {/if}
              </p>
            {/if}
          </li>
        {/each}
      </ul>
    </div>
  {/each}
</Section>

<style>
  .issuer {
    display: grid;
    gap: 1rem;
    padding-block: 2rem;
    border-top: 1px solid var(--color-edge);
  }
  .issuer:first-of-type {
    border-top: 0;
    padding-top: 0;
  }
  .issuer:last-of-type {
    padding-bottom: 0;
  }
  h3 {
    color: var(--color-volt-soft);
    font-size: 0.85rem;
    font-weight: 600;
    letter-spacing: 0.08em;
    text-transform: uppercase;
  }
  ul {
    display: grid;
    gap: 1.75rem;
  }
  .cert {
    display: grid;
    grid-template-columns: minmax(0, 1fr);
    grid-template-rows: repeat(4, auto) 1fr;
    column-gap: 1.25rem;
    align-items: start;
  }
  .cert > :not(.badge) {
    grid-column: -2;
  }
  .has-badge {
    grid-template-columns: 4.5rem minmax(0, 1fr);
  }
  .badge {
    grid-row: 1 / span 5;
    width: 4.5rem;
    height: 4.5rem;
    border-radius: 0.6rem;
  }
  .tile {
    padding: 0.5rem;
    object-fit: contain;
  }
  h4 {
    font-family: var(--font-serif);
    font-size: clamp(1.25rem, 2.6vw, 1.5rem);
    font-weight: 600;
    letter-spacing: -0.02em;
    line-height: 1.25;
    color: var(--color-white);
  }
  .dates {
    margin-top: 0.25rem;
    color: var(--color-neutral);
    font-size: 0.875rem;
    font-variant-numeric: tabular-nums;
    white-space: nowrap;
  }
  .expires {
    display: block;
    color: var(--color-muted);
  }
  .summary {
    max-width: 62ch;
    margin-top: 0.5rem;
    color: var(--color-neutral);
    line-height: 1.65;
  }
  .credential {
    display: flex;
    flex-wrap: wrap;
    align-items: baseline;
    gap: 0.25rem 1.25rem;
    margin-top: 0.5rem;
    color: var(--color-muted);
    font-size: 0.8rem;
  }
  code {
    font-family: ui-monospace, monospace;
    color: var(--color-soft);
  }
  a {
    display: inline-flex;
    align-items: center;
    gap: 0.2rem;
    color: var(--color-primary);
    font-size: 0.85rem;
    text-underline-offset: 0.2em;
  }
  a:hover {
    text-decoration: underline;
  }
  @media (min-width: 768px) {
    .cert {
      grid-template-columns: minmax(0, 1fr) 8.5rem;
    }
    .has-badge {
      grid-template-columns: 4.5rem minmax(0, 1fr) 8.5rem;
    }
    .cert > :not(.badge, .dates) {
      grid-column: -3;
    }
    .dates {
      grid-column: -2;
      grid-row: 1 / span 5;
      margin-top: 0;
      padding-top: 0.3rem;
      text-align: right;
    }
    .issuer {
      grid-template-columns: 11rem minmax(0, 1fr);
      gap: 2.5rem;
    }
    h3 {
      padding-top: 0.45rem;
    }
  }
</style>
