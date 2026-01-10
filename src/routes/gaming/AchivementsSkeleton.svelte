<script>
	import Skeleton from '../Skeleton.svelte';
</script>

<div class="achivement-skeleton-container">
	<div class="card achivement-card">
		<Skeleton width="120px" height="120px" />
		<div class="achivement-body">
			<Skeleton width="200px" height="30px" />
			<div class="achivement-bottom">
				<div class="trophy-group-skeleton">
					<Skeleton width="30px" height="40px" />
					<Skeleton width="30px" height="40px" />
					<Skeleton width="30px" height="40px" />
					<Skeleton width="30px" height="40px" />
				</div>
				<Skeleton height="8px" />
			</div>
		</div>
	</div>
	<div class="card achivement-card">
		<Skeleton width="120px" height="120px" />
		<div class="achivement-body">
			<Skeleton width="200px" height="30px" />
			<div class="achivement-bottom">
				<div class="trophy-group-skeleton">
					<Skeleton width="30px" height="40px" />
					<Skeleton width="30px" height="40px" />
					<Skeleton width="30px" height="40px" />
					<Skeleton width="30px" height="40px" />
				</div>
				<Skeleton height="8px" />
			</div>
		</div>
	</div>
	<div class="card achivement-card">
		<Skeleton width="120px" height="120px" />
		<div class="achivement-body">
			<Skeleton width="200px" height="30px" />
			<div class="achivement-bottom">
				<div class="trophy-group-skeleton">
					<Skeleton width="30px" height="40px" />
					<Skeleton width="30px" height="40px" />
					<Skeleton width="30px" height="40px" />
					<Skeleton width="30px" height="40px" />
				</div>
				<Skeleton height="8px" />
			</div>
		</div>
	</div>
	<div class="card achivement-card">
		<Skeleton width="120px" height="120px" />
		<div class="achivement-body">
			<Skeleton width="200px" height="30px" />
			<div class="achivement-bottom">
				<div class="trophy-group-skeleton">
					<Skeleton width="30px" height="40px" />
					<Skeleton width="30px" height="40px" />
					<Skeleton width="30px" height="40px" />
					<Skeleton width="30px" height="40px" />
				</div>
				<Skeleton height="8px" />
			</div>
		</div>
	</div>
</div>

<style>
	.achivement-skeleton-container {
		display: flex;
		flex-direction: column;
		gap: 20px;
	}

	.achivement-card {
		width: 100%;
		display: flex;
		gap: 1rem;
	}

	.achivement-body {
		width: 100%;
		flex: 1;
		display: flex;
		flex-direction: column;
		justify-content: space-between;
	}

	.trophy-group-skeleton {
		display: flex;
		gap: 1rem;
	}
</style>
