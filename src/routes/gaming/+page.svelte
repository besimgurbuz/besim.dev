<script lang="ts">
	import type { Pathname } from '$app/types';
	import { GamePlatform, type CombinedGameAchivement } from '$lib/models/achivements';
	import Percentage from './Percentage.svelte';
	import Podium from './Podium.svelte';
	import StatsCard from './StatsCard.svelte';
	import StatsCardsSkeleton from './StatsCardSkeleton.svelte';

	const fetchAchivements = async () => {
		const res = await fetch('/api/game-achivements' as Pathname);
		const combinedAchivements = (await res.json()) as CombinedGameAchivement;

		return combinedAchivements;
	};

	const combinedAchivementsPromise = fetchAchivements();
</script>

<svelte:head>
	<title>Besim Gürbüz • My Gaming Journey</title>

	<meta name="twitter:title" content="Besim Gürbüz" />
	<meta name="twitter:description" content="Besim Gürbüz • My Gaming Journey" />
	<meta name="Description" content="Besim Gürbüz • My Gaming Journey" />
</svelte:head>

<div class="gaming-journey-container">
	<div class="p-container">
		<p class="passion-text fade-out">
			Gaming plays a crucial role in my life. My whole software journey started with a simple
			question of how can I make a game and add a <a
				target="_blank"
				href="https://en.wikipedia.org/wiki/Tofa%C5%9F">“Tofaş”</a
			>; a legend in Turkish Automotive Industry.
		</p>
		<p class="passion-text fade-out">This section is solely dedicated to my gaming passion.</p>
		<p class="passion-text fade-out">P.S. in the end I was able to make one and add my “Tofaş”.</p>
		<p class="passion-text fade-out">P.P.S no, I’m not giving away my digital “Tofaş”</p>
	</div>
	{#await combinedAchivementsPromise}
		<StatsCardsSkeleton />
	{:then combinedAchivements}
		<StatsCard {combinedAchivements} />
		<Podium games={combinedAchivements.goats} />
		<div class="achivements">
			<h2>My Achivements</h2>
			{#each combinedAchivements.achivements as achivement (achivement.gameName)}
				<div class="card achivement">
					<img
						class="achivement-img"
						src={achivement.gameHeaderUrl}
						alt="{achivement.gameName} header image"
					/>
					<div class="achivement-body">
						<h3 class="achivement-title">{achivement.gameName}</h3>
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
					</div>
				</div>
			{/each}
		</div>
	{/await}
</div>

<style>
	.gaming-journey-container {
		width: 100%;
		margin-top: 110px;
		display: flex;
		flex-direction: column;
		gap: 60px;
	}

	.p-container {
		max-width: 1100px;
		display: flex;
		flex-direction: column;
		gap: 20px;
	}

	.passion-text {
		font-size: 1.5rem;
	}

	.achivements {
		display: flex;
		flex-direction: column;
		gap: 20px;
	}

	.achivement {
		display: flex;
		gap: 1rem;
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
</style>
