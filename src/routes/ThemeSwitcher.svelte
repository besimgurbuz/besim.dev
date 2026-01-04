<script lang="ts">
	import closedLamp from '$lib/images/lamp_closed.svg';
	import openedLamp from '$lib/images/lamp_opened.svg';
	import { theme } from './store';

	let isLightTheme = $derived($theme === 'light');
	let iconSource = $derived(isLightTheme ? openedLamp : closedLamp);
</script>

<button onclick={() => theme.set(isLightTheme ? 'dark' : 'light')}>
	<img src={iconSource} alt="Theme switcher" />
</button>

<style>
	button {
		display: flex;
		justify-content: flex-end;
		width: 28px;
		height: 28px;
		cursor: pointer;
		padding: 2px;
		border: none;
		padding: 0;
		background-color: transparent;
	}
	button > img {
		transition: 30000ms;
	}
</style>
