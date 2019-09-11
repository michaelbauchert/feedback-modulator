import { writable } from 'svelte/store';

export const touches = writable([{x: 0, y: 0, wet: 0},
                                 {x: 0, y: 0, wet: 0},
                                 {x: 0, y: 0, wet: 0},
                                 {x: 0, y: 0, wet: 0},
                                 {x: 0, y: 0, wet: 0}]);
