import { register } from 'node:module';

// Registered with `--import`, after `tsx`, so the hooks handle `.mdx` and component folders and pass everything else on
// to it.
register('./hooks.mjs', import.meta.url);
