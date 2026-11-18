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
          <li class:has-badge={cert.badge}>
            {#if cert.badge}<img class="badge" src={cert.badge} alt="" width="72" height="72" loading="lazy" />{/if}
            <div>
              <div class="title-row">
                <h4>{cert.name}</h4>
                <p class="dates">
                  {cert.issued}{#if cert.expires}<span class="expires">, expires {cert.expires}</span>{/if}
                </p>
              </div>
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
            </div>
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
  .has-badge {
    display: grid;
    grid-template-columns: 4.5rem minmax(0, 1fr);
    gap: 1.25rem;
    align-items: start;
  }
  .badge {
    width: 4.5rem;
    height: 4.5rem;
    border-radius: 0.6rem;
  }
  .title-row {
    display: flex;
    flex-wrap: wrap;
    align-items: baseline;
    justify-content: space-between;
    gap: 0.25rem 1.5rem;
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
    color: var(--color-neutral);
    font-size: 0.875rem;
    font-variant-numeric: tabular-nums;
    white-space: nowrap;
  }
  .expires {
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
    .issuer {
      grid-template-columns: 11rem minmax(0, 1fr);
      gap: 2.5rem;
    }
    h3 {
      padding-top: 0.45rem;
    }
  }
</style>
