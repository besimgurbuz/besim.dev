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
	<Percentage
		mode="circle"
		title="Overall game completion percentage"
		value={combinedAchivements.overallCompletePercentage}
		size={70}
		strokeWidth={8}
	/>
	<TrophyEarnings {...combinedAchivements.playstation} />
</div>

<style>
	.game-stats {
		position: relative;
		height: 70px;
		width: 700px;
		display: flex;
		align-items: center;
		justify-content: space-between;
		align-self: center;
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
</style>
