<script lang="ts">
	import type { GameAchivement } from '$lib/models/achivements';
	import Percentage from './Percentage.svelte';

	interface Props {
		gameAchivement: GameAchivement;
		podiumPosition: number;
	}

	const { gameAchivement, podiumPosition }: Props = $props();

	const podiumHeights = [120, 100, 90];
	const podiumPositions = [1, 0, 2];
</script>

<div
	class="card podium-card"
	style="--podium-height: {podiumHeights[podiumPosition]}px; --podium-position: {podiumPositions[
		podiumPosition
	]}"
>
	<h2 class="podium-position">#{podiumPosition + 1}</h2>
	<img
		class="podium-img"
		src={gameAchivement.gameHeaderUrl}
		alt="My #{podiumPosition + 1} favorite game {gameAchivement.gameName} header"
	/>
	<h3 class="podium-title">{gameAchivement.gameName}</h3>
	<img
		src="{gameAchivement.platform}-icon.svg"
		class="podium-platform-icon"
		alt="{gameAchivement.platform} icon"
	/>
	<div class="podium-bottom">
		<Percentage
			details={{
				mode: 'have_total',
				have: gameAchivement.stats.earnedAchivements,
				total: gameAchivement.stats.totalAchivements
			}}
			mode="line"
			size="100%"
			strokeWidth={4}
			value={gameAchivement.stats.completePercentage}
		/>
	</div>
</div>

<style>
	.podium-card {
		flex: 1;
		position: relative;
		display: flex;
		flex-direction: column;
		align-items: center;
		width: 100%;
	}

	.podium-img {
		width: 150px;
		height: 150px;
		border-radius: 5px;
		object-fit: contain;
		background-color: var(--app-background-color);
	}

	.podium-title {
		color: var(--app-text-color);
	}

	.podium-bottom {
		width: 100%;
		display: flex;
		flex-direction: column;
		gap: 4px;
		margin-top: auto;
	}

	.podium-platform-icon {
		position: absolute;
		width: 24px;
		height: 24px;
		top: 8px;
		right: 8px;
	}

	.podium-position {
		color: var(--app-text-color);
		position: absolute;
		top: 8px;
		left: 8px;
	}

	@media (min-width: 1080px) {
		.podium-card {
			order: var(--podium-position);
			height: var(--podium-height);
		}

		.podium-img {
			position: absolute;
			top: -50px;
			left: 50%;
			transform: translateX(-50%);
			width: 50%;
			max-height: 90px;
			max-width: 200px;
			object-fit: cover;
			object-position: top;
		}

		.podium-title {
			position: absolute;
			top: 50px;
		}

		.podium-position {
			display: none;
		}
	}
</style>
