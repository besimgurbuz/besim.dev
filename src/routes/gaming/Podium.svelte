<script lang="ts">
	import type { GameAchivement } from '$lib/models/achivements';
	import PodiumCard from './PodiumCard.svelte';

	interface Props {
		games: [GameAchivement, GameAchivement, GameAchivement];
	}

	const { games }: Props = $props();
</script>

<div class="my-goats-container fade-out">
	<h2>My GOATs</h2>
	<div class="podium-container">
		{#each games as game, idx (game.gameName)}
			<PodiumCard gameAchivement={game} podiumPosition={idx} />
		{/each}
	</div>
</div>

<style>
	.my-goats-container {
		display: flex;
		flex-direction: column;
		gap: 42px;
	}

	.podium-container {
		display: flex;
		align-items: flex-end;
		gap: 21px;
	}

	@media (max-width: 1079px) {
		.my-goats-container {
			gap: 20px;
		}

		.podium-container {
			flex-direction: column;
			align-items: center;
		}
	}
</style>
