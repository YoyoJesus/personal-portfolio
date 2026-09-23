# Personal Portfolio

Serves to show case my work and experience. Originally based on the astro-zen vercel template, now running on SvelteKit.

The "When I'm Not Coding" section (Letterboxd, Last.fm, Steam) is rendered on each request and cached at Vercel's edge for 60 seconds, so it stays current without redeploying.

## Getting Started

Copy `.env.example` to `.env` and fill in the keys.

| Command           | Action                                      |
| :---------------- | :------------------------------------------ |
| `npm install`     | Installs dependencies                       |
| `npm run dev`     | Starts local dev server at `localhost:5173` |
| `npm run build`   | Builds the production site                  |
| `npm run preview` | Previews the production build locally       |
| `npm run check`   | Type-checks the project                     |
