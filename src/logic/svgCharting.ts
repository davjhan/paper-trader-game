import type { ArrayXY, Svg } from '@svgdotjs/svg.js'

export module StockPriceChart {

	export const historyLength = 20

	export function drawPriceLine(svg: Svg, priceData: number[]) {
		const data = priceData.map((y, i) => [i, -y] as ArrayXY)
		const gradient = svg.gradient('linear', function (add) {
			add.from(0, 0)
			add.to(0, 1)
			add.stop(0, '#6EE7B7')
			add.stop(1, '#FFFFFF')
		})

//		const grad = svg.rect(+svg.width(),+svg.height()).fill(gradient).fill(gradient)
//		const shape = svg.polygon(data.concat([[priceChartData.length + 1, 0]])).stroke({ color: 'green', width: 2 }).fill(gradient)
//		grad.maskWith(shape)
		const topLine = svg.polyline(data).stroke({ color: 'green', width: 2 }).fill('none')
		return [topLine]
	}
}