<script>
	import Skeleton from '../Skeleton.svelte';
</script>

<div class="podium-skeleton-container">
	<div class="card podium-card" style="height: 90px;">
		<div class="podium-skeleton-top">
			<Skeleton width="50%" height="40px" />
			<Skeleton width="40%" height="20px" />
		</div>
		<Skeleton width="100%" height="5px" />
	</div>
	<div class="card podium-card" style="height: 120px;">
		<div class="podium-skeleton-top">
			<Skeleton width="50%" height="40px" />
			<Skeleton width="40%" height="20px" />
		</div>
		<Skeleton width="100%" height="5px" />
	</div>
	<div class="card podium-card" style="height: 80px;">
		<div class="podium-skeleton-top">
			<Skeleton width="50%" height="40px" />
			<Skeleton width="40%" height="20px" />
		</div>
		<Skeleton width="100%" height="5px" />
	</div>
</div>

<style>
	.podium-skeleton-container {
		position: relative;
		display: flex;
		align-items: flex-end;
		justify-content: space-between;
		gap: 21px;
	}

	.podium-card {
		flex: 1;
		display: flex;
		flex-direction: column;
		align-items: center;
		justify-content: space-between;
		gap: 5px;
	}

	.podium-skeleton-top {
		width: 100%;
		display: flex;
		flex-direction: column;
		align-items: center;
		gap: 5px;
	}
</style>
