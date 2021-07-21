<script>
    import AddAlt from 'carbon-icons-svelte/lib/AddAlt20'
    import SubtractAlt from 'carbon-icons-svelte/lib/SubtractAlt20'
    import { PaperTradingGame, PaperTradingUtils } from '../logic/game'
    import { flash } from '../logic/utils'
    import { formatDollars } from 'davjhan-core/src/utils/strings'

    import PriceMovementBadge from './PriceMovementBadge.svelte'

    export let game
    let cl
    export { cl as class }
    $: isGameOver = $game.tick === $game.priceData.length - 1
    $: deltaCostBasis = PaperTradingUtils.percentChange($game.player.costBasis, $game.priceData[$game.tick])
</script>
<div class="self-stretch flex  mt-4 items-start {cl}">
    <div class="flex flex-col">
        <span class='text-xs text-gray-500'>Shares owned</span>
        {#key $game.player.shares }
            <span class=' tabular-nums rounded' in:flash>{$game.player.shares.toFixed(2)}</span>
        {/key}
    </div>
    <div class="ml-4 flex flex-col w-24">
        <span class='text-xs text-gray-500'>Cost basis</span>
        {#key $game.player.costBasis }
        <span class=' tabular-nums rounded ' in:flash>
                {#if $game.player.costBasis}
                     ${formatDollars($game.player.costBasis)}
                    {:else}
                    --
                {/if}

            </span>
        {/key}
        {#if $game.player.costBasis}
            <PriceMovementBadge delta={deltaCostBasis} xs={true} class='-mt-1 -ml-1'/>
        {/if}
    </div>
    <div class="ml-4 flex flex-grow ">
        {#if $game.player.shares === 0}
            <button class='reg flex-grow inline-flex justify-center items-center'
                    on:click={()=>PaperTradingGame.buyIn($game)}
                    disabled={isGameOver}>
                <AddAlt class='mr-1'/>
                Buy
            </button>
        {:else}
            <button class='reg flex-grow inline-flex  justify-center items-center  '
                    on:click={()=>PaperTradingGame.sellAll($game)}
                    class:animate-throb={!isGameOver}
                    disabled={isGameOver}>
                <SubtractAlt class='mr-1 transition-transform'/>
                Sell
            </button>
        {/if}
    </div>


</div>