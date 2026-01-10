<script>
	import Skeleton from '../Skeleton.svelte';
</script>

<div class="card stats-skeleton">
	<Skeleton width="55px" height="64px" borderRadius="10%" />
	<Skeleton width="55px" height="64px" borderRadius="10%" />
	<Skeleton width="105px" height="64px" borderRadius="10%" />
	<Skeleton width="70px" height="70px" borderRadius="50%" />
	<Skeleton width="42px" height="70px" borderRadius="10%" />
	<Skeleton width="42px" height="70px" borderRadius="10%" />
	<Skeleton width="42px" height="70px" borderRadius="10%" />
	<Skeleton width="42px" height="70px" borderRadius="10%" />
</div>

<style>
	.stats-skeleton {
		display: flex;
		width: 700px;
		height: 70px;
		align-items: center;
		justify-content: space-between;
		align-self: center;
	}
</style>
