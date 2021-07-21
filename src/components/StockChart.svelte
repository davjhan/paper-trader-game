<script lang="ts">
	import type { ChartConfiguration } from 'chart.js'
	import Chart from 'chart.js/auto/auto.js'
	import { onMount } from 'svelte'
	import { formatDollars } from 'davjhan-core/src/utils/strings'

	export let priceData = [], tick = priceData.length - 1, holdsPosition
	let cl, canvas, chart
	export { cl as class }

	const green = '#10B981'
	const red = '#EF4444'
	const gray = '#6B7280'
	const chartHeight = 150
	let greenGradient, redGradient, grayGradient

	function newConfigs(data): ChartConfiguration {
		return {
			type: 'line',
			data,
			options: {
				animation: false,

				scales: {
					xAxis: {
						display: false,
					},
					yAxis: {
						grid: {
							drawBorder: false,
						},

						ticks: {
							count: 4,
							callback: function (value: number, index, values) {
								return '$' + formatDollars(value)
							},
							padding: 0
						}
					}
				},
				plugins: {
					legend: {
						display: false,

					},
					tooltip: {
						enabled: false
					}
				},
				elements: {
					line: {
						tension: 0.2
					}
				},

			}
		}
	}

	const pointRadii = new Array(priceData.length).fill(0)
	let priceChartData = new Array(priceData.length).fill(undefined).map((it, i) => ({
		x: `day ${ i }`,
		y: (i <= tick) ? priceData[i] : it
	}))
	$: {
		priceChartData[tick].y = priceData[tick]
		pointRadii[tick] = 4
		if (tick > 0) {
			pointRadii[tick - 1] = 0
		}
		let isUp = priceData[tick] > priceData[Math.max(0, tick - 1)]
		if (chart) {
			chart.data.datasets[0].borderColor = holdsPosition ? (isUp ? green : red) : gray
			chart.data.datasets[0].pointBackgroundColor = holdsPosition ? (isUp ? green : red) : gray
			chart.data.datasets[0].backgroundColor = holdsPosition ? (isUp ? greenGradient : redGradient) : grayGradient
			chart.update()
		}
	}

	onMount(() => {
		greenGradient = canvas.getContext('2d').createLinearGradient(0, 0, 0, chartHeight)
		greenGradient.addColorStop(0, '#6EE7B7') // green 300
		greenGradient.addColorStop(1, '#FFFFFF')

		redGradient = canvas.getContext('2d').createLinearGradient(0, 0, 0, chartHeight)
		redGradient.addColorStop(0, '#FCA5A5') // red 300
		redGradient.addColorStop(1, '#FFFFFF')

		grayGradient = canvas.getContext('2d').createLinearGradient(0, 0, 0, chartHeight)
		grayGradient.addColorStop(0, '#D1D5DB') // gtay 300
		grayGradient.addColorStop(1, '#FFFFFF')
		const data = {
			datasets: [{
				backgroundColor: grayGradient,
				borderColor: gray,
				pointBackgroundColor: gray,
				data: priceChartData,
				pointRadius: pointRadii,
				fill: 'origin'
			}]
		}

		chart = new Chart(
			canvas,
			newConfigs(data)
		)
		console.log(`done`, chart)
	})
</script>
<canvas bind:this={canvas} class='rounded flex-grow mt-2 {cl}' style='height:{chartHeight}px'></canvas>