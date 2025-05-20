#!/usr/bin/env node

import { PATHS, prepareRelease } from './prepare-release';

(function main() {
  prepareRelease('prepare-release-assets', PATHS.assets);
})();
