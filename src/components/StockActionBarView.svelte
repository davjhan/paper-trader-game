<script>
    import AddAlt from 'carbon-icons-svelte/lib/AddAlt20'
    import SubtractAlt from 'carbon-icons-svelte/lib/SubtractAlt20'
    import { BeanCoinGame, BeanCoinUtils } from '../logic/game'
    import { flash, formatNumber } from '../logic/utils'
    import PriceMovementBadge from './PriceMovementBadge.svelte'

    export let game
    let cl
    export { cl as class }

    $: deltaCostBasis = BeanCoinUtils.percentChange($game.player.costBasis, $game.priceData[$game.tick])
</script>
<div class="self-stretch flex  mt-4 items-start {cl}">
    <div class="flex flex-col">
        <span class='text-xs text-gray-500'>Shares Owned</span>
        {#key $game.player.shares }
            <span class=' tabular-nums rounded' in:flash>{$game.player.shares.toFixed(2)}</span>
        {/key}
    </div>
    <div class="ml-4 flex flex-col w-24">
        <span class='text-xs text-gray-500'>Cost basis</span>
        {#key $game.player.costBasis }
        <span class=' tabular-nums rounded ' in:flash>
                {#if $game.player.costBasis}
                     ${formatNumber($game.player.costBasis)}
                    {:else}
                    --
                {/if}

            </span>
        {/key}
        {#if $game.player.costBasis}
            <PriceMovementBadge delta={deltaCostBasis} xs={true} class='-mt-1 -ml-1'/>
        {/if}
    </div>
    <div class="ml-4 flex flex-grow">
        {#if $game.player.shares === 0}
            <button class='reg flex-grow inline-flex justify-center items-center'
                    on:click={()=>BeanCoinGame.buyIn($game)}>
                <AddAlt class='mr-1'/>
                Buy
            </button>
        {:else}
            <button class='reg flex-grow inline-flex  justify-center items-center'
                    on:click={()=>BeanCoinGame.sellAll($game)}>
                <SubtractAlt class='mr-1'/>
                Sell All
            </button>
        {/if}
    </div>


</div>