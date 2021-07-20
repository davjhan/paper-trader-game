<script context="module">

    export const prerender = true;

</script>
<script>
    import { Chart, registerables } from 'chart.js'
    import { onMount } from 'svelte'

    let priceChart
    const labels = [
        'January',
        'February',
        'March',
        'April',
        'May',
        'June',
    ]

    const priceData = [0,5,1,9,10,2]
    onMount(()=>{
        Chart.register(...registerables)
        var gradient = priceChart.getContext("2d").createLinearGradient(0, 0, 0, 171)
        gradient.addColorStop(0, '#6EE7B7')
        gradient.addColorStop(1, '#FFFFFF')
        const data = {
            labels: labels,
            datasets: [{
                backgroundColor: gradient,
                borderColor: '#10B981',
                data: [0, 10, 5, 2, 20, 30, 45],
                fill: 'origin'
            }]
        }
        const config = {
            type: 'line',
            data,
            options: {
                animation:false,
                scales:{
                    xAxis:{

                        display: false
                    },
                    yAxis:{

                        display: false
                    }
                },
                plugins:{
                    legend:{
                        display: false,

                    },
                    tooltip:{
                        enabled:false
                    }
                }
            }
        }
        const chart = new Chart(
            priceChart,
            config
        )
        console.log(`done`,  chart)
    })
</script>
<main class='p-4 flex flex-col items-center'>
    <h1>Hello World</h1>
    <canvas bind:this={priceChart} class=''></canvas>
</main>