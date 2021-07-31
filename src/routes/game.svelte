<script context="module">
    export const prerender = true
</script>
<script lang="ts">
	import GameOverView from '../components/GameOverView.svelte'
	import PlayerHudView from '../components/PlayerHudView.svelte'
	import StockGraphView from '../components/StockGraphView.svelte'
	import StockActionBarView from '../components/StockActionBarView.svelte'
	import { onDestroy, onMount } from 'svelte'
	import { PaperTradingGame, PaperTradingUtils } from '../logic/game'
	import { writable } from 'svelte/store'

	$: holdsPosition = $game.player.shares > 0
	$: isGameOver = $game.tick === $game.priceData.length - 1
	const gameState = PaperTradingGame.newGame('Malone, Kevin', g => game.set(g))
	const game = writable(gameState)
	const gameLoop = PaperTradingGame.startGame(gameState)

	onDestroy(() => clearInterval(gameLoop))
</script>

<main class='p-4 flex flex-col '>
    <div class="sticky">
        <PlayerHudView {game}/>
        <hr/>
    </div>
    {#if isGameOver}
        <GameOverView  class='my-4 self-center'
                       score={PaperTradingUtils.playerAccountValue($game.player, $game.priceData[$game.tick])}/>
    {/if}
    <div class:opacity-50={isGameOver}>
        <StockGraphView {holdsPosition} tick={$game.tick} priceData={$game.priceData} class='mt-4'/>
        <StockActionBarView {game}/>
    </div>
</main>