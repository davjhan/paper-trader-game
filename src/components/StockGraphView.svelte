<script>
    import { SVG } from '@svgdotjs/svg.js'
    import { onMount } from 'svelte'
    import { tweened } from 'svelte/motion'
    import { BeanCoinUtils } from '../logic/game'
    import { StockPriceChart } from '../logic/svgCharting'
    import { formatNumber, numberEasingProps } from '../logic/utils'
    import PriceMovementBadge from './PriceMovementBadge.svelte'

    export let game
    let cl, chart
    export { cl as class }


    $: latestBeanPrice = $game.priceData[$game.tick]
    $: beanPriceMovementPercentage = BeanCoinUtils.priceMovementPercentage($game)

    const animatedTickerPrice = tweened(latestBeanPrice, numberEasingProps)
    $:  {
        animatedTickerPrice.set(latestBeanPrice)
    }
    const paddedStockPrice =
        new Array(StockPriceChart.historyLength - 1).fill(0).concat($game.priceData)

    let tickMoveLength, maxGraphHeight, svg, graphItems
    $: {
        let priceDataWindow = paddedStockPrice.slice($game.tick, $game.tick + StockPriceChart.historyLength + 1)
        if (graphItems) {
            const minVal = Math.min(...priceDataWindow)
            const maxVal = Math.max(...priceDataWindow)

            const scaleFactor = (maxVal - minVal === 0) ? 0 : (chart.clientHeight - 20) / Math.abs(maxVal - minVal)
            graphItems.forEach(it => it.animate()
                .move(-$game.tick * tickMoveLength - 1, 0)
                .height((maxGraphHeight * scaleFactor))
                .y(-scaleFactor * maxGraphHeight + (scaleFactor * minVal) +
                    chart.clientHeight - 2)
            )

        }
    }
    onMount(() => {
        svg = SVG().addTo(chart).size(chart.clientWidth, chart.clientHeight)
        graphItems = StockPriceChart.drawPriceLine(svg, paddedStockPrice)
        maxGraphHeight = graphItems[0].height()
        tickMoveLength = chart.clientWidth / (StockPriceChart.historyLength - 1)
        graphItems.forEach(it => it.width(paddedStockPrice.length * tickMoveLength).move(0, 0))
    })
</script>
<div class="self-stretch flex flex-col mt-4">
    <span class='font-semibold text-gray-500'>$BEAN</span>
    <div class="flex items-start">
        <span class='font-semibold text-4xl tabular-nums'>${formatNumber($animatedTickerPrice)}</span>
        <PriceMovementBadge delta={beanPriceMovementPercentage} class='mt-1'/>
    </div>

    <div id="chart" class='' style='height:200px' bind:this={chart}></div>
</div>