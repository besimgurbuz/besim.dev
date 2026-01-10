<script lang="ts">
	import type { GameAchivement } from '$lib/models/achivements';
	import Achivement from './Achivement.svelte';

	interface Props {
		achivements: GameAchivement[];
	}

	const { achivements }: Props = $props();

	let displayedAmount = $state(10);
	let displayedAchivements = $derived(achivements.slice(0, displayedAmount));
</script>

<div class="achivements">
	<h2>My Achivements</h2>
	{#each displayedAchivements as achivement (achivement.gameName)}
		<Achivement {achivement} />
	{/each}
	<button
		aria-label="Display {displayedAmount === achivements.length ? 'less' : 'more'} achivements"
		class="display-all-button"
		onclick={() =>
			(displayedAmount = displayedAmount === achivements.length ? 10 : achivements.length)}
	>
		{#if displayedAmount === 10}
			<svg width="15" height="15" viewBox="0 0 15 15" fill="none" xmlns="http://www.w3.org/2000/svg"
				><path
					d="M7.5 2C7.77614 2 8 2.22386 8 2.5L8 11.2929L11.1464 8.14645C11.3417 7.95118 11.6583 7.95118 11.8536 8.14645C12.0488 8.34171 12.0488 8.65829 11.8536 8.85355L7.85355 12.8536C7.75979 12.9473 7.63261 13 7.5 13C7.36739 13 7.24021 12.9473 7.14645 12.8536L3.14645 8.85355C2.95118 8.65829 2.95118 8.34171 3.14645 8.14645C3.34171 7.95118 3.65829 7.95118 3.85355 8.14645L7 11.2929L7 2.5C7 2.22386 7.22386 2 7.5 2Z"
					fill="currentColor"
					fill-rule="evenodd"
					clip-rule="evenodd"
				></path></svg
			>
		{:else}
			<svg width="15" height="15" viewBox="0 0 15 15" fill="none" xmlns="http://www.w3.org/2000/svg"
				><path
					d="M7.14645 2.14645C7.34171 1.95118 7.65829 1.95118 7.85355 2.14645L11.8536 6.14645C12.0488 6.34171 12.0488 6.65829 11.8536 6.85355C11.6583 7.04882 11.3417 7.04882 11.1464 6.85355L8 3.70711L8 12.5C8 12.7761 7.77614 13 7.5 13C7.22386 13 7 12.7761 7 12.5L7 3.70711L3.85355 6.85355C3.65829 7.04882 3.34171 7.04882 3.14645 6.85355C2.95118 6.65829 2.95118 6.34171 3.14645 6.14645L7.14645 2.14645Z"
					fill="currentColor"
					fill-rule="evenodd"
					clip-rule="evenodd"
				></path></svg
			>
		{/if}
	</button>
</div>

<style>
	.achivements {
		display: flex;
		flex-direction: column;
		gap: 20px;
	}

	.display-all-button {
		align-self: center;
		display: flex;
		flex-direction: column;
		align-items: center;
		justify-content: center;
		gap: 5px;
		width: 30px;
		height: 50px;
		background-color: var(--app-color-1);
		outline: none;
		border: none;
		border-radius: 15px;
	}

	.display-all-button:hover {
		background-color: var(--app-color-2);
		cursor: pointer;
	}

	.display-all-button:active {
		background-color: var(--app-color-3);
	}
</style>
