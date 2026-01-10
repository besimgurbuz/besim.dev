<script lang="ts">
	interface Props {
		platinum: number;
		gold: number;
		silver: number;
		bronze: number;
		size?: number;
	}

	const { platinum, gold, silver, bronze, size = 42 }: Props = $props();
</script>

<div class="tropy-earning-item">
	<img width={size} height={size} src="platinum-trophy.png" alt="Platinum Trophy" />
	<p class="game-stat-value">{platinum}</p>
</div>
<div class="tropy-earning-item">
	<img width={size} height={size} src="gold-trophy.png" alt="Gold Trophy" />
	<p class="game-stat-value">{gold}</p>
</div>
<div class="tropy-earning-item">
	<img width={size} height={size} src="silver-trophy.png" alt="Silver Trophy" />
	<p class="game-stat-value">{silver}</p>
</div>
<div class="tropy-earning-item">
	<img width={size} height={size} src="bronze-trophy.png" alt="Bronze Trophy" />
	<p class="game-stat-value">{bronze}</p>
</div>

<style>
	.tropy-earning-item {
		display: flex;
		flex-direction: column;
		align-items: center;
	}
</style>
