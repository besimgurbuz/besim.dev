<script lang="ts">
	import { createBubbler } from 'svelte/legacy';

	const bubble = createBubbler();
	interface Props {
		label: string;
		active?: boolean;
	}

	let { label, active = false }: Props = $props();
</script>

<span class="chip" class:active onclick={bubble('click')} onkeypress={bubble('keypress')}>
	<p class="chip-label">{label}</p>
</span>

<style>
	.chip {
		background-color: var(--app-color-1);
		border-radius: 8px;
		display: flex;
		width: fit-content;
		height: fit-content;
		padding: 3px 12px;
		user-select: none;
	}

	.chip-label {
		padding: 0;
		margin: 0;
	}

	.chip:hover {
		cursor: pointer;
	}

	.chip.active {
		padding: 1px 10px;
		border: 2px solid var(--app-color-2);
	}
</style>
