#!/usr/bin/env node

import { createServer } from 'http-server';
import * as path from 'path';

const PORT = 3001;

const server = createServer({
  root: path.resolve(__dirname, 'cdn'),
  cors: true
});

(server as any).server.on('error', (error: { code: string }) => {
  if (error.code === 'EADDRINUSE') {
    console.log(`cdn-local port ${PORT} is already in use. maybe it's already started. doing nothing...`);
    // interval keeps the process alive in order to not kill other scripts with concurrently
    setInterval(() => {}, 1 << 30); // https://stackoverflow.com/a/47456805
  }
});

// @ts-ignore
server.listen(PORT, () => console.log(`started cdn-local on http://localhost:${PORT}`));
