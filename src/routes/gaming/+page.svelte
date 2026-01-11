<script lang="ts">
	import type { Pathname } from '$app/types';
	import { GamePlatform, type CombinedGameAchivement } from '$lib/models/achivements';
	import ActivitySkeleton from '../ActivitySkeleton.svelte';
	import Achivements from './Achivements.svelte';
	import AchivementsSkeleton from './AchivementsSkeleton.svelte';
	import Percentage from './Percentage.svelte';
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
		<PodiumSkeleton />
		<AchivementsSkeleton />
	{:then combinedAchivements}
		<StatsCard {combinedAchivements} />
		<Podium games={combinedAchivements.goats} />
		<Achivements achivements={combinedAchivements.achivements} />
	{/await}
</div>

<style>
	.gaming-journey-container {
		width: 100%;
		margin-top: 60px;
		display: flex;
		flex-direction: column;
		gap: 30px;
	}

	.p-container {
		max-width: 1100px;
		display: flex;
		flex-direction: column;
		gap: 16px;
	}

	.passion-text {
		font-size: 1rem;
		line-height: 1.6;
	}

	/* Tablet breakpoint */
	@media (min-width: 768px) {
		.gaming-journey-container {
			margin-top: 80px;
			gap: 45px;
		}

		.p-container {
			gap: 18px;
		}

		.passion-text {
			font-size: 1.25rem;
		}
	}

	/* Desktop breakpoint */
	@media (min-width: 1024px) {
		.gaming-journey-container {
			margin-top: 110px;
			gap: 60px;
		}

		.p-container {
			gap: 20px;
		}

		.passion-text {
			font-size: 1.5rem;
		}
	}
</style>
