<script lang="ts">
	import { tweened } from 'svelte/motion'
	import type { Writable } from 'svelte/store'
	import type { BeanCoinGameState } from '../logic/game'
	import { BeanCoinUtils } from '../logic/game'
	import { formatNumber, numberEasingProps } from '../logic/utils'
	import PriceMovementBadge from './PriceMovementBadge.svelte'

	export let game: Writable<BeanCoinGameState>
	let cl
	export { cl as class }
	const animatedPlayerCash = tweened($game.player.cash, numberEasingProps)

	$: playerAccountBalance = BeanCoinUtils.playerAccountValue($game.player, $game.priceData[$game.tick])
	let lastPlayerAccountBalance = $game.player.cash
	let deltaPlayerAccountBalance = 0
	$:  {
		animatedPlayerCash.set(playerAccountBalance)
		deltaPlayerAccountBalance = BeanCoinUtils.percentChange(lastPlayerAccountBalance, playerAccountBalance)
	}
</script>
<div class="flex font-semibold items-start mb-2">
    <div class="flex flex-col flex-grow">
        <span class='text-xs text-gray-500'>Account Balance</span>
        <span class='text-sm'>{$game.player.name}</span>
    </div>
    <div class="flex flex-col items-end">
        <span class='ml-2 text-2xl self-end tabular-nums'>${formatNumber($animatedPlayerCash)}</span>
        <PriceMovementBadge delta={deltaPlayerAccountBalance} xs={true} class='-mt-1'/>
    </div>

</div>