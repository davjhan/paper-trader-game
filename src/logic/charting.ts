import type { ChartConfiguration } from 'chart.js'

export module ChartJsStockPriceChart{
	export function  newConfigs(data):ChartConfiguration{
		return {
			type: 'line',
			data,
			options: {
				animations:{
					x:false,
					y:false,
				},
				scales:{
					xAxis:{
						borderColor: 'black',
						display: false
					},
//					yAxis:{
//
//						display: false
//					}
				},
				plugins:{
					legend:{
						display: false,

					},
					tooltip:{
						enabled:false
					}
				},
				elements:{
					line: {
						tension: 0.2
					}
				},

			}
		}
	}
}