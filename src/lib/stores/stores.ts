import { browser } from '$app/environment';
import type { Metadata } from '$lib/types/types';
import { writable } from 'svelte/store';

export const currentPageTitle = writable('');
export const selectedItem = writable<Metadata>();
