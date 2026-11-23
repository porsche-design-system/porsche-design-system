import { it } from 'vitest';

// Every test is skipped, so Vitest runs no afterAll in this file and the guard never reports it.
console.warn('all skipped import time');

it.skip('skipped', () => {});
