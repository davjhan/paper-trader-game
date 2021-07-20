# About

This is a starter template for davjhan.com sveltekit projects.

This template uses

- Sveltekit
- TailwindCSS

# Setup Checklist

1. Update the project name in `package.json`
2. Update the page title in index.html
3. Do `yalc link davjhan-core` then `yalc update` to link davjhan-core common resources.
3. `npx npm-check-updates -u` to upgrade dependencies to latest.

# Running

### Dev server
```bash
npm run dev
```

### Deploy
```bash
npm run deploy
```

# Gameplay

Players can create a single player game, or host a room to play with other people.
When the game starts, the stock price will move up an down. The player can press buy (all) or sell (all) stock at any 
given tick. After 60 seconds, you will see a score of how much money you ended up with.