<script lang="ts">
	import type { CombinedGameAchivement } from '$lib/models/achivements';
	import Percentage from './Percentage.svelte';
	import StatIcon from './StatIcon.svelte';
	import TrophyEarnings from './TrophyEarnings.svelte';

	interface Props {
		combinedAchivements: CombinedGameAchivement;
	}

	const { combinedAchivements }: Props = $props();
</script>

<div class="card game-stats fade-in">
	<StatIcon color="var(--app-primary-color)" />
	<div class="stats-first-half">
		<div class="game-stat-item text-only-stat">
			<p class="game-stat-value">
				{combinedAchivements.steam.total + combinedAchivements.playstation.total}
			</p>
			<p class="game-stat-title">Total</p>
		</div>
		<div class="game-stat-item text-only-stat">
			<p class="game-stat-value">
				{combinedAchivements.steam.earned + combinedAchivements.playstation.earned}
			</p>
			<p class="game-stat-title">Earned</p>
		</div>
		<div class="game-stat-item text-only-stat">
			<p class="game-stat-value">
				{combinedAchivements.steam.perfectGames + combinedAchivements.playstation.platinum}
			</p>
			<p class="game-stat-title">Perfect Games</p>
		</div>
	</div>
	<Percentage
		mode="circle"
		title="Overall game completion percentage"
		value={combinedAchivements.overallCompletePercentage}
		size={70}
		strokeWidth={8}
	/>
	<div class="stats-second-half">
		<TrophyEarnings {...combinedAchivements.playstation} />
	</div>
</div>

<style>
	.game-stats {
		position: relative;
		display: flex;
		align-items: center;
		flex-direction: column;
		gap: 1rem;
	}

	.stats-first-half,
	.stats-second-half {
		display: flex;
		gap: 1rem;
	}

	.game-stat-item {
		display: flex;
		flex-direction: column;
		align-items: center;
	}

	.game-stat-item.text-only-stat {
		gap: 1rem;
	}

	.game-stat-value {
		font-size: 1.5rem;
	}

	.game-stat-title {
		font-size: 1rem;
	}

	@media (min-width: 800px) {
		.game-stats {
			flex-direction: row;
			height: 70px;
			width: 600px;
			align-self: center;
			justify-content: space-evenly;
		}
	}
</style>
