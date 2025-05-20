#!/usr/bin/env node
import { PATHS, prepareRelease, run } from './prepare-release';

(function main() {
  prepareRelease('prepare-release-assets', PATHS.assets, (NEW_VERSION) =>
    run(`yarn version --no-git-tag-version --new-version "${NEW_VERSION}"`, PATHS.assets)
  );
})();
