import { cubicOut } from 'svelte/easing'

export function formatNumber(num:number){
	return num.toLocaleString(undefined, {
		minimumFractionDigits: 2,
		maximumFractionDigits: 2
	})
}
export function flash(node, {
	delay = 0,
	duration = 400
}) {
	return {
		delay,
		duration,
		css: t => `background-color: rgba(254, 243, 199, ${1-t})` // fef3c7
	};
}
export const numberEasingProps = { duration: 300, easing: cubicOut }