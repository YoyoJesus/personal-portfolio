<script lang="ts">
  let { icon }: { icon: string } = $props();
</script>

{#if icon.startsWith("http://") || icon.startsWith("https://")}
  <img src={icon} alt="" loading="lazy" decoding="async" />
{:else}
  <i class={icon} aria-hidden="true"></i>
{/if}
