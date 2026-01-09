<script lang="ts">
	import type { CombinedGameAchivement } from '$lib/models/achivements';
	import Percentage from './Percentage.svelte';
	import StatIcon from './StatIcon.svelte';

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
		strokeWidth={5}
	/>
	<div class="game-stat-item">
		<img class="game-stat-trophy" src="platinum-trophy.png" alt="Platinum Trophy Image" />
		<p class="game-stat-value">{combinedAchivements.playstation.platinum}</p>
	</div>
	<div class="game-stat-item">
		<img class="game-stat-trophy" src="gold-trophy.png" alt="Gold Trophy Image" />
		<p class="game-stat-value">{combinedAchivements.playstation.gold}</p>
	</div>
	<div class="game-stat-item">
		<img class="game-stat-trophy" src="silver-trophy.png" alt="Silver Trophy Image" />
		<p class="game-stat-value">{combinedAchivements.playstation.silver}</p>
	</div>
	<div class="game-stat-item">
		<img class="game-stat-trophy" src="bronze-trophy.png" alt="Bronze Trophy Image" />
		<p class="game-stat-value">{combinedAchivements.playstation.bronze}</p>
	</div>
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

	.game-stat-trophy {
		width: 42px;
		height: 42px;
	}
</style>
