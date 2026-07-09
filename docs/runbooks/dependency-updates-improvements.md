# Dependency-update workflow — improvement proposals

Structural improvements identified from a failed run post-mortem. The prompt/skill and gate fixes (Tranches A and B) are
already shipped in `.turbo-spec/`. This document records the **deferred, structural** work (Tranche C) and the
**upstream, out-of-scope** items (Tranche D) so they are not lost. Nothing here is wired into the workflow yet.

## Background: the failure this addresses

A run resolved a hard Angular + ag-grid ERESOLVE correctly, then failed at the `consistency` gate. The resolver had
pinned `@angular/core`/`@angular/common` via a **blanket root override** at `22.0.6` while the plan froze `^22.0.5`.
Because the `consistency` stage was agent-less with `on_fail: loop_back`, it re-ran the same deterministic check three
times before failing.

### Phase 0 findings (empirical, syncpack 15.3.2)

`.syncpackrc.json` defines no `versionGroups`/`semverGroups`. A scratch spike established, and this is the load-bearing
fact for everything below:

- **A blanket top-level override on a dep that is also _declared_ is equality-unsafe.**
  `overrides["@angular/core"] = "22.0.6"` (declared `^22.0.4` in `components-angular` and a stackblitz workspace) makes
  `syncpack lint` report a `DiffersToHighestOrLowestSemver` mismatch, and `syncpack fix` — run in the `consistency`
  pre_command — **rewrites the declared `^22.0.4` → `22.0.6`** highest-wins. `verify-equality` then reports
  `unplanned dependency changed`.
- **A scoped nested override is safe.** `overrides["@angular/build"] = {"@angular/core": "22.0.6"}` creates no declared
  mismatch; declared ranges are untouched.
- **A blanket override on a pure transitive dep (declared nowhere) is safe** — the existing security-pin pattern (`ejs`,
  `braces`, `minimatch@*`).

**Rule (now encoded in the resolver skill/prompt):** when the conflicting package is a declared/plan dependency, use a
scoped `"consumer > dep"` override, never a blanket top-level pin; a blanket pin is only for pure transitives; never
edit a declared range.

## What already shipped (context)

- **A** — resolver skill/prompt now encode the equality-safety rule, the "npm reports only the first ERESOLVE" reality,
  trust-the-captured-artifact, an iteration budget, and an escape protocol that writes `resolve-diagnostic.json`.
  `pds-facts` gained an "Environment invariants" section (git unavailable in the sandbox; clean installs omit platform
  optionals).
- **B1** — `verify-equality` (no-drift) added as a second step in both resolve gates, so a resolver that **directly**
  edits a declared range loops back to the agent immediately instead of failing two stages later.
- **B2** — the agent-less `consistency` gate flipped from `loop_back` to `escalate`: re-running a deterministic check
  cannot change its inputs.

## Tranche C — structural proposals (not yet built)

### C1. The architectural tension

Three mechanisms disagree about what a dependency version "is":

1. **Overrides resolution** wants to pin a transitive/peer version.
2. **`syncpack fix`** aligns declared versions cross-workspace, highest-wins.
3. **`verify-equality`** demands each declared string equal the frozen plan exactly.

The equality-safety rule (A) resolves the common case by discipline. Deeper options, in increasing order of change:

- **(i) Overrides-only discipline** — shipped in A. Cheap, but relies on the agent obeying the rule.
- **(ii) Exempt sanctioned deps from equality** — when a recorded override exists for a dep, let `verify-equality`
  accept a declared value derived from that override instead of the plan. More permissive; risks masking real drift.
- **(iii) Compare resolved-satisfies-range instead of exact string** — change `verify-equality` to accept any declared
  string whose resolved version satisfies the plan's intent. Largest change; weakens the frozen-target guarantee.

Recommendation: keep (i); consider (iii) only if frozen-exact proves too rigid in practice.

### C2. Predict-syncpack drift gate (successor to B1)

B1 runs **before** `consistency`'s `syncpack fix`, so it catches only _direct_ declared edits — not the
blanket-override-then-propagation case, where declared strings are still correct at resolve time. Proposal: add a
deterministic `syncpack lint`-based check at the resolve gate that **predicts** the highest-wins propagation and fails
when a recorded override would drift a declared range. This catches the residual case early (at the agent that can fix
it) rather than at `consistency`. Requires distinguishing resolver-introduced mismatches from pre-existing benign ones,
so scope it to the deps named in `overrides-added.json`.

### C3. resolve → decide replan-escalation path

Today `loop_back` only re-runs the **same** stage. When a conflict is unsatisfiable under the frozen plan (e.g. a
held-back peer forbids a major bump another dep needs), the resolver's only correct move is to ask `decide` to drop or
adjust the offending family — which the engine cannot currently express. Proposal: a cross-stage "replan" signal that
routes `resolve → decide` carrying the `resolve-diagnostic.json` the escape protocol (A5) already writes. Needs
turbo-spec engine support for conditional back-routing beyond same-stage `loop_back`.

### C4. Proactive collision detection in `decide`

The observed run's root cause was plannable up front: ag-grid `36` collided with `@porsche-design-system/*@4.4.0-rc.0`'s
`peerOptional ag-grid <36`, and Angular `22.0.6` vs a frozen `^22.0.5`. Proposal: a `check-collisions` planner aid that
inspects the frozen plan against held-back peers and known peer ranges, and defers a colliding family so the plan is
satisfiable under the gates before any install runs. This turns a mid-pipeline ERESOLVE into a planning-time decision.

## Tranche D — out of scope (upstream / engine)

These live outside `.turbo-spec/`; flag to the turbo-spec maintainers:

- **Per-stage sandbox re-setup** (e.g. `apt-get install rsync` every stage). Bake tools into the sandbox image / a
  prebuilt `TURBO_SPEC_SANDBOX_IMAGE`.
- **Session-state budget / trace growth** — engine configuration.
- **Sandbox git worktree** — `.git` points at the host worktree, unavailable in the container. A mounted
  `.git/worktrees/<name>` or an in-container gitdir rewrite would let agents use git; until then, agents must not
  (documented in `pds-facts`).

## Priority

C4 (collision detection) prevents the largest class of failures and is the highest value. C2 (predict-syncpack) is a
targeted safety net once C4 exists. C1 and C3 are larger, engine-dependent, and should follow.
