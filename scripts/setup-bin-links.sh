#!/bin/bash
# Setup bin links for workspace packages.
#
# npm workspaces has a known issue where bin links for workspace packages
# are sometimes not created or lose their executable permissions — especially
# when node_modules are restored from cache instead of a fresh `npm install`.
#
# This script manually creates the symlinks and sets executable permissions
# as a workaround. It is called from:
#   - postinstall (local development, see root package.json)
#   - .github/actions/restore (CI, after restoring cached node_modules)
#
# The bin entries are declared in:
#   - packages/assets/package.json ("serve-cdn")
#   - packages/shared/package.json ("serve-dummyassets", "prepare-vrt-snapshots")

chmod +x ./packages/assets/bin/serve-cdn.js ./packages/shared/bin/serve-dummyassets.js ./packages/shared/bin/prepareVRTSnapshots.js 2>/dev/null
ln -sf ../../packages/assets/bin/serve-cdn.js ./node_modules/.bin/serve-cdn 2>/dev/null
ln -sf ../../packages/shared/bin/serve-dummyassets.js ./node_modules/.bin/serve-dummyassets 2>/dev/null
ln -sf ../../packages/shared/bin/prepareVRTSnapshots.js ./node_modules/.bin/prepare-vrt-snapshots 2>/dev/null
true
