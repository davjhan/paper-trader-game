<script>
    import { Chart, registerables } from 'chart.js'
    import { onMount } from 'svelte'
    import { tweened } from 'svelte/motion'
    import { ChartJsStockPriceChart } from '../logic/charting'
    import { BeanCoinUtils } from '../logic/game'
    import { formatNumber, numberEasingProps } from '../logic/utils'
    import PriceMovementBadge from './PriceMovementBadge.svelte'

    export let game
    let cl, canvas, chart
    export { cl as class }


    $: latestBeanPrice = $game.priceData[$game.tick]
    $: beanPriceMovementPercentage = BeanCoinUtils.priceMovementPercentage($game)

    const animatedTickerPrice = tweened(latestBeanPrice, numberEasingProps)
    $:  {
        animatedTickerPrice.set(latestBeanPrice)
    }

    $: priceData = $game.priceData.slice(Math.max(0, $game.tick-20), $game.tick).map((it, i) => ({
        x: `Day ${i}`,
        y: it
    }))
    $: {
        priceData
        if (chart) {
            chart.data.datasets[0].data = priceData
            chart.update()
        }
    }
    onMount(() => {
        Chart.register(...registerables)
        const gradient = canvas.getContext('2d').createLinearGradient(0, 0, 0, 150)
        gradient.addColorStop(0, '#6EE7B7')
        gradient.addColorStop(1, '#FFFFFF')
        console.log(`price`, priceData)
        const data = {
            datasets: [{
                backgroundColor: gradient,
                borderColor: '#10B981',
                color: '#10B981',
                data: priceData,
                pointStyle:'line',
                fill: 'origin'
            }]
        }

        chart = new Chart(
            canvas,
            ChartJsStockPriceChart.newConfigs(data)
        )
        console.log(`done`, chart)
    })
</script>
<div class="self-stretch flex flex-col mt-4">
    <span class='font-semibold text-gray-500'>$BEAN</span>
    <div class="flex items-start">
        <span class='font-semibold text-4xl tabular-nums'>${formatNumber($animatedTickerPrice)}</span>
        <PriceMovementBadge delta={beanPriceMovementPercentage} class='mt-1'/>
    </div>

    <canvas bind:this={canvas} class='rounded flex-grow mt-2' style='height:150px'></canvas>
</div>