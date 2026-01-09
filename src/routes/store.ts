import type { Pathname } from '$app/types';
import { readable, writable } from 'svelte/store';

export type Route = {
	pathname: Pathname;
	label: string;
};
export type Theme = 'dark' | 'light';

export const theme = writable<Theme>('dark');

export const routes = readable<Route[]>([
	{ pathname: '/my-skills', label: 'My Skills' },
	{ pathname: '/gaming', label: 'My Gaming Journey' },
	{ pathname: '/contact', label: 'Contact' }
]);

export const dateTimeFormat = readable<Intl.DateTimeFormat>(
	new Intl.DateTimeFormat('en-US', {
		month: 'short',
		day: 'numeric',
		year: 'numeric'
	})
);
