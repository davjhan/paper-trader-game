import { cubicOut } from 'svelte/easing'
export function flash(node, {
	delay = 0,
	duration = 400,
	color = '#FEF3C7'
}) {
	return {
		delay,
		duration,
		css: t => `background-color: ${hexToRGB(color,1-t)}` // fef3c7
	};
}
function hexToRGB(hex, alpha) {
	var r = parseInt(hex.slice(1, 3), 16),
		g = parseInt(hex.slice(3, 5), 16),
		b = parseInt(hex.slice(5, 7), 16);

	if (alpha) {
		return "rgba(" + r + ", " + g + ", " + b + ", " + alpha + ")";
	} else {
		return "rgb(" + r + ", " + g + ", " + b + ")";
	}
}
export const numberEasingProps = { duration: 300, easing: cubicOut }