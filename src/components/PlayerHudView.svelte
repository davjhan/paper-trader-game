<script lang="ts">
	import { tweened } from 'svelte/motion'
	import type { Writable } from 'svelte/store'
	import type { BeanCoinGameState } from '../logic/game'
	import { PaperTradingUtils } from '../logic/game'
	import { numberEasingProps } from '../logic/utils'
	import { formatDollars } from 'davjhan-core/src/utils/strings'
	import PriceMovementBadge from './PriceMovementBadge.svelte'
	import { flash } from '../logic/utils'

	export let game: Writable<BeanCoinGameState>
	let cl
	export { cl as class }
	const animatedPlayerCash = tweened($game.player.cash, numberEasingProps)

	const green = '#D1FAE5'
	const red = '#FEE2E2'

    let flashColor = green
	let playerAccountBalance = $game.player.cash
	let lastPlayerAccountBalance = $game.player.cash
	let deltaPlayerAccountBalance = 0
	$:  {
		animatedPlayerCash.set(playerAccountBalance)
		playerAccountBalance = PaperTradingUtils.playerAccountValue($game.player, $game.priceData[$game.tick])
		deltaPlayerAccountBalance = PaperTradingUtils.percentChange(lastPlayerAccountBalance, playerAccountBalance)
		flashColor = deltaPlayerAccountBalance > 0 ? green : red
		lastPlayerAccountBalance = playerAccountBalance
	}
</script>
<div class="flex font-semibold items-start mb-4">
    <div class="flex flex-col flex-grow">
        <span class='text-xs text-gray-500'>Account Balance</span>
        <span class=''>Day {$game.tick + 1} <span class='text-gray-400'>/ {$game.priceData.length}</span></span>
<!--        <span class=''>{$game.player.name}</span>-->
    </div>
    {#key playerAccountBalance}
    <div class="flex flex-col items-end rounded -m-2 p-2" in:flash={{color:flashColor}}>
        <span class='ml-2 text-2xl self-end tabular-nums'>${formatDollars($animatedPlayerCash)}</span>
        <PriceMovementBadge delta={deltaPlayerAccountBalance} xs={true} class='-mt-1'/>
    </div>
    {/key}
</div>