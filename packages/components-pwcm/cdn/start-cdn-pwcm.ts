#!/usr/bin/env node

/**
 * todo: this server is quite a little bit redundant with cdn-local
 * package. let's see after everything is merged if we can combine it.
 */

import { createServer } from 'http-server';
import * as path from 'path';

const PORT = 8576;

const server = createServer({
  root: path.resolve(__dirname),
  cors: true
});

(server as any).server.on('error', (error: { code: string }) => {
  if (error.code === 'EADDRINUSE') {
    console.log(`cdn-pwcm port ${PORT} is already in use. maybe it's already started. doing nothing...`);
    // interval keeps the process alive in order to not kill other scripts with concurrently
    setInterval(() => {}, 1 << 30); // https://stackoverflow.com/a/47456805
  }
});

// @ts-ignore
server.listen(PORT, () => console.log(`started cdn-pwcm on http://localhost:${PORT}`));
