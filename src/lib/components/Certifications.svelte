<script lang="ts">
  import Section from "./Section.svelte";
  import type { CertificationProps } from "$lib/types";
  import { hacker } from "$lib/hacker.svelte";
  import IconSeal from "~icons/ph/seal-check";
  import IconArrow from "~icons/ph/arrow-up-right";
  let { certifications }: { certifications: CertificationProps[] } = $props();
</script>

<Section text={hacker.on ? "$ ls certs/" : "Certifications"} href="certifications">
  <ul class="cert-list">
    {#each certifications as cert}
      <li class="cert">
        <IconSeal class="seal" aria-hidden="true" />
        <div>
          <p class="meta">
            <span>{cert.issuer}</span>
            <span>{cert.issued}{#if cert.expires}{" "}to {cert.expires}{/if}</span>
          </p>
          <h3>{cert.name}</h3>
          {#if cert.summary}<p class="summary">{cert.summary}</p>{/if}
          {#if cert.credentialId}<p class="credential-id">Credential ID <code>{cert.credentialId}</code></p>{/if}
          {#if cert.credentialUrl}
            <a href={cert.credentialUrl} target="_blank" rel="noopener noreferrer">
              View credential <IconArrow aria-hidden="true" />
            </a>
          {/if}
        </div>
      </li>
    {/each}
  </ul>
</Section>

<style>
  .cert-list { display: grid; gap: 1rem; }
  .cert { display: grid; grid-template-columns: auto minmax(0, 1fr); gap: 1rem; padding: 1.5rem; border: 1px solid var(--color-edge); border-radius: 0.75rem; background: var(--color-surface); }
  .cert :global(.seal) { width: 1.75rem; height: 1.75rem; color: var(--color-primary); }
  .meta { display: flex; flex-wrap: wrap; gap: 0.25rem 1rem; color: var(--color-muted); font-size: 0.85rem; }
  h3 { margin-top: 0.35rem; font-family: var(--font-serif); font-size: clamp(1.3rem, 3vw, 1.6rem); line-height: 1.2; font-weight: 650; color: var(--color-white); }
  .summary { margin-top: 0.6rem; color: var(--color-neutral); font-size: 0.95rem; line-height: 1.55; }
  .credential-id { margin-top: 0.6rem; color: var(--color-muted); font-size: 0.8rem; }
  code { font-family: var(--font-mono, ui-monospace, monospace); color: var(--color-soft); }
  a { display: inline-flex; align-items: center; gap: 0.3rem; margin-top: 0.85rem; color: var(--color-primary); font-size: 0.9rem; }
  @media (min-width: 768px) { .cert-list { grid-template-columns: repeat(2, minmax(0, 1fr)); } }
</style>
