#!/usr/bin/env bash
#
# ng-update.sh — run Angular's `ng update` inside this monorepo.
#
# Why a wrapper?
#   Running `ng update` directly in `packages/components-angular` fails:
#     * Dependencies are HOISTED to the repo-root `node_modules`, so this package has no
#       local `node_modules` and `ng update` reports `Found 0 dependencies`.
#     * `ng update` queries the npm registry for every dependency, including the UNPUBLISHED
#       private workspace packages (`@porsche-design-system/shared@0.0.0`,
#       `@porsche-design-system/assets`, `@porsche-design-system/components-angular`), which
#       aborts the run with a `404 Not Found`.
#
#   This wrapper works around both by running `ng update` in an isolated, throwaway install
#   that contains ONLY the public Angular tooling (private `@porsche-design-system/*` deps are
#   stripped out). For `--migrate-only` runs the migrated source is copied back into the real
#   project(s); version ranges in `package.json` / the lockfile are left to `syncpack`.
#
# Targets (kept in lockstep):
#   1. The Angular test project ........ packages/components-angular
#   2. The StackBlitz Angular starter .. packages/storefront/projects/stackblitz/src/angular
#
# Usage:
#   npm run ng:update                                  # list available updates/migrations (read-only)
#   npm run ng:update -- @angular/core @angular/cli --migrate-only --from=<old> --to=<new>
#
set -euo pipefail

SCRIPT_DIR="$(cd "$(dirname "${BASH_SOURCE[0]}")" && pwd)"
PACKAGE_DIR="$(cd "$SCRIPT_DIR/.." && pwd)"
REPO_ROOT="$(cd "$PACKAGE_DIR/../.." && pwd)"

# Angular projects that must stay on the same Angular version. The first entry is also used
# for the read-only listing mode.
ANGULAR_PROJECTS=(
  "$PACKAGE_DIR"
  "$REPO_ROOT/packages/storefront/projects/stackblitz/src/angular"
)

# Paths inside a throwaway install that must never be copied in or back out.
RSYNC_EXCLUDES=(
  --exclude '.git'
  --exclude 'node_modules'
  --exclude 'dist'
  --exclude '.angular'
  --exclude 'tmp'
  --exclude 'out-tsc'
  --exclude 'bazel-out'
)

log() {
  echo "[ng-update] $*"
}

# Track the active throwaway directory so it is always cleaned up, even on error.
CURRENT_TMP=""
cleanup() {
  [[ -n "$CURRENT_TMP" && -d "$CURRENT_TMP" ]] && rm -rf "$CURRENT_TMP"
  CURRENT_TMP=""
}
trap cleanup EXIT

# Write a minimal package.json that keeps every public dependency but drops the unpublished
# private workspace packages that would make `ng update` fail with a registry 404.
write_filtered_package_json() {
  local src="$1" dest="$2"
  node -e '
    const fs = require("node:fs");
    const pkg = JSON.parse(fs.readFileSync(process.argv[1], "utf8"));
    const keep = (deps = {}) =>
      Object.fromEntries(
        Object.entries(deps).filter(([name]) => !name.startsWith("@porsche-design-system/"))
      );
    const out = {
      name: (pkg.name || "ng-update-tmp").replace(/[^a-z0-9._@/-]/gi, "-"),
      version: "0.0.0",
      private: true,
      dependencies: keep(pkg.dependencies),
      devDependencies: keep(pkg.devDependencies),
    };
    fs.writeFileSync(process.argv[2], JSON.stringify(out, null, 2) + "\n");
  ' "$src" "$dest"
}

# Prepare an isolated, installable copy of an Angular project in a throwaway directory and
# echo the directory path. The caller is responsible for cleaning it up.
prepare_isolated_install() {
  local project="$1"
  local tmp
  tmp="$(mktemp -d "${TMPDIR:-/tmp}/ng-update.XXXXXX")"

  log "Copying project source into isolated install: $tmp" >&2
  rsync -a "${RSYNC_EXCLUDES[@]}" "$project/" "$tmp/"

  # Replace the real package.json (with its unpublished private deps) by a filtered one.
  write_filtered_package_json "$project/package.json" "$tmp/package.json"
  rm -f "$tmp/package-lock.json"

  log "Installing public Angular tooling (this may take a while)…" >&2
  (cd "$tmp" && npm install --no-audit --no-fund >&2)

  # `ng update` requires a clean git tree; give the throwaway its own committed baseline so
  # the migration diff is contained to the schematics' changes. node_modules is ignored via
  # .git/info/exclude (kept inside .git, never copied back) to keep the baseline fast.
  (
    cd "$tmp"
    git init --quiet
    printf 'node_modules/\n' >> .git/info/exclude
    git add -A
    GIT_AUTHOR_NAME=ng-update GIT_AUTHOR_EMAIL=ng-update@local \
      GIT_COMMITTER_NAME=ng-update GIT_COMMITTER_EMAIL=ng-update@local \
      git commit --quiet --no-gpg-sign -m "baseline" >&2
  )

  echo "$tmp"
}

run_ng() {
  local tmp="$1"
  shift
  (cd "$tmp" && ./node_modules/.bin/ng "$@")
}

# Whether the forwarded arguments request an actual migration (vs. read-only listing).
is_migrate_only=false
for arg in "$@"; do
  if [[ "$arg" == "--migrate-only" ]]; then
    is_migrate_only=true
    break
  fi
done

if [[ "$is_migrate_only" == false ]]; then
  # Read-only listing: a single isolated install is enough to report available updates.
  project="${ANGULAR_PROJECTS[0]}"
  log "Listing available Angular updates/migrations for: ${project#"$REPO_ROOT/"}"
  CURRENT_TMP="$(prepare_isolated_install "$project")"
  run_ng "$CURRENT_TMP" update "$@"
  cleanup
  exit 0
fi

# Migration mode: apply the schematics to every Angular project and copy the migrated source
# back into the repo (leaving package.json / lockfile to syncpack).
for project in "${ANGULAR_PROJECTS[@]}"; do
  log "Applying Angular migrations to: ${project#"$REPO_ROOT/"}"
  CURRENT_TMP="$(prepare_isolated_install "$project")"

  run_ng "$CURRENT_TMP" update "$@"

  log "Copying migrated source back into: ${project#"$REPO_ROOT/"}"
  rsync -a "${RSYNC_EXCLUDES[@]}" \
    --exclude 'package.json' \
    --exclude 'package-lock.json' \
    "$CURRENT_TMP/" "$project/"

  cleanup
done

log "Done. Review the migration diff with: git diff ${ANGULAR_PROJECTS[*]#"$REPO_ROOT/"}"


