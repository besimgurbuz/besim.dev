<script lang="ts">
	import { GamePlatform, type GameAchivement } from '$lib/models/achivements';
	import Percentage from './Percentage.svelte';

	interface Props {
		achivement: GameAchivement;
	}

	const { achivement }: Props = $props();
</script>

<div class="card achivement">
	<img
		class="achivement-img"
		src={achivement.gameHeaderUrl}
		alt="{achivement.gameName} header image"
	/>
	<div class="achivement-body">
		<h2 class="achivement-title">{achivement.gameName}</h2>
		<Percentage
			details={achivement.platform === GamePlatform.PlayStation
				? {
						mode: 'tropy',
						...achivement.stats.tropyCounts
					}
				: {
						mode: 'have_total',
						have: achivement.stats.earnedAchivements,
						total: achivement.stats.totalAchivements
					}}
			mode="line"
			size="100%"
			strokeWidth={4}
			value={achivement.stats.completePercentage}
		/>
		<img
			class="achivement-platform-icon"
			src="{achivement.platform}-icon.svg"
			width="24"
			height="24"
			alt="{achivement.platform} icon"
		/>
	</div>
</div>

<style>
	.achivement {
		display: flex;
		gap: 1rem;
		position: relative;
	}

	.achivement-img {
		width: 120px;
		height: 120px;
		object-fit: contain;
		background-color: var(--app-background-color);
		border-radius: 5px;
	}

	.achivement-body {
		width: 100%;
		flex: 1;
		display: flex;
		flex-direction: column;
		justify-content: space-between;
	}

	.achivement-title {
		color: var(--app-color-text);
	}

	.achivement-platform-icon {
		position: absolute;
		top: 8px;
		right: 8px;
	}
</style>
