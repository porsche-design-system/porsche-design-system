#!/usr/bin/env node

import { runCommand } from '../src/main';
const [,,...cliParameters] = process.argv;

runCommand(cliParameters).catch((error: Error) => {
  console.error(`Some unexpected error occured.\n`, error);
});
