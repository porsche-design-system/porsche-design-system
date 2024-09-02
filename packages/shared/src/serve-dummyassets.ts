#!/usr/bin/env node

import { createServer } from 'http-server';
import * as path from 'path';

const PORT = 3002;

const server = createServer({
  root: path.resolve(__dirname, '../dist/dummyassets'),
  cors: true,
});

(server as any).server.on('error', (error: { code: string }) => {
  if (error.code === 'EADDRINUSE') {
    console.log(`CDN port ${PORT} is already in use. Maybe it's already started. Doing nothing…`);
    // interval keeps the process alive in order to not kill other scripts with concurrently
    setInterval(() => {}, 1 << 30); // https://stackoverflow.com/a/47456805
  }
});

// @ts-ignore
server.listen(PORT, () => console.log(`Started dummyassets on http://localhost:${PORT}`));
