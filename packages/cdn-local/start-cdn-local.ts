#!/usr/bin/env node

import { createServer } from 'http-server';
import * as path from 'path';

const PORT = 3001;

const server = createServer({ root: path.resolve(__dirname, 'cdn') });
server.listen(PORT, 'localhost');

console.log(`started cdn-local on http://localhost:${PORT}`);
