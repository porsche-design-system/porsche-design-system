#!/usr/bin/env node
import { PATHS, prepareRelease, run } from './prepare-release';

(function main() {
  prepareRelease('prepare-release-components', PATHS.components, (NEW_VERSION) => {
    // Update components version
    run(`yarn version --no-git-tag-version --new-version "${NEW_VERSION}"`, PATHS.components);
    // Update components-js wrapper version
    run(`yarn version --no-git-tag-version --new-version "${NEW_VERSION}"`, PATHS.componentsJsWrapper);
  });
})();
