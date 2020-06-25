#!/usr/bin/env node

import { createServer } from 'http-server';
import * as path from 'path';

const PORT = 8576;

const server = createServer({
  root: path.resolve(__dirname),
  cors: true
});

(server as any).server.on('error', (error: { code: string }) => {
  if (error.code === 'EADDRINUSE') {
    console.log(`cdn-pwcm port is already in use. maybe it's already started. doing nothing...`);
    setInterval(() => {}, 1 << 30); // https://stackoverflow.com/a/47456805
  }
});

(server as any).server.on('listen', () => {
  console.log(`started cdn-local on http://localhost:${PORT}`);
});

server.listen(PORT, 'localhost');
