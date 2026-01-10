<script lang="ts">
	import type { GameAchivement } from '$lib/models/achivements';
	import Percentage from './Percentage.svelte';

	interface Props {
		games: [GameAchivement, GameAchivement, GameAchivement];
	}

	const { games }: Props = $props();

	const displayIndexes = [1, 0, 2];
</script>

<div class="my-goats-container fade-out">
	<h2>My GOATs</h2>
	<div class="podium-container">
		{#each displayIndexes as podiumIndex (podiumIndex)}
			<div
				class="card podium"
				style="height: {podiumIndex === 0 ? 120 : 100 - podiumIndex * 10}px;"
			>
				<img
					class="podium-img"
					src={games[podiumIndex].gameHeaderUrl}
					alt="My #{podiumIndex + 1} favorite game {games[podiumIndex].gameName} header"
				/>
				<h3 class="podium-title">{games[podiumIndex].gameName}</h3>
				<img
					src="{games[podiumIndex].platform}-icon.svg"
					class="podium-platform-icon"
					alt="{games[podiumIndex].platform} icon"
				/>
				<div class="podium-bottom">
					<Percentage
						details={{
							mode: 'have_total',
							have: games[podiumIndex].stats.earnedAchivements,
							total: games[podiumIndex].stats.totalAchivements
						}}
						mode="line"
						size="100%"
						strokeWidth={4}
						value={games[podiumIndex].stats.completePercentage}
					/>
				</div>
			</div>
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
		justify-content: space-between;
		gap: 21px;
	}

	.podium {
		flex: 1;
		position: relative;
		display: flex;
		flex-direction: column;
		align-items: center;
		justify-content: space-between;
	}

	.podium-img {
		width: 50%;
		border-radius: 5px;
		max-height: 90px;
		object-fit: cover;
		object-position: top;
		position: absolute;
		top: -50px;
		left: 50%;
		transform: translateX(-50%);
	}

	.podium-title {
		color: var(--app-text-color);
		position: absolute;
		top: 50px;
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
</style>
