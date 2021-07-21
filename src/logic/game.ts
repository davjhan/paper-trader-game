export module PaperTradingGame {
	export const tickLength = 1000
	export function newGame(
		playerName: string,
		onUpdate: (game: BeanCoinGameState) => void = undefined
	): BeanCoinGameState {
		return {
			phase: 'lobby',
			player: newPlayer(playerName),
			priceData: generatePriceData(),
			tick: 0,
			onUpdate
		}
	}

	/**
	 * @return NodeJS.Timeout the interval ID to call clearInterval on.
	 */
	export function startGame(game: BeanCoinGameState): NodeJS.Timeout {
		if (game.phase === 'lobby') {
			game.phase = 'playing'
			game.onUpdate?.(game)
			return setInterval(() => updateGame(game), tickLength)
		}
		return undefined
	}

	export function buyIn(game: BeanCoinGameState) {
		if (game.phase === 'playing') {
			game.player.costBasis = game.priceData[game.tick]
			game.player.shares = game.player.cash / game.priceData[game.tick]
			game.player.cash = 0
			game.onUpdate?.(game)
		}
	}

	export function sellAll(game: BeanCoinGameState) {
		if (game.phase === 'playing') {
			game.player.cash = game.player.shares * game.priceData[game.tick]
			game.player.shares = 0
			game.player.costBasis = 0
			game.onUpdate?.(game)
		}
	}

	function updateGame(game: BeanCoinGameState) {
		if (game.phase === 'playing') {
			if (game.tick < game.priceData.length - 1) {
				game.tick++
				game.onUpdate?.(game)
			} else {
				game.phase = 'gameOver'
				game.onUpdate?.(game)
			}
		}
	}

	export function newPlayer(name: string): PlayerState {
		return {
			name,
			cash: 100,
			shares: 0,
			costBasis: 0
		}
	}

	function generatePriceData(): number[] {
		let lastPrice = 10
		const maxRise = 0.03
		const maxFall = 0.02
		return Array.from({ length: 90 }, (x, i) => {
			if (i == 0) return lastPrice
			lastPrice += lastPrice * ((Math.random() * (maxRise + maxFall)) - maxFall)
			lastPrice = Math.max(0, lastPrice)
			return lastPrice
		})
	}
}
export module PaperTradingUtils {
	export function playerAccountValue(player: PlayerState, pricePerShare: number): number {
		return player.cash + player.shares * pricePerShare
	}

	export function priceMovementPercentage(game: { tick:number, priceData:number[] }): number {
		if (game.tick === 0) return 0
		return percentChange(game.priceData[game.tick - 1], game.priceData[game.tick])
	}

	export function percentChange(before: number, after: number): number {
		return (after - before) / before * 100
	}
}

export interface BeanCoinGameState {
	phase: 'lobby' | 'playing' | 'gameOver'
	player: PlayerState
	priceData: number[]
	tick: number
	onUpdate?: (game: BeanCoinGameState) => void
}

export interface PlayerState {
	name: string
	cash: number
	shares: number
	costBasis: number
}