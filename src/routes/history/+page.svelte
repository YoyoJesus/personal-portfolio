<script lang="ts">
  import { SITE_CONTENT } from "$lib/config";
  import SiteHistory from "$lib/components/SiteHistory.svelte";
</script>

<div class="content-column pt-16">
  <SiteHistory versions={SITE_CONTENT.history} />
</div>
