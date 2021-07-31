export module PaperTradingGame {
	export const tickLength = 1500

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

	const maxRise = 0.07
	const bullProb = 0.6
	const marketSentimentVals = [-8, -1, 1]
	const marketSentimentProbs = [0.1, 0.2, 1]
	const numTurns = 30
	/**
	 * Generates price data by calculating a 0%..7% movement magnitude multiplied by the "market sentiment",
	 * which is either super bearish, bearish, or bullish. The probabilities of the sentiment can also be configured
	 * marketSentimentProbs.
	 */
	function generatePriceData(): number[] {
		let lastPrice = 10

		let sentiment = marketSentimentVals[2]
		let isBull = false
		return Array.from({ length: numTurns }, (x, i) => {
			if (i == 0) return lastPrice

			const movementPercent = (Math.random() * maxRise) * sentiment
			lastPrice += lastPrice * movementPercent
			lastPrice = Math.max(0, lastPrice)

			/* Roll a dice to change isBull */
			const diceRoll = Math.random()
			sentiment = marketSentimentVals[marketSentimentProbs.findIndex(it => diceRoll < it)]
			isBull = Math.random() < bullProb

			return lastPrice
		})
	}
}
export module PaperTradingUtils {
	export function playerAccountValue(player: PlayerState, pricePerShare: number): number {
		return player.cash + player.shares * pricePerShare
	}

	export function priceMovementPercentage(game: { tick: number, priceData: number[] }): number {
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