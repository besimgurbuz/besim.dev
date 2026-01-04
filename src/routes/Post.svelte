<script lang="ts">
	import { dateTimeFormat } from './store';

	interface Props {
		title: string;
		url: string;
		categories: string[];
		publishDate: string;
	}

	let {
		title,
		url,
		categories,
		publishDate
	}: Props = $props();

	let date = $derived($dateTimeFormat.format(new Date(publishDate)));
	let subText = $derived(categories.map((category) => `#${category}`).join(', '));
</script>

<div class="card post">
	<div class="header">
		<a href={url} target="_blank" rel="noreferrer" class="title" {title}>{title}</a>
		<p class="publish-date" title={publishDate.toString()}>{date}</p>
	</div>
	<div class="subText" title={subText}>{subText}</div>
</div>

<style>
	.post {
		display: flex;
		font-size: 18px;
		flex-direction: column;
	}

	.header {
		display: flex;
		justify-content: space-between;
		grid-gap: 1rem;
	}

	.title {
		margin: 0;
		white-space: nowrap;
		overflow: hidden;
		text-overflow: ellipsis;
	}

	.publish-date {
		margin: 0;
		font-size: 16px;
		color: #797979;
		white-space: nowrap;
	}

	.subText {
		font-size: 16px;
		color: #797979;
		white-space: nowrap;
		overflow: hidden;
		text-overflow: ellipsis;
	}
</style>
