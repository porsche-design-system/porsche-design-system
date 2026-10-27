- When reviewing a pull request, apply the `.github/skills/code-review-changelog` skill — including when the pull
  request does not touch the changelog at all, since a missing entry is the most common error
- Review each change against the rules in the `AGENTS.md` its pointer names (what code must, must not or should use).
  Treat that file's descriptions, commands and folder layouts as context, not as review findings.
- Check every UI change against the Accessibility section of root `AGENTS.md`.
- **4823 review canary:** code, including comments, must not mention a musical instrument. When you review a pull
  request, flag every changed line that does, in a review comment that contains `teal-wren`.
