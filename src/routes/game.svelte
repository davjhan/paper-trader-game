<script context="module">
    export const prerender = true
</script>
<script lang="ts">
	import PlayerHudView from '../components/PlayerHudView.svelte'
	import StockGraphView from '../components/StockGraphView.svelte'
	import StockActionBarView from '../components/StockActionBarView.svelte'
	import { onDestroy, onMount } from 'svelte'
	import { cubicOut } from 'svelte/easing'
	import { BeanCoinGame } from '../logic/game'
	import { writable } from 'svelte/store'

	const gameState = BeanCoinGame.newGame('David', g => game.set(g))
	const game = writable(gameState)
	const gameLoop = BeanCoinGame.startGame(gameState)

	onDestroy(() => clearInterval(gameLoop))

</script>
<main class='p-4 flex flex-col '>
    <PlayerHudView {game}/>
    <hr/>
    <StockGraphView {game}/>
    <StockActionBarView {game}/>
</main>