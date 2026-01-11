<script lang="ts">
	import type { TrophyCounts } from 'psn-api';
	import { Spring } from 'svelte/motion';
	import TrophyEarnings from './TrophyEarnings.svelte';

	interface Props {
		value: number;
		mode: 'circle' | 'line';
		size?: number | string;
		strokeWidth?: number;
		title?: string;
		details?:
			| {
					mode: 'have_total';
					have: number;
					total: number;
			  }
			| ({ mode: 'tropy' } & TrophyCounts);
	}

	let { value, mode, size = 200, strokeWidth = 8, title, details }: Props = $props();

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
	let lineEnd = $derived(animatedValue.current);
</script>

<div
	class="percentage {mode}"
	style:--size={typeof size === 'number' ? `${size}px` : size}
	style:--stroke-width="{strokeWidth}px"
	{title}
>
	{#if mode === 'circle'}
		<div class="canvas">
			<svg width={size} viewBox="0 0 200 200" xmlns="http://www.w3.org/2000/svg">
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
					style:stroke-dashoffset={dashOffset}
					class="fill"
					transform="rotate(-90 100 100)"
				/>
			</svg>
			<div class="label-center">
				<span class="value">{Math.round(animatedValue.current)}</span><span class="percent">%</span>
			</div>
		</div>
	{:else}
		<div class="line-container">
			<div class="line-header">
				{#if details && details.mode === 'have_total'}
					<div class="value">{details.have}/{details.total}</div>
				{:else}
					<div class="line-trophy-earnings">
						<TrophyEarnings size={36} {...details!} />
					</div>
				{/if}
				<span class="value">{Math.round(animatedValue.current)}%</span>
			</div>
			<svg
				viewBox="0 0 100 {strokeWidth}"
				preserveAspectRatio="none"
				width="100%"
				height={strokeWidth}
			>
				<line
					x1="0"
					y1={strokeWidth / 2}
					x2="100"
					y2={strokeWidth / 2}
					stroke="var(--app-text-color)"
					stroke-width={strokeWidth}
					class="track"
				/>
				<line
					x1="0"
					y1={strokeWidth / 2}
					x2={lineEnd}
					y2={strokeWidth / 2}
					stroke="var(--app-primary-color)"
					stroke-width={strokeWidth}
					class="fill"
				/>
			</svg>
		</div>
	{/if}
</div>

<style>
	.percentage {
		display: block;
	}

	.percentage.circle {
		width: var(--size);
		height: var(--size);
	}

	.percentage.line {
		width: var(--size);
		height: auto;
	}

	.canvas {
		position: relative;
		width: 100%;
		height: 100%;
		display: flex;
		align-items: center;
		justify-content: center;
	}

	.label-center {
		position: absolute;
		text-align: center;
		color: var(--text-main);
	}

	.line-container {
		display: flex;
		flex-direction: column;
		gap: 4px;
	}

	.line-header {
		display: flex;
		align-items: flex-end;
		justify-content: space-between;
		font-size: 0.75rem;
		font-weight: 600;
		color: var(--text-main);
	}

	.line-trophy-earnings {
		display: flex;
		gap: 0.5rem;
	}

	.value {
		font-size: 1rem;
		font-weight: 700;
	}

	.percent {
		font-size: 0.6rem;
		opacity: 0.6;
	}

	/* Responsive improvements for better readability */
	@media (min-width: 500px) {
		.line-header {
			font-size: 0.85rem;
		}

		.line-trophy-earnings {
			gap: 1rem;
		}

		.value {
			font-size: 1.2rem;
		}

		.percent {
			font-size: 0.7rem;
		}
	}

	.fill {
		transition: stroke 0.3s ease;
	}

	svg {
		display: block;
		overflow: visible; /* Prevents rounded caps from clipping */
	}
</style>
