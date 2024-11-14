#!/usr/bin/env node

import * as path from 'path';
import { createServer } from 'http-server';

const PORT = 3001;

const server = createServer({
  root: path.resolve(__dirname, '../cdn'),
  cors: true,
});

(server as any).server.on('error', (error: { code: string }) => {
  if (error.code === 'EADDRINUSE') {
    // biome-ignore lint/suspicious/noConsole: ok
    console.log(`CDN port ${PORT} is already in use. Maybe it's already started. Doing nothing…`);
    // interval keeps the process alive in order to not kill other scripts with concurrently
    // biome-ignore lint/suspicious/noEmptyBlockStatements: ok
    setInterval(() => {}, 1 << 30); // https://stackoverflow.com/a/47456805
  }
});

// @ts-ignore
server.listen(PORT, () => console.log(`Started CDN on http://localhost:${PORT}`));
