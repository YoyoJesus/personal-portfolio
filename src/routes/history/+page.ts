import type { PageLoad } from "./$types";

export const prerender = true;

export const load: PageLoad = () => ({
  title: "Site History - Austin Sternberg",
  description: "Every major version of Austin Sternberg's website, from a first site to the current one.",
});
