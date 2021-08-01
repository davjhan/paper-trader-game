# Paper Trader Game

![Banner](static/paper-trader-game%20cover.png?raw=true)

Made by : **David Han @davjhan** (https://davjhan.com/)

### [Play the game on your browser](https://paper-trader.davjhan.com/)
(https://paper-trader.davjhan.com/)
## Built with
- [Svelte Kit](https://kit.svelte.dev/)
- [Tailwind CSS (JIT)](https://tailwindcss.com/) (CSS framework)
- [Netlify](https://www.netlify.com/) (Hosting)
- [Chart.js](https://www.chartjs.org/docs/latest/) (Charting library)
- [Plausible analytics](https://plausible.io/) (cookie-less Analytics)

Generates a static site that is hosted on Netlify.

## Get Started

⚠️ This repo will not build out of the box. It has a dependency on [davjhan-core](https://github.com/davjhan/davjhan-core)
which is not published on npm. If you want to build this project, follow the steps in that package's README.

`davjhan-core` includes common tailwind styles, css, and components (e.g. Navbar) that will be reused between david
games. I use `yalc link davjhan-core` on my local machine so that it builds.

### Run the dev server
```bash
npm run dev
```

### Build and preview
```bash
npm run build
```
```bash
npm run preview
```
### Deploy to Netlify
```bash
npm run deploy
```
