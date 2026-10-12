import { register } from 'node:module';

// Registered with `--import`, after `tsx`, so the hook handles `.mdx` and passes everything else on to it.
register('./hooks.mjs', import.meta.url);
