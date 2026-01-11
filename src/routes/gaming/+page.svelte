<script lang="ts">
	import type { Pathname } from '$app/types';
	import type { CombinedGameAchivement } from '$lib/models/achivements';
	import Achivements from './Achivements.svelte';
	import AchivementsSkeleton from './AchivementsSkeleton.svelte';
	import Podium from './Podium.svelte';
	import PodiumSkeleton from './PodiumSkeleton.svelte';
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
			Gaming plays an important role in my life. My entire software journey started with a simple
			question: how can I make a game and add a <a
				target="_blank"
				href="https://en.wikipedia.org/wiki/Tofa%C5%9F">“Tofaş”</a
			>; the legend of the Turkish automotive industry.
		</p>
		<p class="passion-text fade-out">This section is solely dedicated to my passion for gaming.</p>
		<p class="passion-text fade-out">P.S. In the end I was able to make one and add my “Tofaş”.</p>
		<p class="passion-text fade-out">P.P.S No, I’m not giving away my digital “Tofaş”.</p>
	</div>
	{#await combinedAchivementsPromise}
		<StatsCardsSkeleton />
		<PodiumSkeleton />
		<AchivementsSkeleton />
	{:then combinedAchivements}
		<StatsCard {combinedAchivements} />
		<Podium games={combinedAchivements.goats} />
		<Achivements achivements={combinedAchivements.achivements} />
	{:catch}
		<p>An error occurred while trying to fetch my gaming journey. Please try again later.</p>
	{/await}
</div>

<style>
	.gaming-journey-container {
		width: 100%;
		margin-top: 110px;
		display: flex;
		flex-direction: column;
		gap: 48px;
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
</style>
