<script lang="ts">
	import { Spring } from 'svelte/motion';

	interface Props {
		value: number;
		mode: 'circle' | 'line';
		size?: number;
		strokeWidth?: number;
		title?: string;
	}

	let { value, mode, size = 200, strokeWidth = 8, title }: Props = $props();

	const radius = 80;
	const circumference = 2 * Math.PI * radius;

	const animatedValue = new Spring(0, {
		stiffness: 0.05,
		damping: 0.5
	});

	$effect(() => {
		animatedValue.set(Math.max(0, Math.min(100, value)));
	});

	let dashOffset = $derived(circumference - (animatedValue.current / 100) * circumference);
</script>

<div class="gauge-wrapper" style="--size: {size}px" {title}>
	<svg viewBox="0 0 200 200" width={size} height={size} xmlns="http://www.w3.org/2000/svg">
		<circle
			cx="100"
			cy="100"
			r={radius}
			fill="none"
			stroke="var(--app-text-color)"
			stroke-width={strokeWidth}
			class="track"
		/>

		<circle
			cx="100"
			cy="100"
			r={radius}
			fill="none"
			stroke="var(--app-primary-color)"
			stroke-width={strokeWidth}
			stroke-linecap="round"
			stroke-dasharray={circumference}
			style="stroke-dashoffset: {dashOffset};"
			class="fill"
			transform="rotate(-90 100 100)"
		/>
	</svg>

	<div class="label-overlay">
		<p class="value">{Math.round(animatedValue.current)}<span class="percent">%</span></p>
	</div>
</div>

<style>
	.gauge-wrapper {
		position: relative;
		display: flex;
		align-items: center;
		justify-content: center;
		width: var(--size);
		height: var(--size);
	}

	.fill {
		transition: stroke 0.3s ease;
	}

	.label-overlay {
		position: absolute;
		display: flex;
		flex-direction: column;
		align-items: center;
		color: var(--app-text-color);
	}

	.value {
		font-size: 1.5rem;
		font-weight: 700;
	}

	.percent {
		font-size: 0.5rem;
		font-weight: 500;
		opacity: 0.6;
	}

	svg {
		display: block;
		max-width: 100%;
		height: auto;
	}
</style>
