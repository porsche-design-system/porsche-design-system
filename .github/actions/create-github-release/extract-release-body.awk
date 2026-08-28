# Extracts the GitHub Release body for a given stable version from a
# "Keep a Changelog" style changelog.
#
# Usage: awk -v version="4.0.0" -f extract-release-body.awk CHANGELOG.md
#
# Collection starts at the heading "## [${version}]" and continues through any
# subsequent pre-release headings of the same base version (e.g. "## [4.0.0-rc.2]");
# it stops at the next stable heading or EOF.
#
# Sections under "### Heading" (e.g. "### Added", "### Changed", "### Fixed") from
# the stable version and all related pre-releases are merged so that each heading
# appears only once in the resulting release body, with their items concatenated in
# chronological (file) order.
#
# Shared by:
# - .github/actions/create-github-release/create-github-release.sh (CI)
# - scripts/backfill-github-releases.ts (one-off backfill of legacy releases)

BEGIN { collecting = 0; section = ""; n = 0 }

/^## \[/ {
  # Extract the version inside the first "[...]" pair on the heading line.
  line = $0
  sub(/^## \[/, "", line)
  sub(/\].*$/, "", line)
  v = line
  if (collecting == 0) {
    if (v == version) { collecting = 1; section = ""; next }
    next
  }
  # Already collecting: stop at the next stable heading (no pre-release suffix).
  if (v !~ /-/) { collecting = 0; next }
  # Otherwise it is a related pre-release; keep its content but drop the heading.
  section = ""
  next
}

{
  if (collecting != 1) next
  if ($0 ~ /^### /) {
    section = $0
    if (!(section in seen)) {
      seen[section] = 1
      order[n++] = section
    }
    next
  }
  if (section == "") {
    # Content before any "### " heading (rare); bucket under empty key.
    if (!("" in seen)) { seen[""] = 1; order[n++] = "" }
  }
  bucket[section] = bucket[section] $0 ORS
}

END {
  for (i = 0; i < n; i++) {
    key = order[i]
    body = bucket[key]
    # Trim leading/trailing blank lines from each bucket.
    sub(/^(\n)+/, "", body)
    sub(/[[:space:]]+$/, "", body)
    if (key != "") {
      # Collapse the blank lines introduced by merging the same "### " section of
      # several pre-releases, so the list renders as one coherent block.
      gsub(/\n\n+/, "\n", body)
      print key
    }
    if (body != "") print body
    if (i < n - 1) print ""
  }
}


