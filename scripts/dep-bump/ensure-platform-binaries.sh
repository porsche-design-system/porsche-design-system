#!/usr/bin/env bash
# Reconcile platform-gated native binaries for the CURRENT platform.
#
# Why this exists: preflight runs `npm ci` on the HOST (macOS/darwin), so npm only
# materializes the host's platform-gated optionalDependencies (`@esbuild/darwin-*`,
# `syncpack-darwin-*`). The update stage's agent runs in a linux-arm64 sandbox against
# that same mounted node_modules, where `@esbuild/linux-arm64` / `syncpack-linux-arm64`
# are absent — so every `tsx` (tsx -> esbuild) and `syncpack` call throws
# "you installed X for another platform". This reconciles the sandbox's binaries before
# any such call, deterministically, so the agent never hand-patches node_modules.
#
# Safe by construction:
# - Probe-guarded: a strict no-op whenever the current platform's binaries already work
#   (host, native-linux CI, re-entry in the same container) — a healthy tree is untouched.
# - Lock-neutral: package-lock.json (v3) already enumerates every platform's optional
#   packages with os/cpu + integrity, so materializing this platform's set never needs a
#   lockfile edit; we snapshot-and-restore the lock as a defensive guarantee (no git needed).
set -uo pipefail

# Exercise the actual native binaries (not directory existence): npm can exit 0 while an
# optional binary stays absent, and a present-but-wrong-platform binary must also fail.
probe() {
  node -e "require('esbuild').transformSync('const x:number=1',{loader:'ts'})" >/dev/null 2>&1 \
    && node_modules/.bin/syncpack --version >/dev/null 2>&1
}

if probe; then
  exit 0
fi

echo "[ensure-platform-binaries] native binaries missing for $(node -p process.platform)-$(node -p process.arch); reconciling" >&2

LOCK="package-lock.json"
LOCK_SNAPSHOT=""
if [ -f "$LOCK" ]; then
  LOCK_SNAPSHOT="$(mktemp)"
  cp "$LOCK" "$LOCK_SNAPSHOT"
fi

restore_lock() {
  # Defensive: materializing already-locked optional packages must not churn the lock.
  # If npm rewrote it anyway, restore the pristine snapshot so reproducibility holds
  # (git may be unavailable in-sandbox, so we cannot rely on `git checkout`).
  if [ -n "$LOCK_SNAPSHOT" ] && ! cmp -s "$LOCK" "$LOCK_SNAPSHOT"; then
    echo "[ensure-platform-binaries] npm install touched $LOCK; restoring pristine lockfile" >&2
    cp "$LOCK_SNAPSHOT" "$LOCK"
  fi
  [ -n "$LOCK_SNAPSHOT" ] && rm -f "$LOCK_SNAPSHOT"
}

# `--no-save` keeps package.json untouched; the install only pulls this platform's
# already-locked optional packages. Retry once for transient/network reasons.
if ! npm install --no-audit --no-fund --no-save; then
  echo "[ensure-platform-binaries] npm install failed; retrying once" >&2
  sleep 5
  if ! npm install --no-audit --no-fund --no-save; then
    restore_lock
    echo "[ensure-platform-binaries] npm install failed twice; cannot reconcile platform binaries" >&2
    exit 2
  fi
fi

restore_lock

# Re-probe as the real postcondition: a clean npm exit does not guarantee the binaries landed.
if ! probe; then
  echo "[ensure-platform-binaries] reconcile ran but esbuild/syncpack still fail for this platform" >&2
  exit 2
fi

echo "[ensure-platform-binaries] platform binaries reconciled" >&2
exit 0
