<script lang="ts">
	interface Props {
		width?: string;
		height?: string;
		borderRadius?: string;
		animationLength?: string;
	}

	let {
		width = '100%',
		height = '25px',
		borderRadius = '4px',
		animationLength = '1.2s'
	}: Props = $props();
</script>

<div
	class="skeleton"
	style="height: {height}; width: {width}; border-radius: {borderRadius}; --animationLength: {animationLength}"
></div>

<style>
	.skeleton {
		background-color: var(--app-color-2);
		background-image: linear-gradient(
			90deg,
			var(--app-color-2),
			var(--app-color-3),
			var(--app-color-2)
		);
		background-size: 200px 100%;
		background-repeat: no-repeat;
		display: inline-block;
		width: 100%;
		animation: loading-animation var(--animationLength) ease-in-out infinite;
	}
	@keyframes loading-animation {
		0% {
			background-position: -200px 0;
		}
		100% {
			background-position: calc(200px + 100%) 0;
		}
	}
</style>
